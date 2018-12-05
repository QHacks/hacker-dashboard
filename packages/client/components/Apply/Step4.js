import React from "react";
import ActionButton from "../ActionButton/ActionButton";
import { decorativeElement } from "../../assets/constants";
import threeGears from "../../assets/img/3-gears.png";

const Step4 = (props) => {
  const pStyle = `
    max-width: 580px;
    margin: 0 auto;
    line-height: 1.36;
  `;
  return (
    <div
      css={`
        ${props.formStyle} text-align: center;
      `}
    >
      <img
        src={threeGears}
        alt=""
        {...decorativeElement}
        css="
          height: 133px;
          width: 240px;
        "
      />
      <h2
        css="
          margin: 32px 0;
        "
      >
        Thank you for applying to QHacks 2019!
      </h2>
      <p css={pStyle}>
        The QHacks team is working hard to review your application carefully. We
        will be contacting you via email regarding the status of your
        application. So stay tuned!
      </p>
      <div
        css="
          margin: 40px 0;
        "
      >
        <ActionButton internal link="/profile" color="red">
          View Dashboard
        </ActionButton>
      </div>
      <p
        css={`
          ${pStyle} margin-bottom: 100px;
        `}
      >
        For more information regarding QHacks 2019, please visit our website at{" "}
        <a
          css="
            font-weight: 600;
          "
          href="https://qhacks.io/"
        >
          qhacks.io
        </a>
      </p>
    </div>
  );
};

export default Step4;
