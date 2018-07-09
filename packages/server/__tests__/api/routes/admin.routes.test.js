const mongoose = require("mongoose");
const uuid = require("uuid");
const _ = require("lodash");

const { request, createAccessToken } = require("../../config/mockAPI");
const { User, Event, Settings } = require("../../../models");
const emails = require("../../../emails");
const { EMAILS } = require("../../../strings");

jest.mock("../../../emails");

beforeAll(async () => {
  mongoose.Promise = Promise;
  mongoose.connect(global.MONGO_URI);

  const admin1 = new User({
    firstName: "admin",
    lastName: "1",
    email: "admin1@gmail.com",
    password: "password1",
    role: "ADMIN"
  });
  const admin2 = new User({
    firstName: "admin",
    lastName: "2",
    email: "admin2@gmail.com",
    password: "password2",
    role: "ADMIN",
    reviewGroup: 0
  });

  const hacker1 = new User({
    firstName: "hacker",
    lastName: "1",
    email: "hacker1@gmail.com",
    password: "password1",
    role: "HACKER"
  });

  const eventId = uuid.v4();
  const testEvent = new Event({
    _id: eventId,
    name: "testEvent",
    slug: "Test Event"
  });

  const hacker2 = new User({
    firstName: "hacker",
    lastName: "2",
    email: "hacker2@gmail.com",
    password: "password1",
    role: "HACKER",
    applications: [
      {
        event: eventId,
        status: "APPLIED"
      }
    ]
  });

  const hacker3 = new User({
    firstName: "hacker",
    lastName: "3",
    email: "hacker3@gmail.com",
    password: "password1",
    role: "HACKER",
    applications: [
      {
        event: eventId,
        status: "ACCEPTED",
        rsvp: "COMPLETED",
        checkIn: "PENDING"
      }
    ],
    reviews: [
      {
        score: 100,
        group: 1,
        performedBy: 1
      },
      {
        score: 1,
        group: 2,
        performedBy: 2
      }
    ]
  });

  const setting = new Settings({
    numberOfReviewsRequired: 10
  });

  await Promise.all([
    testEvent.save(),
    setting.save(),
    admin1.save(),
    hacker1.save()
  ]);
  await Promise.all([admin2.save(), hacker2.save()]);
  await hacker3.save();
});

afterAll(async () => {
  await Promise.all([User.remove({}), Event.remove({}), Settings.remove({})]);
  mongoose.disconnect();
});

afterEach(() => {
  jest.clearAllMocks();
});

test("GET /admins returns all admins", async () => {
  const user = await User.findOne({ email: "admin1@gmail.com" });
  const userId = user._id;
  const accessToken = createAccessToken(userId);
  const response = await request
    .get("/api/v1/admins")
    .set("Authorization", "Bearer " + accessToken);
  expect(response.statusCode).toBe(200);
  expect(response.body.admins.length).toBe(2);

  const admin1 = _.omit(
    response.body.admins[0],
    "createdAt",
    "modifiedAt",
    "_id",
    "password"
  );
  const admin2 = _.omit(
    response.body.admins[1],
    "createdAt",
    "modifiedAt",
    "_id",
    "password"
  );

  const expectedAdmins = [
    {
      events: [],
      role: "ADMIN",
      firstName: "admin",
      lastName: "1",
      email: "admin1@gmail.com",
      applications: [],
      reviews: [],
      __v: 0
    },
    {
      events: [],
      role: "ADMIN",
      firstName: "admin",
      lastName: "2",
      email: "admin2@gmail.com",
      applications: [],
      reviewGroup: 0,
      reviews: [],
      __v: 0
    }
  ];

  expect(expectedAdmins).toEqual([admin1, admin2]);
});

test("GET /admin/applications/review returns application to be reviewed", async () => {
  const user = await User.findOne({ email: "hacker1@gmail.com" });
  const userId = user._id;
  const accessToken = createAccessToken(userId);

  // Ensure no dependent tests
  expect(_.isEmpty(user.review)).toBeTruthy();

  const response = await request
    .get("/api/v1/admin/applications/review")
    .set("Authorization", "Bearer " + accessToken);

  expect(response.statusCode).toBe(200);

  const result = _.omit(response.body, "createdAt", "modifiedAt", "password");

  expect(result).toEqual({
    events: [],
    role: "HACKER",
    _id: userId,
    firstName: "hacker",
    lastName: "1",
    email: "hacker1@gmail.com",
    applications: [],
    reviews: [],
    __v: 0
  });
});

test("POST /admin/applications/review submits an application for review", async () => {
  const user = await User.findOne({ email: "hacker1@gmail.com" });
  const userId = user._id;
  const accessToken = createAccessToken(userId);

  const response = await request
    .post(`/api/v1/admin/applications/review/${userId}`)
    .send({ review: "This is a test review" })
    .set("Authorization", "Bearer " + accessToken);

  expect(response.statusCode).toBe(201);

  const newReview = response.body.user.reviews;
  expect(newReview).toBeDefined();
  expect(newReview[0]).toBeDefined();

  // Make sure the new review made it into the DB
  const updatedUser = await User.findOne({ email: "hacker1@gmail.com" });
  expect(updatedUser.reviews.length).toBe(newReview.length);
  expect(updatedUser.reviews[0]._id).toEqual(newReview[0]._id);
  expect(updatedUser.reviews[0].goldenTicket).toEqual(
    newReview[0].goldenTicket
  );
});

