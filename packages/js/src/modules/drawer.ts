import { setAriaExpanded, setAriaHidden, toggleClass } from './helpers';

export class Drawer {
  private root: HTMLElement;

  constructor(root: HTMLElement) {
    this.root = root;
    setAriaHidden(this.root, true);
  }

  open() {
    toggleClass(this.root, 's-open', true);
    setAriaHidden(this.root, false);
  }

  close() {
    toggleClass(this.root, 's-open', false);
    setAriaHidden(this.root, true);
  }

  static wire() {
    document.querySelectorAll<HTMLElement>('[data-vx="drawer"]').forEach((drawerEl) => {
      const drawer = new Drawer(drawerEl);
      const id = drawerEl.id;
      if (!id) {
        return;
      }
      document.querySelectorAll<HTMLElement>(`[data-vx-open="${id}"]`).forEach((btn) => {
        btn.addEventListener('click', () => {
          drawer.open();
          setAriaExpanded(btn, true);
        });
      });
      document.querySelectorAll<HTMLElement>(`[data-vx-close="${id}"]`).forEach((btn) => {
        btn.addEventListener('click', () => {
          drawer.close();
          setAriaExpanded(btn, false);
        });
      });
    });
  }
}
