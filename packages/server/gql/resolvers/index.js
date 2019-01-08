const { merge } = require("lodash");
const fs = require("fs");

const directories = ["interfaces", "scalars", "types"];

let resolvers = {};

directories.forEach((directory) => {
  const filesInDirectory = fs.readdirSync(`${__dirname}/${directory}`);

  filesInDirectory.forEach((fileName) => {
    const module = require(`${__dirname}/${directory}/${fileName}`);

    resolvers = merge(resolvers, module);
  });
});

module.exports = resolvers;
