import React, { useCallback, useEffect } from 'react'
import './OnboardingStepSpotlight.sass'

interface Props {
    bounds: DOMRect
    focusedElement?: HTMLDivElement | null
    beforeFocusAnimationEnd?: () => void
    onFocusAnimationEnd?: () => void
}

const OnboardingStepSpotlight: React.FC<Props> = ({ bounds, focusedElement, beforeFocusAnimationEnd, onFocusAnimationEnd }) => {
    /**
     * Updates the position of the spotlight element based on the provided bounds.
     * Scrolls the body container if the spotlight is outside the viewport.
     * Triggers a callback function after a specified timeout.
     */
    const handleSpotlightUpdatePosition = useCallback(() => {
        if (beforeFocusAnimationEnd) beforeFocusAnimationEnd()
        if (bounds.height === 0 || bounds.width === 0) return

        if (bounds.bottom > window.innerHeight && focusedElement) {
            focusedElement?.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' })
        }

        const timeoutId = setTimeout(() => {
            if (onFocusAnimationEnd) onFocusAnimationEnd()
        }, 500)
        return () => clearTimeout(timeoutId)
    }, [bounds, focusedElement, onFocusAnimationEnd, beforeFocusAnimationEnd])

    useEffect(() => {
        handleSpotlightUpdatePosition()
    }, [handleSpotlightUpdatePosition])

    useEffect(() => {
        document.body.style.overflow = 'hidden'
        return () => {
            document.body.style.overflow = ''
        }
    }, [])

    return (
        <div data-testid="spotlight-wrapper" className="rwo-onboarding-step-spotlight-wrapper">
            <div
                data-testid="spotlight"
                className="rwo-onboarding-step-spotlight is-visible"
                style={{ width: bounds.width, height: bounds.height, transform: `translate3d(${bounds.x}px, ${bounds.y}px, 0px)` }}
            />
        </div>
    )
}

export default OnboardingStepSpotlight
