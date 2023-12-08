import React from 'react';
interface Props {
    bounds: DOMRect;
    targetRef?: React.MutableRefObject<HTMLDivElement | null>;
    beforeFocusAnimationEnd?: () => void;
    onFocusAnimationEnd?: () => void;
}
declare const OnboardingStepSpotlight: React.FC<Props>;
export default OnboardingStepSpotlight;
