export class Tooltip {
  static wire() {
    const triggers = document.querySelectorAll<HTMLElement>('[data-vx-tooltip]');
    triggers.forEach((trigger) => {
      let tipEl: HTMLDivElement | null = null;
      const text = trigger.getAttribute('data-vx-tooltip') || '';

      const show = () => {
        if (!text) return;
        tipEl = document.createElement('div');
        tipEl.className = 'vxc-tooltip vxm-fade-1';
        tipEl.textContent = text;
        document.body.appendChild(tipEl);
        const rect = trigger.getBoundingClientRect();
        tipEl.style.position = 'fixed';
        tipEl.style.top = `${rect.bottom + 8}px`;
        tipEl.style.left = `${rect.left}px`;
      };

      const hide = () => {
        if (tipEl) {
          tipEl.remove();
          tipEl = null;
        }
      };

      trigger.addEventListener('mouseenter', show);
      trigger.addEventListener('focus', show);
      trigger.addEventListener('mouseleave', hide);
      trigger.addEventListener('blur', hide);
    });
  }
}

