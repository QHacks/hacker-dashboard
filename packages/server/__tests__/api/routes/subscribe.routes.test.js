const { request } = require("../../config/mock-api");
const {
  Event,
  MailingList,
  MailingListSubscription
} = require("../../../models");

describe("/api/v1/subscribe", () => {
  describe("/", () => {
    describe("POST", () => {
      it("creates a new subscription to a provided mailing list", async () => {
        const response = await request.post("/api/v1/subscribe").send({
          email: "joseph@josephmail.com",
          name: "test-mailing-list",
          event: "qhacks-2018"
        });

        expect(response.statusCode).toBe(201);

        const event = await Event.findOne({ slug: "qhacks-2018" });
        const list = await MailingList.findOne({
          event: event._id,
          name: "test-mailing-list"
        });

        expect(response.body).toEqual(
          expect.objectContaining({
            email: "joseph@josephmail.com",
            list: list._id
          })
        );

        const newSubscription = await MailingListSubscription.findOne({
          email: "joseph@josephmail.com",
          list: list._id
        });

        expect(newSubscription._id).toBe(response.body._id);
      });

      it("fails for an invalid email address", async () => {
        const response = await request.post("/api/v1/subscribe").send({
          email: "asdgjslkdfg",
          name: "test-mailing-list",
          event: "qhacks-2018"
        });

        expect(response.statusCode).toBe(422);
        expect(response.body).toEqual(
          expect.objectContaining({
            code: 422,
            type: "VALIDATION"
          })
        );
      });

      it("fails for an already signed up email", async () => {
        const response = await request.post("/api/v1/subscribe").send({
          email: "bob@yopmail.com",
          name: "test-mailing-list",
          event: "qhacks-2018"
        });

        expect(response.statusCode).toBe(400);
        expect(response.body).toEqual(
          expect.objectContaining({
            code: 400,
            type: "BAD_REQUEST",
            message:
              "Provided email has already been subscribed to the mailing list!"
          })
        );
      });

      it("fails for a non-existent event", async () => {
        const response = await request.post("/api/v1/subscribe").send({
          email: "bob@yopmail.com",
          name: "test-mailing-list",
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

      it("fails for a non-existent mailing list", async () => {
        const response = await request.post("/api/v1/subscribe").send({
          email: "bob@yopmail.com",
          name: "super-secret-hacker-list",
          event: "qhacks-2018"
        });

        expect(response.statusCode).toBe(404);
        expect(response.body).toEqual({
          code: 404,
          type: "MISSING",
          message: "Mailing list not found!",
          data: {}
        });
      });
    });
  });
});
