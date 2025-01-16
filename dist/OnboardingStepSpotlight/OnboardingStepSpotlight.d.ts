import { default as React } from 'react';
interface Props {
    bounds: DOMRect;
    focusedElement?: HTMLDivElement | null;
    beforeFocusAnimationEnd?: () => void;
    onFocusAnimationEnd?: () => void;
}
declare const OnboardingStepSpotlight: React.FC<Props>;
export default OnboardingStepSpotlight;
