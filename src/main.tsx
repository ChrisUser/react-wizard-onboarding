import React, { useRef } from 'react'
import ReactDOM from 'react-dom/client'
import '../dist/style.css'
import './pageStyle.css'
import { Notifications } from './resources/Icons/notifications'
import { Dashboard } from './resources/Icons/dashboard'
import { BulletList } from './resources/Icons/bullet_list'
import { marketUnits, salesUnits, topCards, users } from './resources/constants'
import { MoreVertical } from './resources/Icons/more_vert'
import useTutorial, { TutorialProvider, createTutorialConfig } from '../lib/hooks/useTutorial'

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
    const { registerTutorialComponent, startTutorial } = useTutorial()

    return (
        <div className="flexbox main-container">
            <div
                className="flexbox header-wrapper"
                ref={registerTutorialComponent({
                    position: 2,
                    id: 'header',
                    tutorialKey: 'main_tutorial',
                    text: onboardingSteps[0].text,
                    image: onboardingSteps[0].image
                })}
            >
                <div className="flexbox header">
                    <div className="flexbox header__left-section">
                        <div className="flexbox main-logo-container">L</div>
                        <div className="flexbox header-links-container">
                            <button
                                style={{ zIndex: 9999999 }}
                                className="header-links-container__header-link active-link"
                                onClick={() => startTutorial('main_tutorial')}
                            >
                                Overview
                            </button>
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
                        <div className="flexbox card">
                            <div className="flexbox card__title">Market</div>
                            <div className="flexbox card__body">
                                <div
                                    className="flexbox graph-container"
                                    ref={registerTutorialComponent({
                                        position: 3,
                                        id: 'graph_container',
                                        tutorialKey: 'graph_tutorial',
                                        text: onboardingSteps[2].text,
                                        image: onboardingSteps[2].image
                                    })}
                                >
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
                    <div className="flexbox items-row">
                        <button className="appearance-none action-button" onClick={() => window.alert('nothing ...')}>
                            Special Button
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

const config = createTutorialConfig({ sticky: false, darkMode: true, displayDots: true })

const Setup: React.FC = () => {
    return (
        <TutorialProvider config={config}>
            <App />
        </TutorialProvider>
    )
}

ReactDOM.createRoot(document.getElementById('root')!).render(<Setup />)
