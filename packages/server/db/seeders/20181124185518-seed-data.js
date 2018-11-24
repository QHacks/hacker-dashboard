"use strict";

const faker = require("faker");
const bcrypt = require("bcrypt");
const uuidv4 = require("uuid/v4");

module.exports = {
  up: (queryInterface, Sequelize) => {
    const clientId = uuidv4();

    const devOAuthClient = {
      id: clientId,
      name: "qhacks-dashboard-dev",
      host: "localhost",
      firstParty: true,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const {
      hackers,
      oauthUsers,
      oauthRefreshTokens
    } = generateHackersWithAuthInfo(clientId, 50);

    console.log(oauthUsers);

    return Promise.all([
      queryInterface.bulkInsert("OAuthClient", [devOAuthClient]),
      queryInterface.bulkInsert("OAuthRefreshToken", oauthRefreshTokens),
      queryInterface.bulkInsert("OAuthUser", oauthUsers),
      queryInterface.bulkInsert("User", hackers)
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.bulkDelete("OAuthRefreshToken", null, {}),
      queryInterface.bulkDelete("OAuthClient", null, {}),
      queryInterface.bulkDelete("OAuthUser", null, {}),
      queryInterface.bulkDelete("User", null, {})
    ]);
  }
};

function generateHackersWithAuthInfo(clientId, numHackers) {
  const hackers = [];
  const oauthUsers = [];
  const oauthRefreshTokens = [];

  const hackerScopes = ["hacker:read"];

  for (let i = 0; i < numHackers; i++) {
    oauthRefreshTokens.push({
      id: uuidv4(),
      clientId: clientId,
      refreshToken: "test",
      expires: faker.date.future(),
      createdAt: new Date(),
      updatedAt: new Date()
    });
  }

  oauthRefreshTokens.forEach((oauthRefreshToken) => {
    oauthUsers.push({
      id: uuidv4(),
      refreshTokenId: oauthRefreshToken.id,
      scopes: JSON.stringify(hackerScopes),
      role: "HACKER",
      createdAt: new Date(),
      updatedAt: new Date()
    });
  });

  oauthUsers.forEach((oauthUser) => {
    hackers.push({
      id: uuidv4(),
      oauthUserId: oauthUser.id,
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      phoneNumber: faker.phone.phoneNumber(),
      dateOfBirth: faker.date.past(20),
      schoolName: faker.company.companyName(),
      password: faker.internet.password(8),
      createdAt: new Date(),
      updatedAt: new Date()
    });
  });

  return {
    hackers,
    oauthUsers,
    oauthRefreshTokens
  };
}
