(function(i,t){typeof exports=="object"&&typeof module<"u"?t(exports,require("react/jsx-runtime"),require("react")):typeof define=="function"&&define.amd?define(["exports","react/jsx-runtime","react"],t):(i=typeof globalThis<"u"?globalThis:i||self,t(i["react-wizard-onboarding"]={},i.jsxRuntime,i.React))})(this,function(i,t,r){"use strict";const j=({bounds:e,focusedElement:d,beforeFocusAnimationEnd:c,onFocusAnimationEnd:h})=>{const m=r.useCallback(()=>{if(c&&c(),e.height===0||e.width===0)return;e.bottom>window.innerHeight&&d&&(d==null||d.scrollIntoView({behavior:"smooth",block:"start",inline:"nearest"}));const x=setTimeout(()=>{h&&h()},500);return()=>clearTimeout(x)},[e,d,h,c]);return r.useEffect(()=>{m()},[m]),r.useEffect(()=>(document.body.style.overflow="hidden",()=>{document.body.style.overflow=""}),[]),t.jsx("div",{"data-testid":"spotlight-wrapper",className:"rwo-onboarding-step-spotlight-wrapper",children:t.jsx("div",{"data-testid":"spotlight",className:"rwo-onboarding-step-spotlight is-visible",style:{width:e.width,height:e.height,transform:`translate3d(${e.x}px, ${e.y}px, 0px)`}})})},H=({onboardingSteps:e,modalTitle:d="Tutorial",displayDots:c,darkMode:h,nextButtonLabel:m="Next",nextButtonIcon:x,closeButtonLabel:z="Close",closeButtonIcon:C,completeButtonLabel:T="Done",completeButtonIcon:S,onStepChange:_,onClose:p,onComplete:b})=>{const[a,g]=r.useState(0),O=r.useCallback(()=>{p&&p(a)},[a,p]);if(!(!e||e.length===0))return t.jsx("div",{className:"rwo-onboarding-wizard-wrapper rwo-fixed-onboarding-wizard",children:t.jsxs("div",{"data-testid":"wizard",className:`rwo-onboarding-modal ${h?"dark":"light"}-modal`,children:[t.jsxs("div",{className:"rwo-onboarding-modal__header",children:[t.jsx("div",{className:"rwo-onboarding-modal__header__left-section",children:t.jsx("button",{className:"rwo-ghost-action-button",onClick:O,children:C||z})}),t.jsx("div",{className:"rwo-onboarding-modal__header__middle-section",children:t.jsx("span",{className:"rwo-modal-title",children:d})}),t.jsx("div",{className:"rwo-onboarding-modal__header__right-section",children:a===e.length-1?t.jsx("button",{className:"rwo-ghost-action-button",onClick:()=>b?b():null,children:S||T}):t.jsx("button",{className:"rwo-ghost-action-button",onClick:()=>{const l=a+1;g(l),_&&_(l)},children:x||m})})]}),t.jsxs("div",{className:"rwo-onboarding-modal__body",children:[e[a].image&&t.jsx("div",{className:"rwo-onboarding-modal__body__image-container",children:t.jsx("img",{src:e[a].image,alt:e[a].text})}),t.jsx("div",{className:"rwo-onboarding-modal__body__text-container",children:e[a].text})]}),c&&t.jsx("div",{className:"rwo-onboarding-modal__footer",children:t.jsx("div",{className:"rwo-onboarding-modal-step-dot-container",children:e.map((l,f)=>t.jsx("div",{className:`rwo-onboarding-modal-step-dot ${a===f?"is-active":""}`,onClick:()=>{g(f),_&&_(f)}},f))})})]})})};var o=(e=>(e.Top="Top",e.Bottom="Bottom",e.Left="Left",e.Right="Right",e.Center="Center",e))(o||{});const s=12,L=({bounds:e,onboardingSteps:d,modalTitle:c="Tutorial",darkMode:h,hideArrow:m,nextButtonLabel:x="Next",nextButtonIcon:z,closeButtonLabel:C="Close",closeButtonIcon:T,completeButtonLabel:S="Done",completeButtonIcon:_,onStepChange:p,onClose:b,onComplete:a})=>{const[g,O]=r.useState(new DOMRect),[l,f]=r.useState(0),N=r.useRef(null),v=r.useMemo(()=>d,[d]);r.useEffect(()=>{!N||!N.current||O(N.current.getBoundingClientRect())},[e.x,e.y,e.width,e.height,N.current]);const B=r.useMemo(()=>{const{x:n,y:w,width:y,height:k}=e,{innerWidth:u,innerHeight:$}=window,{width:I,height:W}=g,D=u-(n+y),q=$-(w+k);return y===0&&k===0?o.Center:W+s<=w?o.Top:I+s<=n?o.Left:I+s<=D?o.Right:W+s<=q?o.Bottom:o.Center},[g,e]),M=r.useMemo(()=>{const{x:n,y:w,width:y,height:k}=e,{width:u,height:$}=g;switch(B){case o.Top:return`translate3d(${n+y*.5-u*.5}px, ${w-$-s}px, 0px)`;case o.Left:return`translate3d(${n-u-s}px, ${w}px, 0px)`;case o.Right:return`translate3d(${n+y+s}px, ${w}px, 0px)`;case o.Bottom:return`translate3d(${n}px, ${w+k+s}px, 0px)`;case o.Center:default:return`translate3d(calc(50vw - ${u*.5}px), calc(50vh - ${$*.5}px), 0px)`}},[g,e]);if(!(!v||v.length===0))return t.jsx("div",{className:"rwo-onboarding-wizard-wrapper rwo-sticky-onboarding-wizard",children:t.jsxs("div",{role:"dialog",className:`rwo-sticky-onboarding-modal ${h?"dark":"light"}-modal ${B}--position-modal ${m?"hide-arrow":""}`,ref:N,style:{transform:M},children:[t.jsxs("div",{className:"rwo-sticky-onboarding-modal__header",children:[t.jsx("div",{className:"rwo-sticky-onboarding-modal__header__left-section",children:t.jsx("span",{className:"rwo-modal-title",children:c})}),t.jsx("div",{className:"rwo-sticky-onboarding-modal__header__right-section",children:t.jsxs("span",{className:"rwo-modal-step-counter",children:[l+1," / ",v.length]})})]}),t.jsx("div",{className:"rwo-sticky-onboarding-modal__body",children:t.jsx("div",{className:"rwo-sticky-onboarding-modal__body__text-container",children:v[l].text})}),t.jsxs("div",{className:"rwo-sticky-onboarding-modal__footer",children:[t.jsx("div",{className:"rwo-sticky-onboarding-modal__footer__left-section",children:t.jsx("button",{className:"rwo-ghost-action-button",onClick:()=>b?b(l):null,children:T||C})}),t.jsx("div",{className:"rwo-sticky-onboarding-modal__footer__right-section",children:l===v.length-1?t.jsx("button",{className:"rwo-ghost-action-button",onClick:()=>a?a():null,children:_||S}):t.jsx("button",{className:"rwo-ghost-action-button",onClick:()=>{const n=l+1;f(n),p&&p(n)},children:z||x})})]})]})})};i.OnboardingStepSpotlight=j,i.OnboardingWizard=H,i.StickyOnboardingWizard=L,Object.defineProperty(i,Symbol.toStringTag,{value:"Module"})});
