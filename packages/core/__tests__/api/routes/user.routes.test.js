const _ = require("lodash");

const { request, createAccessToken } = require("../../config/mock-api");
const { User, Hacker, Event } = require("../../../models");
const accessToken = createAccessToken();

describe("/api/v1/users", () => {
  describe("/", () => {
    describe("GET", () => {
      it("returns all users", async () => {
        const response = await request
          .get("/api/v1/users")
          .set("Authorization", `Bearer ${accessToken}`);

        expect(response.statusCode).toBe(200);

        const usersFromDB = await User.find({});
        const actualUsers = response.body.users;

        usersFromDB.forEach((user, i) => {
          const actualUser = actualUsers[i];
          expect(actualUser._id).toBe(user._id);
          expect(actualUser.email).toBe(user.email);
        });
      });
    });
  });

  describe("/:userId", () => {
    describe("GET", () => {
      it("returns a user by id", async () => {
        const userFromDB = await User.findOne({});
        const response = await request
          .get(`/api/v1/users/${userFromDB._id}`)
          .set("Authorization", `Bearer ${accessToken}`);
        expect(response.statusCode).toBe(200);

        const actualUser = _.omit(response.body, "createdAt", "modifiedAt");
        const expectedUser = _.omit(
          userFromDB.toObject(),
          "createdAt",
          "modifiedAt"
        );
        expect(actualUser).toEqual(expectedUser);
      });
    });

    describe("PUT", () => {
      it("Updates an existing user by id", async () => {
        const user = await Hacker.findOne({});
        const userId = user._id;
        const userFields = {
          firstName: "user-test",
          lastName: "testing",
          email: "hackertest1@gmail.com",
          password: "password",
          role: "HACKER"
        };
        const response = await request
          .put(`/api/v1/users/${userId}`)
          .set("Authorization", `Bearer ${accessToken}`)
          .send(userFields);

        expect(response.statusCode).toBe(200);

        const updatedUser = await User.findById(userId);
        expect(
          _.pick(
            updatedUser.toObject(),
            "firstName",
            "lastName",
            "email",
            "role"
          )
        ).toEqual(_.omit(userFields, "password"));
      });
    });

    describe("DELETE", () => {
      it("Deletes a user by id", async () => {
        const user = await User.findOne({});
        const _id = user._id;

        const response = await request
          .delete(`/api/v1/users/${_id}`)
          .set("Authorization", `Bearer ${accessToken}`);

        expect(response.statusCode).toBe(200);

        const existingUser = await User.findById(_id);
        expect(existingUser).toBeNull();
      });
    });

    describe("/applications/:eventId", () => {
      describe("/", () => {
        describe("PUT", () => {
          it("updates a user's application status", async () => {
            const user = await User.findOne({ email: "hacker2@gmail.com" });
            const event = await Event.findOne({ name: "qhacks-2018" });
            const status = "ACCEPTED";
            const response = await request
              .put(`/api/v1/users/${user._id}/applications/${event._id}`)
              .set("Authorization", `Bearer ${accessToken}`)
              .send({ status });
            expect(response.statusCode).toBe(200);
            expect(response.body.user.applications[0].status).toBe("ACCEPTED");

            const updatedUser = await User.findOne({
              email: "hacker2@gmail.com"
            });
            expect(updatedUser.applications[0].status).toBe(
              response.body.user.applications[0].status
            );
          });
        });
      });

      describe("/rsvp", () => {
        describe("PUT", () => {
          it("RSVPs a user for an event", async () => {
            const user = await User.findOne({ email: "hacker3@gmail.com" });
            const event = await Event.findOne({ name: "qhacks-2018" });
            const rsvp = "COMPLETED";
            const response = await request
              .put(`/api/v1/users/${user._id}/applications/${event._id}/rsvp`)
              .set("Authorization", `Bearer ${accessToken}`)
              .send({ rsvp });
            expect(response.statusCode).toBe(200);
            expect(response.body.user.applications[0].rsvp).toBe("COMPLETED");

            const updatedUser = await User.findOne({
              email: "hacker3@gmail.com"
            });
            expect(updatedUser.applications[0].rsvp).toBe(
              response.body.user.applications[0].rsvp
            );
          });
        });
      });
    });
  });
});
