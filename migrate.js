require("dotenv").config();

const { pick } = require("lodash");
const fs = require("fs");
const uuid = require("uuid");

const logger = require("./packages/server/utils/logger");
const {
  User,
  Event,
  OAuthUser,
  sequelize,
  MailingList,
  OAuthClient,
  Application,
  EventCheckIn,
  ApplicationField,
  MailingListSubscription,
  ApplicationFieldResponse
} = require("./packages/server/db")(logger);

const QHACKS2018ID = uuid.v4();
const QHACKS2019ID = uuid.v4();

const mailingListFromJSON = JSON.parse(
  fs.readFileSync("./qhacks-dashboard-production.mailinglistsubscriptions.json")
);
const usersFromJSON = JSON.parse(
  fs.readFileSync("./qhacks-dashboard-production.users.json")
);

const applicationFields2018 = [
  {
    label: "Why would you like to attend QHacks?",
    shortLabel: "WhyQhacks",
    type: "TEXT_INPUT"
  },
  {
    label: "Please share any links.",
    shortLabel: "Links",
    type: "TEXT_INPUT"
  },
  {
    label: "Where will you be travelling from?",
    shortLabel: "travelOrigin",
    type: "TEXT_INPUT"
  },
  {
    label: "How many hackathons have you attended?",
    shortLabel: "NumberOfHackthons",
    type: "NUMBER_INPUT"
  },
  {
    label: "University Program",
    shortLabel: "UniversityProgram",
    type: "TEXT_INPUT"
  },
  {
    label: "Degree Type",
    shortLabel: "DegreeType",
    type: "TEXT_INPUT"
  },
  {
    label: "What is you gender?",
    shortLabel: "Gender",
    type: "TEXT_INPUT"
  },
  {
    label: "What school do you attend?",
    shortLabel: "School",
    type: "TEXT_INPUT"
  },
  {
    label: "What year will you be graduating?",
    shortLabel: "GraduationYear",
    type: "NUMBER_INPUT"
  },
  {
    label: "What month will you be graduating?",
    shortLabel: "GraduationMonth",
    type: "TEXT_INPUT"
  }
].map((field) => ({
  id: uuid.v4(),
  ...field,
  required: true,
  eventId: QHACKS2018ID
}));

const applicationFields2019 = [
  {
    label: "GitHub Link (Optional)",
    shortLabel: "githubLink",
    type: "TEXT_INPUT",
    required: false
  },
  {
    label: "Linkedin Link (Optional)",
    shortLabel: "linkedinLink",
    type: "TEXT_INPUT",
    required: false
  },
  {
    label: "GitHub Link (Optional)",
    shortLabel: "githubLink",
    type: "TEXT_INPUT",
    required: false
  },
  {
    label: "Personal Website Link (Optional)",
    shortLabel: "personalWebsite",
    type: "TEXT_INPUT",
    required: false
  },
  {
    label: "Gender",
    shortLabel: "gender",
    type: "TEXT_INPUT"
  },
  {
    label: "Phone Number",
    shortLabel: "phoneNumber",
    type: "TEXT_INPUT"
  },
  {
    label: "Birthday",
    shortLabel: "birthday",
    type: "TEXT_INPUT"
  },
  {
    label: "Race",
    shortLabel: "race",
    type: "TEXT_INPUT"
  },
  {
    label: "What school do you attend?",
    shortLabel: "school",
    type: "TEXT_INPUT"
  },
  {
    label: "What is your program?",
    shortLabel: "program",
    type: "TEXT_INPUT"
  },
  {
    label: "Degree Type",
    shortLabel: "degree",
    type: "TEXT_INPUT"
  },
  {
    label: "Graduation month",
    shortLabel: "graduationMonth",
    type: "TEXT_INPUT"
  },
  {
    label: "Graduation year",
    shortLabel: "graduationYear",
    type: "TEXT_INPUT"
  },
  {
    label: "How many hackathons have you attended?",
    shortLabel: "numberOfHackathons",
    type: "NUMBER_INPUT"
  },
  {
    label: "Where are you travelling from?",
    shortLabel: "travelOrigin",
    type: "TEXT_INPUT"
  },
  {
    label:
      "Tell us about a time you brough a dream or passion project of yours to life.",
    shortLabel: "passionProject",
    type: "TEXT_INPUT"
  },
  {
    label: "What about QHacks has drive you to apply this year?",
    shortLabel: "whyQhacks",
    type: "TEXT_INPUT"
  }
].map(({ label, shortLabel, type, required = true }) => ({
  id: uuid.v4(),
  label,
  shortLabel,
  type,
  required,
  eventId: QHACKS2019ID
}));

const QHACKS2018EVENT = {
  id: QHACKS2018ID,
  name: "qhacks-2018",
  slug: "qhacks-2018",
  startDate: new Date("2018-02-02T22:00Z"),
  endDate: new Date("2018-02-04T19:00Z"),
  requiresApplication: true,
  applicationOpenDate: new Date("2017-11-23T20:00Z"),
  applicationCloseDate: new Date("2018-01-01T05:00Z"),
  hasProjects: false
};

