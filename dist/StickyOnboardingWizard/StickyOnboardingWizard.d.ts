import React, { ReactNode } from 'react';
import { OnboardingStep } from '../types';
interface Props {
    bounds: DOMRect;
    onboardingSteps: OnboardingStep[];
    modalTitle?: string;
    darkMode?: boolean;
    hideArrow?: boolean;
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
declare const StickyOnboardingWizard: React.FC<Props>;
export default StickyOnboardingWizard;
