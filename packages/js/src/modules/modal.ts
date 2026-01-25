import { setAriaExpanded, setAriaHidden, toggleClass } from './helpers';

export class Modal {
  private root: HTMLElement;

  constructor(root: HTMLElement) {
    this.root = root;
    this.root.setAttribute('role', 'dialog');
    this.root.setAttribute('aria-modal', 'true');
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
    document.querySelectorAll<HTMLElement>('[data-vx="modal"]').forEach((modalEl) => {
      const modal = new Modal(modalEl);
      const id = modalEl.id;
      if (!id) {
        return;
      }
      document.querySelectorAll<HTMLElement>(`[data-vx-open="${id}"]`).forEach((btn) => {
        btn.addEventListener('click', () => {
          modal.open();
          setAriaExpanded(btn, true);
        });
      });
      document.querySelectorAll<HTMLElement>(`[data-vx-close="${id}"]`).forEach((btn) => {
        btn.addEventListener('click', () => {
          modal.close();
          setAriaExpanded(btn, false);
        });
      });
    });
  }
}
