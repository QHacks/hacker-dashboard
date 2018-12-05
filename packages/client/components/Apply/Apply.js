import { graphql, compose } from "react-apollo";
import { Redirect } from "react-router-dom";
import React, { Component } from "react";
import gql from "graphql-tag";

import MenuBar from "../MenuBar/index";
import ApplicationForm from "./ApplicationForm";
import ApplicationHeader from "./ApplicationHeader";
import ApplicationNavigation from "./ApplicationSteps/index";

const GET_AUTHENTICATION_STATUS = gql`
  query {
    authInfo @client {
      isAuthenticated
    }
  }
`;

const GET_HACKER_INFORMATION = gql`
  query {
    user {
      ... on Hacker {
        hasApplied(eventSlug: "qhacks-2019")
      }
    }
  }
`;

class Apply extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stepNum: 0
    };
  }

  componentDidMount() {
    const { authInfo, hackerInfo } = this.props;

    if (authInfo && hackerInfo) {
      const { isAuthenticated } = authInfo;

      if (isAuthenticated) {
        this.setState({
          stepNum: 1
        });
      }
    }
  }

  previousStep() {
    this.setState((prevState) => ({ stepNum: prevState.stepNum - 1 }));
  }

  nextStep() {
    this.setState((prevState) => ({ stepNum: prevState.stepNum + 1 }));
  }

  render() {
    const {
      authInfo: { isAuthenticated },
      hackerInfo: { hasApplied },
      loadingHacker,
      loadingAuth
    } = this.props;

    if (loadingHacker || loadingAuth) {
      return <div>Loading...</div>;
    }

    if (isAuthenticated && hasApplied) {
      return (
        <Redirect
          to={{
            pathname: "/profile",
            state: {
              from: this.props.location,
              alert: {
                type: "info",
                message: "You've already applied to QHacks 2019!",
                status: "Yay!"
              }
            }
          }}
        />
      );
    }

    return (
      <div
        css={`
          h1,
          h2,
          h3 {
            color: black;
          }
        `}
      >
        <MenuBar showLogin hideItems={this.state.stepNum > 0} />
        <ApplicationHeader />
        <ApplicationNavigation stepNum={this.state.stepNum} />
        <ApplicationForm
          previousStep={() => this.previousStep()}
          nextStep={() => this.nextStep()}
          stepNum={this.state.stepNum}
        />
      </div>
    );
  }
}

const clientQuery = graphql(GET_AUTHENTICATION_STATUS, {
  props: ({ data }) => ({
    authInfo: data.authInfo,
    loadingAuth: data.loading
  })
});

const hackerQuery = graphql(GET_HACKER_INFORMATION, {
  options: {
    fetchPolicy: "cache-and-network"
  },
  props: ({ data }) => ({
    hackerInfo: data.user,
    loadingHacker: data.loading
  })
});

export default compose(
  clientQuery,
  hackerQuery
)(Apply);
