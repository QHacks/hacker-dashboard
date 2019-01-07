import React, { Component } from "react";

import PrivacyPolicyModal from "./PrivacyPolicyModal";
import TOSModal from "./TOSModal";

class FinePrint extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: false
    };
  }

  render() {
    return (
      <>
        <p
          css={`
            color: #6c6c6c;
            max-width: 300px;
            line-height: 1.43;
            margin: 24px auto;
            button {
              background: none;
              border: none;
              font-weight: 600;
              color: black;
              cursor: pointer;
            }
          `}
        >
          By signing up, you agree to QHacks’s{" "}
          <button
            onClick={() =>
              this.setState({ showTos: true, showPrivacyPolicy: false })
            }
            type="button"
          >
            Terms and Conditions
          </button>{" "}
          &{" "}
          <button
            onClick={() =>
              this.setState({ showTos: false, showPrivacyPolicy: true })
            }
            type="button"
          >
            Privacy Policy
          </button>
        </p>
        <TOSModal
          modalIsOpen={this.state.showTos}
          closeModal={() => this.setState({ showTos: false })}
        />
        <PrivacyPolicyModal
          modalIsOpen={this.state.showPrivacyPolicy}
          closeModal={() => this.setState({ showPrivacyPolicy: false })}
        />
      </>
    );
  }
}

export default FinePrint;
