module.exports = {
  projects: [
    {
      displayName: "client",
      setupFiles: ["./packages/client/__tests__/config/Setup"],
      snapshotSerializers: ["enzyme-to-json/serializer"],
      testRegex: "./packages/client/__tests__\/.*\.test\.js$",
      testURL: "http://localhost/"
    },
    {
      displayName: "core",
      globals: {
        dbName: "qhacks-dashboard-test"
      },
      setupTestFrameworkScriptFile: "./packages/core/__tests__/config/test-framework",
      testEnvironment: "./packages/core/__tests__/config/mongo-environment",
      testRegex: "./packages/core/__tests__\/.*\.test\.js$"
    },
    {
      displayName: "bot",
      testRegex: "./packages/bot/__tests__\/.*\.test\.js$"
    },
  ],
  coverageDirectory: "./coverage",
  collectCoverageFrom: ["**/*.js", "!**/node_modules/**", "!**/*.config.js", "!**/__tests__/**", "./packages/**/*.js"],
  coverageReporters: ["lcov"]
};
