var F = Object.defineProperty;
var O = (o, t, e) => t in o ? F(o, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : o[t] = e;
var r = (o, t, e) => O(o, typeof t != "symbol" ? t + "" : t, e);
const c = (o, t, e) => {
  e ? o.classList.add(t) : o.classList.remove(t);
}, l = (o, t) => {
  o && "setAttribute" in o && o.setAttribute("aria-expanded", t ? "true" : "false");
}, d = (o, t) => {
  o && "setAttribute" in o && o.setAttribute("aria-hidden", t ? "true" : "false");
};
class x {
  constructor(t) {
    r(this, "root");
    this.root = t, this.root.setAttribute("role", "dialog"), this.root.setAttribute("aria-modal", "true"), d(this.root, !0);
  }
  open() {
    c(this.root, "vxs-open", !0), d(this.root, !1);
  }
  close() {
    c(this.root, "vxs-open", !1), d(this.root, !0);
  }
  static wire() {
    document.querySelectorAll('[data-vx="modal"]').forEach((t) => {
      const e = new x(t), s = t.id;
      s && (document.querySelectorAll(`[data-vx-open="${s}"]`).forEach((a) => {
        a.addEventListener("click", () => {
          e.open(), l(a, !0);
        });
      }), document.querySelectorAll(`[data-vx-close="${s}"]`).forEach((a) => {
        a.addEventListener("click", () => {
          e.close(), l(a, !1);
        });
      }));
    });
  }
}
class w {
  constructor(t) {
    r(this, "root");
    this.root = t, d(this.root, !0);
  }
  open() {
    c(this.root, "vxs-open", !0), d(this.root, !1);
  }
  close() {
    c(this.root, "vxs-open", !1), d(this.root, !0);
  }
  static wire() {
    document.querySelectorAll('[data-vx="drawer"]').forEach((t) => {
      const e = new w(t), s = t.id;
      s && (document.querySelectorAll(`[data-vx-open="${s}"]`).forEach((a) => {
        a.addEventListener("click", () => {
          e.open(), l(a, !0);
        });
      }), document.querySelectorAll(`[data-vx-close="${s}"]`).forEach((a) => {
        a.addEventListener("click", () => {
          e.close(), l(a, !1);
        });
      }));
    });
  }
}
class y {
  constructor(t) {
    r(this, "root");
    r(this, "toggle");
    r(this, "menu");
    var e;
    this.root = t, this.toggle = t.querySelector("[data-vx-toggle]"), this.menu = t.querySelector("[data-vx-menu]"), (e = this.toggle) == null || e.setAttribute("aria-haspopup", "menu"), l(this.toggle, !1);
  }
  open() {
    !this.menu || !this.toggle || (c(this.menu, "vxs-open", !0), l(this.toggle, !0));
  }
  close() {
    !this.menu || !this.toggle || (c(this.menu, "vxs-open", !1), l(this.toggle, !1));
  }
  static wire() {
    document.querySelectorAll('[data-vx="dropdown"]').forEach((t) => {
      var s;
      const e = new y(t);
      (s = e.toggle) == null || s.addEventListener("click", () => {
        var a;
        (a = e.menu) != null && a.classList.contains("vxs-open") ? e.close() : e.open();
      }), document.addEventListener("click", (a) => {
        t.contains(a.target) || e.close();
      });
    });
  }
}
class T {
  static wire() {
    document.querySelectorAll("[data-vx-tooltip]").forEach((e) => {
      let s = null;
      const a = e.getAttribute("data-vx-tooltip") || "", i = () => {
        if (!a) return;
        s = document.createElement("div"), s.className = "c-tooltip m-fade-1", s.textContent = a, document.body.appendChild(s);
        const h = e.getBoundingClientRect();
        s.style.position = "fixed", s.style.top = `${h.bottom + 8}px`, s.style.left = `${h.left}px`;
      }, n = () => {
        s && (s.remove(), s = null);
      };
      e.addEventListener("mouseenter", i), e.addEventListener("focus", i), e.addEventListener("mouseleave", n), e.addEventListener("blur", n);
    });
  }
}
class A {
  constructor(t) {
    r(this, "root");
    this.root = t;
  }
  activate(t) {
    this.root.querySelectorAll("[data-vx-tab]").forEach((e) => {
      const s = e.getAttribute("data-vx-tab") === t;
      c(e, "vxs-active", s), l(e, s);
    }), this.root.querySelectorAll("[data-vx-panel]").forEach((e) => {
      const s = e.getAttribute("data-vx-panel") === t;
      c(e, "vxs-hidden", !s), d(e, !s);
    });
  }
  static wire() {
    document.querySelectorAll('[data-vx="tabs"]').forEach((t) => {
      const e = new A(t), s = t.querySelector("[data-vx-tab]");
      s && e.activate(s.getAttribute("data-vx-tab") || ""), t.querySelectorAll("[data-vx-tab]").forEach((a) => {
        a.setAttribute("role", "tab"), a.addEventListener("click", () => {
          const i = a.getAttribute("data-vx-tab") || "";
          e.activate(i);
        });
      }), t.querySelectorAll("[data-vx-panel]").forEach((a) => {
        a.setAttribute("role", "tabpanel");
      });
    });
  }
}
class E {
  constructor(t) {
    r(this, "root");
    this.root = t;
  }
  show(t, e = 3200) {
    const s = document.createElement("div");
    s.className = "c-toast m-fade-1", s.textContent = t, this.root.appendChild(s), window.setTimeout(() => {
      s.remove();
    }, e);
  }
  static wire() {
    document.querySelectorAll('[data-vx="toast-stack"]').forEach((t) => {
      const e = new E(t), s = t.id;
      s && document.querySelectorAll(`[data-vx-toast="${s}"]`).forEach((a) => {
        a.addEventListener("click", () => {
          const i = a.getAttribute("data-vx-toast-msg") || "Signal sent.";
          e.show(i);
        });
      });
    });
  }
}
class b {
  constructor(t) {
    r(this, "root");
    this.root = t;
  }
  toggle(t) {
    this.root.querySelectorAll("[data-vx-panel]").forEach((e) => {
      const s = e.getAttribute("data-vx-panel") === t;
      c(e, "vxs-hidden", !s), d(e, !s);
    }), this.root.querySelectorAll("[data-vx-trigger]").forEach((e) => {
      const s = e.getAttribute("data-vx-trigger") === t;
      l(e, s);
    });
  }
  static wire() {
    document.querySelectorAll('[data-vx="accordion"]').forEach((t) => {
      const e = new b(t);
      t.querySelectorAll("[data-vx-panel]").forEach((s) => {
        c(s, "vxs-hidden", !0), d(s, !0);
      }), t.querySelectorAll("[data-vx-trigger]").forEach((s) => {
        s.addEventListener("click", () => {
          const a = s.getAttribute("data-vx-trigger") || "";
          e.toggle(a);
        });
      });
    });
  }
}
class S {
  constructor(t) {
    r(this, "trigger");
    r(this, "panel");
    this.trigger = t;
    const e = t.getAttribute("data-vx-popover") || "";
    this.panel = e ? document.getElementById(e) : null, this.trigger.setAttribute("aria-haspopup", "dialog");
  }
  open() {
    this.panel && c(this.panel, "vxs-hidden", !1);
  }
  close() {
    this.panel && c(this.panel, "vxs-hidden", !0);
  }
  static wire() {
    document.querySelectorAll("[data-vx-popover]").forEach((t) => {
      const e = new S(t);
      e.close(), t.addEventListener("click", () => {
        var s;
        (s = e.panel) != null && s.classList.contains("vxs-hidden") ? e.open() : e.close();
      }), document.addEventListener("click", (s) => {
        var a;
        !t.contains(s.target) && !((a = e.panel) != null && a.contains(s.target)) && e.close();
      });
    });
  }
}
class D {
  constructor(t) {
    r(this, "root");
    r(this, "toggle");
    r(this, "menu");
    if (this.root = t, this.toggle = this.root.querySelector("[data-vx-toggle]"), this.menu = this.root.querySelector("[data-vx-menu]"), !this.toggle || !this.menu)
      return;
    this.menu.id && this.toggle.setAttribute("aria-controls", this.menu.id);
    const e = this.menu.classList.contains("vxs-open");
    l(this.toggle, e), d(this.menu, !e), this.toggle.addEventListener("click", () => {
      var a;
      !((a = this.menu) != null && a.classList.contains("vxs-open")) ? this.open() : this.close();
    }), this.root.addEventListener("keydown", (s) => {
      s.key === "Escape" && this.close();
    }), document.addEventListener("click", (s) => {
      !this.menu || !this.menu.classList.contains("vxs-open") || this.root.contains(s.target) || this.close();
    });
  }
  open() {
    this.menu && (c(this.menu, "vxs-open", !0), l(this.toggle, !0), d(this.menu, !1));
  }
  close() {
    this.menu && (c(this.menu, "vxs-open", !1), l(this.toggle, !1), d(this.menu, !0));
  }
  static wire() {
    document.querySelectorAll('[data-vx="navbar"]').forEach((t) => {
      new D(t);
    });
  }
}
const m = (o) => {
  if (!o)
    return null;
  const t = /^(\d{4})-(\d{2})-(\d{2})$/.exec(o);
  if (!t)
    return null;
  const e = Number(t[1]), s = Number(t[2]) - 1, a = Number(t[3]), i = new Date(e, s, a);
  return Number.isNaN(i.getTime()) ? null : i;
}, p = (o) => {
  const t = o.getFullYear(), e = `${o.getMonth() + 1}`.padStart(2, "0"), s = `${o.getDate()}`.padStart(2, "0");
  return `${t}-${e}-${s}`;
}, q = (o, t) => new Date(o.getFullYear(), o.getMonth() + t, 1), Y = (o, t) => new Intl.DateTimeFormat(t, { month: "long", year: "numeric" }).format(o), W = (o, t) => {
  const e = new Intl.DateTimeFormat(o, { weekday: "short" }), s = new Date(2020, 5, 7), a = Array.from({ length: 7 }, (i, n) => {
    const h = new Date(s);
    return h.setDate(s.getDate() + n), e.format(h);
  });
  return a.slice(t).concat(a.slice(0, t));
};
class L {
  constructor(t) {
    r(this, "root");
    r(this, "parts");
    r(this, "locale");
    r(this, "weekStart");
    r(this, "minDate");
    r(this, "maxDate");
    r(this, "selected");
    r(this, "viewDate");
    r(this, "today");
    this.root = t, this.locale = this.root.dataset.vxLocale || "en-US", this.weekStart = Number(this.root.dataset.vxWeekStart || 0), (Number.isNaN(this.weekStart) || this.weekStart < 0 || this.weekStart > 6) && (this.weekStart = 0), this.minDate = m(this.root.dataset.vxMin), this.maxDate = m(this.root.dataset.vxMax), this.selected = m(this.root.dataset.vxSelected), this.today = /* @__PURE__ */ new Date();
    const e = this.selected || this.today;
    this.viewDate = new Date(e.getFullYear(), e.getMonth(), 1), this.parts = this.ensureStructure(), this.bind(), this.render();
  }
  ensureStructure() {
    this.root.classList.add("c-calendar");
    let t = this.root.querySelector(".c-calendar-header");
    t || (t = document.createElement("div"), t.className = "c-calendar-header", this.root.appendChild(t));
    let e = t.querySelector("[data-vx-cal-prev]");
    e || (e = document.createElement("button"), e.type = "button", e.className = "c-calendar-nav", e.dataset.vxCalPrev = "", e.textContent = "Prev", t.appendChild(e));
    let s = t.querySelector(".c-calendar-title");
    s || (s = document.createElement("div"), s.className = "c-calendar-title", t.appendChild(s));
    let a = t.querySelector("[data-vx-cal-next]");
    a || (a = document.createElement("button"), a.type = "button", a.className = "c-calendar-nav", a.dataset.vxCalNext = "", a.textContent = "Next", t.appendChild(a));
    let i = this.root.querySelector(".c-calendar-weekdays");
    i || (i = document.createElement("div"), i.className = "c-calendar-weekdays", this.root.appendChild(i));
    let n = this.root.querySelector(".c-calendar-grid");
    return n || (n = document.createElement("div"), n.className = "c-calendar-grid", this.root.appendChild(n)), { header: t, title: s, prev: e, next: a, weekdays: i, grid: n };
  }
  bind() {
    this.parts.prev.addEventListener("click", () => {
      this.viewDate = q(this.viewDate, -1), this.render();
    }), this.parts.next.addEventListener("click", () => {
      this.viewDate = q(this.viewDate, 1), this.render();
    }), this.parts.grid.addEventListener("click", (t) => {
      var i;
      const e = (i = t.target) == null ? void 0 : i.closest("[data-vx-date]");
      if (!e || e.hasAttribute("disabled"))
        return;
      const s = e.getAttribute("data-vx-date"), a = m(s);
      a && (this.selected = a, (a.getFullYear() !== this.viewDate.getFullYear() || a.getMonth() !== this.viewDate.getMonth()) && (this.viewDate = new Date(a.getFullYear(), a.getMonth(), 1)), this.root.dataset.vxSelected = s || "", this.render());
    });
  }
  isOutOfRange(t) {
    return !!(this.minDate && t < this.minDate || this.maxDate && t > this.maxDate);
  }
  renderWeekdays() {
    const t = W(this.locale, this.weekStart);
    this.parts.weekdays.innerHTML = "", t.forEach((e) => {
      const s = document.createElement("div");
      s.textContent = e, this.parts.weekdays.appendChild(s);
    });
  }
  renderGrid() {
    const t = this.viewDate.getFullYear(), e = this.viewDate.getMonth(), i = (new Date(t, e, 1).getDay() - this.weekStart + 7) % 7, n = new Date(t, e, 1 - i), h = 42;
    this.parts.grid.innerHTML = "";
    for (let f = 0; f < h; f += 1) {
      const v = new Date(n.getFullYear(), n.getMonth(), n.getDate() + f), N = v.getMonth() === e, g = p(v), M = this.selected ? p(this.selected) === g : !1, $ = p(this.today) === g, k = this.isOutOfRange(v), u = document.createElement("button");
      u.type = "button", u.className = "c-calendar-day", u.textContent = `${v.getDate()}`, u.setAttribute("data-vx-date", g), N || u.classList.add("vxs-outside"), $ && u.classList.add("vxs-today"), M && !k && (u.classList.add("vxs-selected"), u.setAttribute("aria-selected", "true")), k && (u.classList.add("vxs-disabled"), u.setAttribute("disabled", "true")), this.parts.grid.appendChild(u);
    }
  }
  render() {
    this.parts.title.textContent = Y(this.viewDate, this.locale), this.renderWeekdays(), this.renderGrid();
  }
  static wire() {
    document.querySelectorAll('[data-vx="calendar"]').forEach((t) => {
      new L(t);
    });
  }
}
const C = () => {
  x.wire(), w.wire(), y.wire(), T.wire(), A.wire(), E.wire(), b.wire(), S.wire(), D.wire(), L.wire();
}, I = () => {
  var o;
  return typeof document < "u" && ((o = document.documentElement) == null ? void 0 : o.hasAttribute("data-vx-auto"));
};
I() && (document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", () => C()) : C());
export {
  b as Accordion,
  L as Calendar,
  w as Drawer,
  y as Dropdown,
  x as Modal,
  D as Navbar,
  S as Popover,
  A as Tabs,
  E as ToastStack,
  T as Tooltip,
  C as autoInit
};
//# sourceMappingURL=velynx.esm.js.map
