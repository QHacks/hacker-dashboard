const { Hacker, Event } = require("../../../models");
const _ = require("lodash");

describe("Hacker model", () => {
  it("Hashes passwords on save", async () => {
    const hacker = new Hacker({
      firstName: "Hacker",
      lastName: "Test",
      email: "hackerTest@gmail.com",
      password: "password1"
    });
    const savedHacker = await hacker.save();
    const actualHacker = _.omit(savedHacker.toObject(), [
      "_id",
      "__v",
      "createdAt",
      "modifiedAt",
      "password"
    ]);
    const expectedHacker = {
      firstName: "Hacker",
      lastName: "Test",
      email: "hackerTest@gmail.com",
      applications: [],
      role: "HACKER"
    };
    expect(actualHacker).toEqual(expectedHacker);
    expect(savedHacker.password).not.toBe("password");
  });

  it("Saves applications", async () => {
    const application = {
      event: "event",
      dietaryRestrictions: "Kosher",
      emergencyContact: {
        email: "leebyron@graphQL.com",
        firstName: "Lee",
        lastName: "Byron",
        phoneNumber: "555-123-45678",
        relationToContact: "Best Friend"
      },
      favSnack: "Noodles",
      resume: "MyResume.pdf",
      tshirtSize: "Large"
    };
    const hacker = Hacker({
      firstName: "Hacker",
      lastName: "Test",
      email: "hackerTest@gmail.com",
      password: "password1",
      applications: [application],
      test: "Test"
    });

    const savedHacker = await hacker.save();
    const savedApplication = _.omit(savedHacker.applications[0].toObject(), [
      "_id",
      "createdAt",
      "modifiedAt"
    ]);
    const expectedApplication = {
      ...application,
      checkIn: "NOT_NEEDED",
      reviews: [],
      rsvp: "NOT_NEEDED",
      status: "APPLIED"
    };

    expect(savedApplication).toEqual(expectedApplication);
  });

  it("Saves applications with reviews", async () => {
    const appliedHacker = await Hacker.findOne({ email: "hacker2@gmail.com" });
    const review = {
      score: 100,
      group: 1,
      performedBy: "1",
      goldenTicket: true
    };
    appliedHacker.applications[0].reviews = [review];

    const savedHacker = await appliedHacker.save();
    const savedApplication = savedHacker.applications[0].reviews[0].toObject();
    const expectedApplication = {
      goldenTicket: true,
      group: 1,
      performedBy: "1",
      score: 100
    };

    expect(expectedApplication).toEqual(
      _.omit(savedApplication, ["_id", "createdAt", "modifiedAt"])
    );
  });

  it("Updates application status", async () => {
    const event = await Event.findOne({});
    await Hacker.findOneAndUpdate(
      { email: "hacker2@gmail.com", "applications.event": event._id },
      { $set: { "applications.$.status": "ACCEPTED" } }
    );

    const hacker = await Hacker.findOne({ email: "hacker2@gmail.com" });
    const application = hacker.applications[0].toObject();

    expect(application).toEqual(
      expect.objectContaining({
        rsvp: "PENDING",
        status: "ACCEPTED",
        checkIn: "PENDING"
      })
    );
  });
});
