const { gql } = require("apollo-server-express");
const fs = require("fs");

const GRAPHQL_FILE_REGEX = /.+\.graphql$/;

const directories = ["schema", "enums", "interfaces", "scalars", "types"];

let schemaString = "";

directories.forEach((directory) => {
  const filesInDirectory = fs.readdirSync(`${__dirname}/${directory}`);

  const directoryString = filesInDirectory
    .filter((f) => GRAPHQL_FILE_REGEX.test(f))
    .map((f) => fs.readFileSync(`${__dirname}/${directory}/${f}`, "utf8"))
    .reduce((prev, curr) => `${prev}\n${curr}`);

  schemaString = `${schemaString}\n${directoryString}`;
});

module.exports = gql(schemaString);
