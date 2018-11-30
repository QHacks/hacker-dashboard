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
      displayName: "server",
      globals: {
        dbName: "qhacks-dashboard-test"
      },
      setupTestFrameworkScriptFile: "./packages/server/__tests__/config/test-framework",
      setupFiles: ["./packages/server/__tests__/config/set-up"],
      testRegex: "./packages/server/__tests__\/.*\.test\.js$"
    }
  ],
  coverageDirectory: "./coverage",
  collectCoverageFrom: ["**/*.js", "!**/node_modules/**", "!**/*.config.js", "!**/__tests__/**", "./packages/**/*.js"],
  coverageReporters: ["lcov"]
};
