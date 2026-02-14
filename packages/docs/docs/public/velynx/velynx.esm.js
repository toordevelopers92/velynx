var G = Object.defineProperty;
var X = (r, t, e) => t in r ? G(r, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : r[t] = e;
var i = (r, t, e) => X(r, typeof t != "symbol" ? t + "" : t, e);
const l = (r, t, e) => {
  e ? r.classList.add(t) : r.classList.remove(t);
}, h = (r, t) => {
  r && "setAttribute" in r && r.setAttribute("aria-expanded", t ? "true" : "false");
}, u = (r, t) => {
  r && "setAttribute" in r && r.setAttribute("aria-hidden", t ? "true" : "false");
}, w = [
  "center",
  "top",
  "right",
  "bottom",
  "left",
  "top-left",
  "top-right",
  "bottom-left",
  "bottom-right"
];
class b {
  constructor(t) {
    i(this, "root");
    i(this, "closeOnEscape");
    i(this, "closeOnBackdrop");
    this.root = t, this.closeOnEscape = this.root.dataset.vxEscapeClose !== "false", this.closeOnBackdrop = this.root.dataset.vxBackdropClose !== "false", this.root.setAttribute("role", "dialog"), this.root.setAttribute("aria-modal", "true"), this.root.dataset.vxState = "closed", this.setAngle(), this.bind(), u(this.root, !0);
  }
  open() {
    this.setAngle(), this.root.dataset.vxState = "open", l(this.root, "vxs-open", !0), u(this.root, !1);
  }
  close() {
    this.root.dataset.vxState = "closed", l(this.root, "vxs-open", !1), u(this.root, !0);
  }
  setAngle() {
    const t = this.root.dataset.vxAngle || "center";
    if (t === "random") {
      const e = Math.floor(Math.random() * w.length);
      this.root.dataset.vxAngleActive = w[e];
      return;
    }
    this.root.dataset.vxAngleActive = w.includes(t) ? t : "center";
  }
  bind() {
    this.root.addEventListener("click", (t) => {
      this.closeOnBackdrop && t.target === this.root && this.close();
    }), document.addEventListener("keydown", (t) => {
      !this.closeOnEscape || t.key !== "Escape" || this.root.classList.contains("vxs-open") && this.close();
    });
  }
  static wire() {
    document.querySelectorAll('[data-vx="modal"]').forEach((t) => {
      const e = new b(t), s = t.id;
      s && (document.querySelectorAll(`[data-vx-open="${s}"]`).forEach((a) => {
        a.addEventListener("click", () => {
          e.open(), h(a, !0);
        });
      }), document.querySelectorAll(`[data-vx-close="${s}"]`).forEach((a) => {
        a.addEventListener("click", () => {
          e.close(), h(a, !1);
        });
      }));
    });
  }
}
class D {
  constructor(t) {
    i(this, "root");
    this.root = t, u(this.root, !0);
  }
  open() {
    l(this.root, "vxs-open", !0), u(this.root, !1);
  }
  close() {
    l(this.root, "vxs-open", !1), u(this.root, !0);
  }
  static wire() {
    document.querySelectorAll('[data-vx="drawer"]').forEach((t) => {
      const e = new D(t), s = t.id;
      s && (document.querySelectorAll(`[data-vx-open="${s}"]`).forEach((a) => {
        a.addEventListener("click", () => {
          e.open(), h(a, !0);
        });
      }), document.querySelectorAll(`[data-vx-close="${s}"]`).forEach((a) => {
        a.addEventListener("click", () => {
          e.close(), h(a, !1);
        });
      }));
    });
  }
}
class A {
  constructor(t) {
    i(this, "root");
    i(this, "toggle");
    i(this, "menu");
    var e;
    this.root = t, this.toggle = t.querySelector("[data-vx-toggle]"), this.menu = t.querySelector("[data-vx-menu]"), (e = this.toggle) == null || e.setAttribute("aria-haspopup", "menu"), h(this.toggle, !1);
  }
  open() {
    !this.menu || !this.toggle || (l(this.menu, "vxs-open", !0), h(this.toggle, !0));
  }
  close() {
    !this.menu || !this.toggle || (l(this.menu, "vxs-open", !1), h(this.toggle, !1));
  }
  static wire() {
    document.querySelectorAll('[data-vx="dropdown"]').forEach((t) => {
      var s;
      const e = new A(t);
      (s = e.toggle) == null || s.addEventListener("click", () => {
        var a;
        (a = e.menu) != null && a.classList.contains("vxs-open") ? e.close() : e.open();
      }), document.addEventListener("click", (a) => {
        t.contains(a.target) || e.close();
      });
    });
  }
}
class j {
  static wire() {
    document.querySelectorAll("[data-vx-tooltip]").forEach((e) => {
      let s = null;
      const a = e.getAttribute("data-vx-tooltip") || "", n = () => {
        if (!a) return;
        s = document.createElement("div"), s.className = "vxc-tooltip vxm-fade-1", s.textContent = a, document.body.appendChild(s);
        const m = e.getBoundingClientRect();
        s.style.position = "fixed", s.style.top = `${m.bottom + 8}px`, s.style.left = `${m.left}px`;
      }, o = () => {
        s && (s.remove(), s = null);
      };
      e.addEventListener("mouseenter", n), e.addEventListener("focus", n), e.addEventListener("mouseleave", o), e.addEventListener("blur", o);
    });
  }
}
class L {
  constructor(t) {
    i(this, "root");
    this.root = t;
  }
  activate(t) {
    this.root.querySelectorAll("[data-vx-tab]").forEach((e) => {
      const s = e.getAttribute("data-vx-tab") === t;
      l(e, "vxs-active", s), h(e, s);
    }), this.root.querySelectorAll("[data-vx-panel]").forEach((e) => {
      const s = e.getAttribute("data-vx-panel") === t;
      l(e, "vxs-hidden", !s), u(e, !s);
    });
  }
  static wire() {
    document.querySelectorAll('[data-vx="tabs"]').forEach((t) => {
      const e = new L(t), s = t.querySelector("[data-vx-tab]");
      s && e.activate(s.getAttribute("data-vx-tab") || ""), t.querySelectorAll("[data-vx-tab]").forEach((a) => {
        a.setAttribute("role", "tab"), a.addEventListener("click", () => {
          const n = a.getAttribute("data-vx-tab") || "";
          e.activate(n);
        });
      }), t.querySelectorAll("[data-vx-panel]").forEach((a) => {
        a.setAttribute("role", "tabpanel");
      });
    });
  }
}
class k {
  constructor(t) {
    i(this, "root");
    this.root = t;
  }
  show(t, e = 3200) {
    const s = document.createElement("div");
    s.className = "vxc-toast vxm-fade-1", s.textContent = t, this.root.appendChild(s), window.setTimeout(() => {
      s.remove();
    }, e);
  }
  static wire() {
    document.querySelectorAll('[data-vx="toast-stack"]').forEach((t) => {
      const e = new k(t), s = t.id;
      s && document.querySelectorAll(`[data-vx-toast="${s}"]`).forEach((a) => {
        a.addEventListener("click", () => {
          const n = a.getAttribute("data-vx-toast-msg") || "Signal sent.";
          e.show(n);
        });
      });
    });
  }
}
class q {
  constructor(t) {
    i(this, "root");
    this.root = t;
  }
  toggle(t) {
    this.root.querySelectorAll("[data-vx-panel]").forEach((e) => {
      const s = e.getAttribute("data-vx-panel") === t;
      l(e, "vxs-hidden", !s), u(e, !s);
    }), this.root.querySelectorAll("[data-vx-trigger]").forEach((e) => {
      const s = e.getAttribute("data-vx-trigger") === t;
      h(e, s);
    });
  }
  static wire() {
    document.querySelectorAll('[data-vx="accordion"]').forEach((t) => {
      const e = new q(t);
      t.querySelectorAll("[data-vx-panel]").forEach((s) => {
        l(s, "vxs-hidden", !0), u(s, !0);
      }), t.querySelectorAll("[data-vx-trigger]").forEach((s) => {
        s.addEventListener("click", () => {
          const a = s.getAttribute("data-vx-trigger") || "";
          e.toggle(a);
        });
      });
    });
  }
}
class C {
  constructor(t) {
    i(this, "trigger");
    i(this, "panel");
    this.trigger = t;
    const e = t.getAttribute("data-vx-popover") || "";
    this.panel = e ? document.getElementById(e) : null, this.trigger.setAttribute("aria-haspopup", "dialog");
  }
  open() {
    this.panel && l(this.panel, "vxs-hidden", !1);
  }
  close() {
    this.panel && l(this.panel, "vxs-hidden", !0);
  }
  static wire() {
    document.querySelectorAll("[data-vx-popover]").forEach((t) => {
      const e = new C(t);
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
class N {
  constructor(t) {
    i(this, "root");
    i(this, "toggle");
    i(this, "menu");
    if (this.root = t, this.toggle = this.root.querySelector("[data-vx-toggle]"), this.menu = this.root.querySelector("[data-vx-menu]"), !this.toggle || !this.menu)
      return;
    this.menu.id && this.toggle.setAttribute("aria-controls", this.menu.id);
    const e = this.menu.classList.contains("vxs-open");
    h(this.toggle, e), u(this.menu, !e), this.toggle.addEventListener("click", () => {
      var a;
      !((a = this.menu) != null && a.classList.contains("vxs-open")) ? this.open() : this.close();
    }), this.root.addEventListener("keydown", (s) => {
      s.key === "Escape" && this.close();
    }), document.addEventListener("click", (s) => {
      !this.menu || !this.menu.classList.contains("vxs-open") || this.root.contains(s.target) || this.close();
    });
  }
  open() {
    this.menu && (l(this.menu, "vxs-open", !0), h(this.toggle, !0), u(this.menu, !1));
  }
  close() {
    this.menu && (l(this.menu, "vxs-open", !1), h(this.toggle, !1), u(this.menu, !0));
  }
  static wire() {
    document.querySelectorAll('[data-vx="navbar"]').forEach((t) => {
      new N(t);
    });
  }
}
const g = (r) => {
  if (!r)
    return null;
  const t = /^(\d{4})-(\d{2})-(\d{2})$/.exec(r);
  if (!t)
    return null;
  const e = Number(t[1]), s = Number(t[2]) - 1, a = Number(t[3]), n = new Date(e, s, a);
  return Number.isNaN(n.getTime()) ? null : n;
}, P = (r) => (r || "").split(/[,\s;|]+/).map((t) => t.trim()).filter(Boolean), H = (r, t) => r.getTime() - t.getTime(), c = (r) => {
  const t = r.getFullYear(), e = `${r.getMonth() + 1}`.padStart(2, "0"), s = `${r.getDate()}`.padStart(2, "0");
  return `${t}-${e}-${s}`;
}, M = (r, t) => new Date(r.getFullYear(), r.getMonth() + t, 1), U = (r, t) => {
  const e = new Date(2020, 5, 7), s = Array.from({ length: 7 }, (a, n) => {
    const o = new Date(e);
    return o.setDate(e.getDate() + n), r.format(o);
  });
  return s.slice(t).concat(s.slice(0, t));
}, J = (r) => r === "multi" || r === "range" ? r : "single", K = (r) => P(r).map((t) => g(t)).filter((t) => !!t).sort(H), $ = (r) => {
  if (!r)
    return [null, null];
  const t = r.includes("..") || r.includes("/") ? r.split(/(?:\.\.|\/)/).map((a) => a.trim()) : P(r), e = g(t[0]), s = g(t[1]);
  return !e && !s ? [null, null] : e && s && s < e ? [s, e] : [e, s];
};
class R {
  constructor(t) {
    i(this, "root");
    i(this, "parts");
    i(this, "mode");
    i(this, "locale");
    i(this, "weekStart");
    i(this, "minDate");
    i(this, "maxDate");
    i(this, "selected");
    i(this, "selectedDates");
    i(this, "rangeStart");
    i(this, "rangeEnd");
    i(this, "viewDate");
    i(this, "today");
    i(this, "todayIso");
    i(this, "monthFormatter");
    i(this, "weekdayFormatter");
    i(this, "weekdaysReady");
    this.root = t, this.mode = J(this.root.dataset.vxSelection || this.root.dataset.vxCalendarMode), this.locale = this.root.dataset.vxLocale || "en-US", this.weekStart = Number(this.root.dataset.vxWeekStart || 0), (Number.isNaN(this.weekStart) || this.weekStart < 0 || this.weekStart > 6) && (this.weekStart = 0), this.minDate = g(this.root.dataset.vxMin), this.maxDate = g(this.root.dataset.vxMax), this.selected = g(this.root.dataset.vxSelected), this.selectedDates = new Set(
      K(this.root.dataset.vxSelectedDates || this.root.dataset.vxSelected).map(
        (n) => c(n)
      )
    );
    const [e, s] = $(
      `${this.root.dataset.vxRangeStart || ""}/${this.root.dataset.vxRangeEnd || ""}`
    );
    if (e || s)
      this.rangeStart = e, this.rangeEnd = s;
    else {
      const [n, o] = $(this.root.dataset.vxSelected);
      this.rangeStart = n, this.rangeEnd = o;
    }
    this.today = /* @__PURE__ */ new Date(), this.todayIso = c(this.today), this.monthFormatter = new Intl.DateTimeFormat(this.locale, { month: "long", year: "numeric" }), this.weekdayFormatter = new Intl.DateTimeFormat(this.locale, { weekday: "short" }), this.weekdaysReady = !1, this.normalizeSelection();
    const a = this.getInitialViewDate() || this.today;
    this.viewDate = new Date(a.getFullYear(), a.getMonth(), 1), this.parts = this.ensureStructure(), this.bind(), this.syncDataset(), this.render();
  }
  getInitialViewDate() {
    if (this.mode === "range")
      return this.rangeStart || this.rangeEnd;
    if (this.mode === "multi") {
      const t = [...this.selectedDates].sort()[0];
      return g(t);
    }
    return this.selected;
  }
  normalizeSelection() {
    if (this.mode !== "single" && (this.selected = null), this.mode !== "multi" && this.selectedDates.clear(), this.mode !== "range" && (this.rangeStart = null, this.rangeEnd = null), this.mode === "single" && this.selected && this.isOutOfRange(this.selected) && (this.selected = null), this.mode === "multi" && (this.selectedDates = new Set(
      [...this.selectedDates].filter((t) => {
        const e = g(t);
        return e ? !this.isOutOfRange(e) : !1;
      })
    )), this.mode === "range" && (this.rangeStart && this.isOutOfRange(this.rangeStart) && (this.rangeStart = null), this.rangeEnd && this.isOutOfRange(this.rangeEnd) && (this.rangeEnd = null), this.rangeStart && this.rangeEnd && this.rangeEnd < this.rangeStart)) {
      const t = this.rangeEnd;
      this.rangeEnd = this.rangeStart, this.rangeStart = t;
    }
  }
  ensureStructure() {
    this.root.classList.add("vxc-calendar"), this.root.classList.add("c-calendar");
    let t = this.root.querySelector(".vxc-calendar-header, .c-calendar-header");
    t ? t.classList.add("vxc-calendar-header") : (t = document.createElement("div"), t.className = "vxc-calendar-header", this.root.appendChild(t));
    let e = t.querySelector("[data-vx-cal-prev]");
    e ? e.classList.add("vxc-calendar-nav") : (e = document.createElement("button"), e.type = "button", e.className = "vxc-calendar-nav", e.dataset.vxCalPrev = "", e.textContent = "Prev", t.appendChild(e));
    let s = t.querySelector(".vxc-calendar-title, .c-calendar-title");
    s ? s.classList.add("vxc-calendar-title") : (s = document.createElement("div"), s.className = "vxc-calendar-title", t.appendChild(s));
    let a = t.querySelector("[data-vx-cal-next]");
    a ? a.classList.add("vxc-calendar-nav") : (a = document.createElement("button"), a.type = "button", a.className = "vxc-calendar-nav", a.dataset.vxCalNext = "", a.textContent = "Next", t.appendChild(a));
    let n = this.root.querySelector(
      ".vxc-calendar-weekdays, .c-calendar-weekdays"
    );
    n ? n.classList.add("vxc-calendar-weekdays") : (n = document.createElement("div"), n.className = "vxc-calendar-weekdays", this.root.appendChild(n));
    let o = this.root.querySelector(".vxc-calendar-grid, .c-calendar-grid");
    return o ? o.classList.add("vxc-calendar-grid") : (o = document.createElement("div"), o.className = "vxc-calendar-grid", this.root.appendChild(o)), { header: t, title: s, prev: e, next: a, weekdays: n, grid: o };
  }
  bind() {
    this.parts.prev.addEventListener("click", () => {
      this.viewDate = M(this.viewDate, -1), this.render();
    }), this.parts.next.addEventListener("click", () => {
      this.viewDate = M(this.viewDate, 1), this.render();
    }), this.parts.grid.addEventListener("click", (t) => {
      var n;
      const e = (n = t.target) == null ? void 0 : n.closest("[data-vx-date]");
      if (!e || e.hasAttribute("disabled"))
        return;
      const s = e.getAttribute("data-vx-date"), a = g(s);
      a && (this.isOutOfRange(a) || (this.applySelection(a, s || ""), (a.getFullYear() !== this.viewDate.getFullYear() || a.getMonth() !== this.viewDate.getMonth()) && (this.viewDate = new Date(a.getFullYear(), a.getMonth(), 1)), this.syncDataset(), this.render(), this.root.dispatchEvent(new CustomEvent("vx:calendar-change", { detail: this.getValue() }))));
    });
  }
  applySelection(t, e) {
    if (this.mode === "multi") {
      this.selectedDates.has(e) ? this.selectedDates.delete(e) : this.selectedDates.add(e);
      return;
    }
    if (this.mode === "range") {
      if (!this.rangeStart || this.rangeStart && this.rangeEnd) {
        this.rangeStart = t, this.rangeEnd = null;
        return;
      }
      if (t < this.rangeStart) {
        this.rangeEnd = this.rangeStart, this.rangeStart = t;
        return;
      }
      this.rangeEnd = t;
      return;
    }
    this.selected = t;
  }
  syncDataset() {
    if (this.root.dataset.vxSelection = this.mode, this.mode === "single") {
      const s = this.selected ? c(this.selected) : "";
      this.root.dataset.vxSelected = s, delete this.root.dataset.vxSelectedDates, delete this.root.dataset.vxRangeStart, delete this.root.dataset.vxRangeEnd;
      return;
    }
    if (this.mode === "multi") {
      const a = [...this.selectedDates].sort().join(",");
      this.root.dataset.vxSelected = a, this.root.dataset.vxSelectedDates = a, delete this.root.dataset.vxRangeStart, delete this.root.dataset.vxRangeEnd;
      return;
    }
    const t = this.rangeStart ? c(this.rangeStart) : "", e = this.rangeEnd ? c(this.rangeEnd) : "";
    this.root.dataset.vxRangeStart = t, this.root.dataset.vxRangeEnd = e, this.root.dataset.vxSelected = e ? `${t}/${e}` : t, delete this.root.dataset.vxSelectedDates;
  }
  getValue() {
    return this.mode === "multi" ? {
      mode: this.mode,
      selectedDates: [...this.selectedDates].sort()
    } : this.mode === "range" ? {
      mode: this.mode,
      rangeStart: this.rangeStart ? c(this.rangeStart) : null,
      rangeEnd: this.rangeEnd ? c(this.rangeEnd) : null
    } : {
      mode: this.mode,
      selected: this.selected ? c(this.selected) : null
    };
  }
  isOutOfRange(t) {
    return !!(this.minDate && t < this.minDate || this.maxDate && t > this.maxDate);
  }
  renderWeekdays() {
    if (this.weekdaysReady)
      return;
    const t = U(this.weekdayFormatter, this.weekStart), e = document.createDocumentFragment();
    t.forEach((s) => {
      const a = document.createElement("div");
      a.textContent = s, e.appendChild(a);
    }), this.parts.weekdays.replaceChildren(e), this.weekdaysReady = !0;
  }
  isDateSelected(t) {
    return this.mode === "multi" ? this.selectedDates.has(t) : this.mode === "range" ? t === (this.rangeStart ? c(this.rangeStart) : null) : this.selected ? c(this.selected) === t : !1;
  }
  isDateInRange(t) {
    if (this.mode !== "range" || !this.rangeStart || !this.rangeEnd)
      return !1;
    const e = t.getTime();
    return e > this.rangeStart.getTime() && e < this.rangeEnd.getTime();
  }
  isRangeStart(t) {
    return this.mode === "range" && this.rangeStart ? c(this.rangeStart) === t : !1;
  }
  isRangeEnd(t) {
    return this.mode === "range" && this.rangeEnd ? c(this.rangeEnd) === t : !1;
  }
  renderGrid() {
    const t = this.viewDate.getFullYear(), e = this.viewDate.getMonth(), n = (new Date(t, e, 1).getDay() - this.weekStart + 7) % 7, o = new Date(t, e, 1 - n), m = 42, y = document.createDocumentFragment();
    for (let x = 0; x < m; x += 1) {
      const v = new Date(o.getFullYear(), o.getMonth(), o.getDate() + x), B = v.getMonth() === e, p = c(v), T = this.isDateSelected(p), Y = this.todayIso === p, f = this.isOutOfRange(v), V = this.isDateInRange(v), W = this.isRangeStart(p), z = this.isRangeEnd(p), d = document.createElement("button");
      d.type = "button", d.className = "vxc-calendar-day c-calendar-day", d.textContent = `${v.getDate()}`, d.setAttribute("data-vx-date", p), d.setAttribute("aria-label", p), B || d.classList.add("vxs-outside"), Y && (d.classList.add("vxs-today"), d.setAttribute("aria-current", "date")), T && !f && (d.classList.add("vxs-selected"), d.setAttribute("aria-selected", "true")), V && !f && d.classList.add("vxs-in-range"), W && !f && d.classList.add("vxs-range-start"), z && !f && d.classList.add("vxs-range-end"), f && (d.classList.add("vxs-disabled"), d.setAttribute("disabled", "true")), y.appendChild(d);
    }
    this.parts.grid.replaceChildren(y);
  }
  render() {
    this.parts.title.textContent = this.monthFormatter.format(this.viewDate), this.renderWeekdays(), this.renderGrid();
  }
  static wire() {
    document.querySelectorAll('[data-vx="calendar"]').forEach((t) => {
      new R(t);
    });
  }
}
const S = (r, t, e) => Math.min(e, Math.max(t, r)), E = (r, t = 0) => {
  const e = Number(r);
  return Number.isFinite(e) ? e : t;
};
class F {
  constructor(t) {
    i(this, "root");
    i(this, "bar");
    i(this, "layer");
    this.root = t, this.root.classList.add("vxc-progress", "vxc-progress-particles"), this.bar = this.ensureBar(), this.layer = this.ensureLayer(), this.seedParticles(), this.setProgress(this.readInitialProgress()), this.bindInputSync();
  }
  ensureBar() {
    let t = this.root.querySelector(".vxc-progress-bar");
    return t || (t = document.createElement("div"), t.className = "vxc-progress-bar", this.root.appendChild(t)), t;
  }
  ensureLayer() {
    let t = this.root.querySelector(".vxc-progress-particle-layer");
    return t || (t = document.createElement("div"), t.className = "vxc-progress-particle-layer", this.root.appendChild(t)), t.setAttribute("aria-hidden", "true"), t;
  }
  readInitialProgress() {
    const t = E(this.root.dataset.vxProgress, Number.NaN);
    if (Number.isFinite(t))
      return S(t, 0, 100);
    const e = E(this.bar.style.width.replace("%", ""), 0);
    return S(e, 0, 100);
  }
  seedParticles() {
    const t = S(Math.round(E(this.root.dataset.vxParticleCount, 14)), 6, 32), e = document.createDocumentFragment();
    for (let s = 0; s < t; s += 1) {
      const a = document.createElement("span"), n = (Math.random() - 0.5) * 42, o = -4 - Math.random() * 26, m = n * 0.4, y = o * 0.42, x = 0.72 + Math.random() * 0.66, v = (s * 0.075 + Math.random() * 0.55).toFixed(2);
      a.className = "vxc-progress-particle", a.style.setProperty("--vx-px", `${n.toFixed(2)}px`), a.style.setProperty("--vx-py", `${o.toFixed(2)}px`), a.style.setProperty("--vx-px-mid", `${m.toFixed(2)}px`), a.style.setProperty("--vx-py-mid", `${y.toFixed(2)}px`), a.style.setProperty("--vx-scale", x.toFixed(2)), a.style.setProperty("--vx-scale-mid", (x * 0.72).toFixed(2)), a.style.setProperty("--vx-delay", `${v}s`), e.appendChild(a);
    }
    this.layer.replaceChildren(e);
  }
  bindInputSync() {
    const t = this.root.dataset.vxProgressSource;
    if (!t)
      return;
    const e = document.getElementById(t);
    if (!e)
      return;
    const s = () => this.setProgress(E(e.value, 0));
    e.addEventListener("input", s), e.addEventListener("change", s), s();
  }
  setProgress(t) {
    const e = S(Math.round(t), 0, 100);
    this.root.dataset.vxProgress = `${e}`, this.root.style.setProperty("--vx-progress", `${e}`), this.root.style.setProperty("--vx-progress-intensity", Math.max(0.25, e / 100).toFixed(2)), this.bar.style.width = `${e}%`;
  }
  static wire() {
    document.querySelectorAll('[data-vx="particle-progress"]').forEach((t) => {
      new F(t);
    });
  }
}
class O {
  constructor(t) {
    i(this, "root");
    i(this, "image");
    i(this, "observer");
    i(this, "visible");
    i(this, "loaded");
    this.root = t, this.image = t.querySelector("img"), this.observer = null, this.visible = !1, this.loaded = !1, this.image && (this.root.classList.add("vxc-image-reveal"), this.bindLoad(), this.bindVisibility());
  }
  bindLoad() {
    if (!this.image)
      return;
    const t = () => {
      this.loaded = !0, this.root.classList.add("vxs-loaded"), this.updateState();
    };
    if (this.image.complete && this.image.naturalWidth > 0) {
      t();
      return;
    }
    this.image.addEventListener("load", t, { once: !0 }), this.image.addEventListener("error", t, { once: !0 });
  }
  bindVisibility() {
    if (typeof window > "u" || !("IntersectionObserver" in window)) {
      this.visible = !0, this.root.classList.add("vxs-visible"), this.updateState();
      return;
    }
    this.observer = new IntersectionObserver(
      (t) => {
        var s;
        const e = t[0];
        e != null && e.isIntersecting && (this.visible = !0, this.root.classList.add("vxs-visible"), this.updateState(), (s = this.observer) == null || s.disconnect(), this.observer = null);
      },
      { threshold: 0.2 }
    ), this.observer.observe(this.root);
  }
  updateState() {
    this.root.dataset.vxState = this.visible && this.loaded ? "open" : "closed";
  }
  static wire() {
    document.querySelectorAll('[data-vx="image-reveal"]').forEach((t) => {
      new O(t);
    });
  }
}
const I = () => {
  b.wire(), D.wire(), A.wire(), j.wire(), L.wire(), k.wire(), q.wire(), C.wire(), N.wire(), R.wire(), F.wire(), O.wire();
}, Q = () => {
  var r;
  return typeof document < "u" && ((r = document.documentElement) == null ? void 0 : r.hasAttribute("data-vx-auto"));
};
Q() && (document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", () => I()) : I());
export {
  q as Accordion,
  R as Calendar,
  D as Drawer,
  A as Dropdown,
  O as ImageReveal,
  b as Modal,
  N as Navbar,
  F as ParticleProgress,
  C as Popover,
  L as Tabs,
  k as ToastStack,
  j as Tooltip,
  I as autoInit
};
//# sourceMappingURL=velynx.esm.js.map
