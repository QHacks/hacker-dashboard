import React from "react";
import { Link } from "react-router-dom";
import FinePrint from "../FinePrint/FinePrint";
import ApplicationAuthSlider from "./ApplicationAuthSlider";
import ValidationError from "../ValidationError/ValidationError";
import ActionButton from "../ActionButton/ActionButton";
import { grey } from "../../assets/colors";

const Step1 = (props) => (
  <div
    css={`
      ${props.formStyle}
      text-align: center;
    `}
  >
    <h3>
      {props.returningHacker ? "Welcome back!" : "Join the QHacks family!"}
    </h3>
    <ApplicationAuthSlider
      items={["new hacker", "returning hacker"]}
      changeSelected={(i) => props.changeSelected(i)}
      selectedItem={props.returningHacker ? 1 : 0}
    />
    {props.returningHacker ? (
      <div>
        <h2 css={props.authHeadingStyle}>Login to Account</h2>
        <div css={props.subsectionStyle}>
          <div
            css="
                width: 100%;
              "
          >
            <section css={props.inputRowStyle}>
              <div>
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  placeholder="Email address"
                  value={props.authAnswers.email}
                  onChange={(e) => props.setAuthAnswer("email", e.target.value)}
                />
                <ValidationError message={props.errors.email} />
              </div>
            </section>
            <section css={props.inputRowStyle}>
              <div>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  placeholder="Password"
                  value={props.authAnswers.password}
                  onChange={(e) =>
                    props.setAuthAnswer("password", e.target.value)
                  }
                />
                <ValidationError message={props.errors.password} />
              </div>
            </section>
            <section css={props.inputRowStyle}>
              <div>
                <Link
                  css={`
                    font-weight: 600;
                    color: ${grey};
                    text-decoration: underline;
                    float: right;
                  `}
                  to="/forgot-password"
                >
                  Forgot password
                </Link>
                <br />
                <ActionButton
                  disabled={props.hasErrors}
                  style="margin-top: 50px;"
                  color="red"
                  onClick={() => props.nextStep()}
                >
                  Login
                </ActionButton>
              </div>
            </section>
          </div>
        </div>
      </div>
    ) : (
      <div>
        <h2 css={props.authHeadingStyle}>Create an Account</h2>
        <div css={props.subsectionStyle}>
          <div
            css="
                width: 100%;
              "
          >
            <section css={props.inputRowStyle}>
              <div>
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  placeholder="First name"
                  key="firstName"
                  value={props.authAnswers.firstName}
                  onChange={(e) =>
                    props.setAuthAnswer("firstName", e.target.value)
                  }
                />
                <ValidationError message={props.errors.firstName} />
              </div>
              <div>
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  key="lastName"
                  placeholder="Last name"
                  value={props.authAnswers.lastName}
                  onChange={(e) =>
                    props.setAuthAnswer("lastName", e.target.value)
                  }
                />
                <ValidationError message={props.errors.lastName} />
              </div>
            </section>
            <section css={props.inputRowStyle}>
              <div>
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  key="email"
                  type="text"
                  placeholder="Email address"
                  value={props.authAnswers.email}
                  onChange={(e) => props.setAuthAnswer("email", e.target.value)}
                />
                <ValidationError message={props.errors.email} />
              </div>
            </section>
            <section css={props.inputRowStyle}>
              <div>
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  key="password"
                  type="password"
                  placeholder="Password"
                  value={props.authAnswers.password}
                  onChange={(e) => {
                    props.resetConfirmPassword();
                    props.setAuthAnswer("password", e.target.value);
                  }}
                />
                <ValidationError message={props.errors.password} />
              </div>
            </section>
            <section css={props.inputRowStyle}>
              <div>
                <label htmlFor="confirmPassword">Confirm password</label>
                <input
                  id="confirmPassword"
                  key="confirmPassword"
                  placeholder="Confirm password"
                  type="password"
                  value={props.authAnswers.confirmPassword}
                  onChange={(e) =>
                    props.setAuthAnswer("confirmPassword", e.target.value)
                  }
                />
                <ValidationError message={props.errors.confirmPassword} />
              </div>
            </section>
            <section css={props.inputRowStyle}>
              <div>
                <ActionButton
                  disabled={props.hasErrors}
                  style="margin-top: 50px;"
                  color="red"
                  onClick={() => props.nextStep()}
                >
                  Create Account
                </ActionButton>
              </div>
            </section>
            <FinePrint />
          </div>
        </div>
      </div>
    )}
  </div>
);

export default Step1;
