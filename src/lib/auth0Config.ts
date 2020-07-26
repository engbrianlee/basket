export default {
  domain: process.env.REACT_APP_AUTH_DOMAIN as string,
  clientId: process.env.REACT_APP_AUTH_CLIENT_ID as string,
  audience: process.env.REACT_APP_AUTH_AUDIENCE,
};
