import { fireEvent, render, screen } from '@testing-library/react'
import OnboardingWizard from '../components/OnboardingWizard/OnboardingWizard'

describe('OnboardingWizard', () => {
    // Renders the onboarding wizard with default props
    it('should render the onboarding wizard with default props and provided steps', () => {
        const onboardingSteps = [
            { text: 'Step 1', image: 'image1.jpg' },
            { text: 'Step 2', image: 'image2.jpg' }
        ]
        const { getByText } = render(<OnboardingWizard onboardingSteps={onboardingSteps} />)

        // Assert that the component renders correctly
        expect(getByText('Tutorial')).toBeInTheDocument()
        expect(getByText('Close')).toBeInTheDocument()
        expect(getByText('Next')).toBeInTheDocument()

        fireEvent.click(getByText('Next'))

        expect(getByText('Done')).toBeInTheDocument()
    })

    // Renders the onboarding wizard with custom props
    it('should render the onboarding wizard with custom props', () => {
        const customProps = {
            onboardingSteps: [
                { text: 'Step 1', image: 'image1.jpg' },
                { text: 'Step 2', image: 'image2.jpg' },
                { text: 'Step 3', image: 'image3.jpg' }
            ],
            modalTitle: 'Custom Title',
            displayDots: true,
            darkMode: true,
            nextButtonLabel: 'Next Step',
            closeButtonLabel: 'Close Tutorial',
            completeButtonLabel: 'Finish',
            onStepChange: jest.fn(),
            onClose: jest.fn(),
            onComplete: jest.fn()
        }

        const { getByText } = render(<OnboardingWizard {...customProps} />)

        // Assert that the component renders correctly with custom props
        expect(getByText('Custom Title')).toBeInTheDocument()
        expect(getByText('Close Tutorial')).toBeInTheDocument()
        expect(getByText('Next Step')).toBeInTheDocument()

        fireEvent.click(getByText('Next Step'))
        fireEvent.click(getByText('Next Step'))

        expect(getByText('Finish')).toBeInTheDocument()
    })

    // Clicks the next button and advances to the next step
    it('should advance to the next step when the next button is clicked', () => {
        const onboardingSteps = [
            { text: 'Step 1', image: 'image1.jpg' },
            { text: 'Step 2', image: 'image2.jpg' },
            { text: 'Step 3', image: 'image3.jpg' }
        ]

        const { getByText } = render(<OnboardingWizard onboardingSteps={onboardingSteps} />)

        fireEvent.click(getByText('Next'))

        // Assert that the component advances to the next step
        expect(getByText('Step 2')).toBeInTheDocument()
    })

    // Does not render the onboarding wizard with empty onboardingSteps array
    it('should not render the onboarding wizard with empty onboardingSteps array', () => {
        // Render the component with empty onboardingSteps array
        render(<OnboardingWizard onboardingSteps={[]} />)

        const wizard = screen.queryByTestId('wizard')
        expect(wizard).not.toBeInTheDocument()
    })

    // Clicks the next button on the last step
    it('should call onComplete when the next button is clicked on the last step', () => {
        const onboardingSteps = [
            { text: 'Step 1', image: 'image1.jpg' },
            { text: 'Step 2', image: 'image2.jpg' },
            { text: 'Step 3', image: 'image3.jpg' }
        ]

        const onComplete = jest.fn()
        const { getByText } = render(<OnboardingWizard onboardingSteps={onboardingSteps} onComplete={onComplete} />)

        // Click the next button on the last step
        fireEvent.click(getByText('Next'))
        fireEvent.click(getByText('Next'))
        fireEvent.click(getByText('Done'))

        // Assert that onComplete is called
        expect(onComplete).toHaveBeenCalled()
    })
})
