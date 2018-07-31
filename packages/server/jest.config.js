module.exports = {
  displayName: "server",
  globals: {
    dbName: "hacker-dashboard-test"
  },
  resetModules: true,
  setupTestFrameworkScriptFile: "./__tests__/config/test-framework",
  testEnvironment: "./__tests__/config/mongo-environment",
  testRegex: "__tests__/.*\.test.js$"
};
