import React, { useRef, useState } from 'react'
import ReactDOM from 'react-dom/client'
import '../dist/style.css'
import './pageStyle.css'
import { Notifications } from './Icons/notifications'

const onboardingSteps = [
    {
        text: 'ciao testo 1 prova',
        image: 'https://time.com/wp-content/uploads/2017/10/229-westerlund-21.jpg?w=2000'
    },
    {
        text: 'ciao testo 2 prova ooook jhgsdfjds fhgjsdf hgjds fghjksfdgjd hjsd fhjksfhdg shdjksgsfhgjsfgjsfhdgkdg jshgjks gh jsdhfj hsdg jhdsfjkghsd jghsdj hdsjgh jksfdhgj hsdjfh jdshgjk hsdfjgkh sjdfhgjs hdfgj dshfjgh jsdhfgj shdgjks hdgkjsfhdjsfh kgj'
    },
    {
        text: 'ok prova 3 testo test',
        image: 'https://time.com/wp-content/uploads/2017/10/229-westerlund-21.jpg?w=2000'
    }
]

const App = () => {
    const [bounds, setBounds] = useState<DOMRect>(new DOMRect())
    const [targetElementRef, setTargetElementRef] = useState<React.MutableRefObject<HTMLDivElement | null>>({ current: null })
    const sampleDivRef = useRef<HTMLDivElement | null>(null)
    const secondDivRef = useRef<HTMLDivElement | null>(null)

    const getBounds = (step: number) => {
        if (!sampleDivRef || !sampleDivRef.current || !secondDivRef || !secondDivRef.current) return
        const divBounds = sampleDivRef.current.getBoundingClientRect()
        const secDivBounds = secondDivRef.current.getBoundingClientRect()
        switch (step) {
            case 1:
                setBounds(divBounds)
                setTargetElementRef(sampleDivRef)
                return
            case 2:
                setBounds(secDivBounds)
                setTargetElementRef(secondDivRef)
                return
            case 0:
            default:
                setBounds(new DOMRect())
                setTargetElementRef({ current: null })
        }
    }

    return (
        <div className="flexbox main-container">
            {/* <OnboardingWizard
                completeButtonLabel="Finish"
                darkMode
                displayDots
                onboardingSteps={onboardingSteps}
                onStepChange={(newStep) => getBounds(newStep)}
            /> */}
            {/* <StickyOnboardingWizard bounds={bounds} darkMode onboardingSteps={onboardingSteps} onStepChange={(newStep) => getBounds(newStep)} /> */}
            {/* <OnboardingStepSpotlight bounds={bounds} targetRef={targetElementRef} onFocusAnimationEnd={() => console.log('trigger ###')} /> */}
            <div className="flexbox header">
                <div className="flexbox header__left-section">
                    <div className="flexbox main-logo-container">L</div>
                    <div className="flexbox header-links-container">
                        <a className="header-links-container__header-link active-link" href="#">
                            Overview
                        </a>
                        <a className="header-links-container__header-link" href="#">
                            Projects
                        </a>
                        <a className="header-links-container__header-link" href="#">
                            Tasks
                        </a>
                        <a className="header-links-container__header-link" href="#">
                            Settings
                        </a>
                    </div>
                </div>
                <div className="flexbox header__right-section">
                    <input type="text" className="appearance-none flexbox search-bar" placeholder="Search..." />
                    <div className="flexbox icon-container">
                        <div className="notification-circle" />
                        <Notifications className="icon" />
                    </div>
                    <div className="current-user-box">
                        <span className="current-user-name">Mike Hawkings</span>
                        <div className="avatar-container">
                            <img className="avatar-container__image" src="https://ui.shadcn.com/avatars/04.png" alt="Avatar" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="page-content">
                <div className="flexbox tabs-selector">
                    <div className="tabs-selector__tab selected-tab">Sales</div>
                    <div className="tabs-selector__tab">Orders</div>
                    <div className="tabs-selector__tab">Customers</div>
                </div>
            </div>

            {/* <div
                ref={sampleDivRef}
                style={{
                    position: 'absolute',
                    width: '100%',
                    height: 110,
                    transform: 'translate3d(0, 12px, 0px)',
                    display: 'flex',
                    flexDirection: 'column-reverse'
                }}
            >
                <h3>Focus qui</h3>
            </div>
            <div
                ref={secondDivRef}
                style={{
                    width: 100,
                    height: 100,
                    position: 'absolute',
                    // transform: 'translate3d(92.8125px, 1123.33px, 0px)',
                    transform: `translate3d(${50}px, ${window.innerWidth - 150}px, 0px)`,
                    display: 'flex',
                    flexDirection: 'column-reverse'
                }}
            >
                <h3>Poi qui</h3>
            </div>*/}
        </div>
    )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
)
