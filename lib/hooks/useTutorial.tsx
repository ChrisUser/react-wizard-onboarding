import React, { ReactNode, useCallback, useContext, useEffect, useState } from 'react'
import { useRef } from 'react'
import { OnboardingStepSpotlight, OnboardingWizard, StickyOnboardingWizard } from '../main'

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
    const [elements, setElements] = useState<any[]>([])
    const [elementBounds, setElementBounds] = useState<DOMRect[]>([])
    const [tutorialInProgress, setTutorialInProgress] = useState(false)
    const [currentStepIndex, setCurrentStepIndex] = useState(0)

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
        setElements(sortedMap)
        setElementBounds(sortedMap.map((item) => item.element.getBoundingClientRect()))
        setTutorialInProgress(true)
        setCurrentStepIndex(0)
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
                        {config.sticky ? (
                            <StickyOnboardingWizard
                                darkMode={config.darkMode}
                                nextButtonLabel={config.labels?.next}
                                closeButtonLabel={config.labels?.close}
                                completeButtonLabel={config.labels?.complete}
                                bounds={elementBounds[currentStepIndex]}
                                onboardingSteps={elements}
                                onStepChange={(newStep) => setCurrentStepIndex(newStep)}
                                onClose={() => setTutorialInProgress(false)}
                                onComplete={() => setTutorialInProgress(false)}
                            />
                        ) : (
                            <OnboardingWizard
                                completeButtonLabel={config.labels?.complete}
                                nextButtonLabel={config.labels?.next}
                                closeButtonLabel={config.labels?.close}
                                darkMode={config.darkMode}
                                displayDots={config.displayDots}
                                onboardingSteps={elements}
                                onStepChange={(newStep) => setCurrentStepIndex(newStep)}
                            />
                        )}
                        {<OnboardingStepSpotlight bounds={elementBounds[currentStepIndex]} focusedElement={elements[currentStepIndex].element} />}
                    </>
                )}
                {children}
            </>
        </tutorialContext.Provider>
    )
}
