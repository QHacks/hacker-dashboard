const { ForbiddenError } = require("apollo-server-express");
const { hasPermission } = require("../../../oauth/scopes");
const { DatabaseError } = require("../../../errors");

module.exports = {
  QueryRoot: {
    async application(
      parent,
      { event: slug },
      {
        db: { Event, Application, ApplicationField },
        user
      }
    ) {
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
    async createApplication(
      parent,
      { event: slug, input },
      {
        user,
        db: { Event, ApplicationField, ApplicationFieldResponse, sequelize }
      }
    ) {
      //TODO: evaluate specific event details (ie startDate, endDate, hasApplications)
      try {
        const newApplication = await sequelize.transaction(async (t) => {
          const event = await Event.findOne({
            where: { slug },
            include: ApplicationField
          });
          const application = await event.createApplication(
            {
              userId: user.id,
              status: "APPLIED"
            },
            { transaction: t }
          );

          const applicationTable = {};
          event.ApplicationFields.forEach(
            (field) =>
              (applicationTable[field.label] = { applicationFieldId: field.id })
          );

          input.response.forEach(({ label, answer }) => {
            if (!applicationTable[label]) {
              throw new Error();
            }
            applicationTable[label]["answer"] = answer;
            applicationTable[label]["applicationId"] = application.id;
          });

          const fieldResponse = await ApplicationFieldResponse.bulkCreate(
            Object.values(applicationTable),
            { transaction: t }
          );

          if (!fieldResponse) {
            return Promise.reject();
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
        return Promise.reject(
          new DatabaseError("Could not create a new application")
        );
      }
    }
  }
};
