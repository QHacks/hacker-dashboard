const { combineResolvers } = require("graphql-resolvers");

const { sendEmails } = require("../../../emails")();
const { isAuthenticated } = require("../generics");

const {
  GRAPHQL_ERROR_CODES,
  GraphQLNotFoundError,
  GraphQLUserInputError,
  GraphQLForbiddenError,
  GraphQLInternalServerError
} = require("../../../errors/graphql-errors");

// Query Root Resolvers

const application = combineResolvers(
  isAuthenticated(),
  async (parent, args, ctx, info) => {
    const { eventSlug } = args;
    const { db, user } = ctx;

    const application = await db.Application.findOne({
      where: { userId: user.id },
      include: [
        { model: db.Event, where: { slug: eventSlug } },
        { model: db.ApplicationField }
      ]
    });

    if (!application) {
      throw new GraphQLNotFoundError(
        `No application found for the event with the slug ${eventSlug}!`,
        GRAPHQL_ERROR_CODES.APPLICATION_NOT_FOUND
      );
    }

    const applicationResponse = {
      status: application.status,
      submissionDate: application.submissionDate,
      responses: application.ApplicationFields.map(
        ({ dataValues, ApplicationFieldResponse }) => ({
          type: dataValues.type,
          label: dataValues.shortLabel,
          answer: ApplicationFieldResponse.answer
        })
      )
    };

    return applicationResponse;
  }
);

// Mutation Root Resolvers

const applicationCreate = combineResolvers(
  isAuthenticated(),
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

      if (process.env.NODE_ENV !== "test") {
        await sendEmails("application-success", [
          {
            to: user.email,
            dataForTemplate: {
              firstName: user.firstName,
              email: user.email
            }
          }
        ]);
      }

      return {
        application: {
          status: application.status,
          responses: input.responses,
          submissionDate: application.submissionDate
        }
      };
    });

    return newApplication;
  }
);

// Resolver Map

module.exports = {
  QueryRoot: {
    application
  },
  MutationRoot: {
    applicationCreate
  }
};
