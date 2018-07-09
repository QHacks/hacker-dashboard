module.exports = {
  setupFiles: ["./__tests__/config/Setup"],
  snapshotSerializers: ["enzyme-to-json/serializer"],
  testRegex: "__tests__/.*\.test\.js$"
};
