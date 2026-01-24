import { setAriaExpanded, toggleClass } from './helpers';

export class Dropdown {
  private root: HTMLElement;
  private toggle: HTMLElement | null;
  private menu: HTMLElement | null;

  constructor(root: HTMLElement) {
    this.root = root;
    this.toggle = root.querySelector<HTMLElement>('[data-vx-toggle]');
    this.menu = root.querySelector<HTMLElement>('[data-vx-menu]');
    this.toggle?.setAttribute('aria-haspopup', 'menu');
    setAriaExpanded(this.toggle, false);
  }

  open() {
    if (!this.menu || !this.toggle) return;
    toggleClass(this.menu, 's-open', true);
    setAriaExpanded(this.toggle, true);
  }

  close() {
    if (!this.menu || !this.toggle) return;
    toggleClass(this.menu, 's-open', false);
    setAriaExpanded(this.toggle, false);
  }

  static wire() {
    document.querySelectorAll<HTMLElement>('[data-vx="dropdown"]').forEach((root) => {
      const dropdown = new Dropdown(root);
      dropdown.toggle?.addEventListener('click', () => {
        dropdown.menu?.classList.contains('s-open') ? dropdown.close() : dropdown.open();
      });
      document.addEventListener('click', (event) => {
        if (!root.contains(event.target as Node)) {
          dropdown.close();
        }
      });
    });
  }
}
