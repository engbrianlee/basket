import {
  createHttpLink,
  ApolloClient,
  InMemoryCache,
  split,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";

let apolloClient = null;

const createApolloClient = (getAccessToken) => {
  if (!apolloClient) {
    console.count("Creating Apollo Client");
    const httpLink = createHttpLink({
      uri: `https://${process.env.REACT_APP_GRAPHQL_HOST}`,
    });
    const authLink = setContext(async (_, { headers }) => {
      const accessToken = await getAccessToken();
      console.count(`Apollo httpLink: Getting accessToken: ${accessToken}`);
      // return the headers to the context so httpLink can read them
      return {
        headers: {
          ...headers,
          authorization: accessToken ? `Bearer ${accessToken}` : "",
        },
      };
    });

    const wsLink = new WebSocketLink({
      uri: `wss://${process.env.REACT_APP_GRAPHQL_HOST}`,
      options: {
        lazy: true,
        reconnect: true,
        connectionParams: async () => {
          const accessToken = await getAccessToken();
          console.count(`Apollo wsLink: Getting accessToken: ${accessToken}`);
          return {
            headers: {
              Authorization: accessToken ? `Bearer ${accessToken}` : "",
            },
          };
        },
      },
    });

    const splitLink = split(
      ({ query }) => {
        const definition = getMainDefinition(query);
        return (
          definition.kind === "OperationDefinition" &&
          definition.operation === "subscription"
        );
      },
      wsLink,
      authLink.concat(httpLink)
    );
    apolloClient = new ApolloClient({
      link: splitLink,
      cache: new InMemoryCache(),
    });
  }

  return apolloClient;
};

export default createApolloClient;
