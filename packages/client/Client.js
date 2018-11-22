import { BrowserRouter } from "react-router-dom";
import { ApolloProvider } from "react-apollo";
import apolloClient from "./ApolloClient";
import App from "./components/App";
import { render } from "react-dom";
import React from "react";

const rootElement = document.getElementById("root");

const Client = () => (
  <ApolloProvider client={apolloClient}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProvider>
);

render(<Client />, rootElement);
