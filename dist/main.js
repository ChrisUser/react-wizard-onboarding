import { jsx as e, jsxs as m } from "react/jsx-runtime";
import { useCallback as S, useEffect as C, useState as O, useRef as D, useMemo as $ } from "react";
const H = ({ bounds: t, targetRef: a, beforeFocusAnimationEnd: l, onFocusAnimationEnd: c }) => {
  const g = S(() => {
    var w;
    if (l && l(), t.height === 0 || t.width === 0)
      return;
    t.bottom > window.innerHeight && (a != null && a.current) && ((w = a.current) == null || w.scrollIntoView({ behavior: "smooth" }));
    const u = setTimeout(() => {
      c && c();
    }, 500);
    return () => clearTimeout(u);
  }, [t, a, c, l]);
  return C(() => {
    g();
  }, [g]), /* @__PURE__ */ e("div", { "data-testid": "spotlight-wrapper", className: "rwo-onboarding-step-spotlight-wrapper", children: /* @__PURE__ */ e(
    "div",
    {
      "data-testid": "spotlight",
      className: "rwo-onboarding-step-spotlight is-visible",
      style: { width: t.width, height: t.height, transform: `translate3d(${t.x}px, ${t.y}px, 0px)` }
    }
  ) });
}, V = H;
const M = ({
  onboardingSteps: t,
  modalTitle: a = "Tutorial",
  displayDots: l,
  darkMode: c,
  nextButtonLabel: g = "Next",
  nextButtonIcon: u,
  closeButtonLabel: w = "Close",
  closeButtonIcon: f,
  completeButtonLabel: y = "Done",
  completeButtonIcon: k,
  onStepChange: s,
  onClose: _,
  onComplete: x
}) => {
  const [i, v] = O(0), h = S(() => {
    _ && _(i);
  }, [i, _]);
  if (!(!t || t.length === 0))
    return /* @__PURE__ */ e("div", { className: "rwo-onboarding-wizard-wrapper", children: /* @__PURE__ */ m("div", { "data-testid": "wizard", className: `rwo-onboarding-modal ${c ? "dark" : "light"}-modal`, children: [
      /* @__PURE__ */ m("div", { className: "rwo-onboarding-modal__header", children: [
        /* @__PURE__ */ e("div", { className: "rwo-onboarding-modal__header__left-section", children: /* @__PURE__ */ e("button", { className: "rwo-ghost-action-button", onClick: h, children: f || w }) }),
        /* @__PURE__ */ e("div", { className: "rwo-onboarding-modal__header__middle-section", children: /* @__PURE__ */ e("span", { className: "rwo-modal-title", children: a }) }),
        /* @__PURE__ */ e("div", { className: "rwo-onboarding-modal__header__right-section", children: i === t.length - 1 ? /* @__PURE__ */ e("button", { className: "rwo-ghost-action-button", onClick: () => x ? x() : null, children: k || y }) : /* @__PURE__ */ e(
          "button",
          {
            className: "rwo-ghost-action-button",
            onClick: () => {
              const N = i + 1;
              v(N), s && s(N);
            },
            children: u || g
          }
        ) })
      ] }),
      /* @__PURE__ */ m("div", { className: "rwo-onboarding-modal__body", children: [
        t[i].image && /* @__PURE__ */ e("div", { className: "rwo-onboarding-modal__body__image-container", children: /* @__PURE__ */ e("img", { src: t[i].image, alt: t[i].text }) }),
        /* @__PURE__ */ e("div", { className: "rwo-onboarding-modal__body__text-container", children: t[i].text })
      ] }),
      l && /* @__PURE__ */ e("div", { className: "rwo-onboarding-modal__footer", children: /* @__PURE__ */ e("div", { className: "rwo-onboarding-modal-step-dot-container", children: t.map((N, o) => /* @__PURE__ */ e(
        "div",
        {
          className: `rwo-onboarding-modal-step-dot ${i === o ? "is-active" : ""}`,
          onClick: () => {
            v(o), s && s(o);
          }
        },
        o
      )) }) })
    ] }) });
}, q = M;
var r = /* @__PURE__ */ ((t) => (t.Top = "Top", t.Bottom = "Bottom", t.Left = "Left", t.Right = "Right", t.Center = "Center", t))(r || {});
const d = 12, R = ({
  bounds: t,
  onboardingSteps: a,
  modalTitle: l = "Tutorial",
  darkMode: c,
  nextButtonLabel: g = "Next",
  nextButtonIcon: u,
  closeButtonLabel: w = "Close",
  closeButtonIcon: f,
  completeButtonLabel: y = "Done",
  completeButtonIcon: k,
  onStepChange: s,
  onClose: _,
  onComplete: x
}) => {
  const [i, v] = O(new DOMRect()), [h, N] = O(0), o = D(null), b = $(() => a, [a]);
  C(() => {
    !o || !o.current || v(o.current.getBoundingClientRect());
  }, [t.x, t.y, t.width, t.height, o.current]);
  const z = $(() => {
    const n = window.innerWidth - (t.x + t.width), p = window.innerHeight - (t.y + t.height);
    return i.height + d <= t.y ? r.Top : i.width + d <= t.x ? r.Left : i.width + d <= n ? r.Right : i.height + d <= p ? r.Bottom : r.Center;
  }, [i, t]), W = $(() => {
    const { x: n, y: p, width: B, height: I } = t, { width: T, height: L } = i;
    switch (z) {
      case r.Top:
        return `translate3d(${n || 0}px, ${Math.abs(p - L - d)}px, 0px)`;
      case r.Left:
        return `translate3d(${Math.abs(n - T - d)}px, ${p || 0}px, 0px)`;
      case r.Right:
        return `translate3d(${n + B + d}px, ${p || 0}px, 0px)`;
      case r.Bottom:
        return `translate3d(${n || 0}px, ${p + I + d}px, 0px)`;
      case r.Center:
      default:
        return "translate3d(50vw, 50vh, 0px)";
    }
  }, [i, t]);
  if (!(!b || b.length === 0))
    return /* @__PURE__ */ e("div", { className: "rwo-onboarding-wizard-wrapper", children: /* @__PURE__ */ m(
      "div",
      {
        role: "dialog",
        className: `rwo-sticky-onboarding-modal ${c ? "dark" : "light"}-modal ${z}--position-modal`,
        ref: o,
        style: {
          transform: W
        },
        children: [
          /* @__PURE__ */ m("div", { className: "rwo-sticky-onboarding-modal__header", children: [
            /* @__PURE__ */ e("div", { className: "rwo-sticky-onboarding-modal__header__left-section", children: /* @__PURE__ */ e("span", { className: "rwo-modal-title", children: l }) }),
            /* @__PURE__ */ e("div", { className: "rwo-sticky-onboarding-modal__header__right-section", children: /* @__PURE__ */ m("span", { className: "rwo-modal-step-counter", children: [
              h + 1,
              " / ",
              b.length
            ] }) })
          ] }),
          /* @__PURE__ */ e("div", { className: "rwo-sticky-onboarding-modal__body", children: /* @__PURE__ */ e("div", { className: "rwo-sticky-onboarding-modal__body__text-container", children: b[h].text }) }),
          /* @__PURE__ */ m("div", { className: "rwo-sticky-onboarding-modal__footer", children: [
            /* @__PURE__ */ e("div", { className: "rwo-sticky-onboarding-modal__footer__left-section", children: /* @__PURE__ */ e("button", { className: "rwo-ghost-action-button", onClick: () => _ ? _(h) : null, children: f || w }) }),
            /* @__PURE__ */ e("div", { className: "rwo-sticky-onboarding-modal__footer__right-section", children: h === b.length - 1 ? /* @__PURE__ */ e("button", { className: "rwo-ghost-action-button", onClick: () => x ? x() : null, children: k || y }) : /* @__PURE__ */ e(
              "button",
              {
                className: "rwo-ghost-action-button",
                onClick: () => {
                  const n = h + 1;
                  N(n), s && s(n);
                },
                children: u || g
              }
            ) })
          ] })
        ]
      }
    ) });
}, G = R;
export {
  V as OnboardingStepSpotlight,
  q as OnboardingWizard,
  G as StickyOnboardingWizard
};
