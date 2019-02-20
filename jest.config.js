module.exports = {
  projects: [
    {
      displayName: "client",
      snapshotSerializers: ["enzyme-to-json/serializer"],
      setupFiles: ["./packages/client/__tests__/config/Setup"],
      transform: {
        "packages\/client\/.*\.jsx?$": "babel-jest",
        ".+\\.(css|styl|less|sass|scss)$": "jest-transform-css",
        ".+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/packages/client/__tests__/config/assetTransformer.js"
      },
      transformIgnorePatterns: [
        "packages\/server\/.*"
      ],
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
