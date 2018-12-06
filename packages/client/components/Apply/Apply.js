import { graphql, compose } from "react-apollo";
import { Redirect } from "react-router-dom";
import React, { Component } from "react";
import gql from "graphql-tag";

import ApplicationNavigation from "./ApplicationSteps/index";
import loader from "../../assets/img/qhacks-loader.gif";
import ApplicationHeader from "./ApplicationHeader";
import ApplicationForm from "./ApplicationForm";
import MenuBar from "../MenuBar/MenuBar";

const AUTHENTICATION_STATUS_QUERY = gql`
  query {
    authInfo @client {
      isAuthenticated
    }
  }
`;

const HACKER_INFORMATION_QUERY = gql`
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
      stepNum: 0,
      alreadyApplied: false
    };
  }

  componentDidMount() {
    const { authInfo } = this.props;

    if (authInfo) {
      const { isAuthenticated } = authInfo;

      if (isAuthenticated) {
        this.setState({
          stepNum: 1
        });
      }
    }
  }

  nextStep() {
    if (this.state.stepNum === 1 && this.props.refetchHacker) {
      this.props.refetchHacker();
    }

    this.setState((prevState) => ({ stepNum: prevState.stepNum + 1 }));
  }

  previousStep() {
    this.setState((prevState) => ({ stepNum: prevState.stepNum - 1 }));
  }

  render() {
    const { loadingHacker, loadingAuth } = this.props;

    if (loadingHacker || loadingAuth) {
      return (
        <div
          css="
          min-height:100vh;
          text-align: center;
        "
        >
          <div>
            <img
              src={loader}
              css="
              position: absolute;
              top: 50%;
              left: 50%;
              width: 70px;
              height: 70px;
              margin-top: -35px;
              margin-left: -35px;
            "
            />
          </div>
        </div>
      );
    }

    if (this.props.authInfo && this.props.hackerInfo) {
      const { isAuthenticated } = this.props.authInfo;
      const { hasApplied } = this.props.hackerInfo;

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

const clientQuery = graphql(AUTHENTICATION_STATUS_QUERY, {
  props: ({ data }) => ({
    authInfo: data.authInfo,
    loadingAuth: data.loading
  })
});

const hackerQuery = graphql(HACKER_INFORMATION_QUERY, {
  options: {
    fetchPolicy: "network-only"
  },
  props: ({ data }) => ({
    hackerInfo: data.user,
    loadingHacker: data.loading,
    refetchHacker: data.refetch
  })
});

export default compose(
  clientQuery,
  hackerQuery
)(Apply);
