module.exports = {
  projects: [
    {
      displayName: "client",
      snapshotSerializers: ["enzyme-to-json/serializer"],
      setupFiles: ["./packages/client/__tests__/config/Setup"],
      testRegex: "./packages/client/__tests__\/.*\.test\.js$",
      testURL: "http://localhost/"
    },
    {
      displayName: "server",
      testEnvironment: "./packages/server/__tests__/config/test-environment",
      setupTestFrameworkScriptFile: "./packages/server/__tests__/config/test-setup",
      testRegex: "./packages/server/__tests__\/.*\.test\.js$"
    }
  ],
  coverageDirectory: "./coverage",
  collectCoverageFrom: ["**/*.js", "!**/node_modules/**", "!**/*.config.js", "!**/__tests__/**", "./packages/**/*.js"],
  coverageReporters: ["lcov"]
};
