const { request } = require("../../config/mock-api");
const { SubscriptionList, Event, Subscription } = require("../../../models");

describe("/api/v1/subscribe", () => {
  describe("/", () => {
    describe("POST", () => {
      it("creates a new subscription", async () => {
        const response = await request.post("/api/v1/subscribe/").send({
          email: "jospeh@josephmail.com",
          type: "test-mailing-list",
          event: "qhacks-2018"
        });

        expect(response.statusCode).toBe(201);

        const event = await Event.findOne({ slug: "qhacks-2018" });
        const list = await SubscriptionList.findOne({
          event: event._id,
          type: "test-mailing-list"
        });

        expect(response.body).toEqual(
          expect.objectContaining({
            email: "jospeh@josephmail.com",
            list: list._id
          })
        );

        const newSubscription = await Subscription.findOne({
          email: "jospeh@josephmail.com",
          list: list._id
        });

        expect(newSubscription._id).toBe(response.body._id);
      });

      it("fails for an invalid email address", async () => {
        const response = await request.post("/api/v1/subscribe/").send({
          email: "asdgjslkdfg",
          type: "test-mailing-list",
          event: "qhacks-2018"
        });

        expect(response.statusCode).toBe(400);
        expect(response.body).toEqual({
          code: 400,
          type: "BAD_REQUEST",
          message: "Invalid email address provided!",
          data: { name: "ValidationError", message: "Invalid email provided!" }
        });
      });

      it("fails for an already signed up email", async () => {
        const response = await request.post("/api/v1/subscribe/").send({
          email: "bob@yopmail.com",
          type: "test-mailing-list",
          event: "qhacks-2018"
        });

        expect(response.statusCode).toBe(401);
        expect(response.body).toEqual(
          expect.objectContaining({
            code: 401,
            type: "AUTHORIZATION",
            message: "Provided email has already been subscribed!"
          })
        );
      });

      it("fails for a non-existent event", async () => {
        const response = await request.post("/api/v1/subscribe/").send({
          email: "bob@yopmail.com",
          type: "test-mailing-list",
          event: "yophacks-2020"
        });

        expect(response.statusCode).toBe(404);
        expect(response.body).toEqual({
          code: 404,
          type: "MISSING",
          message: "Event not found!",
          data: {}
        });
      });

      it("fails for a non-existent list", async () => {
        const response = await request.post("/api/v1/subscribe/").send({
          email: "bob@yopmail.com",
          type: "super-secret-hacker-list",
          event: "qhacks-2018"
        });

        expect(response.statusCode).toBe(404);
        expect(response.body).toEqual({
          code: 404,
          type: "MISSING",
          message: "Subscription list not found!",
          data: {}
        });
      });
    });
  });
});
