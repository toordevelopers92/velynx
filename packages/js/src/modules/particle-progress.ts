const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

const toNumber = (value: string | null | undefined, fallback = 0) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

export class ParticleProgress {
  private root: HTMLElement;
  private bar: HTMLElement;
  private layer: HTMLElement;

  constructor(root: HTMLElement) {
    this.root = root;
    this.root.classList.add('vxc-progress', 'vxc-progress-particles');
    this.bar = this.ensureBar();
    this.layer = this.ensureLayer();
    this.seedParticles();
    this.setProgress(this.readInitialProgress());
    this.bindInputSync();
  }

  private ensureBar() {
    let bar = this.root.querySelector<HTMLElement>('.vxc-progress-bar');
    if (!bar) {
      bar = document.createElement('div');
      bar.className = 'vxc-progress-bar';
      this.root.appendChild(bar);
    }
    return bar;
  }

  private ensureLayer() {
    let layer = this.root.querySelector<HTMLElement>('.vxc-progress-particle-layer');
    if (!layer) {
      layer = document.createElement('div');
      layer.className = 'vxc-progress-particle-layer';
      this.root.appendChild(layer);
    }
    layer.setAttribute('aria-hidden', 'true');
    return layer;
  }

  private readInitialProgress() {
    const dataValue = toNumber(this.root.dataset.vxProgress, Number.NaN);
    if (Number.isFinite(dataValue)) {
      return clamp(dataValue, 0, 100);
    }

    const styleValue = toNumber(this.bar.style.width.replace('%', ''), 0);
    return clamp(styleValue, 0, 100);
  }

  private seedParticles() {
    const count = clamp(Math.round(toNumber(this.root.dataset.vxParticleCount, 14)), 6, 32);
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < count; i += 1) {
      const particle = document.createElement('span');
      const spreadX = (Math.random() - 0.5) * 42;
      const spreadY = -4 - Math.random() * 26;
      const midpointX = spreadX * 0.4;
      const midpointY = spreadY * 0.42;
      const scale = 0.72 + Math.random() * 0.66;
      const delay = (i * 0.075 + Math.random() * 0.55).toFixed(2);

      particle.className = 'vxc-progress-particle';
      particle.style.setProperty('--vx-px', `${spreadX.toFixed(2)}px`);
      particle.style.setProperty('--vx-py', `${spreadY.toFixed(2)}px`);
      particle.style.setProperty('--vx-px-mid', `${midpointX.toFixed(2)}px`);
      particle.style.setProperty('--vx-py-mid', `${midpointY.toFixed(2)}px`);
      particle.style.setProperty('--vx-scale', scale.toFixed(2));
      particle.style.setProperty('--vx-scale-mid', (scale * 0.72).toFixed(2));
      particle.style.setProperty('--vx-delay', `${delay}s`);

      fragment.appendChild(particle);
    }

    this.layer.replaceChildren(fragment);
  }

  private bindInputSync() {
    const sourceId = this.root.dataset.vxProgressSource;
    if (!sourceId) {
      return;
    }
    const source = document.getElementById(sourceId) as HTMLInputElement | null;
    if (!source) {
      return;
    }
    const sync = () => this.setProgress(toNumber(source.value, 0));
    source.addEventListener('input', sync);
    source.addEventListener('change', sync);
    sync();
  }

  setProgress(value: number) {
    const clamped = clamp(Math.round(value), 0, 100);
    this.root.dataset.vxProgress = `${clamped}`;
    this.root.style.setProperty('--vx-progress', `${clamped}`);
    this.root.style.setProperty('--vx-progress-intensity', Math.max(0.25, clamped / 100).toFixed(2));
    this.bar.style.width = `${clamped}%`;
  }

  static wire() {
    document.querySelectorAll<HTMLElement>('[data-vx="particle-progress"]').forEach((progressEl) => {
      new ParticleProgress(progressEl);
    });
  }
}
