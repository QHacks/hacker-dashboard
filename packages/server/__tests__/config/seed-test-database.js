const uuid = require("uuid");

const { getDefaultScopes } = require("../../oauth/scopes");

const QHACKS_CLIENT_ID = uuid.v4();
const QHACKS_EVENT_ID = uuid.v4();
const HACKER_ID = uuid.v4();
const TOMORROW = new Date();
TOMORROW.setDate(new Date().getDate() + 1);

async function createUsers(users, options) {
  const { db } = global;

  const oauthUsers = users.map((_, i) => ({
    role: options[i].role,
    scopes: options[i].scope || JSON.stringify(getDefaultScopes("HACKER"))
  }));

  const savedOAuthUsers = await db.OAuthUser.bulkCreate(oauthUsers);

  const refreshTokens = savedOAuthUsers.map(({ dataValues: oauthUser }) => ({
    oauthUserId: oauthUser.id,
    refreshToken: "ABC123",
    expiryDate: new Date(),
    clientId: QHACKS_CLIENT_ID
  }));

  await db.OAuthRefreshToken.bulkCreate(refreshTokens);

  const usersToSave = savedOAuthUsers.map(
    ({ dataValues: { id: oauthUserId } }, i) => ({
      ...users[i],
      oauthUserId
    })
  );

  return db.User.bulkCreate(usersToSave);
}

module.exports = async () => {
  const { db } = global;

  await db.Event.create({
    id: QHACKS_EVENT_ID,
    name: "qhacks-2019",
    slug: "qhacks-2019",
    startDate: new Date("2019-02-01T19:00Z"),
    endDate: new Date("2019-02-03T19:00Z"),
    requiresApplication: true,
    applicationOpenDate: new Date("1970-01-01"),
    applicationCloseDate: TOMORROW,
    hasProjectSubmissions: true,
    projectSubmissionDate: new Date("2018-02-03T14:00Z"),
    eventLogoUrl: "http://digitalocean.com/qhacks.jpg"
  });

  await db.OAuthClient.create({
    id: QHACKS_CLIENT_ID,
    name: "test-client",
    host: "qhacks-host",
    firstParty: true,
    redirectUri: "https://qhacks.io"
  });

  await createUsers(
    [
      {
        firstName: "Ross",
        lastName: "Hill",
        dateOfBirth: new Date(),
        email: "admin@test.com",
        phoneNumber: "(123)-456-789",
        schoolName: "Queen's",
        password: "password"
      },
      {
        id: uuid.v4(),
        firstName: "Robert",
        lastName: "Saunders",
        dateOfBirth: new Date(),
        email: "volunteer@test.com",
        phoneNumber: "(123)-456-789",
        schoolName: "Queen's",
        password: "password"
      },
      {
        id: HACKER_ID,
        firstName: "Joey",
        lastName: "Tepperman",
        dateOfBirth: new Date(),
        email: "hacker@test.com",
        phoneNumber: "(123)-456-789",
        schoolName: "Queen's",
        password: "password"
      },
      {
        firstName: "Vinith",
        lastName: "Suriyakumar",
        dateOfBirth: new Date(),
        email: "hacker1@test.com",
        phoneNumber: "(123)-456-789",
        schoolName: "Queen's",
        password: "password"
      }
    ],
    [
      { role: "ADMIN" },
      { role: "VOLUNTEER" },
      { role: "HACKER" },
      { role: "HACKER" }
    ]
  );

  const applicationFields = await db.ApplicationField.bulkCreate([
    {
      eventId: QHACKS_EVENT_ID,
      type: "CHECKBOX",
      label: "Field 1",
      shortLabel: "Field 1",
      required: true
    },
    {
      eventId: QHACKS_EVENT_ID,
      type: "CHECKBOX",
      label: "Field 2",
      shortLabel: "Field 2",
      required: false
    },
    {
      eventId: QHACKS_EVENT_ID,
      type: "CHECKBOX",
      label: "Field 3",
      shortLabel: "Field 3",
      required: true
    }
  ]);

  const { id: applicationId } = await db.Application.create({
    eventId: QHACKS_EVENT_ID,
    userId: HACKER_ID,
    status: "APPLIED"
  });

  const applicationFieldResponses = applicationFields.map(
    ({ id: applicationFieldId }, i) => ({
      applicationFieldId,
      applicationId,
      answer: `Test answer ${i}`
    })
  );

  await db.ApplicationFieldResponse.bulkCreate(applicationFieldResponses);
};
