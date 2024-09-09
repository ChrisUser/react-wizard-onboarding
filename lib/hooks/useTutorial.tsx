import React, { ReactNode, useCallback, useContext, useState } from 'react'
import { useRef } from 'react'

interface TutorialComponentData {
    id: string
    position: number
    text: string
    tutorialKey: string
}

interface TutorialConfiguration {
    sticky?: boolean
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
    return { sticky: configurations.sticky ?? false }
}

export const TutorialProvider: React.FC<{ children: ReactNode; config: TutorialConfiguration }> = ({ children, config }) => {
    const elementsRefs = useRef<Map<string, any>>() //<(HTMLDivElement | null)[]>([])
    const [tutorialInProgress, setTutorialInProgress] = useState(false)

    function getMap() {
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

    const startTutorial = () => {
        const map = getMap()
        console.log([...map.values()].sort((a, b) => (a.position - b.position ? -1 : 1)))
        setTutorialInProgress(true)
    }
    return (
        <tutorialContext.Provider value={{ registerTutorialComponent, startTutorial }}>
            <>
                {tutorialInProgress && (
                    <>
                        {/** config.sticky ? (
                            <StickyOnboardingWizard
                                customModalStyle=""
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
