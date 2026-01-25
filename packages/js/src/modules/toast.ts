export class ToastStack {
  private root: HTMLElement;

  constructor(root: HTMLElement) {
    this.root = root;
  }

  show(message: string, timeout = 3200) {
    const toast = document.createElement('div');
    toast.className = 'c-toast m-fade-1';
    toast.textContent = message;
    this.root.appendChild(toast);
    window.setTimeout(() => {
      toast.remove();
    }, timeout);
  }

  static wire() {
    document.querySelectorAll<HTMLElement>('[data-vx="toast-stack"]').forEach((stackEl) => {
      const stack = new ToastStack(stackEl);
      const id = stackEl.id;
      if (!id) return;
      document.querySelectorAll<HTMLElement>(`[data-vx-toast="${id}"]`).forEach((btn) => {
        btn.addEventListener('click', () => {
          const msg = btn.getAttribute('data-vx-toast-msg') || 'Signal sent.';
          stack.show(msg);
        });
      });
    });
  }
}

