import { setAriaExpanded, setAriaHidden, toggleClass } from './helpers';

export class Navbar {
  private root: HTMLElement;
  private toggle: HTMLElement | null;
  private menu: HTMLElement | null;

  constructor(root: HTMLElement) {
    this.root = root;
    this.toggle = this.root.querySelector<HTMLElement>('[data-vx-toggle]');
    this.menu = this.root.querySelector<HTMLElement>('[data-vx-menu]');

    if (!this.toggle || !this.menu) {
      return;
    }

    if (this.menu.id) {
      this.toggle.setAttribute('aria-controls', this.menu.id);
    }

    const isOpen = this.menu.classList.contains('s-open');
    setAriaExpanded(this.toggle, isOpen);
    setAriaHidden(this.menu, !isOpen);

    this.toggle.addEventListener('click', () => {
      const nextOpen = !this.menu?.classList.contains('s-open');
      if (nextOpen) {
        this.open();
      } else {
        this.close();
      }
    });

    this.root.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        this.close();
      }
    });

    document.addEventListener('click', (event) => {
      if (!this.menu || !this.menu.classList.contains('s-open')) {
        return;
      }
      if (this.root.contains(event.target as Node)) {
        return;
      }
      this.close();
    });
  }

  open() {
    if (!this.menu) {
      return;
    }
    toggleClass(this.menu, 's-open', true);
    setAriaExpanded(this.toggle, true);
    setAriaHidden(this.menu, false);
  }

  close() {
    if (!this.menu) {
      return;
    }
    toggleClass(this.menu, 's-open', false);
    setAriaExpanded(this.toggle, false);
    setAriaHidden(this.menu, true);
  }

  static wire() {
    document.querySelectorAll<HTMLElement>('[data-vx="navbar"]').forEach((navEl) => {
      new Navbar(navEl);
    });
  }
}
