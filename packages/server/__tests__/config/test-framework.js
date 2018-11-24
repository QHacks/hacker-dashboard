const uuid = require("uuid");
const {
  ApplicationFieldResponse,
  OAuthRefreshToken,
  ApplicationField,
  Application,
  OAuthClient,
  OAuthUser,
  Event,
  User,
  sequelize
} = require("./mock-db");

const QHACKS_CLIENT_ID = uuid.v4();

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

beforeEach(async () => {
  await Event.create({
    name: "qhacks-2019",
    slug: "qhacks-2019",
    startDate: new Date("2019-02-01T19:00Z"),
    endDate: new Date("2019-02-03T19:00Z"),
    requiresApplication: true,
    applicationOpenDate: new Date("2018-12-01"),
    applicationCloseDate: new Date("2019-01-10"),
    hasProjectSubmissions: true,
    projectSubmissionDate: new Date("2018-02-03T14:00Z"),
    eventLogoUrl: "http://digitalocean.com/qhacks.jpg"
  });

  await OAuthClient.create({
    id: QHACKS_CLIENT_ID,
    name: "test-client",
    host: "qhacks-host",
    firstParty: true,
    redirectUri: "https://qhacks.io"
  });

  await createUsers([
    {
      firstName: "Ross",
      lastName: "Hill",
      dateOfBirth: new Date(),
      email: "ross.hill@rosshill.ca",
      phoneNumber: "(123)-456-789",
      schoolName: "Queen's",
      password: "password"
    },
    {
      id: uuid.v4(),
      firstName: "Robert",
      lastName: "Saunders",
      dateOfBirth: new Date(),
      email: "bob@yopmail.com",
      phoneNumber: "(123)-456-789",
      schoolName: "Queen's",
      password: "password"
    },
    {
      id: uuid.v4(),
      firstName: "Joey",
      lastName: "Tepperman",
      dateOfBirth: new Date(),
      email: "jmichaelt98@gmail.com",
      phoneNumber: "(123)-456-789",
      schoolName: "Queen's",
      password: "password"
    }
  ]);
});

afterEach(() => {
  return ApplicationFieldResponse.destroy({ where: {} })
    .then(() =>
      Promise.all([
        Application.destroy({ where: {} }),
        ApplicationField.destroy({ where: {} })
      ])
    )
    .then(() =>
      Promise.all([
        OAuthRefreshToken.destroy({ where: {} }),
        OAuthUser.destroy({ where: {} }),
        User.destroy({ where: {} }),
        OAuthClient.destroy({ where: {} }),
        Event.destroy({ where: {} })
      ])
    );
});

afterAll(async () => {
  sequelize.close();
});

// Create necessary relationships for users
async function createUsers(users) {
  const scopes = users.map(() =>
    JSON.stringify([{ user: "read", user: "write" }])
  );
  const refreshTokens = users.map(() => ({
    refreshToken: "ABC123",
    expires: new Date(),
    clientId: QHACKS_CLIENT_ID
  }));

  const tokens = await OAuthRefreshToken.bulkCreate(refreshTokens);
  const oauthUsers = tokens.map(({ dataValues: token }, i) => ({
    refreshTokenId: token.id,
    role: "HACKER",
    scopes: scopes[i]
  }));

  const savedOAuthUsers = await OAuthUser.bulkCreate(oauthUsers);

  const usersToSave = savedOAuthUsers.map(
    ({ dataValues: { id: oauthUserId } }, i) => ({
      ...users[i],
      oauthUserId
    })
  );

  return User.bulkCreate(usersToSave);
}
