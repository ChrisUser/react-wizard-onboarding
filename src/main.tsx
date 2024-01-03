import React, { useRef, useState } from 'react'
import ReactDOM from 'react-dom/client'
import '../dist/style.css'
import './pageStyle.css'
import { Notifications } from './resources/Icons/notifications'
import { Dashboard } from './resources/Icons/dashboard'
import { BulletList } from './resources/Icons/bullet_list'
import { marketUnits, salesUnits, topCards, users } from './resources/constants'
import { MoreVertical } from './resources/Icons/more_vert'
import { OnboardingStepSpotlight, StickyOnboardingWizard } from '../lib/main'

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

const App: React.FC = () => {
    const [bounds, setBounds] = useState<DOMRect>(new DOMRect())
    const [targetElementRef, setTargetElementRef] = useState<HTMLDivElement | null>(null)
    const [showOnboardingElements, setShowOnboardingElements] = useState(true)
    const elementsRefs = useRef<(HTMLDivElement | null)[]>([])

    const getBounds = (step: number) => {
        if (!elementsRefs || !elementsRefs.current || !elementsRefs.current[step]) return
        const divBounds = elementsRefs.current[step]?.getBoundingClientRect()
        if (divBounds && elementsRefs.current[step] !== null) {
            setBounds(divBounds)
            setTargetElementRef(elementsRefs.current[step])
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
            {showOnboardingElements && (
                <>
                    <StickyOnboardingWizard
                        bounds={bounds}
                        onboardingSteps={onboardingSteps}
                        onStepChange={(newStep) => getBounds(newStep)}
                        onClose={() => setShowOnboardingElements(false)}
                        onComplete={() => setShowOnboardingElements(false)}
                    />
                    <OnboardingStepSpotlight bounds={bounds} focusedElement={targetElementRef} />
                </>
            )}
            <div className="flexbox header-wrapper" ref={(el) => (elementsRefs.current[0] = el)}>
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
            </div>
            <div className="page-content">
                <div className="flexbox page-heading">
                    <div className="flexbox tabs-selector">
                        <div className="tabs-selector__tab selected-tab">Sales</div>
                        <div className="tabs-selector__tab">Orders</div>
                        <div className="tabs-selector__tab">Customers</div>
                    </div>
                    <div className="flexbox tabs-selector">
                        <div className="tabs-selector__tab selected-tab">
                            <Dashboard className="icon" />
                        </div>
                        <div className="tabs-selector__tab">
                            <BulletList className="icon" />
                        </div>
                    </div>
                </div>
                <div className="flexbox page-body">
                    <div className="top-page-grid">
                        {topCards.map((topCard) => (
                            <div className="flexbox top-card" key={topCard.id}>
                                <div className="flexbox top-card__left">
                                    <span className="top-card__left__title">{topCard.title}</span>
                                    <span className="top-card__left__value">
                                        {topCard.unit}
                                        {topCard.value}
                                    </span>
                                    <span className="top-card__left__subtitle">{topCard.subtitle}</span>
                                </div>
                                <div className="flexbox top-card__right">
                                    <div className="flexbox top-card__right__dot" />
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flexbox items-row">
                        <div className="flexbox card" ref={(el) => (elementsRefs.current[2] = el)}>
                            <div className="flexbox card__title">Market</div>
                            <div className="flexbox card__body">
                                <div className="flexbox graph-container">
                                    {marketUnits.map((mUnit, i) => (
                                        <div key={i} className="graph-bar" style={{ height: `${mUnit}%` }} />
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="flexbox card">
                            <div className="flexbox card__title">Sales</div>
                            <div className="flexbox card__body">
                                <div className="flexbox graph-container">
                                    {salesUnits.map((sUnit, i) => (
                                        <div key={i} className="graph-bar" style={{ height: `${sUnit}%` }} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flexbox items-row">
                        <div className="flexbox card">
                            <div className="flexbox card__title">Users</div>
                            <div className="flexbox card__body">
                                {users.map((user) => (
                                    <div key={user.id} className="flexbox user-row">
                                        <div className="avatar-container">
                                            <img className="avatar-container__image" src={user.avatar} alt="Avatar" />
                                        </div>
                                        <span className="user-row__username">{user.name}</span>
                                        <div className="user-row__user-quota">
                                            <span className="user-row__user-quota__value">{user.value} sales</span>
                                        </div>
                                        <div className="flexbox icon-container">
                                            <MoreVertical className="icon" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="flexbox items-row" ref={(el) => (elementsRefs.current[1] = el)}>
                        <button className="appearance-none action-button" onClick={() => window.alert('nothing ...')}>
                            Special Button
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

ReactDOM.createRoot(document.getElementById('root')!).render(<App />)
