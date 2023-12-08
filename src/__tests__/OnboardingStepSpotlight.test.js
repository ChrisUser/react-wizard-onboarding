import { render, screen } from '@testing-library/react'
import OnboardingStepSpotlight from '../../lib/OnboardingStepSpotlight/OnboardingStepSpotlight'

describe('OnboardingStepSpotlight', () => {
    const basicBounds = { x: 0, y: 0, width: 100, height: 100 }
    const largerBounds = { x: 0, y: 0, width: 200, height: 150 }
    const zeroWidthBounds = { x: 0, y: 0, width: 0, height: 150 }

    // Renders a div with class 'rwo-onboarding-step-spotlight-wrapper' and a child div with class 'rwo-onboarding-step-spotlight'
    it('should render the spotlight wrapper and spotlight div', () => {
        render(<OnboardingStepSpotlight bounds={basicBounds} />)
        const wrapper = screen.getByTestId('spotlight-wrapper')
        const spotlight = screen.getByTestId('spotlight')
        expect(wrapper).toBeInTheDocument()
        expect(spotlight).toBeInTheDocument()
        expect(wrapper).toContainElement(spotlight)
        expect(wrapper).toHaveClass('rwo-onboarding-step-spotlight-wrapper')
        expect(spotlight).toHaveClass('rwo-onboarding-step-spotlight')
    })

    // Sets the width and height of the child div to the values of 'props.bounds.width' and 'props.bounds.height' respectively
    it('should set the width and height of the spotlight div', () => {
        render(<OnboardingStepSpotlight bounds={largerBounds} />)
        const spotlight = screen.getByTestId('spotlight')
        expect(spotlight).toHaveStyle(`width: ${largerBounds.width}px`)
        expect(spotlight).toHaveStyle(`height: ${largerBounds.height}px`)
    })

    // Sets the transform property of the child div to 'translate3d(${props.bounds.x}px, ${props.bounds.y}px, 0px)'
    it('should set the transform property of the spotlight div', () => {
        render(<OnboardingStepSpotlight bounds={largerBounds} />)
        const spotlight = screen.getByTestId('spotlight')
        expect(spotlight).toHaveStyle(`transform: translate3d(${largerBounds.x}px, ${largerBounds.y}px, 0px)`)
    })

    // Does not call 'beforeFocusAnimationEnd' or 'onFocusAnimationEnd' if they are undefined
    it('should not call beforeFocusAnimationEnd or onFocusAnimationEnd if they are undefined', () => {
        const beforeFocusAnimationEnd = jest.fn()
        const onFocusAnimationEnd = jest.fn()
        render(<OnboardingStepSpotlight bounds={basicBounds} />)
        expect(beforeFocusAnimationEnd).not.toHaveBeenCalled()
        expect(onFocusAnimationEnd).not.toHaveBeenCalled()
    })

    it('should not scroll the body container if the spotlight is within the viewport', () => {
        jest.spyOn(window, 'scrollTo').mockImplementationOnce(() => {})
        render(<OnboardingStepSpotlight bounds={basicBounds} />)
        expect(window.scrollTo).not.toHaveBeenCalled()
    })

    // Does not update the position of the spotlight element if either 'props.bounds.height' or 'props.bounds.width' is 0
    it('should not update the position of the spotlight element if either bounds height or width is 0', () => {
        jest.spyOn(window, 'scrollTo').mockImplementationOnce(() => {})
        render(<OnboardingStepSpotlight bounds={zeroWidthBounds} />)
        expect(window.scrollTo).not.toHaveBeenCalled()
    })

    // Calls 'beforeFocusAnimationEnd' if it exists
    it('should call beforeFocusAnimationEnd if it exists', () => {
        const beforeFocusAnimationEnd = jest.fn()
        render(<OnboardingStepSpotlight bounds={basicBounds} beforeFocusAnimationEnd={beforeFocusAnimationEnd} />)
        expect(beforeFocusAnimationEnd).toHaveBeenCalled()
    })

    // Calls 'onFocusAnimationEnd' after a timeout of 500ms if it exists
    it('should call onFocusAnimationEnd after a timeout of 500ms if it exists', () => {
        jest.useFakeTimers()
        const onFocusAnimationEnd = jest.fn()
        render(<OnboardingStepSpotlight bounds={basicBounds} onFocusAnimationEnd={onFocusAnimationEnd} />)
        jest.advanceTimersByTime(500)
        expect(onFocusAnimationEnd).toHaveBeenCalled()
        jest.useRealTimers()
    })
})
