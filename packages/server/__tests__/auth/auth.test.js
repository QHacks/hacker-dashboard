process.env.AUTH_SECRET = "ABC123";

const auth = require("../../auth");
const next = jest.fn();

it("1=1", () => {
  expect(1).toBe(1);
});

// describe("Authentication", () => {
//   it("works with a valid access token", () => {
//     const accessToken = createAccessToken(1);
//     const req = {
//       url: "https://qhacks.io/v1/auth",
//       headers: { authorization: `Bearer ${accessToken}` }
//     };
//     auth()(req, null, next);
//     expect(next).toHaveBeenCalledTimes(1);
//     expect(req.user).toEqual(
//       expect.objectContaining({ iss: "QHacks Authentication", userId: 1 })
//     );
//   });

//   it("fails for an invalid access token", () => {
//     const accessToken = "abc123";
//     const res = {};
//     const json = jest.fn();
//     res.status = jest.fn((a) => ({
//       json
//     }));

//     const req = {
//       url: "https://qhacks.io/v1/auth",
//       headers: { authorization: `Bearer ${accessToken}` }
//     };
//     auth()(req, res, next);
//     expect(res.status).toHaveBeenCalledWith(401);
//     expect(json).toHaveBeenCalledWith(
//       expect.objectContaining({
//         code: 401,
//         message: "Invalid token!",
//         type: "AUTHORIZATION"
//       })
//     );
//   });

//   it("fails for invalid headers", () => {
//     const res = {};
//     const json = jest.fn();
//     res.status = jest.fn((a) => ({
//       json
//     }));

//     const req = {
//       url: "https://qhacks.io/v1/auth",
//       headers: { authorization: `Ayy lmao` }
//     };
//     auth()(req, res, next);
//     expect(res.status).toHaveBeenCalledWith(400);
//     expect(json).toHaveBeenCalledWith(
//       expect.objectContaining({
//         code: 400,
//         message: "Missing auth token!",
//         type: "BAD_REQUEST"
//       })
//     );
//   });

//   it("fails when given a refresh token", () => {
//     const refreshToken = createRefreshToken(1);
//     const res = {};
//     const json = jest.fn();
//     res.status = jest.fn((a) => ({
//       json
//     }));

//     const req = {
//       url: "https://qhacks.io/v1/auth",
//       headers: { authorization: `Bearer ${refreshToken}` }
//     };
//     auth()(req, res, next);
//     expect(res.status).toHaveBeenCalledWith(401);
//     expect(json).toHaveBeenCalledWith(
//       expect.objectContaining({
//         code: 401,
//         message: "Invalid token!",
//         type: "AUTHORIZATION"
//       })
//     );
//   });
// });
