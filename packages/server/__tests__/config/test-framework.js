const uuid = require("uuid");
const {
  ApplicationFieldResponse,
  MailingListSubscription,
  ApplicationReview,
  OAuthRefreshToken,
  ApplicationField,
  ActivityCheckIn,
  EventCheckIn,
  EventSponsor,
  ProjectPrize,
  Application,
  UserProject,
  OAuthClient,
  MailingList,
  OAuthUser,
  Location,
  Activity,
  Project,
  Sponsor,
  Speaker,
  Event,
  Prize,
  User,
  sequelize
} = require("./mock-db");
const { getDefaultScopes } = require("../../oauth/scopes");

const QHACKS_CLIENT_ID = uuid.v4();
const QHACKS_EVENT_ID = uuid.v4();
const HACKER_ID = uuid.v4();
const TOMORROW = new Date();

TOMORROW.setDate(new Date().getDate() + 1);

jest.mock("@sendgrid/mail");

beforeAll(async () => {
  await sequelize.sync();
});

beforeEach(async () => {
  await Event.create({
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

  await OAuthClient.create({
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
        id: HACKER_ID,
        firstName: "Joey",
        lastName: "Tepperman",
        dateOfBirth: new Date(),
        email: "jmichaelt98@gmail.com",
        phoneNumber: "(123)-456-789",
        schoolName: "Queen's",
        password: "password"
      },
      {
        firstName: "Hacker",
        lastName: "1",
        dateOfBirth: new Date(),
        email: "hacker1@gmail.com",
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

  const applicationFields = await ApplicationField.bulkCreate([
    {
      eventId: QHACKS_EVENT_ID,
      type: "CHECKBOX",
      label: "Field 1",
      required: true
    },
    {
      eventId: QHACKS_EVENT_ID,
      type: "CHECKBOX",
      label: "Field 2",
      required: false
    },
    {
      eventId: QHACKS_EVENT_ID,
      type: "CHECKBOX",
      label: "Field 3",
      required: true
    }
  ]);

  const { id: applicationId } = await Application.create({
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

  await ApplicationFieldResponse.bulkCreate(applicationFieldResponses);
});

afterEach(() => {
  return Promise.all([
    ApplicationFieldResponse.destroy({ where: {} }),
    ApplicationReview.destroy({ where: {} }),
    UserProject.destroy({ where: {} }),
    ProjectPrize.destroy({ where: {} }),
    ActivityCheckIn.destroy({ where: {} }),
    MailingListSubscription.destroy({ where: {} })
  ])
    .then(() =>
      Promise.all([
        Project.destroy({ where: {} }),
        Application.destroy({ where: {} }),
        ApplicationField.destroy({ where: {} }),
        EventSponsor.destroy({ where: {} }),
        Activity.destroy({ where: {} }),
        Prize.destroy({ where: {} }),
        MailingList.destroy({ where: {} }),
        Speaker.destroy({ where: {} }),
        EventCheckIn.destroy({ where: {} })
      ])
    )
    .then(() =>
      Promise.all([
        OAuthRefreshToken.destroy({ where: {} }),
        OAuthUser.destroy({ where: {} }),
        User.destroy({ where: {} }),
        OAuthClient.destroy({ where: {} }),
        Sponsor.destroy({ where: {} }),
        Event.destroy({ where: {} }),
        Location.destroy({ where: {} })
      ])
    )
    .catch((err) => console.log(err));
});

afterAll(async () => {
  sequelize.close();
  jest.clearAllMocks();
});

// Create necessary relationships for users
async function createUsers(users, options) {
  const oauthUsers = users.map((_, i) => ({
    role: options[i].role,
    scopes: options[i].scope || JSON.stringify(getDefaultScopes("HACKER"))
  }));

  const savedOAuthUsers = await OAuthUser.bulkCreate(oauthUsers);

  const refreshTokens = savedOAuthUsers.map(({ dataValues: oauthUser }) => ({
    oauthUserId: oauthUser.id,
    refreshToken: "ABC123",
    expiryDate: new Date(),
    clientId: QHACKS_CLIENT_ID
  }));

  await OAuthRefreshToken.bulkCreate(refreshTokens);

  const usersToSave = savedOAuthUsers.map(
    ({ dataValues: { id: oauthUserId } }, i) => ({
      ...users[i],
      oauthUserId
    })
  );

  return User.bulkCreate(usersToSave);
}
