import React, { Component } from "react";
import { compose, graphql } from "react-apollo";
import gql from "graphql-tag";

import MenuBar from "../MenuBar/index";
import ApplicationForm from "./ApplicationForm";
import ApplicationHeader from "./ApplicationHeader";
import ApplicationNavigation from "./ApplicationSteps/index";

const GET_AUTHENTICATION_STATUS = gql`
  query {
    user {
      firstName
      lastName
      oauthInfo {
        role
      }
      ... on Hacker {
        hasApplied(eventSlug: "qhacks-2019")
      }
    }
    authInfo @client {
      isAuthenticated
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
    // console.log(this.props);
    // const { isAuthenticated } = this.props.data.authInfo;
    // // also need to check if they have already applied
    // if (isAuthenticated) {
    //   this.setState({
    //     stepNum: 1
    //   });
    // }
  }

  previousStep() {
    this.setState((prevState) => ({ stepNum: prevState.stepNum - 1 }));
  }

  nextStep() {
    this.setState((prevState) => ({ stepNum: prevState.stepNum + 1 }));
  }

  render() {
    console.log("PROPS", this.props);

    if (this.props.data.loading) {
      return <div>Loading...</div>;
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

export default graphql(GET_AUTHENTICATION_STATUS, {
  options: {
    errorPolicy: "all"
  }
})(Apply);
