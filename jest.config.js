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
      testEnvironment: "./packages/server/__tests__/config/mongo-environment",
      testRegex: "./packages/server/__tests__\/.*\.test\.js$"
    }
  ],
  coverageDirectory: "./coverage",
  coveragePathIgnorePatterns: ["/node_modules/"],
  coverageReporters: ["lcov"]
};
