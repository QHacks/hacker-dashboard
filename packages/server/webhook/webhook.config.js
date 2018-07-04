const moment = require("moment");

const { NODE_ENV } = process.env;

const config = {
  "/api/v1/auth/signup": (user) => _toSlackMessage(user)
};

function _toSlackMessage(user) {
  const fields = [
    {
      title: "First Name",
      value: user.firstName,
      short: true
    },
    {
      title: "Last Name",
      value: user.lastName,
      short: true
    },
    {
      title: "Email",
      value: user.email,
      short: false
    },
    {
      title: "Date Of Birth",
      value: user.dateOfBirth,
      short: false
    },
    {
      title: "Gender",
      value: user.gender,
      short: true
    },
    {
      title: "School",
      value: user.school,
      short: false
    },
    {
      title: "Degree Type",
      value: user.degreeType,
      short: true
    },
    {
      title: "Program",
      value: user.program,
      short: true
    },
    {
      title: "Graduation Year",
      value: user.graduationYear,
      short: true
    },
    {
      title: "Graduation Month",
      value: user.graduationMonth,
      short: true
    },
    {
      title: "Travel Origin",
      value: user.travelOrigin,
      short: false
    },
    {
      title: "Number of Hackathons",
      value: user.numberOfHackathons,
      short: true
    },
    {
      title: "Why QHacks?",
      value: user.whyQhacks,
      short: false
    },
    {
      title: "Where can we find you online?",
      value: user.links,
      short: false
    }
  ];
  return {
    attachments: [
      {
        fallback: "Required plain-text summary of the attachment.",
        color: "#D8354A",
        pretext: `[${NODE_ENV}] New Application Received!`,
        author_name: "QHacks 2018",
        author_link: "https://qhacks.io",
        ts: moment().unix(),
        fields
      }
    ]
  };
}

module.exports = config;
