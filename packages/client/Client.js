import "@babel/polyfill";

import { BrowserRouter } from "react-router-dom";
import { ApolloProvider } from "react-apollo";
import React, { Component } from "react";
import { render } from "react-dom";
import axios from "axios";

import getApolloClient from "./ApolloClient";
import App from "./components/App";

export const SERVER_HOST = "http://localhost:3000";

export const REFRESH_TOKEN_KEY = "qhacksRefreshToken";
export const ACCESS_TOKEN_KEY = "qhacksAccessToken";

export const CLIENT_SCHEMA_VERSION_KEY =
  "qhacks-dashboard-client-schema-version";
export const CLIENT_SCHEMA_VERSION = "1";

class Client extends Component {
  constructor() {
    super();

    this.state = {
      apolloClient: null,
      loaded: false
    };
  }

  async initializeApplication() {
    const { persistor, apolloClient } = await getApolloClient();

    const currentVersion = await localStorage.getItem(
      CLIENT_SCHEMA_VERSION_KEY
    );
    const refreshToken = await localStorage.getItem(REFRESH_TOKEN_KEY);

    // Have to check if the schema has breaking changes
    // Also have to validate any tokens in local storage by refreshing them
    if (currentVersion === CLIENT_SCHEMA_VERSION && refreshToken) {
      // now validate the tokens by refreshing them
      try {
        const response = await axios.post(`${SERVER_HOST}/oauth/refresh`, {
          grantType: "refresh_token",
          refreshToken
        });

        // save the new tokens
        localStorage.setItem(ACCESS_TOKEN_KEY, response.data.accessToken);
        localStorage.setItem(REFRESH_TOKEN_KEY, response.data.refreshToken);

        // restore the old cache
        await persistor.restore();
      } catch (err) {
        // remove existing tokens if cannot validate
        localStorage.removeItem(ACCESS_TOKEN_KEY);
        localStorage.removeItem(REFRESH_TOKEN_KEY);

        // purge any cache (i.e. treat as new user)
        await persistor.purge();
      }
    } else {
      // User doesn't have updated schema or any tokens stored so purge cache
      await persistor.purge();
      // Set the schema version on the users browser
      await localStorage.setItem(
        CLIENT_SCHEMA_VERSION_KEY,
        CLIENT_SCHEMA_VERSION
      );
    }

    // Set the client and show the app is fully loaded
    this.setState({
      apolloClient,
      loaded: true
    });
  }

  async componentDidMount() {
    await this.initializeApplication();
  }

  render() {
    const { apolloClient, loaded } = this.state;

    if (!loaded) {
      return <div>Loading...</div>;
    }

    return (
      <ApolloProvider client={apolloClient}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ApolloProvider>
    );
  }
}

render(<Client />, document.getElementById("root"));
