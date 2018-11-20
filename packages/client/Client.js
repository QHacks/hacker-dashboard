import { InMemoryCache } from "apollo-cache-inmemory";
import { withClientState } from "apollo-link-state";
import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import { ApolloLink } from "apollo-link";

import { resolvers, defaults, typeDefs } from "./cache";
import { BrowserRouter } from "react-router-dom";
import "semantic-ui-less/semantic.less";
import { Provider } from "react-redux";
import getStore from "./ClientStore";
import App from "./components/App";
import { render } from "react-dom";
import React from "react";

const rootElement = document.getElementById("root");

// TODO: Understand why we have to use ngrok here!
// Comment added to this thread: https://bit.ly/2IbZspP
const GRAPHQL_ENDPOINT =
  process.env.NODE_ENV === "development"
    ? ` https://saunders.ngrok.io/graphql`
    : `https://app.qhacks.io/graphql`;

const cache = new InMemoryCache();

const stateLink = withClientState({
  cache,
  resolvers,
  defaults,
  typeDefs
});

const apolloClient = new ApolloClient({
  cache,
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        graphQLErrors.map(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          )
        );
      }
      if (networkError) console.log(`[Network error]: ${networkError}`);
    }),
    stateLink,
    new HttpLink({
      uri: GRAPHQL_ENDPOINT,
      credentials: "same-origin"
    })
  ])
});

const Client = () => (
  <ApolloProvider client={apolloClient}>
    <Provider store={getStore}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </ApolloProvider>
);

render(<Client />, rootElement);
