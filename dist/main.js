import { jsx as i, jsxs as m } from "react/jsx-runtime";
import { useCallback as B, useEffect as O, useState as S, useRef as H, useMemo as z } from "react";
const L = ({ bounds: t, focusedElement: r, beforeFocusAnimationEnd: l, onFocusAnimationEnd: c }) => {
  const w = B(() => {
    if (l && l(), t.height === 0 || t.width === 0)
      return;
    t.bottom > window.innerHeight && r && (r == null || r.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" }));
    const p = setTimeout(() => {
      c && c();
    }, 500);
    return () => clearTimeout(p);
  }, [t, r, c, l]);
  return O(() => {
    w();
  }, [w]), O(() => (document.body.style.overflow = "hidden", () => {
    document.body.style.overflow = "";
  }), []), console.log("bounds", t), /* @__PURE__ */ i("div", { "data-testid": "spotlight-wrapper", className: "rwo-onboarding-step-spotlight-wrapper", children: /* @__PURE__ */ i(
    "div",
    {
      "data-testid": "spotlight",
      className: "rwo-onboarding-step-spotlight is-visible",
      style: { width: t.width, height: t.height, transform: `translate3d(${t.x}px, ${t.y}px, 0px)` }
    }
  ) });
}, V = L;
const D = ({
  onboardingSteps: t,
  modalTitle: r = "Tutorial",
  displayDots: l,
  darkMode: c,
  nextButtonLabel: w = "Next",
  nextButtonIcon: p,
  closeButtonLabel: v = "Close",
  closeButtonIcon: f,
  completeButtonLabel: y = "Done",
  completeButtonIcon: k,
  onStepChange: s,
  onClose: _,
  onComplete: b
}) => {
  const [o, u] = S(0), h = B(() => {
    _ && _(o);
  }, [o, _]);
  if (!(!t || t.length === 0))
    return /* @__PURE__ */ i("div", { className: "rwo-onboarding-wizard-wrapper rwo-fixed-onboarding-wizard", children: /* @__PURE__ */ m("div", { "data-testid": "wizard", className: `rwo-onboarding-modal ${c ? "dark" : "light"}-modal`, children: [
      /* @__PURE__ */ m("div", { className: "rwo-onboarding-modal__header", children: [
        /* @__PURE__ */ i("div", { className: "rwo-onboarding-modal__header__left-section", children: /* @__PURE__ */ i("button", { className: "rwo-ghost-action-button", onClick: h, children: f || v }) }),
        /* @__PURE__ */ i("div", { className: "rwo-onboarding-modal__header__middle-section", children: /* @__PURE__ */ i("span", { className: "rwo-modal-title", children: r }) }),
        /* @__PURE__ */ i("div", { className: "rwo-onboarding-modal__header__right-section", children: o === t.length - 1 ? /* @__PURE__ */ i("button", { className: "rwo-ghost-action-button", onClick: () => b ? b() : null, children: k || y }) : /* @__PURE__ */ i(
          "button",
          {
            className: "rwo-ghost-action-button",
            onClick: () => {
              const x = o + 1;
              u(x), s && s(x);
            },
            children: p || w
          }
        ) })
      ] }),
      /* @__PURE__ */ m("div", { className: "rwo-onboarding-modal__body", children: [
        t[o].image && /* @__PURE__ */ i("div", { className: "rwo-onboarding-modal__body__image-container", children: /* @__PURE__ */ i("img", { src: t[o].image, alt: t[o].text }) }),
        /* @__PURE__ */ i("div", { className: "rwo-onboarding-modal__body__text-container", children: t[o].text })
      ] }),
      l && /* @__PURE__ */ i("div", { className: "rwo-onboarding-modal__footer", children: /* @__PURE__ */ i("div", { className: "rwo-onboarding-modal-step-dot-container", children: t.map((x, a) => /* @__PURE__ */ i(
        "div",
        {
          className: `rwo-onboarding-modal-step-dot ${o === a ? "is-active" : ""}`,
          onClick: () => {
            u(a), s && s(a);
          }
        },
        a
      )) }) })
    ] }) });
}, q = D;
var e = /* @__PURE__ */ ((t) => (t.Top = "Top", t.Bottom = "Bottom", t.Left = "Left", t.Right = "Right", t.Center = "Center", t))(e || {});
const d = 12, M = ({
  bounds: t,
  onboardingSteps: r,
  modalTitle: l = "Tutorial",
  darkMode: c,
  nextButtonLabel: w = "Next",
  nextButtonIcon: p,
  closeButtonLabel: v = "Close",
  closeButtonIcon: f,
  completeButtonLabel: y = "Done",
  completeButtonIcon: k,
  onStepChange: s,
  onClose: _,
  onComplete: b
}) => {
  const [o, u] = S(new DOMRect()), [h, x] = S(0), a = H(null), N = z(() => r, [r]);
  O(() => {
    !a || !a.current || u(a.current.getBoundingClientRect());
  }, [t.x, t.y, t.width, t.height, a.current]);
  const W = z(() => {
    const n = window.innerWidth - (t.x + t.width), g = window.innerHeight - (t.y + t.height);
    return console.log("remainigspace right, below", n, g), console.log("modalBounds.height", o.height), console.log("modalBounds.width", o.width), console.log("window.innerHeight", window.innerHeight), console.log("window.innerWidth", window.innerWidth), o.height + d <= t.y ? e.Top : o.width + d <= t.x ? e.Left : o.width + d <= n ? e.Right : o.height + d <= g ? e.Bottom : e.Center;
  }, [o, t]), C = z(() => {
    const { x: n, y: g, width: $, height: R } = t, { width: I, height: T } = o;
    switch (console.log("getmodalcoordinates width", $), W) {
      case e.Top:
        return `translate3d(${$ * 0.5 + n || 0}px, ${Math.abs(g - T - d)}px, 0px)`;
      case e.Left:
        return `translate3d(${Math.abs(n - I - d)}px, ${g || 0}px, 0px)`;
      case e.Right:
        return `translate3d(${n + $ + d}px, ${g || 0}px, 0px)`;
      case e.Bottom:
        return `translate3d(${n || 0}px, ${g + R + d}px, 0px)`;
      case e.Center:
      default:
        return "translate3d(50vw, 50vh, 0px)";
    }
  }, [o, t]);
  if (!(!N || N.length === 0))
    return /* @__PURE__ */ i("div", { className: "rwo-onboarding-wizard-wrapper rwo-sticky-onboarding-wizard", children: /* @__PURE__ */ m(
      "div",
      {
        role: "dialog",
        className: `rwo-sticky-onboarding-modal ${c ? "dark" : "light"}-modal ${W}--position-modal`,
        ref: a,
        style: {
          transform: C
        },
        children: [
          /* @__PURE__ */ m("div", { className: "rwo-sticky-onboarding-modal__header", children: [
            /* @__PURE__ */ i("div", { className: "rwo-sticky-onboarding-modal__header__left-section", children: /* @__PURE__ */ i("span", { className: "rwo-modal-title", children: l }) }),
            /* @__PURE__ */ i("div", { className: "rwo-sticky-onboarding-modal__header__right-section", children: /* @__PURE__ */ m("span", { className: "rwo-modal-step-counter", children: [
              h + 1,
              " / ",
              N.length
            ] }) })
          ] }),
          /* @__PURE__ */ i("div", { className: "rwo-sticky-onboarding-modal__body", children: /* @__PURE__ */ i("div", { className: "rwo-sticky-onboarding-modal__body__text-container", children: N[h].text }) }),
          /* @__PURE__ */ m("div", { className: "rwo-sticky-onboarding-modal__footer", children: [
            /* @__PURE__ */ i("div", { className: "rwo-sticky-onboarding-modal__footer__left-section", children: /* @__PURE__ */ i("button", { className: "rwo-ghost-action-button", onClick: () => _ ? _(h) : null, children: f || v }) }),
            /* @__PURE__ */ i("div", { className: "rwo-sticky-onboarding-modal__footer__right-section", children: h === N.length - 1 ? /* @__PURE__ */ i("button", { className: "rwo-ghost-action-button", onClick: () => b ? b() : null, children: k || y }) : /* @__PURE__ */ i(
              "button",
              {
                className: "rwo-ghost-action-button",
                onClick: () => {
                  const n = h + 1;
                  x(n), s && s(n);
                },
                children: p || w
              }
            ) })
          ] })
        ]
      }
    ) });
}, G = M;
export {
  V as OnboardingStepSpotlight,
  q as OnboardingWizard,
  G as StickyOnboardingWizard
};
