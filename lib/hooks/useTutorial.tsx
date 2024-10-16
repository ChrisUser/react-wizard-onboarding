import React, { ReactNode, useCallback, useContext, useEffect, useState } from 'react'
import { useRef } from 'react'
import { OnboardingStepSpotlight, OnboardingWizard, StickyOnboardingWizard } from '../main'

interface TutorialComponentData {
    id: string
    position: number
    text?: string
    image?: string
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
    startTutorial: (tutorialKey?: string) => void
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
        if (!elementsRefs.current) {
            // Initialize the Map on first usage.
            elementsRefs.current = new Map()
        }
        return elementsRefs.current
    }

    const registerTutorialComponent = useCallback((componentData: TutorialComponentData) => {
        return (element: any) => {
            const map = getMap()
            if (element) {
                map.set(componentData.id, { ...componentData, element })
            } else {
                map.delete(componentData.id)
            }
        }
    }, [])

    const startTutorial = (tutorialKey = '') => {
        const map = getMap()
        if (map.size === 0) {
            console.warn('No tutorial components registered')
            return
        }
        let finalElementsList = [...map.values()]

        if (tutorialKey) {
            finalElementsList = finalElementsList.filter((value) => value.tutorialKey === tutorialKey)
        }

        finalElementsList.sort((a, b) => a.position - b.position)
        console.log('sortedMap', finalElementsList)

        if (finalElementsList.length === 0) {
            console.warn('No tutorial components registered for the given tutorial key')
            return
        }
        setElements(finalElementsList)
        setElementBounds(finalElementsList.map((item) => item.element.getBoundingClientRect()))
        setTutorialInProgress(true)
        setCurrentStepIndex(0)
    }

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
                                nextButtonIcon={config.icons?.next}
                                closeButtonIcon={config.icons?.close}
                                completeButtonIcon={config.icons?.complete}
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
                                nextButtonIcon={config.icons?.next}
                                closeButtonIcon={config.icons?.close}
                                completeButtonIcon={config.icons?.complete}
                                darkMode={config.darkMode}
                                displayDots={config.displayDots}
                                onboardingSteps={elements}
                                onStepChange={(newStep) => setCurrentStepIndex(newStep)}
                                onClose={() => setTutorialInProgress(false)}
                                onComplete={() => setTutorialInProgress(false)}
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
