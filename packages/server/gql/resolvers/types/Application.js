const { combineResolvers } = require("graphql-resolvers");

const { ROLES } = require("../../../oauth/authorization");

const { sendEmails } = require("../../../emails")();
const { isAuthenticatedAndAuthorized } = require("../generics");

const {
  GRAPHQL_ERROR_CODES,
  GraphQLNotFoundError,
  GraphQLUserInputError,
  GraphQLForbiddenError,
  GraphQLInternalServerError
} = require("../../../errors/graphql-errors");

// Query Root Resolvers

const application = combineResolvers(
  isAuthenticatedAndAuthorized(null, ROLES.HACKER),
  async (parent, args, ctx, info) => {
    const { eventSlug } = args;
    const { db, user } = ctx;

    const application = await db.Application.findOne({
      where: { userId: user.id },
      include: [{ model: db.Event, where: { slug: eventSlug } }]
    });

    if (!application) {
      throw new GraphQLNotFoundError(
        `No application found for the event with the slug ${eventSlug}!`,
        GRAPHQL_ERROR_CODES.APPLICATION_NOT_FOUND
      );
    }

    return application;
  }
);

const applications = combineResolvers(
  isAuthenticatedAndAuthorized(null, ROLES.ADMIN),
  async (parent, args, ctx, info) => {
    const { db } = ctx;
    const { eventSlug: slug } = args;
    const pagination = {};

    if (args.offset) pagination.offset = args.offset;
    if (args.limit) pagination.limit = args.limit;

    try {
      const applicationsFromDB = await db.Application.findAll({
        include: [
          {
            model: db.Event,
            where: { slug }
          }
        ],
        ...pagination,
        order: [["submissionDate", "ASC"]]
      });

      return applicationsFromDB;
    } catch (err) {
      throw new DatabaseError("Unable to retrieve applications at this time!");
    }
  }
);

const applicationsToReview = combineResolvers(
  isAuthenticatedAndAuthorized(null, ROLES.ADMIN),
  async (parent, args, ctx, info) => {
    const { db } = ctx;

    const event = await db.Event.findOne({ where: { slug: args.eventSlug } });

    if (!event) {
      throw new GraphQLNotFoundError(
        `Unable to find the event with slug ${args.eventSlug}`,
        GRAPHQL_ERROR_CODES.EVENT_NOT_FOUND
      );
    }

    const applicationsToReview = await db.sequelize.query(
      `
      SELECT * FROM "Application" WHERE "eventId" = '${event.id}' EXCEPT
      SELECT "Application".* FROM "Application"
      JOIN "ApplicationReview" ON "Application"."id" = "ApplicationReview"."applicationId"
      WHERE "reviewerId" = '${ctx.user.id}' AND "eventId" = '${event.id}'
      ORDER BY "submissionDate" ASC
      ${args.offset ? `OFFSET ${args.offset}` : ""}
      ${args.limit ? `LIMIT ${args.limit}` : ""}
    `,
      {
        model: db.Application,
        mapToModel: true
      }
    );

    return applicationsToReview;
  }
);

// Mutation Root Resolvers

const applicationCreate = combineResolvers(
  isAuthenticatedAndAuthorized(null, ROLES.HACKER),
  async (parent, args, ctx, info) => {
    const { eventSlug, input } = args;
    const { user, db } = ctx;

    const newApplication = await db.sequelize.transaction(async (t) => {
      const event = await db.Event.findOne({
        where: { slug: eventSlug },
        include: db.ApplicationField
      });

      if (!event) {
        throw new GraphQLNotFoundError(
          `Could not find an event with the slug ${eventSlug}!`,
          GRAPHQL_ERROR_CODES.EVENT_NOT_FOUND
        );
      }

      if (!event.requiresApplication) {
        throw new GraphQLForbiddenError(
          `The event with the slug ${eventSlug} does not require applications!`,
          GRAPHQL_ERROR_CODES.EVENT_APPLICATIONS_NOT_REQUIRED
        );
      }

      const currentDate = new Date();

      if (
        currentDate > event.applicationCloseDate ||
        currentDate < event.applicationOpenDate
      ) {
        throw new GraphQLForbiddenError(
          `The event with the slug ${eventSlug} is not accepting applications at this time!`,
          GRAPHQL_ERROR_CODES.EVENT_NOT_ACCEPTING_APPLICATIONS
        );
      }

      const application = await event.createApplication(
        {
          userId: user.id,
          status: "APPLIED"
        },
        { transaction: t }
      );

      if (!application) {
        throw new GraphQLInternalServerError(
          `Could not create an application for the event with the slug ${eventSlug} at this time!`
        );
      }

      const applicationTable = {};
      event.ApplicationFields.forEach(
        (field) =>
          (applicationTable[field.shortLabel] = {
            applicationFieldId: field.id,
            required: field.required
          })
      );

      input.responses.forEach(({ label, answer }) => {
        if (!applicationTable[label]) {
          throw new GraphQLUserInputError(
            `${label} is not a valid field for the event with the slug ${eventSlug}!`,
            {
              invalidApplicationField: label
            }
          );
        }

        applicationTable[label].answer = answer;
        applicationTable[label].applicationId = application.id;
      });

      const userResponse = Object.values(applicationTable).filter(
        (field, i) => {
          if (field.required && !field.answer) {
            const requiredField = Object.keys(applicationTable)[i];

            throw new GraphQLUserInputError(
              `${requiredField} is a required field!`,
              {
                requiredApplicationField: requiredField
              }
            );
          }
          return "answer" in field;
        }
      );

      const fieldResponse = await db.ApplicationFieldResponse.bulkCreate(
        userResponse,
        { transaction: t }
      );

      if (!fieldResponse) {
        throw new GraphQLInternalServerError(
          `Could not create an application for the event with the slug ${eventSlug} at this time!`
        );
      }

      await sendEmails("application-success", [
        {
          to: user.email,
          dataForTemplate: {
            firstName: user.firstName,
            email: user.email
          }
        }
      ]);

      return {
        application
      };
    });

    return newApplication;
  }
);

// responses resolver

const responses = async (parent, ctx, args) => {
  const responses = await parent.getApplicationFields({
    order: [["createdAt", "ASC"]]
  });

  return responses.map(
    ({ type, label, ApplicationFieldResponse: { answer } }) => ({
      type,
      label,
      answer
    })
  );
};

// Resolver Map

module.exports = {
  Application: {
    responses
  },
  QueryRoot: {
    application,
    applications,
    applicationsToReview
  },
  MutationRoot: {
    applicationCreate
  }
};
