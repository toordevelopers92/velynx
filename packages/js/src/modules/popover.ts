import { toggleClass } from './helpers';

export class Popover {
  private trigger: HTMLElement;
  private panel: HTMLElement | null;

  constructor(trigger: HTMLElement) {
    this.trigger = trigger;
    const id = trigger.getAttribute('data-vx-popover') || '';
    this.panel = id ? document.getElementById(id) : null;
    this.trigger.setAttribute('aria-haspopup', 'dialog');
  }

  open() {
    if (!this.panel) return;
    toggleClass(this.panel, 's-hidden', false);
  }

  close() {
    if (!this.panel) return;
    toggleClass(this.panel, 's-hidden', true);
  }

  static wire() {
    document.querySelectorAll<HTMLElement>('[data-vx-popover]').forEach((trigger) => {
      const popover = new Popover(trigger);
      popover.close();
      trigger.addEventListener('click', () => {
        popover.panel?.classList.contains('s-hidden') ? popover.open() : popover.close();
      });
      document.addEventListener('click', (event) => {
        if (!trigger.contains(event.target as Node) && !popover.panel?.contains(event.target as Node)) {
          popover.close();
        }
      });
    });
  }
}
