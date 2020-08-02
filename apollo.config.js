require("dotenv").config();

module.exports = {
  client: {
    service: {
      name: "basket-hasura",
      url: process.env.GRAPHQL_SCHEMA_URI,
      headers: {
        "x-hasura-admin-secret": process.env.HASURA_GRAPHQL_ADMIN_SECRET,
      },
    },
  },
};
