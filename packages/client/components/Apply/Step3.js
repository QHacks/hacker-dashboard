import React from "react";
import ValidationError from "../ValidationError/ValidationError";
import ActionButton from "../ActionButton/ActionButton";
import Alert from "../Alert/Alert";
import { linkExternalTrusted, checkboxOptions } from "../../assets/constants";
import Checkbox from "react-simple-checkbox";

const Step3 = (props) => {
  const mlhSectionStyle = `
    margin: 16px 0 8px;
    label {
      ${props.inputRowStyle}
      color: black;
      text-transform: unset;
      font-weight: 500;
      width: unset;
      display: inline;
      padding-left: 8px;
      font-weight: 600;
      line-height: 1.6;
    }
  `;
  return (
    <div css={props.formStyle}>
      <h2>Hackathon Information</h2>
      <div css={props.subsectionStyle}>
        <div
          css={`
            width: 100%;
          `}
        >
          <section css={props.inputRowStyle}>
            <div>
              <label htmlFor="passionProject">
                Tell us about a time you brought a dream or passion project of
                yours to life. (&lt; 300 words)
              </label>
              <textarea
                value={props.applicationAnswers.passionProject}
                onChange={(e) =>
                  props.setApplicationAnswer("passionProject", e.target.value)
                }
              />
              <ValidationError message={props.errors.passionProject} />
            </div>
          </section>
          <section css={props.inputRowStyle}>
            <div>
              <label htmlFor="whyQhacks">
                What about QHacks has driven you to apply this year? (&lt; 300
                words)
              </label>
              <textarea
                value={props.applicationAnswers.whyQhacks}
                onChange={(e) =>
                  props.setApplicationAnswer("whyQhacks", e.target.value)
                }
              />
              <ValidationError message={props.errors.whyQhacks} />
            </div>
          </section>
          <section css={props.inputRowStyle}>
            <div>
              <label htmlFor="numberOfHackathons">
                How many hackathons have you attended?
              </label>
              <input
                type="text"
                placeholder="#"
                value={props.applicationAnswers.numberOfHackathons}
                css={`
                  max-width: 125px;
                `}
                onChange={(e) =>
                  props.setApplicationAnswer(
                    "numberOfHackathons",
                    e.target.value
                  )
                }
              />
              <ValidationError message={props.errors.numberOfHackathons} />
            </div>
          </section>
          <section css={props.inputRowStyle}>
            <div>
              <label htmlFor="travelOrigin">
                Where are you travelling from?
              </label>
              <input
                type="text"
                placeholder="Location"
                value={props.applicationAnswers.travelOrigin}
                onChange={(e) =>
                  props.setApplicationAnswer("travelOrigin", e.target.value)
                }
              />
              <ValidationError message={props.errors.travelOrigin} />
            </div>
          </section>
          <section css={mlhSectionStyle}>
            <div>
              <Checkbox
                id="agreeMlhCodeConduct"
                {...checkboxOptions}
                checked={props.applicationAnswers.agreeMlhCodeConduct}
                onChange={(bool) =>
                  props.setApplicationAnswer("agreeMlhCodeConduct", bool)
                }
              />
              <label htmlFor="agreeMlhCodeConduct">
                I have read and agree to the{" "}
                <a
                  {...linkExternalTrusted}
                  href="https://static.mlh.io/docs/mlh-code-of-conduct.pdf"
                >
                  MLH code of conduct
                </a>
              </label>
              <ValidationError message={props.errors.agreeMlhCodeConduct} />
            </div>
          </section>
          <section css={mlhSectionStyle}>
            <div>
              <Checkbox
                id="agreeMlhTosAndPrivacyPolicy"
                {...checkboxOptions}
                checked={props.applicationAnswers.agreeMlhTosAndPrivacyPolicy}
                onChange={(bool) =>
                  props.setApplicationAnswer(
                    "agreeMlhTosAndPrivacyPolicy",
                    bool
                  )
                }
              />
              <label htmlFor="agreeMlhTosAndPrivacyPolicy">
                I authorize you to share my application/registration information
                for event administration, ranking, MLH administration, pre- and
                post-event informational e-mails, and occasional messages about
                hackathons in-line with the{" "}
                <a {...linkExternalTrusted} href="https://mlh.io/privacy">
                  MLH Privacy Policy
                </a>
                . Further, I agree to the terms of both the{" "}
                <a
                  {...linkExternalTrusted}
                  href="https://github.com/MLH/mlh-policies/blob/master/prize-terms-and-conditions/contest-terms.md"
                >
                  MLH contest Terms and Conditions
                </a>{" "}
                and the{" "}
                <a {...linkExternalTrusted} href="https://mlh.io/privacy">
                  MLH Privacy Policy
                </a>
                .
              </label>
              <ValidationError
                message={props.errors.agreeMlhTosAndPrivacyPolicy}
              />
            </div>
          </section>
          <section css={props.inputRowStyle}>
            <div>
              <ActionButton
                style="margin-top: 50px;"
                foregroundColor="black"
                onClick={() => props.previousStep()}
              >
                Back
              </ActionButton>{" "}
              <ActionButton
                disabled={props.hasErrors}
                style="margin-top: 50px;"
                color="red"
                onClick={() => props.submit()}
              >
                Submit
              </ActionButton>
            </div>
          </section>
          <section>
            <div css={props.inputRowStyle}>
              {props.alertShown ? <Alert {...props.alert} /> : ""}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Step3;
