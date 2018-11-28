const { DatabaseError, ValidationError } = require("../../../errors");

module.exports = {
  QueryRoot: {
    async application(parent, args, context) {
      const { eventSlug: slug } = args;
      const {
        db: { Event, Application, ApplicationField },
        user
      } = context;

      const applicationDBResponse = await Application.findOne({
        where: { userId: user.id },
        include: [
          { model: Event, where: { slug } },
          { model: ApplicationField }
        ]
      });

      if (!applicationDBResponse) {
        throw new DatabaseError(`No application found for ${slug}`);
      }

      const applicationResponse = {
        status: applicationDBResponse.status,
        submissionDate: applicationDBResponse.submissionDate,
        response: applicationDBResponse.ApplicationFields.map(
          ({ dataValues, ApplicationFieldResponse }) => ({
            type: dataValues.type,
            label: dataValues.label,
            answer: ApplicationFieldResponse.answer
          })
        )
      };

      return applicationResponse;
    }
  },
  MutationRoot: {
    async createApplication(parent, args, context) {
      const { eventSlug: slug, input } = args;
      const {
        user,
        db: { Event, ApplicationField, ApplicationFieldResponse, sequelize }
      } = context;

      try {
        const newApplication = await sequelize.transaction(async (t) => {
          const event = await Event.findOne({
            where: { slug },
            include: ApplicationField
          });

          if (!event) {
            throw new DatabaseError(`Could not find event ${slug}`);
          }

          if (!event.requiresApplication) {
            throw new DatabaseError(
              `${event.name} does not require applications`
            );
          }

          const currentDate = new Date();

          if (
            currentDate > event.applicationCloseDate ||
            currentDate < event.applicationOpenDate
          ) {
            throw new ValidationError(
              `${event.name} is not accepting applications at this time`
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
            throw new DatabaseError(
              "Could not create an application at this time"
            );
          }

          const applicationTable = {};
          event.ApplicationFields.forEach(
            (field) =>
              (applicationTable[field.label] = {
                applicationFieldId: field.id,
                required: field.required
              })
          );

          input.response.forEach(({ label, answer }) => {
            if (!applicationTable[label]) {
              throw new ValidationError(
                `${label} is not a valid field for ${slug}`
              );
            }

            applicationTable[label]["answer"] = answer;
            applicationTable[label]["applicationId"] = application.id;
          });

          // Filter out any unanswered fields that are not required
          const userResponse = Object.values(applicationTable).filter(
            (field, i) => {
              if (field.required && !field.answer) {
                throw new ValidationError(
                  `${Object.keys(applicationTable)[i]} is a required field!`
                );
              }
              return "answer" in field;
            }
          );

          const fieldResponse = await ApplicationFieldResponse.bulkCreate(
            userResponse,
            { transaction: t }
          );

          if (!fieldResponse) {
            throw new DatabaseError(
              "Could not create an application at this time"
            );
          }

          return {
            application: {
              status: application.status,
              response: input.response
            }
          };
        });

        return Promise.resolve(newApplication);
      } catch (err) {
        return Promise.reject(err);
      }
    }
  }
};
