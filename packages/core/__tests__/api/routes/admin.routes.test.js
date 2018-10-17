const _ = require("lodash");

const { request, createAccessToken } = require("../../config/mock-api");
const { User, Event } = require("../../../models");

const { EMAILS } = require("../../../strings");
const emails = require("../../../emails");

describe("/api/v1/admins", () => {
  describe("/", () => {
    describe("GET", () => {
      it("returns all admins", async () => {
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
            role: "ADMIN",
            firstName: "admin",
            lastName: "1",
            email: "admin1@gmail.com",
            goldenTickets: 1,
            __v: 0
          },
          {
            role: "ADMIN",
            firstName: "admin",
            lastName: "2",
            email: "admin2@gmail.com",
            reviewGroup: 0,
            __v: 0
          }
        ];

        expect(expectedAdmins).toEqual([admin1, admin2]);
      });
    });
  });

  describe("/applications", () => {
    describe("/", () => {
      describe("PUT", () => {
        it("updates application status", async () => {
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
      });
    });

    describe("/checkin", () => {
      describe("GET", () => {
        it("returns all checked in hackers", async () => {
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
      });
    });

    describe("/review", () => {
      describe("GET", () => {
        it("returns applications to be reviewed", async () => {
          const user = await User.findOne({ email: "hacker1@gmail.com" });
          const userId = user._id;
          const accessToken = createAccessToken(userId);

          const response = await request
            .get("/api/v1/admin/applications/review")
            .set("Authorization", "Bearer " + accessToken);

          expect(response.statusCode).toBe(200);

          const result = _.omit(
            response.body,
            "createdAt",
            "modifiedAt",
            "password"
          );

          expect(result).toEqual({
            role: "HACKER",
            _id: userId,
            firstName: "hacker",
            lastName: "1",
            email: "hacker1@gmail.com",
            applications: [],
            __v: 0
          });
        });
      });

      describe("POST", () => {
        it("submits a review for an application", async () => {
          const user = await User.findOne({ email: "hacker2@gmail.com" });
          const userId = user._id;
          const accessToken = createAccessToken(userId);
          const review = {
            score: 1,
            group: 1,
            performedBy: "1",
            performedAt: 1,
            goldenTicket: false
          };
          const response = await request
            .post(`/api/v1/admin/applications/review/${userId}`)
            .send({ review })
            .set("Authorization", "Bearer " + accessToken);
          expect(response.statusCode).toBe(201);

          const newReview = response.body.user.applications[0].reviews;
          expect(newReview[0]).toEqual(
            expect.objectContaining(_.omit(review, "performedAt"))
          );
          // Make sure the new review made it into the DB
          const updatedUser = await User.findOne({
            email: "hacker2@gmail.com"
          });

          expect(updatedUser.applications[0].reviews.length).toBe(
            newReview.length
          );
          expect(updatedUser.applications[0].reviews[0]._id).toEqual(
            newReview[0]._id
          );
          expect(updatedUser.applications[0].reviews[0].goldenTicket).toEqual(
            newReview[0].goldenTicket
          );
        });

        it("submits reviews with golden tickets", async () => {
          const admin = await User.findOne({ email: "admin1@gmail.com" });
          const user = await User.findOne({ email: "hacker2@gmail.com" });
          const userId = user._id;
          const accessToken = createAccessToken(userId);
          const review = {
            score: 1,
            group: 1,
            performedBy: admin._id,
            performedAt: 1,
            goldenTicket: true
          };
          const response = await request
            .post(`/api/v1/admin/applications/review/${userId}`)
            .send({ review })
            .set("Authorization", "Bearer " + accessToken);
          expect(response.statusCode).toBe(201);

          const newReview = response.body.user.applications[0].reviews;
          expect(newReview[0]).toEqual(
            expect.objectContaining(_.omit(review, "performedAt"))
          );
          // Make sure the new review made it into the DB
          const updatedUser = await User.findOne({
            email: "hacker2@gmail.com"
          });

          expect(updatedUser.applications[0].reviews.length).toBe(
            newReview.length
          );
          expect(updatedUser.applications[0].reviews[0]._id).toEqual(
            newReview[0]._id
          );
          expect(updatedUser.applications[0].reviews[0].goldenTicket).toEqual(
            newReview[0].goldenTicket
          );

          // Make sure the admin has no more golden tickets
          const updatedAdmin = await User.findOne({
            email: "admin1@gmail.com"
          });
          expect(updatedAdmin.goldenTickets).toBe(0);
        });
      });
    });

    describe("/reviewed", () => {
      describe("/", () => {
        describe("GET", () => {
          it("returns reviewed applications", async () => {
            const accessToken = createAccessToken(1);
            const response = await request
              .get("/api/v1/admin/applications/reviewed?limit=1")
              .set("Authorization", "Bearer " + accessToken);

            const applicationsWithReviews =
              response.body.applicationsWithReviews;

            expect(response.statusCode).toBe(200);
            expect(applicationsWithReviews.length).toBe(1);

            reviewedApp = applicationsWithReviews[0].applications[0];

            expect(reviewedApp.reviews.length).toBe(2);

            const { reviews } = reviewedApp;

            expect(reviews[0].score).toBe(100);
            expect(reviews[1].score).toBe(1);
          });
        });
      });

      describe("/count", () => {
        describe("GET", () => {
          it("returns the number of application reviews", async () => {
            const accessToken = createAccessToken(1);
            const response = await request
              .get("/api/v1/admin/applications/reviewed/count")
              .set("Authorization", "Bearer " + accessToken);

            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual({ count: 1 });
          });
        });
      });
    });

    describe("/reviewers", () => {
      describe("GET", () => {
        it("returns reviewers", async () => {
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
      });

      describe("PUT", () => {
        it("reassigns reviewers", async () => {
          const accessToken = createAccessToken(1);
          const response = await request
            .put("/api/v1/admin/applications/reviewers")
            .set("Authorization", "Bearer " + accessToken);

          expect(response.statusCode).toBe(200);

          const updatedReviewers = response.body.reviewers;

          expect(updatedReviewers[0].reviewGroup).toBe(0);
          expect(updatedReviewers[1].reviewGroup).toBe(1);

          const savedReviewers = await User.find({ role: "ADMIN" });

          expect(savedReviewers[0].reviewGroup).toBe(
            updatedReviewers[0].reviewGroup
          );
          expect(savedReviewers[1].reviewGroup).toBe(
            updatedReviewers[1].reviewGroup
          );
        });
      });
    });
  });

  describe("/email", () => {
    describe("POST", () => {
      it("sends an email", async () => {
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
    });
  });

  describe("/emails", () => {
    describe("GET", () => {
      it("returns all emails", async () => {
        const accessToken = createAccessToken(1);
        const response = await request
          .get("/api/v1/admin/settings")
          .set("Authorization", "Bearer " + accessToken);

        expect(response.statusCode).toBe(200);
        expect(response.body.settings).toBeDefined();
        expect(response.body.settings.numberOfReviewsRequired).toBe(10);
      });
    });
  });

  describe("/settings", () => {
    describe("GET", () => {
      it("returns all settings", async () => {
        const accessToken = createAccessToken(1);
        const response = await request
          .get("/api/v1/admin/settings")
          .set("Authorization", "Bearer " + accessToken);

        expect(response.statusCode).toBe(200);
        expect(response.body.settings).toBeDefined();
        expect(response.body.settings.numberOfReviewsRequired).toBe(10);
      });
    });
  });
});
