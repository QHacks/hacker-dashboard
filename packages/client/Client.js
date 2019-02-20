import "@babel/polyfill";

import { BrowserRouter } from "react-router-dom";
import { ApolloProvider } from "react-apollo";
import React, { Component } from "react";
import { render } from "react-dom";
import axios from "axios";

import loader from "./assets/img/qhacks-loader.gif";
import getApolloClient from "./ApolloClient";
import App from "./components/App/App";

const isProd = process.env.NODE_ENV === "production";

export const SERVER_HOST = isProd
  ? `https://${window.location.host}`
  : "http://localhost:3000";

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

    if (currentVersion === CLIENT_SCHEMA_VERSION && refreshToken) {
      try {
        const response = await axios.post(`${SERVER_HOST}/oauth/refresh`, {
          grantType: "refresh_token",
          refreshToken
        });

        localStorage.setItem(ACCESS_TOKEN_KEY, response.data.accessToken);
        localStorage.setItem(REFRESH_TOKEN_KEY, response.data.refreshToken);

        await persistor.restore();
      } catch (err) {
        localStorage.removeItem(ACCESS_TOKEN_KEY);
        localStorage.removeItem(REFRESH_TOKEN_KEY);

        await persistor.purge();
      }
    } else {
      await persistor.purge();
      await localStorage.setItem(
        CLIENT_SCHEMA_VERSION_KEY,
        CLIENT_SCHEMA_VERSION
      );
    }

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
      return (
        <div
          css={`
            min-height: 100vh;
            text-align: center;
          `}
        >
          <div>
            <img
              src={loader}
              css={`
                position: absolute;
                top: 50%;
                left: 50%;
                width: 70px;
                height: 70px;
                margin-top: -35px;
                margin-left: -35px;
              `}
            />
          </div>
        </div>
      );
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

// For testing purposes only
const rootDiv = document.createElement("div");
rootDiv.setAttribute("id", "root");

render(<Client />, document.getElementById("root") || rootDiv);
