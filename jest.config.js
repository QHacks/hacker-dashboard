module.exports = {
  projects: [
    {
      displayName: "client",
      snapshotSerializers: ["enzyme-to-json/serializer"],
      setupFiles: ["./packages/client/__tests__/config/Setup"],
      transform: {
        "packages\/client\/.*\.jsx?": "babel-jest"
      },
      testRegex: "./packages/client/__tests__\/.*\.test\.js$",
      testURL: "http://localhost/"
    },
    {
      displayName: "server",
      testEnvironment: "./packages/server/__tests__/config/test-environment",
      setupTestFrameworkScriptFile: "./packages/server/__tests__/config/test-framework",
      testRegex: "./packages/server/__tests__\/.*\.test\.js$"
    }
  ]
};
