import React from "react";
import * as colors from "../../assets/colors";

const ValidationError = (props) => {
  return props.message ? (
    <div
      css={`
        color: ${colors.red};
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
