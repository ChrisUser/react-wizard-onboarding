import { jsx as e, jsxs as m } from "react/jsx-runtime";
import { useCallback as D, useEffect as T, useState as O, useRef as U, useMemo as I } from "react";
const G = ({ bounds: t, focusedElement: o, beforeFocusAnimationEnd: l, onFocusAnimationEnd: c }) => {
  const g = D(() => {
    if (l && l(), t.height === 0 || t.width === 0) return;
    t.bottom > window.innerHeight && o && (o == null || o.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" }));
    const x = setTimeout(() => {
      c && c();
    }, 500);
    return () => clearTimeout(x);
  }, [t, o, c, l]);
  return T(() => {
    g();
  }, [g]), T(() => (document.body.style.overflow = "hidden", () => {
    document.body.style.overflow = "";
  }), []), /* @__PURE__ */ e("div", { "data-testid": "spotlight-wrapper", className: "rwo-onboarding-step-spotlight-wrapper", children: /* @__PURE__ */ e(
    "div",
    {
      "data-testid": "spotlight",
      className: "rwo-onboarding-step-spotlight is-visible",
      style: { width: t.width, height: t.height, transform: `translate3d(${t.x}px, ${t.y}px, 0px)` }
    }
  ) });
}, J = ({
  onboardingSteps: t,
  modalTitle: o = "Tutorial",
  displayDots: l,
  darkMode: c,
  nextButtonLabel: g = "Next",
  nextButtonIcon: x,
  closeButtonLabel: $ = "Close",
  closeButtonIcon: C,
  completeButtonLabel: z = "Done",
  completeButtonIcon: R,
  onStepChange: w,
  onClose: _,
  onComplete: u
}) => {
  const [r, s] = O(0), B = D(() => {
    _ && _(r);
  }, [r, _]);
  if (!(!t || t.length === 0))
    return /* @__PURE__ */ e("div", { className: "rwo-onboarding-wizard-wrapper rwo-fixed-onboarding-wizard", children: /* @__PURE__ */ m("div", { "data-testid": "wizard", className: `rwo-onboarding-modal ${c ? "dark" : "light"}-modal`, children: [
      /* @__PURE__ */ m("div", { className: "rwo-onboarding-modal__header", children: [
        /* @__PURE__ */ e("div", { className: "rwo-onboarding-modal__header__left-section", children: /* @__PURE__ */ e("button", { className: "rwo-ghost-action-button", onClick: B, children: C || $ }) }),
        /* @__PURE__ */ e("div", { className: "rwo-onboarding-modal__header__middle-section", children: /* @__PURE__ */ e("span", { className: "rwo-modal-title", children: o }) }),
        /* @__PURE__ */ e("div", { className: "rwo-onboarding-modal__header__right-section", children: r === t.length - 1 ? /* @__PURE__ */ e("button", { className: "rwo-ghost-action-button", onClick: () => u ? u() : null, children: R || z }) : /* @__PURE__ */ e(
          "button",
          {
            className: "rwo-ghost-action-button",
            onClick: () => {
              const n = r + 1;
              s(n), w && w(n);
            },
            children: x || g
          }
        ) })
      ] }),
      /* @__PURE__ */ m("div", { className: "rwo-onboarding-modal__body", children: [
        t[r].image && /* @__PURE__ */ e("div", { className: "rwo-onboarding-modal__body__image-container", children: /* @__PURE__ */ e("img", { src: t[r].image, alt: t[r].text }) }),
        /* @__PURE__ */ e("div", { className: "rwo-onboarding-modal__body__text-container", children: t[r].text })
      ] }),
      l && /* @__PURE__ */ e("div", { className: "rwo-onboarding-modal__footer", children: /* @__PURE__ */ e("div", { className: "rwo-onboarding-modal-step-dot-container", children: t.map((n, p) => /* @__PURE__ */ e(
        "div",
        {
          className: `rwo-onboarding-modal-step-dot ${r === p ? "is-active" : ""}`,
          onClick: () => {
            s(p), w && w(p);
          }
        },
        p
      )) }) })
    ] }) });
};
var i = /* @__PURE__ */ ((t) => (t.Top = "Top", t.Bottom = "Bottom", t.Left = "Left", t.Right = "Right", t.Center = "Center", t))(i || {});
const d = 12, K = ({
  bounds: t,
  onboardingSteps: o,
  modalTitle: l = "Tutorial",
  darkMode: c,
  hideArrow: g,
  nextButtonLabel: x = "Next",
  nextButtonIcon: $,
  closeButtonLabel: C = "Close",
  closeButtonIcon: z,
  completeButtonLabel: R = "Done",
  completeButtonIcon: w,
  onStepChange: _,
  onClose: u,
  onComplete: r
}) => {
  const [s, B] = O(new DOMRect()), [n, p] = O(0), N = U(null), f = I(() => o, [o]);
  T(() => {
    !N || !N.current || B(N.current.getBoundingClientRect());
  }, [t.x, t.y, t.width, t.height, N.current]);
  const W = I(() => {
    const { x: a, y: h, width: v, height: y } = t, { innerWidth: b, innerHeight: k } = window, { width: H, height: L } = s, j = b - (a + v), M = k - (h + y);
    return v === 0 && y === 0 ? i.Center : L + d <= h ? i.Top : H + d <= a ? i.Left : H + d <= j ? i.Right : L + d <= M ? i.Bottom : i.Center;
  }, [s, t]), S = I(() => {
    const { x: a, y: h, width: v, height: y } = t, { width: b, height: k } = s;
    switch (W) {
      case i.Top:
        return `translate3d(${a + v * 0.5 - b * 0.5}px, ${h - k - d}px, 0px)`;
      case i.Left:
        return `translate3d(${a - b - d}px, ${h}px, 0px)`;
      case i.Right:
        return `translate3d(${a + v + d}px, ${h}px, 0px)`;
      case i.Bottom:
        return `translate3d(${a}px, ${h + y + d}px, 0px)`;
      case i.Center:
      default:
        return `translate3d(calc(50vw - ${b * 0.5}px), calc(50vh - ${k * 0.5}px), 0px)`;
    }
  }, [s, t]);
  if (!(!f || f.length === 0))
    return /* @__PURE__ */ e("div", { className: "rwo-onboarding-wizard-wrapper rwo-sticky-onboarding-wizard", children: /* @__PURE__ */ m(
      "div",
      {
        role: "dialog",
        className: `rwo-sticky-onboarding-modal ${c ? "dark" : "light"}-modal ${W}--position-modal ${g ? "hide-arrow" : ""}`,
        ref: N,
        style: {
          transform: S
        },
        children: [
          /* @__PURE__ */ m("div", { className: "rwo-sticky-onboarding-modal__header", children: [
            /* @__PURE__ */ e("div", { className: "rwo-sticky-onboarding-modal__header__left-section", children: /* @__PURE__ */ e("span", { className: "rwo-modal-title", children: l }) }),
            /* @__PURE__ */ e("div", { className: "rwo-sticky-onboarding-modal__header__right-section", children: /* @__PURE__ */ m("span", { className: "rwo-modal-step-counter", children: [
              n + 1,
              " / ",
              f.length
            ] }) })
          ] }),
          /* @__PURE__ */ e("div", { className: "rwo-sticky-onboarding-modal__body", children: /* @__PURE__ */ e("div", { className: "rwo-sticky-onboarding-modal__body__text-container", children: f[n].text }) }),
          /* @__PURE__ */ m("div", { className: "rwo-sticky-onboarding-modal__footer", children: [
            /* @__PURE__ */ e("div", { className: "rwo-sticky-onboarding-modal__footer__left-section", children: /* @__PURE__ */ e("button", { className: "rwo-ghost-action-button", onClick: () => u ? u(n) : null, children: z || C }) }),
            /* @__PURE__ */ e("div", { className: "rwo-sticky-onboarding-modal__footer__right-section", children: n === f.length - 1 ? /* @__PURE__ */ e("button", { className: "rwo-ghost-action-button", onClick: () => r ? r() : null, children: w || R }) : /* @__PURE__ */ e(
              "button",
              {
                className: "rwo-ghost-action-button",
                onClick: () => {
                  const a = n + 1;
                  p(a), _ && _(a);
                },
                children: $ || x
              }
            ) })
          ] })
        ]
      }
    ) });
};
export {
  G as OnboardingStepSpotlight,
  J as OnboardingWizard,
  K as StickyOnboardingWizard
};
