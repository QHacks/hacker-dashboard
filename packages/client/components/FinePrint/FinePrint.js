import React from "react";
import { relExternalTrusted } from "../../assets/constants";

const FinePrint = () => {
  return (
    <p
      css={`
        color: #6c6c6c;
        max-width: 300px;
        line-height: 1.43;
        margin: 24px auto;
        a {
          color: black;
          font-weight: bold;
        }
      `}
    >
      By signing up, you agree to QHacks’s{" "}
      <a rel={relExternalTrusted} href="">
        Terms and Conditions
      </a>{" "}
      &{" "}
      <a rel={relExternalTrusted} href="">
        Privacy Policy
      </a>
    </p>
  );
};

export default FinePrint;
