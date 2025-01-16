import { default as React, ReactNode } from 'react';
import { OnboardingStep } from '../types';
interface Props {
    onboardingSteps: OnboardingStep[];
    modalTitle?: string;
    displayDots?: boolean;
    darkMode?: boolean;
    nextButtonLabel?: string;
    nextButtonIcon?: ReactNode;
    closeButtonLabel?: string;
    closeButtonIcon?: ReactNode;
    completeButtonLabel?: string;
    completeButtonIcon?: ReactNode;
    onStepChange?: (newStepIndex: number) => void;
    onClose?: (currentStepIndex: number) => void;
    onComplete?: () => void;
}
declare const OnboardingWizard: React.FC<Props>;
export default OnboardingWizard;
