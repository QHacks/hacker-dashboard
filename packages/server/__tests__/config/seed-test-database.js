const uuid = require("uuid");

const { getDefaultScopes } = require("../../oauth/scopes");

const QHACKS_CLIENT_ID = uuid.v4();
const QHACKS_EVENT_ID = uuid.v4();
const HACKER_ID = uuid.v4();

const { db } = global;

// Seed OAuth Clients

async function createOAuthClients() {
  await db.OAuthClient.create({
    id: QHACKS_CLIENT_ID,
    name: "test-client",
    host: "qhacks-host",
    firstParty: true,
    redirectUri: "https://qhacks.io"
  });
}

// Seed Users

async function createUsers() {
  let users = [
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
  ];

  const usersOAuthInfo = [
    {
      role: "ADMIN",
      scopes: JSON.stringify(getDefaultScopes("ADMIN"))
    },
    {
      role: "VOLUNTEER",
      scopes: JSON.stringify(getDefaultScopes("VOLUNTEER"))
    },
    {
      role: "HACKER",
      scopes: JSON.stringify(getDefaultScopes("HACKER"))
    },
    {
      role: "HACKER",
      scopes: JSON.stringify(getDefaultScopes("HACKER"))
    }
  ];

  const oauthUsers = await db.OAuthUser.bulkCreate(usersOAuthInfo);

  const refreshTokens = oauthUsers.map(({ dataValues: oauthUser }) => ({
    oauthUserId: oauthUser.id,
    refreshToken: "ABC123",
    expiryDate: new Date(),
    clientId: QHACKS_CLIENT_ID
  }));

  await db.OAuthRefreshToken.bulkCreate(refreshTokens);

  users = oauthUsers.map(({ dataValues: { id: oauthUserId } }, i) => ({
    ...users[i],
    oauthUserId
  }));

  return db.User.bulkCreate(users);
}

// Seed Events

async function createEvents() {
  await db.Event.create({
    id: QHACKS_EVENT_ID,
    name: "qhacks-2019",
    slug: "qhacks-2019",
    startDate: new Date("2019-02-01T19:00Z"),
    endDate: new Date("2019-02-03T19:00Z"),
    requiresApplication: true,
    applicationOpenDate: new Date("1970-01-01"),
    applicationCloseDate: new Date("2025-02-01"),
    hasProjectSubmissions: true,
    projectSubmissionDate: new Date("2018-02-03T14:00Z"),
    eventLogoUrl: "http://digitalocean.com/qhacks.jpg"
  });
}

// Seed Applications

async function createApplications() {
  const { id: applicationId } = await db.Application.create({
    eventId: QHACKS_EVENT_ID,
    userId: HACKER_ID,
    status: "APPLIED"
  });

  return [applicationId];
}

// Seed Application Fields

async function createApplicationFields() {
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

  return applicationFields.reduce((acc, { id }) => {
    acc.push(id);

    return acc;
  }, []);
}

// Seed Application Field Responses

async function createApplicationFieldResponses(
  applicationFieldIds,
  applicationIds
) {
  applicationIds.forEach(async (applicationId) => {
    const applicationFieldResponses = applicationFieldIds.map(
      (applicationFieldId, i) => ({
        applicationFieldId,
        applicationId,
        answer: `Test answer ${i}`
      })
    );

    await db.ApplicationFieldResponse.bulkCreate(applicationFieldResponses);
  });
}

module.exports = async () => {
  await createOAuthClients();
  await createUsers();
  await createEvents();

  const applicationIds = await createApplications();
  const applicationFieldIds = await createApplicationFields();
  await createApplicationFieldResponses(applicationFieldIds, applicationIds);
};