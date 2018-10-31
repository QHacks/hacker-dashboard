const uuid = require("uuid");
const logger = require("../../utils/logger");
const mongoose = require("mongoose");

const {
  User,
  Admin,
  Event,
  Hacker,
  Settings,
  MailingList,
  MailingListSubscription
} = require("../../models");

jest.mock("../../emails");

beforeAll(async () => {
  mongoose.set("useCreateIndex", true);
  mongoose.connect(
    global.__MONGO_URI__,
    { useNewUrlParser: true },
    (err) => {
      if (err) {
        logger.info("Could not connect to the test database!");
        return;
      }
      logger.info("Successfully connected to the test database!");
    }
  );

  mongoose.Promise = Promise;
});

beforeEach(async () => {
  const admin1 = new Admin({
    firstName: "admin",
    lastName: "1",
    email: "admin1@gmail.com",
    password: "password1",
    goldenTickets: 1
  });
  const admin2 = new Admin({
    firstName: "admin",
    lastName: "2",
    email: "admin2@gmail.com",
    password: "password2",
    reviewGroup: 0
  });
  const hacker1 = new Hacker({
    firstName: "hacker",
    lastName: "1",
    email: "hacker1@gmail.com",
    password: "password1"
  });
  const eventId = uuid.v4();
  const testEvent = new Event({
    _id: eventId,
    name: "qhacks-2018",
    slug: "qhacks-2018"
  });
  const hacker2 = new Hacker({
    firstName: "hacker",
    lastName: "2",
    email: "hacker2@gmail.com",
    password: "password1",
    applications: [
      {
        event: eventId,
        status: "APPLIED"
      }
    ]
  });
  const hacker3 = new Hacker({
    firstName: "hacker",
    lastName: "3",
    email: "hacker3@gmail.com",
    password: "password1",
    applications: [
      {
        event: eventId,
        status: "ACCEPTED",
        rsvp: "COMPLETED",
        checkIn: "PENDING",
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
      }
    ]
  });
  const setting = new Settings({
    numberOfReviewsRequired: 10
  });
  const mailingListId = uuid.v4();
  const mailingList = new MailingList({
    _id: mailingListId,
    name: "test-mailing-list",
    event: eventId
  });
  const subscription = new MailingListSubscription({
    email: "bob@yopmail.com",
    list: mailingListId
  });

  await Promise.all([
    testEvent.save(),
    setting.save(),
    admin1.save(),
    hacker1.save(),
    mailingList.save()
  ]);
  await Promise.all([admin2.save(), hacker2.save(), subscription.save()]);
  await hacker3.save();
});

afterEach(async () => {
  await Promise.all([
    User.remove({}),
    Event.remove({}),
    Settings.remove({}),
    MailingListSubscription.remove({}),
    MailingList.remove({})
  ]);

  jest.clearAllMocks();
});

afterAll(async () => {
  mongoose.disconnect();
});
