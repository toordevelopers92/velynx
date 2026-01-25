import { setAriaExpanded, setAriaHidden, toggleClass } from './helpers';

export class Tabs {
  private root: HTMLElement;

  constructor(root: HTMLElement) {
    this.root = root;
  }

  activate(id: string) {
    this.root.querySelectorAll<HTMLElement>('[data-vx-tab]').forEach((tab) => {
      const isActive = tab.getAttribute('data-vx-tab') === id;
      toggleClass(tab, 'vxs-active', isActive);
      setAriaExpanded(tab, isActive);
    });
    this.root.querySelectorAll<HTMLElement>('[data-vx-panel]').forEach((panel) => {
      const isActive = panel.getAttribute('data-vx-panel') === id;
      toggleClass(panel, 'vxs-hidden', !isActive);
      setAriaHidden(panel, !isActive);
    });
  }

  static wire() {
    document.querySelectorAll<HTMLElement>('[data-vx="tabs"]').forEach((root) => {
      const tabs = new Tabs(root);
      const first = root.querySelector<HTMLElement>('[data-vx-tab]');
      if (first) {
        tabs.activate(first.getAttribute('data-vx-tab') || '');
      }
      root.querySelectorAll<HTMLElement>('[data-vx-tab]').forEach((tab) => {
        tab.setAttribute('role', 'tab');
        tab.addEventListener('click', () => {
          const id = tab.getAttribute('data-vx-tab') || '';
          tabs.activate(id);
        });
      });
      root.querySelectorAll<HTMLElement>('[data-vx-panel]').forEach((panel) => {
        panel.setAttribute('role', 'tabpanel');
      });
    });
  }
}

