import { setAriaExpanded, setAriaHidden, toggleClass } from './helpers';

export class Accordion {
  private root: HTMLElement;

  constructor(root: HTMLElement) {
    this.root = root;
  }

  toggle(panelId: string) {
    this.root.querySelectorAll<HTMLElement>('[data-vx-panel]').forEach((panel) => {
      const isActive = panel.getAttribute('data-vx-panel') === panelId;
      toggleClass(panel, 'vxs-hidden', !isActive);
      setAriaHidden(panel, !isActive);
    });
    this.root.querySelectorAll<HTMLElement>('[data-vx-trigger]').forEach((trigger) => {
      const isActive = trigger.getAttribute('data-vx-trigger') === panelId;
      setAriaExpanded(trigger, isActive);
    });
  }

  static wire() {
    document.querySelectorAll<HTMLElement>('[data-vx="accordion"]').forEach((root) => {
      const accordion = new Accordion(root);
      root.querySelectorAll<HTMLElement>('[data-vx-panel]').forEach((panel) => {
        toggleClass(panel, 'vxs-hidden', true);
        setAriaHidden(panel, true);
      });
      root.querySelectorAll<HTMLElement>('[data-vx-trigger]').forEach((trigger) => {
        trigger.addEventListener('click', () => {
          const id = trigger.getAttribute('data-vx-trigger') || '';
          accordion.toggle(id);
        });
      });
    });
  }
}

