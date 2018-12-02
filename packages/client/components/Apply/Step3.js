import React from "react";
import ValidationError from "../ValidationError/ValidationError";
import ActionButton from "../ActionButton/ActionButton";

const Step3 = (props) => {
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
              <label htmlFor="whyQHacks">
                Why do you want to attend QHacks?
              </label>
              <textarea
                value={props.applicationAnswers.whyQHacks}
                onChange={(e) =>
                  props.setApplicationAnswer("whyQHacks", e.target.value)
                }
              />
              <ValidationError message={props.errors.whyQHacks} />
            </div>
          </section>
          <section css={props.inputRowStyle}>
            <div>
              <label htmlFor="numAttendedHackathons">
                How many hackathons have you attended?
              </label>
              <input
                type="number"
                placeholder="#"
                value={props.applicationAnswers.numAttendedHackathons}
                css={`
                  max-width: 125px;
                `}
                onChange={(e) =>
                  props.setApplicationAnswer(
                    "numAttendedHackathons",
                    e.target.value
                  )
                }
              />
              <ValidationError message={props.errors.numAttendedHackathons} />
            </div>
          </section>
          <section css={props.inputRowStyle}>
            <div>
              <label htmlFor="fromLocation">
                Where are you travelling from?
              </label>
              <input
                type="text"
                placeholder="Location"
                value={props.applicationAnswers.fromLocation}
                onChange={(e) =>
                  props.setApplicationAnswer("fromLocation", e.target.value)
                }
              />
              <ValidationError message={props.errors.fromLocation} />
            </div>
          </section>
          <section
            css={`
              label {
                ${props.inputRowStyle}
                color: black;
                text-transform: unset;
                font-weight: 500;
                width: unset;
                display: inline;
                padding-left: 8px;
              }
            `}
          >
            <div>
              <input
                id="agreeMlhCodeConduct"
                type="checkbox"
                value={props.applicationAnswers.agreeMlhCodeConduct}
                onChange={(e) =>
                  props.setApplicationAnswer(
                    "agreeMlhCodeConduct",
                    e.target.checked
                  )
                }
              />
              <label htmlFor="agreeMlhCodeConduct">
                I have read and agree to the MLH code of conduct
              </label>
            </div>
          </section>
          <section
            css={`
              label {
                ${props.inputRowStyle}
                color: black;
                text-transform: unset;
                font-weight: 500;
                width: unset;
                display: inline;
                padding-left: 8px;
              }
            `}
          >
            <div>
              <input
                id="agreeMlhTocAndPrivacyPolicy"
                type="checkbox"
                value={props.applicationAnswers.agreeMlhTocAndPrivacyPolicy}
                onChange={(e) =>
                  props.setApplicationAnswer(
                    "agreeMlhTocAndPrivacyPolicy",
                    e.target.checked
                  )
                }
              />
              <label htmlFor="agreeMlhTocAndPrivacyPolicy">
                I authorize you to share my application/registration information
                for event administration, ranking, MLH administration, pre- and
                post-event informational e-mails, and occasional messages about
                hackathons in-line with the MLH Privacy Policy. Further, I agree
                to the terms of both the MLH contest Terms and Conditions and
                the MLH Privacy Policy.
              </label>
            </div>
          </section>
          <section css={props.inputRowStyle}>
            <div>
              <ActionButton
                style={`margin-top: 50px;`}
                foregroundColor="black"
                onClick={() => props.props.previousStep()}
              >
                Back
              </ActionButton>{" "}
              <ActionButton
                disabled={props.hasErrors}
                style={`margin-top: 50px;`}
                color="red"
                onClick={() => props.nextStep()}
              >
                Submit
              </ActionButton>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Step3;
