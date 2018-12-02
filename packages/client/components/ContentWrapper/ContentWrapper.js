import React from "react";

export default (props) => (
  <div
    css={`
      max-width: 1400px;
      margin-left: auto;
      margin-right: auto;
      padding: ${props.wide ? "0 80px" : "0 145px"};
      height: 100%;
      @media screen and (max-width: 1200px) and (min-width: 860px) {
        padding-left: 80px;
        padding-right: 80px;
      }
      @media screen and (max-width: 860px) {
        padding-left: 5vw;
        padding-right: 5vw;
      }
    `}
  >
    {props.children}
  </div>
);
