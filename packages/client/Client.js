import "@babel/polyfill";

import { BrowserRouter } from "react-router-dom";
import { ApolloProvider } from "react-apollo";
import { render } from "react-dom";
import React, { Component } from "react";
import getApolloClient from "./ApolloClient";
import App from "./components/App";

const rootElement = document.getElementById("root");

export const SERVER_HOST = "http://localhost:3000";

class Client extends Component {
  constructor() {
    super();

    this.state = {
      apolloClient: null,
      loaded: false
    };
  }

  async componentDidMount() {
    const apolloClient = await getApolloClient();

    this.setState({
      apolloClient,
      loaded: true
    });
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

render(<Client />, rootElement);
