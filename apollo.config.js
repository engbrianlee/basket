require("dotenv").config();

module.exports = {
  client: {
    service: {
      name: "basket-hasura",
      localSchemaFile: "./graphql.schema.json",
    },
    excludes: ["**/src/generated/**"],
  },
};
