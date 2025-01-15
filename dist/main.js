import { jsx as r, jsxs as m } from "react/jsx-runtime";
import { useCallback as L, useEffect as R, useState as B, useRef as U, useMemo as W } from "react";
const V = ({ bounds: t, focusedElement: o, beforeFocusAnimationEnd: l, onFocusAnimationEnd: c }) => {
  const g = L(() => {
    if (l && l(), t.height === 0 || t.width === 0)
      return;
    t.bottom > window.innerHeight && o && (o == null || o.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" }));
    const b = setTimeout(() => {
      c && c();
    }, 500);
    return () => clearTimeout(b);
  }, [t, o, c, l]);
  return R(() => {
    g();
  }, [g]), R(() => (document.body.style.overflow = "hidden", () => {
    document.body.style.overflow = "";
  }), []), /* @__PURE__ */ r("div", { "data-testid": "spotlight-wrapper", className: "rwo-onboarding-step-spotlight-wrapper", children: /* @__PURE__ */ r(
    "div",
    {
      "data-testid": "spotlight",
      className: "rwo-onboarding-step-spotlight is-visible",
      style: { width: t.width, height: t.height, transform: `translate3d(${t.x}px, ${t.y}px, 0px)` }
    }
  ) });
}, Q = V;
const q = ({
  onboardingSteps: t,
  modalTitle: o = "Tutorial",
  displayDots: l,
  darkMode: c,
  nextButtonLabel: g = "Next",
  nextButtonIcon: b,
  closeButtonLabel: $ = "Close",
  closeButtonIcon: z,
  completeButtonLabel: O = "Done",
  completeButtonIcon: S,
  onStepChange: w,
  onClose: _,
  onComplete: x
}) => {
  const [e, s] = B(0), C = L(() => {
    _ && _(e);
  }, [e, _]);
  if (!(!t || t.length === 0))
    return /* @__PURE__ */ r("div", { className: "rwo-onboarding-wizard-wrapper rwo-fixed-onboarding-wizard", children: /* @__PURE__ */ m("div", { "data-testid": "wizard", className: `rwo-onboarding-modal ${c ? "dark" : "light"}-modal`, children: [
      /* @__PURE__ */ m("div", { className: "rwo-onboarding-modal__header", children: [
        /* @__PURE__ */ r("div", { className: "rwo-onboarding-modal__header__left-section", children: /* @__PURE__ */ r("button", { className: "rwo-ghost-action-button", onClick: C, children: z || $ }) }),
        /* @__PURE__ */ r("div", { className: "rwo-onboarding-modal__header__middle-section", children: /* @__PURE__ */ r("span", { className: "rwo-modal-title", children: o }) }),
        /* @__PURE__ */ r("div", { className: "rwo-onboarding-modal__header__right-section", children: e === t.length - 1 ? /* @__PURE__ */ r("button", { className: "rwo-ghost-action-button", onClick: () => x ? x() : null, children: S || O }) : /* @__PURE__ */ r(
          "button",
          {
            className: "rwo-ghost-action-button",
            onClick: () => {
              const n = e + 1;
              s(n), w && w(n);
            },
            children: b || g
          }
        ) })
      ] }),
      /* @__PURE__ */ m("div", { className: "rwo-onboarding-modal__body", children: [
        t[e].image && /* @__PURE__ */ r("div", { className: "rwo-onboarding-modal__body__image-container", children: /* @__PURE__ */ r("img", { src: t[e].image, alt: t[e].text }) }),
        /* @__PURE__ */ r("div", { className: "rwo-onboarding-modal__body__text-container", children: t[e].text })
      ] }),
      l && /* @__PURE__ */ r("div", { className: "rwo-onboarding-modal__footer", children: /* @__PURE__ */ r("div", { className: "rwo-onboarding-modal-step-dot-container", children: t.map((n, p) => /* @__PURE__ */ r(
        "div",
        {
          className: `rwo-onboarding-modal-step-dot ${e === p ? "is-active" : ""}`,
          onClick: () => {
            s(p), w && w(p);
          }
        },
        p
      )) }) })
    ] }) });
}, X = q;
var i = /* @__PURE__ */ ((t) => (t.Top = "Top", t.Bottom = "Bottom", t.Left = "Left", t.Right = "Right", t.Center = "Center", t))(i || {});
const d = 12, G = ({
  bounds: t,
  onboardingSteps: o,
  modalTitle: l = "Tutorial",
  darkMode: c,
  hideArrow: g,
  nextButtonLabel: b = "Next",
  nextButtonIcon: $,
  closeButtonLabel: z = "Close",
  closeButtonIcon: O,
  completeButtonLabel: S = "Done",
  completeButtonIcon: w,
  onStepChange: _,
  onClose: x,
  onComplete: e
}) => {
  const [s, C] = B(new DOMRect()), [n, p] = B(0), u = U(null), N = W(() => o, [o]);
  R(() => {
    !u || !u.current || C(u.current.getBoundingClientRect());
  }, [t.x, t.y, t.width, t.height, u.current]);
  const I = W(() => {
    const { x: a, y: h, width: f, height: y } = t, { innerWidth: v, innerHeight: k } = window, { width: T, height: H } = s, j = v - (a + f), M = k - (h + y);
    return f === 0 && y === 0 ? i.Center : H + d <= h ? i.Top : T + d <= a ? i.Left : T + d <= j ? i.Right : H + d <= M ? i.Bottom : i.Center;
  }, [s, t]), D = W(() => {
    const { x: a, y: h, width: f, height: y } = t, { width: v, height: k } = s;
    switch (I) {
      case i.Top:
        return `translate3d(${a + f * 0.5 - v * 0.5}px, ${h - k - d}px, 0px)`;
      case i.Left:
        return `translate3d(${a - v - d}px, ${h}px, 0px)`;
      case i.Right:
        return `translate3d(${a + f + d}px, ${h}px, 0px)`;
      case i.Bottom:
        return `translate3d(${a}px, ${h + y + d}px, 0px)`;
      case i.Center:
      default:
        return `translate3d(calc(50vw - ${v * 0.5}px), calc(50vh - ${k * 0.5}px), 0px)`;
    }
  }, [s, t]);
  if (!(!N || N.length === 0))
    return /* @__PURE__ */ r("div", { className: "rwo-onboarding-wizard-wrapper rwo-sticky-onboarding-wizard", children: /* @__PURE__ */ m(
      "div",
      {
        role: "dialog",
        className: `rwo-sticky-onboarding-modal ${c ? "dark" : "light"}-modal ${I}--position-modal ${g ? "hide-arrow" : ""}`,
        ref: u,
        style: {
          transform: D
        },
        children: [
          /* @__PURE__ */ m("div", { className: "rwo-sticky-onboarding-modal__header", children: [
            /* @__PURE__ */ r("div", { className: "rwo-sticky-onboarding-modal__header__left-section", children: /* @__PURE__ */ r("span", { className: "rwo-modal-title", children: l }) }),
            /* @__PURE__ */ r("div", { className: "rwo-sticky-onboarding-modal__header__right-section", children: /* @__PURE__ */ m("span", { className: "rwo-modal-step-counter", children: [
              n + 1,
              " / ",
              N.length
            ] }) })
          ] }),
          /* @__PURE__ */ r("div", { className: "rwo-sticky-onboarding-modal__body", children: /* @__PURE__ */ r("div", { className: "rwo-sticky-onboarding-modal__body__text-container", children: N[n].text }) }),
          /* @__PURE__ */ m("div", { className: "rwo-sticky-onboarding-modal__footer", children: [
            /* @__PURE__ */ r("div", { className: "rwo-sticky-onboarding-modal__footer__left-section", children: /* @__PURE__ */ r("button", { className: "rwo-ghost-action-button", onClick: () => x ? x(n) : null, children: O || z }) }),
            /* @__PURE__ */ r("div", { className: "rwo-sticky-onboarding-modal__footer__right-section", children: n === N.length - 1 ? /* @__PURE__ */ r("button", { className: "rwo-ghost-action-button", onClick: () => e ? e() : null, children: w || S }) : /* @__PURE__ */ r(
              "button",
              {
                className: "rwo-ghost-action-button",
                onClick: () => {
                  const a = n + 1;
                  p(a), _ && _(a);
                },
                children: $ || b
              }
            ) })
          ] })
        ]
      }
    ) });
}, Y = G;
export {
  Q as OnboardingStepSpotlight,
  X as OnboardingWizard,
  Y as StickyOnboardingWizard
};
