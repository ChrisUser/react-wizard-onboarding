import React, { ReactNode, useCallback, useContext, useEffect, useState } from 'react'
import { useRef } from 'react'
import { OnboardingWizard, StickyOnboardingWizard } from '../main'

interface TutorialComponentData {
    id: string
    position: number
    text: string
    tutorialKey: string
}

interface TutorialConfiguration {
    title?: string
    sticky?: boolean
    darkMode?: boolean
    displayDots?: boolean
    labels?: { next?: string; complete?: string; close?: string }
    icons?: { next?: ReactNode; complete?: ReactNode; close?: ReactNode }
}
export default function useTutorial() {
    const context = useContext(tutorialContext)
    if (!context) throw new Error("Can't use tutorialContext without TutorialProvider")
    return context
}

const tutorialContext = React.createContext<{
    registerTutorialComponent: (componentData: TutorialComponentData) => (element: any) => void
    startTutorial: () => void
} | null>(null)

export const createTutorialConfig = (configurations: TutorialConfiguration) => {
    return { sticky: configurations.sticky ?? false, darkMode: configurations.darkMode ?? false, displayDots: configurations.displayDots ?? false }
}

export const TutorialProvider: React.FC<{ children: ReactNode; config: TutorialConfiguration }> = ({ children, config }) => {
    const elementsRefs = useRef<Map<string, any>>() //<(HTMLDivElement | null)[]>([])
    const [elementBounds, setElementBounds] = useState<DOMRect[]>([])
    const [tutorialInProgress, setTutorialInProgress] = useState(false)

    const getMap = () => {
        console.log('one')
        if (!elementsRefs.current) {
            // Initialize the Map on first usage.
            elementsRefs.current = new Map()
        }
        return elementsRefs.current
    }

    const registerTutorialComponent = useCallback((componentData: TutorialComponentData) => {
        return (element: any) => {
            console.log('two')
            const map = getMap()
            if (element) {
                map.set(componentData.id, { ...componentData, element })
            } else {
                map.delete(componentData.id)
            }
        }
    }, [])

    const startTutorial = () => {
        console.log('three')
        const map = getMap()
        const sortedMap = [...map.values()].sort((a, b) => (a.position - b.position ? -1 : 1))
        console.log('sortedMap', sortedMap)
        setElementBounds(sortedMap.map((item) => item.element.getBoundingClientRect()))
        setTutorialInProgress(true)
    }

    useEffect(() => {
        if (elementBounds.length > 0) {
            console.log('elementBounds', elementBounds)
        }
    }, [elementBounds])

    return (
        <tutorialContext.Provider value={{ registerTutorialComponent, startTutorial }}>
            <>
                {tutorialInProgress && (
                    <>
                        <p>Start</p>
                        {/** config.sticky ? (
                            <StickyOnboardingWizard
                                // customModalStyle=""
                                bounds={bounds}
                                onboardingSteps={onboardingSteps}
                                onStepChange={(newStep) => getBounds(newStep)}
                                onClose={() => setShowOnboardingElements(false)}
                                onComplete={() => setShowOnboardingElements(false)}
                            />
                        ) : (
                            <OnboardingWizard
                                completeButtonLabel="Finish"
                                darkMode
                                displayDots
                                onboardingSteps={onboardingSteps}
                                onStepChange={(newStep) => getBounds(newStep)}
                            />
                        ) */}
                        {/* <OnboardingStepSpotlight bounds={bounds} focusedElement={targetElementRef} />*/}
                    </>
                )}
                {children}
            </>
        </tutorialContext.Provider>
    )
}
