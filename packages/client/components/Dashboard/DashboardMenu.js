import { graphql } from "react-apollo";
import gql from "graphql-tag";
import React from "react";

import wordmark from "../../assets/img/qhacks-wordmark-colored.svg";
import ContentWrapper from "../ContentWrapper/ContentWrapper";
import crown from "../../assets/img/qhacks-tricolor-logo.svg";
import ActionButton from "../ActionButton/ActionButton";

const LOGOUT_MUTATION = gql`
  mutation LogoutUser {
    logout @client
  }
`;

const DashboardMenu = (props) => (
  <header
    css="
      width: 100%;
      height: 84px;
      line-height: 44px;
      padding: 20px 0;
      position: absolute;
      top: 0;
      left: 0;
      border-bottom: 1px solid #a4b3bf;
    "
  >
    <ContentWrapper>
      <div
        css="
          display: inline-block;
        "
      >
        <img
          src={crown}
          css="
            max-height: 32px;
            margin-right: 6px;
            margin-top: 5px;
          "
          alt="QHacks crown"
        />
        <img
          src={wordmark}
          css="
            max-height: 24px;
          "
          alt="QHacks wordmark"
        />
      </div>
      <div
        css="
          display: inline-block;
          float: right;
          line-height: 44px;
        "
      >
        <ActionButton
          style="font-size: 16px;"
          type="rounded"
          internal
          inline
          link="/logout"
          onClick={() => props.logout()}
        >
          Log out
        </ActionButton>
      </div>
    </ContentWrapper>
  </header>
);

export default graphql(LOGOUT_MUTATION, { name: "logout" })(DashboardMenu);
