import { BrowserRouter } from "react-router-dom";
import "semantic-ui-less/semantic.less";
import { Provider } from "react-redux";
import getStore from "./ClientStore";
import App from "./components/App";
import ReactDOM from "react-dom";
import React from "react";

const rootElement = document.getElementById("root");

ReactDOM.render(
  <Provider store={getStore}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  rootElement
);
