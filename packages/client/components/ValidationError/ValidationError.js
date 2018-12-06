import React from "react";

import { red } from "../../assets/colors";

const ValidationError = ({ message }) =>
  message ? (
    <div
      css={`
        color: ${red};
        margin: 12px 0;
        text-align: left;
        display: flex;
        * {
          height: 16px;
          line-height: 16px;
          vertical-align: middle;
        }
      `}
    >
      <div
        css={`
          padding-right: 12px;
        `}
      >
        <img src="../../assets/img/danger-solid.svg" alt="Error" />
      </div>
      <div>
        <strong>{message}</strong>
      </div>
    </div>
  ) : (
    ""
  );

export default ValidationError;
