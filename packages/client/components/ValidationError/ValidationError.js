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
        > * {
          height: 16px;
        }
      `}
    >
      <div css={"padding-right: 12px;"}>
        <img src="../../assets/img/danger.svg" alt="Error" />
      </div>
      <div>
        <strong
          css={`
            line-height: 16px;
            vertical-align: middle;
          `}
        >
          {message}
        </strong>
      </div>
    </div>
  ) : (
    ""
  );

export default ValidationError;
