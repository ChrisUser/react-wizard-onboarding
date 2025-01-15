import React, { ReactNode } from 'react';
interface TutorialComponentData {
    id: string;
    position: number;
    text?: string;
    image?: string;
    tutorialKey: string;
}
interface TutorialConfiguration {
    title?: string;
    sticky?: boolean;
    hideArrowOnSticky?: boolean;
    darkMode?: boolean;
    displayDots?: boolean;
    labels?: {
        next?: string;
        complete?: string;
        close?: string;
    };
    icons?: {
        next?: ReactNode;
        complete?: ReactNode;
        close?: ReactNode;
    };
}
export default function useTutorial(): {
    registerTutorialComponent: (componentData: TutorialComponentData) => (element: any) => void;
    startTutorial: (tutorialKey?: string | undefined) => void;
};
export declare const createTutorialConfig: (configurations: TutorialConfiguration) => {
    sticky: boolean;
    darkMode: boolean;
    displayDots: boolean;
    hideArrowOnSticky: boolean;
    labels: {
        next?: string | undefined;
        complete?: string | undefined;
        close?: string | undefined;
    };
    icons: {
        next?: ReactNode;
        complete?: ReactNode;
        close?: ReactNode;
    };
};
export declare const TutorialProvider: React.FC<{
    children: ReactNode;
    config: TutorialConfiguration;
}>;
export {};