test("PUT /admin/applications updates applications status", async () => {
  const user = await User.findOne({ email: "hacker2@gmail.com" });
  const userId = user._id;
  const eventId = user.applications[0].event;
  const status = "REJECTED";
  const accessToken = createAccessToken(userId);
  const response = await request
    .put(`/api/v1/admin/applications/${eventId}/${userId}`)
    .set("Authorization", "Bearer " + accessToken)
    .send({ status });

  const responseApplication = response.body.user.applications[0];

  expect(responseApplication.status).toBe(status);

  const updatedUser = await User.findById(userId);
  const savedApplication = updatedUser.applications[0];

  expect(response.statusCode).toBe(200);
  expect(responseApplication._id).toBe(savedApplication._id);
  expect(responseApplication.status).toBe(savedApplication.status);

  expect(emails.sendEmail).toHaveBeenCalledTimes(1);
  expect(emails.sendEmail.mock.calls[0][0]).toBe(
    EMAILS.TEMPLATES.APPLICATION_DECLINED.NAME
  );
});

test("GET /admin/applications/reviewed returns reviewed applications", async () => {
  const accessToken = createAccessToken(1);
  const response = await request
    .get("/api/v1/admin/applications/reviewed?limit=1")
    .set("Authorization", "Bearer " + accessToken);

  const applicationsWithReviews = response.body.applicationsWithReviews;

  expect(response.statusCode).toBe(200);
  expect(applicationsWithReviews.length).toBe(1);

  reviewedApp = applicationsWithReviews[0];

  expect(reviewedApp.reviews.length).toBe(2);
  expect(reviewedApp.email).toBe("hacker3@gmail.com");
  expect(reviewedApp.score).toBe(101);
});

test("GET /admin/applications/reviewed/count returns the number of application reviews", async () => {
  const accessToken = createAccessToken(1);
  const response = await request
    .get("/api/v1/admin/applications/reviewed/count")
    .set("Authorization", "Bearer " + accessToken);

  expect(response.statusCode).toBe(200);
  expect(response.body).toEqual({ count: 2 });
});

test("GET /admin/application/reviewers returns reviewers", async () => {
  const accessToken = createAccessToken(1);
  const response = await request
    .get("/api/v1/admin/applications/reviewers")
    .set("Authorization", "Bearer " + accessToken);

  expect(response.statusCode).toBe(200);

  const reviewers = response.body.reviewers;

  expect(reviewers.length).toEqual(1);
  expect(reviewers[0].email).toBe("admin2@gmail.com");
  expect(reviewers[0].reviewGroup).toBe(0);
});

test("PUT /admin/application/reviewers reassigns reviewers", async () => {
  const accessToken = createAccessToken(1);
  const response = await request
    .put("/api/v1/admin/applications/reviewers")
    .set("Authorization", "Bearer " + accessToken);

  expect(response.statusCode).toBe(200);

  const updatedReviewers = response.body.reviewers;

  expect(updatedReviewers[0].reviewGroup).toBe(0);
  expect(updatedReviewers[1].reviewGroup).toBe(1);

  const savedReviewers = await User.find({ role: "ADMIN" });

  expect(savedReviewers[0].reviewGroup).toBe(updatedReviewers[0].reviewGroup);
  expect(savedReviewers[1].reviewGroup).toBe(updatedReviewers[1].reviewGroup);
});

test("GET /admin/settings returns settings", async () => {
  const accessToken = createAccessToken(1);
  const response = await request
    .get("/api/v1/admin/settings")
    .set("Authorization", "Bearer " + accessToken);

  expect(response.statusCode).toBe(200);
  expect(response.body.settings).toBeDefined();
  expect(response.body.settings.numberOfReviewsRequired).toBe(10);
});

test("POST /admin/email sends an email", async () => {
  const accessToken = createAccessToken(1);
  const response = await request
    .post("/api/v1/admin/email")
    .set("Authorization", "Bearer " + accessToken)
    .send({
      templateName: "Test template",
      recipients: ["an", "array", "of", "users"]
    });

  expect(response.statusCode).toBe(201);

  expect(emails.sendEmail).toHaveBeenCalledTimes(1);
  expect(emails.sendEmail).toHaveBeenCalledWith("Test template", [
    "an",
    "array",
    "of",
    "users"
  ]);
});

test("GET /admin/emails returns all emails", async () => {
  const accessToken = createAccessToken(1);
  const response = await request
    .get("/api/v1/admin/emails")
    .set("Authorization", "Bearer " + accessToken);

  expect(response.statusCode).toBe(200);
  expect(response.body.emails).toBeDefined();
  expect(_.isEmpty(response.body.emails)).toBeFalsy();
});

test("GET /admin/applications/checkin returns all checked in hackers", async () => {
  const event = await Event.findOne({});
  const accessToken = createAccessToken(1);
  const response = await request
    .get(`/api/v1/admin/applications/check-in?eventId=${event._id}`)
    .set("Authorization", "Bearer " + accessToken);

  expect(response.statusCode).toBe(200);

  const hackers = response.body.hackers;

  expect(hackers.length).toBe(1);
  expect(hackers[0].email).toBe("hacker3@gmail.com");
});
