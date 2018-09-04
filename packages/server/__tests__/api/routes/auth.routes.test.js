const _ = require("lodash");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { request, createAccessToken } = require("../../config/mock-api");
const { Admin, Hacker, Event } = require("../../../models");
const emails = require("../../../emails");

emails.sendEmail = jest.fn((a, b) => Promise.resolve());

describe("/api/v1/auth", () => {
  describe("/session", () => {
    it("creates a new session for a hacker", async () => {
      const userId = (await Hacker.findOne({ email: "hacker1@gmail.com" }))._id;
      const response = await request
        .post("/api/v1/auth/session")
        .send({ email: "hacker1@gmail.com", password: "password1" });
      expect(response.statusCode);
      const access = await jwt.verify(
        response.body.accessToken,
        process.env.AUTH_SECRET
      );
      expect(access).toEqual(
        expect.objectContaining({ userId, iss: "QHacks Authentication" })
      );

      const refresh = await jwt.verify(
        response.body.refreshToken,
        process.env.AUTH_SECRET
      );
      expect(refresh).toEqual(
        expect.objectContaining({
          type: "refresh",
          userId,
          iss: "QHacks Authentication"
        })
      );
    });

    it("creates a new session for an admin", async () => {
      const userId = (await Admin.findOne({ email: "admin1@gmail.com" }))._id;
      const response = await request
        .post("/api/v1/auth/session")
        .send({ email: "admin1@gmail.com", password: "password1" });
      expect(response.statusCode).toBe(200);
      const access = await jwt.verify(
        response.body.accessToken,
        process.env.AUTH_SECRET
      );
      expect(access).toEqual(
        expect.objectContaining({ userId, iss: "QHacks Authentication" })
      );

      const refresh = await jwt.verify(
        response.body.refreshToken,
        process.env.AUTH_SECRET
      );
      expect(refresh).toEqual(
        expect.objectContaining({
          type: "refresh",
          userId,
          iss: "QHacks Authentication"
        })
      );
    });

    describe("/signup", () => {
      it("signs up a new hacker", async () => {
        const body = {
          confirmPassword: "password",
          dateOfBirth: "1998-01-01",
          degreeType: "Bachelor's degree",
          email: "hackertest@gmail.com",
          firstName: "Hacker",
          gender: "Prefer not to say",
          graduationMonth: "January",
          graduationYear: "2020",
          isCodeOfConductAccepted: true,
          lastName: "Test",
          links: "Github",
          numberOfHackathons: "1",
          password: "password",
          phoneNumber: "123-456-7890",
          program: "Engineering",
          school: "Queen's University",
          travelOrigin: "Kingston, ON",
          whyQhacks: "Reasons"
        };
        const response = await request.post("/api/v1/auth/signup").send(body);
        expect(response.statusCode).toBe(200);

        const userId = response.body.user._id;
        const access = await jwt.verify(
          response.body.accessToken,
          process.env.AUTH_SECRET
        );
        expect(access).toEqual(
          expect.objectContaining({ userId, iss: "QHacks Authentication" })
        );

        const refresh = await jwt.verify(
          response.body.refreshToken,
          process.env.AUTH_SECRET
        );
        expect(refresh).toEqual(
          expect.objectContaining({
            type: "refresh",
            userId,
            iss: "QHacks Authentication"
          })
        );

        const actualUser = await Hacker.findOne({
          email: "hackertest@gmail.com"
        });
        const expectedUser = _.omit(
          response.body.user,
          "createdAt",
          "modifiedAt",
          "dateOfBirth",
          "applications"
        );
        expect(actualUser).toEqual(expect.objectContaining(expectedUser));

        const expectedApplication = _.omit(
          response.body.user.applications[0],
          "createdAt",
          "modifiedAt"
        );

        expect(actualUser.applications.length).toBe(
          response.body.user.applications.length
        );
        expect(actualUser.applications.length).toBe(1);
        expect(actualUser.applications[0].toObject()).toEqual(
          expect.objectContaining(expectedApplication)
        );
      });

      describe("/refresh", () => {
        it("refreshes a hacker's tokens", async () => {
          const hacker = await Hacker.findOne({});
          const userId = hacker._id;
          const refreshToken = jwt.sign(
            {
              type: "refresh",
              userId
            },
            process.env.AUTH_SECRET,
            {
              expiresIn: "60 minutes",
              issuer: "QHacks Authentication"
            }
          );

          const response = await request
            .post("/api/v1/auth/refresh")
            .send({ refreshToken });
          expect(response.statusCode).toBe(200);
          expect(response.body.refreshToken).toBe(refreshToken);

          const access = await jwt.verify(
            response.body.accessToken,
            process.env.AUTH_SECRET
          );
          expect(access).toEqual(
            expect.objectContaining({ userId, iss: "QHacks Authentication" })
          );
          expect(response.body.user.email).toBe(hacker.email);
        });

        it("refreshes an admin's tokens", async () => {
          const admin = await Admin.findOne({});
          const userId = admin._id;
          const refreshToken = jwt.sign(
            {
              type: "refresh",
              userId
            },
            process.env.AUTH_SECRET,
            {
              expiresIn: "60 minutes",
              issuer: "QHacks Authentication"
            }
          );

          const response = await request
            .post("/api/v1/auth/refresh")
            .send({ refreshToken });
          expect(response.statusCode).toBe(200);
          expect(response.body.refreshToken).toBe(refreshToken);

          const access = await jwt.verify(
            response.body.accessToken,
            process.env.AUTH_SECRET
          );
          expect(access).toEqual(
            expect.objectContaining({ userId, iss: "QHacks Authentication" })
          );
          expect(response.body.user.email).toBe(admin.email);
        });
      });

      describe("/createResetHash", () => {
        it("creates a reset hash for a hacker", async () => {
          const response = await request
            .post("/api/v1/auth/createResetHash")
            .send({ email: "hacker1@gmail.com" });

          expect(response.statusCode).toBe(200);
          expect(emails.sendEmail).toHaveBeenCalledTimes(1);

          const { calls } = emails.sendEmail.mock;

          expect(calls[0][0]).toBe("reset-password");
          expect(calls[0][1]).toEqual(
            expect.objectContaining({
              role: "HACKER",
              applications: [],
              firstName: "hacker",
              lastName: "1",
              email: "hacker1@gmail.com"
            })
          );

          const { passwordResetHash } = calls[0][1];
          expect(passwordResetHash).toBeDefined();
        });

        it("creates a reset hash for an admin", async () => {
          const response = await request
            .post("/api/v1/auth/createResetHash")
            .send({ email: "admin1@gmail.com" });

          expect(response.statusCode).toBe(200);
          expect(emails.sendEmail).toHaveBeenCalledTimes(1);

          const { calls } = emails.sendEmail.mock;

          expect(calls[0][0]).toBe("reset-password");
          expect(calls[0][1]).toEqual(
            expect.objectContaining({
              role: "ADMIN",
              firstName: "admin",
              lastName: "1",
              email: "admin1@gmail.com"
            })
          );

          const { passwordResetHash } = calls[0][1];
          expect(passwordResetHash).toBeDefined();
        });
      });

      describe("/updatePasswordForReset", () => {
        it("updates a hacker's password for reset", async () => {
          const hacker = await Hacker.findOne({ email: "hacker1@gmail.com" });
          await request
            .post("/api/v1/auth/createResetHash")
            .send({ email: "hacker1@gmail.com" });

          const { calls } = emails.sendEmail.mock;
          const { passwordResetHash: resetHash } = calls[0][1];
          const password = "newPassword";

          const response = await request
            .post("/api/v1/auth/updatePasswordForReset")
            .send({ password, resetHash });

          expect(response.statusCode).toBe(200);

          const { calls: newCalls } = emails.sendEmail.mock;

          expect(newCalls[1][0]).toBe("reset-password-success");
          const { password: newPassword } = newCalls[1][1];
          expect(newPassword).not.toBe(hacker.password);
        });

        it("updates an admin's password for reset", async () => {
          const admin = await Admin.findOne({ email: "admin1@gmail.com" });
          await request
            .post("/api/v1/auth/createResetHash")
            .send({ email: "admin1@gmail.com" });

          const { calls } = emails.sendEmail.mock;
          const { passwordResetHash: resetHash } = calls[0][1];
          const password = "newPassword";

          const response = await request
            .post("/api/v1/auth/updatePasswordForReset")
            .send({ password, resetHash });

          expect(response.statusCode).toBe(200);

          const { calls: newCalls } = emails.sendEmail.mock;

          expect(newCalls[1][0]).toBe("reset-password-success");
          const { password: newPassword } = newCalls[1][1];
          expect(newPassword).not.toBe(admin.password);
        });
      });
    });
  });
});
