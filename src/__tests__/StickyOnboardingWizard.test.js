import { fireEvent, render, screen } from '@testing-library/react'
import StickyOnboardingWizard from '../components/StickyOnboardingWizard/StickyOnboardingWizard'
import { OnboardingStep } from '../types/types'

describe('StickyOnboardingWizard', () => {
    // Modal element is positioned correctly relative to target element
    it('should position modal element correctly relative to target element', () => {
        const bounds = {
            width: 100,
            height: 100,
            top: 50,
            left: 50,
            right: 150,
            x: 50,
            y: 50,
            bottom: 150,
            toJSON: () => {}
        }
        const onboardingSteps = [{ text: 'Step 1' }]
        const modalTitle = 'Tutorial'
        const darkMode = false
        const nextButtonLabel = 'Next'
        const closeButtonLabel = 'Close'
        const completeButtonLabel = 'Done'
        const onStepChange = jest.fn()
        const onClose = jest.fn()
        const onComplete = jest.fn()

        render(
            <StickyOnboardingWizard
                bounds={bounds}
                onboardingSteps={onboardingSteps}
                modalTitle={modalTitle}
                darkMode={darkMode}
                nextButtonLabel={nextButtonLabel}
                closeButtonLabel={closeButtonLabel}
                completeButtonLabel={completeButtonLabel}
                onStepChange={onStepChange}
                onClose={onClose}
                onComplete={onComplete}
            />
        )

        const modalElement = screen.getByRole('dialog')

        expect(modalElement).toHaveStyle({ transform: 'translate3d(50px, 38px, 0px)' })
    })

    // Modal element displays correct title and step number
    it('should display correct title and step number in modal element', () => {
        const bounds = {
            width: 100,
            height: 100,
            top: 50,
            left: 50,
            right: 150,
            x: 50,
            y: 50,
            bottom: 150,
            toJSON: () => {}
        }
        const onboardingSteps = [{ text: 'Step 1' }]
        const modalTitle = 'Tutorial'
        const darkMode = false
        const nextButtonLabel = 'Next'
        const closeButtonLabel = 'Close'
        const completeButtonLabel = 'Done'
        const onStepChange = jest.fn()
        const onClose = jest.fn()
        const onComplete = jest.fn()

        render(
            <StickyOnboardingWizard
                bounds={bounds}
                onboardingSteps={onboardingSteps}
                modalTitle={modalTitle}
                darkMode={darkMode}
                nextButtonLabel={nextButtonLabel}
                closeButtonLabel={closeButtonLabel}
                completeButtonLabel={completeButtonLabel}
                onStepChange={onStepChange}
                onClose={onClose}
                onComplete={onComplete}
            />
        )

        expect(screen.getByText(modalTitle)).toBeInTheDocument()
        expect(screen.getByText('1 / 1')).toBeInTheDocument()
    })

    // Modal element displays correct text for current step
    it('should display correct text for current step in modal element', () => {
        const bounds = {
            width: 100,
            height: 100,
            top: 50,
            left: 50,
            right: 150,
            x: 50,
            y: 50,
            bottom: 150,
            toJSON: () => {}
        }
        const onboardingSteps = [{ text: 'Step 1' }, { text: 'Step 2' }, { text: 'Step 3' }]
        const modalTitle = 'Tutorial'
        const darkMode = false
        const nextButtonLabel = 'Next'
        const closeButtonLabel = 'Close'
        const completeButtonLabel = 'Done'
        const onStepChange = jest.fn()
        const onClose = jest.fn()
        const onComplete = jest.fn()

        render(
            <StickyOnboardingWizard
                bounds={bounds}
                onboardingSteps={onboardingSteps}
                modalTitle={modalTitle}
                darkMode={darkMode}
                nextButtonLabel={nextButtonLabel}
                closeButtonLabel={closeButtonLabel}
                completeButtonLabel={completeButtonLabel}
                onStepChange={onStepChange}
                onClose={onClose}
                onComplete={onComplete}
            />
        )

        const modalText = screen.getByText(onboardingSteps[0].text)
        expect(modalText).toBeInTheDocument()
    })

    // Modal element is positioned correctly when target element is partially offscreen
    it('should position modal element correctly when target element is partially offscreen', () => {
        const bounds = {
            width: 100,
            height: 100,
            top: 50,
            left: window.innerWidth - 150,
            right: window.innerWidth - 50,
            x: window.innerWidth - 150,
            y: 50,
            bottom: 150,
            toJSON: () => {}
        }
        const onboardingSteps = [{ text: 'Step 1' }]
        render(<StickyOnboardingWizard bounds={bounds} onboardingSteps={onboardingSteps} onStepChange={jest.fn()} onClose={jest.fn()} onComplete={jest.fn()} />)

        const modalElement = screen.getByRole('dialog')
        const modalStyle = window.getComputedStyle(modalElement)
        expect(modalStyle.transform).toBe('translate3d(874px, 38px, 0px)')
    })

    // Modal element is positioned correctly when target element is near the edge of the screen
    it('should position modal element correctly when target element is near the edge of the screen', () => {
        const bounds = {
            width: 100,
            height: 100,
            top: window.innerHeight - 150,
            left: 50,
            right: 150,
            x: 50,
            y: window.innerHeight - 150,
            bottom: window.innerHeight - 50,
            toJSON: () => {}
        }
        const onboardingSteps = [{ text: 'Step 1' }]

        render(<StickyOnboardingWizard bounds={bounds} onboardingSteps={onboardingSteps} />)

        const modalElement = screen.getByRole('dialog')
        const modalStyle = window.getComputedStyle(modalElement)

        expect(modalStyle.transform).toBe('translate3d(50px, 606px, 0px)')
    })

    // Next button advances to next step and updates modal content
    it('should advance to next step and update modal content when Next button is clicked', () => {
        const bounds = {
            width: 100,
            height: 100,
            top: 50,
            left: 50,
            right: 150,
            x: 50,
            y: 50,
            bottom: 150,
            toJSON: () => {}
        }
        const onboardingSteps = [{ text: 'Step 1' }, { text: 'Step 2' }, { text: 'Step 3' }]
        const modalTitle = 'Tutorial'
        const darkMode = false
        const nextButtonLabel = 'Next'
        const closeButtonLabel = 'Close'
        const completeButtonLabel = 'Done'
        const onStepChange = jest.fn()
        const onClose = jest.fn()
        const onComplete = jest.fn()

        render(
            <StickyOnboardingWizard
                bounds={bounds}
                onboardingSteps={onboardingSteps}
                modalTitle={modalTitle}
                darkMode={darkMode}
                nextButtonLabel={nextButtonLabel}
                closeButtonLabel={closeButtonLabel}
                completeButtonLabel={completeButtonLabel}
                onStepChange={onStepChange}
                onClose={onClose}
                onComplete={onComplete}
            />
        )

        // Check if the initial step is rendered
        expect(screen.getByText('Step 1')).toBeInTheDocument()

        // Click the Next button
        fireEvent.click(screen.getByText('Next'))
        expect(screen.getByText('Step 2')).toBeInTheDocument()
    })

    // Complete button finishes onboarding and triggers onComplete callback
    it('should finish onboarding and trigger onComplete callback when Complete button is clicked', () => {
        const bounds = {
            width: 100,
            height: 100,
            top: 50,
            left: 50,
            right: 150,
            x: 50,
            y: 50,
            bottom: 150,
            toJSON: () => {}
        }
        const onboardingSteps = [{ text: 'Step 1' }]
        const modalTitle = 'Tutorial'
        const darkMode = false
        const nextButtonLabel = 'Next'
        const closeButtonLabel = 'Close'
        const completeButtonLabel = 'Done'
        const onStepChange = jest.fn()
        const onClose = jest.fn()
        const onComplete = jest.fn()

        render(
            <StickyOnboardingWizard
                bounds={bounds}
                onboardingSteps={onboardingSteps}
                modalTitle={modalTitle}
                darkMode={darkMode}
                nextButtonLabel={nextButtonLabel}
                closeButtonLabel={closeButtonLabel}
                completeButtonLabel={completeButtonLabel}
                onStepChange={onStepChange}
                onClose={onClose}
                onComplete={onComplete}
            />
        )

        // Check if the initial step is rendered
        expect(screen.getByText('Step 1')).toBeInTheDocument()

        // Click the Complete button
        fireEvent.click(screen.getByText('Done'))
        expect(onComplete).toHaveBeenCalled()
    })

    // Close button closes modal and triggers onClose callback
    it('should close modal and trigger onClose callback when close button is clicked', () => {
        const bounds = {
            width: 100,
            height: 100,
            top: 50,
            left: 50,
            right: 150,
            x: 50,
            y: 50,
            bottom: 150,
            toJSON: () => {}
        }
        const onboardingSteps = [{ text: 'Step 1' }, { text: 'Step 2' }]
        const modalTitle = 'Tutorial'
        const darkMode = false
        const nextButtonLabel = 'Next'
        const closeButtonLabel = 'Close'
        const completeButtonLabel = 'Done'
        const onStepChange = jest.fn()
        const onClose = jest.fn()
        const onComplete = jest.fn()

        render(
            <StickyOnboardingWizard
                bounds={bounds}
                onboardingSteps={onboardingSteps}
                modalTitle={modalTitle}
                darkMode={darkMode}
                nextButtonLabel={nextButtonLabel}
                closeButtonLabel={closeButtonLabel}
                completeButtonLabel={completeButtonLabel}
                onStepChange={onStepChange}
                onClose={onClose}
                onComplete={onComplete}
            />
        )

        // Simulate click on close button
        fireEvent.click(screen.getByText(closeButtonLabel))
        expect(onClose).toHaveBeenCalledTimes(1)
        expect(onClose).toHaveBeenCalledWith(0)
    })

    // Modal element is positioned correctly when target element is very small
    it('should position modal element correctly when target element is very small', () => {
        const bounds = {
            width: 10,
            height: 10,
            top: 50,
            left: 50,
            right: 60,
            x: 50,
            y: 50,
            bottom: 60,
            toJSON: () => {}
        }
        const onboardingSteps = [{ text: 'Step 1' }]
        const modalTitle = 'Tutorial'
        const darkMode = false
        const nextButtonLabel = 'Next'
        const closeButtonLabel = 'Close'
        const completeButtonLabel = 'Done'
        const onStepChange = jest.fn()
        const onClose = jest.fn()
        const onComplete = jest.fn()

        render(
            <StickyOnboardingWizard
                bounds={bounds}
                onboardingSteps={onboardingSteps}
                modalTitle={modalTitle}
                darkMode={darkMode}
                nextButtonLabel={nextButtonLabel}
                closeButtonLabel={closeButtonLabel}
                completeButtonLabel={completeButtonLabel}
                onStepChange={onStepChange}
                onClose={onClose}
                onComplete={onComplete}
            />
        )

        const modalElement = screen.getByRole('dialog')
        expect(modalElement).toBeInTheDocument()
        expect(modalElement.style.transform).toBe('translate3d(50px, 38px, 0px)')
    })
})
