import { setAriaExpanded, setAriaHidden, toggleClass } from './helpers';

const modalAngles = [
  'center',
  'top',
  'right',
  'bottom',
  'left',
  'top-left',
  'top-right',
  'bottom-left',
  'bottom-right'
] as const;

type ModalAngle = (typeof modalAngles)[number];

export class Modal {
  private root: HTMLElement;
  private closeOnEscape: boolean;
  private closeOnBackdrop: boolean;

  constructor(root: HTMLElement) {
    this.root = root;
    this.closeOnEscape = this.root.dataset.vxEscapeClose !== 'false';
    this.closeOnBackdrop = this.root.dataset.vxBackdropClose !== 'false';
    this.root.setAttribute('role', 'dialog');
    this.root.setAttribute('aria-modal', 'true');
    this.root.dataset.vxState = 'closed';
    this.setAngle();
    this.bind();
    setAriaHidden(this.root, true);
  }

  open() {
    this.setAngle();
    this.root.dataset.vxState = 'open';
    toggleClass(this.root, 'vxs-open', true);
    setAriaHidden(this.root, false);
  }

  close() {
    this.root.dataset.vxState = 'closed';
    toggleClass(this.root, 'vxs-open', false);
    setAriaHidden(this.root, true);
  }

  private setAngle() {
    const configured = this.root.dataset.vxAngle || 'center';
    if (configured === 'random') {
      const index = Math.floor(Math.random() * modalAngles.length);
      this.root.dataset.vxAngleActive = modalAngles[index];
      return;
    }
    this.root.dataset.vxAngleActive = modalAngles.includes(configured as ModalAngle)
      ? configured
      : 'center';
  }

  private bind() {
    this.root.addEventListener('click', (event) => {
      if (!this.closeOnBackdrop) {
        return;
      }
      if (event.target === this.root) {
        this.close();
      }
    });

    document.addEventListener('keydown', (event) => {
      if (!this.closeOnEscape || event.key !== 'Escape') {
        return;
      }
      if (this.root.classList.contains('vxs-open')) {
        this.close();
      }
    });
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

