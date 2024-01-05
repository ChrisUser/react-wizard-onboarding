interface TutorialComponentData {
    position: number
    text: string
    key: string
}
export default function useTutorial() {
    const registerTutorialComponent = (_componentData: TutorialComponentData) => {}

    const startTutorial = (_key: string) => {}

    return { registerTutorialComponent, startTutorial }
}
