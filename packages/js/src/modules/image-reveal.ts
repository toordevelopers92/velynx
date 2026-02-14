export class ImageReveal {
  private root: HTMLElement;
  private image: HTMLImageElement | null;
  private observer: IntersectionObserver | null;
  private visible: boolean;
  private loaded: boolean;

  constructor(root: HTMLElement) {
    this.root = root;
    this.image = root.querySelector<HTMLImageElement>('img');
    this.observer = null;
    this.visible = false;
    this.loaded = false;

    if (!this.image) {
      return;
    }

    this.root.classList.add('vxc-image-reveal');
    this.bindLoad();
    this.bindVisibility();
  }

  private bindLoad() {
    if (!this.image) {
      return;
    }

    const markLoaded = () => {
      this.loaded = true;
      this.root.classList.add('vxs-loaded');
      this.updateState();
    };

    if (this.image.complete && this.image.naturalWidth > 0) {
      markLoaded();
      return;
    }

    this.image.addEventListener('load', markLoaded, { once: true });
    this.image.addEventListener('error', markLoaded, { once: true });
  }

  private bindVisibility() {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      this.visible = true;
      this.root.classList.add('vxs-visible');
      this.updateState();
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting) {
          return;
        }
        this.visible = true;
        this.root.classList.add('vxs-visible');
        this.updateState();
        this.observer?.disconnect();
        this.observer = null;
      },
      { threshold: 0.2 }
    );

    this.observer.observe(this.root);
  }

  private updateState() {
    this.root.dataset.vxState = this.visible && this.loaded ? 'open' : 'closed';
  }

  static wire() {
    document.querySelectorAll<HTMLElement>('[data-vx="image-reveal"]').forEach((imageEl) => {
      new ImageReveal(imageEl);
    });
  }
}
