import React from "react";
import * as constants from "../../assets/constants";

const ValidationError = (props) => {
  return props.message ? (
    <div
      css={`
        color: ${constants.red};
        margin: 12px 0;
        text-align: left;
        > * {
          height: 16px;
          line-height: 16px;
          vertical-align: middle;
        }
      `}
    >
      <img
        src="../../assets/img/danger.svg"
        css={`
          margin-right: 12px;
        `}
      />
      <strong>{props.message}</strong>
    </div>
  ) : (
    ""
  );
};

export default ValidationError;
