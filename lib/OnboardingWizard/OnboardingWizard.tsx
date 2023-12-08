import React, { ReactNode, useCallback, useState } from 'react'
import './OnboardingWizard.sass'
import { OnboardingStep } from '../types'

interface Props {
    onboardingSteps: OnboardingStep[]
    modalTitle?: string
    displayDots?: boolean
    darkMode?: boolean
    nextButtonLabel?: string
    nextButtonIcon?: ReactNode
    closeButtonLabel?: string
    closeButtonIcon?: ReactNode
    completeButtonLabel?: string
    completeButtonIcon?: ReactNode
    onStepChange?: (newStepIndex: number) => void
    onClose?: (currentStepIndex: number) => void
    onComplete?: () => void
}

const OnboardingWizard: React.FC<Props> = ({
    onboardingSteps,
    modalTitle = 'Tutorial',
    displayDots,
    darkMode,
    nextButtonLabel = 'Next',
    nextButtonIcon,
    closeButtonLabel = 'Close',
    closeButtonIcon,
    completeButtonLabel = 'Done',
    completeButtonIcon,
    onStepChange,
    onClose,
    onComplete
}) => {
    const [currentStepIndex, setCurrentStepIndex] = useState(0)

    const handleClose = useCallback(() => {
        if (onClose) onClose(currentStepIndex)
    }, [currentStepIndex, onClose])

    if (!onboardingSteps || onboardingSteps.length === 0) return

    return (
        <div className="rwo-onboarding-wizard-wrapper">
            <div data-testid="wizard" className={`rwo-onboarding-modal ${darkMode ? 'dark' : 'light'}-modal`}>
                <div className="rwo-onboarding-modal__header">
                    <div className="rwo-onboarding-modal__header__left-section">
                        <button className="rwo-ghost-action-button" onClick={handleClose}>
                            {closeButtonIcon || closeButtonLabel}
                        </button>
                    </div>
                    <div className="rwo-onboarding-modal__header__middle-section">
                        <span className="rwo-modal-title">{modalTitle}</span>
                    </div>
                    <div className="rwo-onboarding-modal__header__right-section">
                        {currentStepIndex === onboardingSteps.length - 1 ? (
                            <button className="rwo-ghost-action-button" onClick={() => (onComplete ? onComplete() : null)}>
                                {completeButtonIcon || completeButtonLabel}
                            </button>
                        ) : (
                            <button
                                className="rwo-ghost-action-button"
                                onClick={() => {
                                    const nextStepIndex = currentStepIndex + 1
                                    setCurrentStepIndex(nextStepIndex)
                                    if (onStepChange) onStepChange(nextStepIndex)
                                }}
                            >
                                {nextButtonIcon || nextButtonLabel}
                            </button>
                        )}
                    </div>
                </div>
                <div className="rwo-onboarding-modal__body">
                    {onboardingSteps[currentStepIndex].image && (
                        <div className="rwo-onboarding-modal__body__image-container">
                            <img src={onboardingSteps[currentStepIndex].image} alt={onboardingSteps[currentStepIndex].text} />
                        </div>
                    )}
                    <div className="rwo-onboarding-modal__body__text-container">{onboardingSteps[currentStepIndex].text}</div>
                </div>
                {displayDots && (
                    <div className="rwo-onboarding-modal__footer">
                        <div className="rwo-onboarding-modal-step-dot-container">
                            {onboardingSteps.map((_, index) => (
                                <div
                                    key={index}
                                    className={`rwo-onboarding-modal-step-dot ${currentStepIndex === index ? 'is-active' : ''}`}
                                    onClick={() => {
                                        setCurrentStepIndex(index)
                                        if (onStepChange) onStepChange(index)
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default OnboardingWizard
