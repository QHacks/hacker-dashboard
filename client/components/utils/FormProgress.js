import React from 'react';
import PropTypes from 'prop-types';
import './FormProgress.less';

const DEFAULT_STEP_CLASSES = ['form-progress', 'step'];

function FormProgress(props) {
    const { currentStepIndex, onClick, steps } = props;
    return (
        <div className="form-progress container">
            {steps.map((step, index) => {
                const stepClassName = [
                    ...DEFAULT_STEP_CLASSES,
                    index <= currentStepIndex
                        ? 'active'
                        : ''
                ].join(' ');

                return (
                    <div className="form-progress step-container"
                         key={`form-stepper-${index}`}>
                        <div className={stepClassName}
                             onClick={onClick}
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
    onClick: PropTypes.func,
    steps: PropTypes.arrayOf(PropTypes.string).isRequired
};

FormProgress.defaultProps = {
    currentStepIndex: 0,
    onClick: () => {
    }
};

export default FormProgress;