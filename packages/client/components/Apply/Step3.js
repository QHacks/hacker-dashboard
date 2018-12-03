import React from "react";
import ValidationError from "../ValidationError/ValidationError";
import ActionButton from "../ActionButton/ActionButton";

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
              <label htmlFor="whyApply">
                What about QHacks has driven you to apply this year? (&lt; 300
                words)
              </label>
              <textarea
                value={props.applicationAnswers.whyApply}
                onChange={(e) =>
                  props.setApplicationAnswer("whyApply", e.target.value)
                }
              />
              <ValidationError message={props.errors.whyApply} />
            </div>
          </section>
          <section css={props.inputRowStyle}>
            <div>
              <label htmlFor="dreamProject">
                You're given $10,000 to spend on building a project or running
                an event at QHacks this year. What do you spend it on? (&lt; 100
                words)
              </label>
              <textarea
                value={props.applicationAnswers.dreamProject}
                onChange={(e) =>
                  props.setApplicationAnswer("dreamProject", e.target.value)
                }
              />
              <ValidationError message={props.errors.dreamProject} />
            </div>
          </section>
          <section css={props.inputRowStyle}>
            <div>
              <label htmlFor="numAttendedHackathons">
                How many hackathons have you attended?
              </label>
              <input
                type="text"
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
          <section css={mlhSectionStyle}>
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
              <ValidationError message={props.errors.agreeMlhCodeConduct} />
            </div>
          </section>
          <section css={mlhSectionStyle}>
            <div>
              <input
                id="agreeMlhTosAndPrivacyPolicy"
                type="checkbox"
                value={props.applicationAnswers.agreeMlhTosAndPrivacyPolicy}
                onChange={(e) =>
                  props.setApplicationAnswer(
                    "agreeMlhTosAndPrivacyPolicy",
                    e.target.checked
                  )
                }
              />
              <label htmlFor="agreeMlhTosAndPrivacyPolicy">
                I authorize you to share my application/registration information
                for event administration, ranking, MLH administration, pre- and
                post-event informational e-mails, and occasional messages about
                hackathons in-line with the MLH Privacy Policy. Further, I agree
                to the terms of both the MLH contest Terms and Conditions and
                the MLH Privacy Policy.
              </label>
              <ValidationError
                message={props.errors.agreeMlhTosAndPrivacyPolicy}
              />
            </div>
          </section>
          <section css={props.inputRowStyle}>
            <div>
              <ActionButton
                style={`margin-top: 50px;`}
                foregroundColor="black"
                onClick={() => props.previousStep()}
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