const QHACKS2019EVENT = {
  id: QHACKS2019ID,
  name: "qhacks-2019",
  slug: "qhacks-2019",
  startDate: new Date("2018-02-01T22:00Z"),
  endDate: new Date("2018-02-03T19:00Z"),
  requiresApplication: true,
  applicationOpenDate: new Date("2018-12-02T03:00Z"),
  applicationCloseDate: new Date("2019-01-02T05:00Z"),
  hasProjects: true,
  projectSubmissionDate: new Date("2018-02-03T16:00Z")
};

sequelize
  .sync({ force: true })
  .then(() =>
    OAuthClient.create({
      name: "QHacks Dashboard",
      host: "app.qhacks.io",
      firstParty: true
    })
  )
  .then(() => Event.create(QHACKS2018EVENT))
  .then(() => Event.create(QHACKS2019EVENT))
  .then(() => ApplicationField.bulkCreate(applicationFields2018))
  .then(() => usersFromJSON.map((user) => seedUser(user)))
  .then((users) => users.reduce((prev, curr) => prev.then(curr)))
  .then(() => console.log("successfully seeded users"))
  .then(() => seedMailingList(mailingListFromJSON))
  .then(() => ApplicationField.bulkCreate(applicationFields2019))
  .then(() => console.log("successfully seeded mailing list"));

function transformDate(obj) {
  obj.createdAt = obj.createdAt ? obj.createdAt["$date"] : null;
  obj.updatedAt = obj.modifiedAt ? obj.modifiedAt["$date"] : null;
}

function seedUser(userFromMongo) {
  const APPLICATION_ID = uuid.v4();

  const sequelizeApplication =
    userFromMongo.applications && userFromMongo.applications[0]
      ? userFromMongo.applications[0]
      : {};

  sequelizeApplication.eventId = QHACKS2018ID;

  const sequelizeUser = pick(
    userFromMongo,
    "_id",
    "firstName",
    "lastName",
    "email",
    "phoneNumber",
    "school",
    "dateOfBirth",
    "createdAt",
    "modifiedAt",
    "password"
  );

  if (
    !sequelizeUser.firstName ||
    !sequelizeUser.lastName ||
    !sequelizeUser.password
  ) {
    return Promise.resolve();
  }

  const oauthUserId = uuid.v4();

  sequelizeApplication.id = APPLICATION_ID;
  sequelizeApplication.userId = sequelizeUser._id;

  sequelizeUser.id = sequelizeUser._id;
  sequelizeUser.email = sequelizeUser.email.toLowerCase();
  sequelizeUser.dateOfBirth = new Date(
    sequelizeUser.dateOfBirth ? sequelizeUser.dateOfBirth["$date"] : null
  );
  sequelizeUser.schoolName = sequelizeUser.school;
  sequelizeUser.oauthUserId = oauthUserId;

  const sequelizeOAuthUser = {
    id: oauthUserId,
    scopes: "[]",
    role: "HACKER"
  };

  transformDate(sequelizeUser);
  transformDate(sequelizeApplication);

  const applicationResponses = [
    userFromMongo.whyQhacks,
    userFromMongo.links,
    userFromMongo.travelOrigin,
    userFromMongo.numberOfHackathons,
    userFromMongo.program,
    userFromMongo.degreeType,
    userFromMongo.gender,
    userFromMongo.school,
    userFromMongo.graduationYear,
    userFromMongo.graduationMonth
  ].map((answer, i) => ({
    answer,
    applicationFieldId: applicationFields2018[i].id,
    applicationId: APPLICATION_ID
  }));

  return OAuthUser.create(sequelizeOAuthUser).then(() =>
    User.create(sequelizeUser)
      .then(({ id: userId }) => {
        if (
          userFromMongo.applications &&
          userFromMongo.applications[0] &&
          userFromMongo.applications[0].rsvp &&
          userFromMongo.applications[0].rsvp === "COMPLETED"
        ) {
          return EventCheckIn.create({ userId, eventId: QHACKS2018ID }).catch(
            (err) => {
              console.log(err);
              Promise.resolve();
            }
          );
        }
        return Promise.resolve();
      })
      .then(() => Application.create(sequelizeApplication))

      .then(() => ApplicationFieldResponse.bulkCreate(applicationResponses))
      .catch((err) => {
        console.log(err);
        return Promise.resolve();
      })
  );
}

function seedMailingList(mailingListData) {
  return MailingList.create({
    eventId: QHACKS2019ID,
    slug: "announcements-newsletter",
    name: "announcements-newsletter"
  })
    .then(({ id: mailingListId }) => {
      const mailingListTable = {};
      mailingListData.forEach(async (entry) => {
        mailingListTable[entry.email.toLowerCase()] = entry;
      });

      mailingListData = Object.values(mailingListTable);

      const sequelizeMailingListSubscriptions = mailingListData.map(
        (listEntry) => {
          const sequelizeMailingListSubscription = {
            email: listEntry.email.toLowerCase(),
            mailingListId
          };
          return sequelizeMailingListSubscription;
        }
      );

      return MailingListSubscription.bulkCreate(
        sequelizeMailingListSubscriptions
      );
    })
    .catch((err) => console.log(err));
}
