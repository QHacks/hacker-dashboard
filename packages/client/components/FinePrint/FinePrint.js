import React, { Component, Fragment } from "react";
import TosModal from "./TosModal";
import PrivacyPolicyModal from "./PrivacyPolicyModal";

class FinePrint extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false
    };
  }

  render() {
    return (
      <Fragment>
        <p
          css={`
            color: #6c6c6c;
            max-width: 300px;
            line-height: 1.43;
            margin: 24px auto;
            strong {
              color: black;
              cursor: pointer;
            }
          `}
        >
          By signing up, you agree to QHacks’s{" "}
          <strong
            onClick={() =>
              this.setState({ showTos: true, showPrivacyPolicy: false })
            }
          >
            Terms and Conditions
          </strong>{" "}
          &{" "}
          <strong
            onClick={() =>
              this.setState({ showTos: false, showPrivacyPolicy: true })
            }
          >
            Privacy Policy
          </strong>
        </p>
        <TosModal
          modalIsOpen={this.state.showTos}
          closeModal={() => this.setState({ showTos: false })}
        />
        <PrivacyPolicyModal
          modalIsOpen={this.state.showPrivacyPolicy}
          closeModal={() => this.setState({ showPrivacyPolicy: false })}
        />
      </Fragment>
    );
  }
}

export default FinePrint;
