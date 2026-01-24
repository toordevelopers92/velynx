export const byId = (id: string) => document.getElementById(id);

export const toggleClass = (el: Element, className: string, on: boolean) => {
  if (on) {
    el.classList.add(className);
  } else {
    el.classList.remove(className);
  }
};

export const setAriaExpanded = (el: Element | null, expanded: boolean) => {
  if (el && 'setAttribute' in el) {
    el.setAttribute('aria-expanded', expanded ? 'true' : 'false');
  }
};

export const setAriaHidden = (el: Element | null, hidden: boolean) => {
  if (el && 'setAttribute' in el) {
    el.setAttribute('aria-hidden', hidden ? 'true' : 'false');
  }
};
