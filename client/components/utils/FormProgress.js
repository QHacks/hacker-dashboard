import React from 'react';
import PropTypes from 'prop-types';
import './FormProgress.less';

const DEFAULT_CONTAINER_CLASSES = ['form-progress', 'container'];
const DEFAULT_STEP_CLASSES = ['form-progress', 'step'];

function noop() {}

function FormProgress(props) {
    const { currentStepIndex, onNextStep, onPreviousStep, steps } = props;
    return (
        <div className={[
            ...DEFAULT_CONTAINER_CLASSES,
            props.className
        ].join(' ')}>
            {steps.map((step, index) => {
                const stepClassName = [
                    ...DEFAULT_STEP_CLASSES,
                    index <= currentStepIndex
                        ? 'active'
                        : ''
                ].join(' ');

                let handleClick = noop;

                if (index < currentStepIndex) {
                    handleClick = onPreviousStep;
                } else if (index > currentStepIndex) {
                    handleClick = onNextStep;
                }

                return (
                    <div className="form-progress step-container"
                         key={`form-stepper-${index}`}>
                        <div className={stepClassName}
                             onClick={handleClick}
                             data-value={index}>
                            <span className="form-progress step number">
                                {index + 1}
                            </span>
                            <span className="form-progress step text">{step}</span>
                        </div>
                        {
                            index < steps.length - 1
                                ? <div className="form-progress step line"/>
                                : ''
                        }
                    </div>
                );
            })}
        </div>
    );
}

FormProgress.propTypes = {
    currentStepIndex: PropTypes.number,
    onNextStep: PropTypes.func,
    onPreviousStep: PropTypes.func,
    steps: PropTypes.arrayOf(PropTypes.string).isRequired
};

FormProgress.defaultProps = {
    currentStepIndex: 0,
    onNextStep: noop,
    onPrevStep: noop
};

export default FormProgress;