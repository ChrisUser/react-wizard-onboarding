import React, { ReactNode, useEffect, useMemo, useRef, useState } from 'react'
import './StickyOnboardingWizard.sass'
import { ModalPositions, OnboardingStep } from '../types'

const modalArrowSize = 12

interface Props {
    bounds: DOMRect
    onboardingSteps: OnboardingStep[]
    modalTitle?: string
    darkMode?: boolean
    hideArrow?: boolean
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

const StickyOnboardingWizard: React.FC<Props> = ({
    bounds,
    onboardingSteps,
    modalTitle = 'Tutorial',
    darkMode,
    hideArrow,
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
    const [modalBounds, setModalBounds] = useState<DOMRect>(new DOMRect())
    const [currentStepIndex, setCurrentStepIndex] = useState(0)
    const modalRef = useRef<HTMLDivElement | null>(null)
    const memorizedOnboardingSteps = useMemo(() => onboardingSteps, [onboardingSteps])

    useEffect(() => {
        if (!modalRef || !modalRef.current) return
        setModalBounds(modalRef.current.getBoundingClientRect())
    }, [bounds.x, bounds.y, bounds.width, bounds.height, modalRef.current])

    /**
     * Calculates the position of the modal element based on the position of the target element and the size of the modal.
     * @returns The position of the modal element relative to the target element. Possible values are 'Top', 'Bottom', 'Left', 'Right', or 'Center'.
     */
    const getModalPosition = useMemo((): ModalPositions => {
        const { x, y, width, height } = bounds
        const { innerWidth, innerHeight } = window
        const { width: modalWidth, height: modalHeight } = modalBounds

        const remainingSpaceRight = innerWidth - (x + width)
        const remainingSpaceBelow = innerHeight - (y + height)

        if (width === 0 && height === 0) {
            return ModalPositions.Center
        }
        if (modalHeight + modalArrowSize <= y) {
            return ModalPositions.Top
        }
        if (modalWidth + modalArrowSize <= x) {
            return ModalPositions.Left
        }
        if (modalWidth + modalArrowSize <= remainingSpaceRight) {
            return ModalPositions.Right
        }
        if (modalHeight + modalArrowSize <= remainingSpaceBelow) {
            return ModalPositions.Bottom
        }
        return ModalPositions.Center
    }, [modalBounds, bounds])

    /**
     * Calculates the coordinates for positioning the modal element based on the current position of the target element and the size of the modal.
     * @returns The calculated coordinates for positioning the modal element.
     */
    const getModalCoordinates = useMemo((): string => {
        const { x, y, width, height } = bounds
        const { width: modalWidth, height: modalHeight } = modalBounds

        switch (getModalPosition) {
            case ModalPositions.Top:
                return `translate3d(${x + width * 0.5 - modalWidth * 0.5}px, ${y - modalHeight - modalArrowSize}px, 0px)`
            case ModalPositions.Left:
                return `translate3d(${x - modalWidth - modalArrowSize}px, ${y}px, 0px)`
            case ModalPositions.Right:
                return `translate3d(${x + width + modalArrowSize}px, ${y}px, 0px)`
            case ModalPositions.Bottom:
                return `translate3d(${x}px, ${y + height + modalArrowSize}px, 0px)`
            case ModalPositions.Center:
            default:
                return `translate3d(calc(50vw - ${modalWidth * 0.5}px), calc(50vh - ${modalHeight * 0.5}px), 0px)`
        }
    }, [modalBounds, bounds])

    if (!memorizedOnboardingSteps || memorizedOnboardingSteps.length === 0) return

    return (
        <div className="rwo-onboarding-wizard-wrapper rwo-sticky-onboarding-wizard">
            <div
                role="dialog"
                className={`rwo-sticky-onboarding-modal ${darkMode ? 'dark' : 'light'}-modal ${getModalPosition}--position-modal ${
                    hideArrow ? 'hide-arrow' : ''
                }`}
                ref={modalRef}
                style={{
                    transform: getModalCoordinates
                }}
            >
                <div className="rwo-sticky-onboarding-modal__header">
                    <div className="rwo-sticky-onboarding-modal__header__left-section">
                        <span className="rwo-modal-title">{modalTitle}</span>
                    </div>
                    <div className="rwo-sticky-onboarding-modal__header__right-section">
                        <span className="rwo-modal-step-counter">
                            {currentStepIndex + 1} / {memorizedOnboardingSteps.length}
                        </span>
                    </div>
                </div>
                <div className="rwo-sticky-onboarding-modal__body">
                    <div className="rwo-sticky-onboarding-modal__body__text-container">{memorizedOnboardingSteps[currentStepIndex].text}</div>
                </div>
                <div className="rwo-sticky-onboarding-modal__footer">
                    <div className="rwo-sticky-onboarding-modal__footer__left-section">
                        <button className="rwo-ghost-action-button" onClick={() => (onClose ? onClose(currentStepIndex) : null)}>
                            {closeButtonIcon || closeButtonLabel}
                        </button>
                    </div>
                    <div className="rwo-sticky-onboarding-modal__footer__right-section">
                        {currentStepIndex === memorizedOnboardingSteps.length - 1 ? (
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
            </div>
        </div>
    )
}

export default StickyOnboardingWizard
