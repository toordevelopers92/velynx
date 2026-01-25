export const framework = {
  name: 'velynx',
  classPrefix: {
    utilities: 'u-',
    components: 'c-',
    states: 's-',
    motion: 'm-',
    themes: 't-'
  },
  breakpoints: {
    s: '36rem',
    m: '56rem',
    l: '72rem',
    xl: '90rem',
    '2xl': '96rem'
  },
  tokens: {
    font: {
      sans: '"Space Grotesk", "Segoe UI", sans-serif',
      serif: '"Cormorant Garamond", "Times New Roman", serif',
      mono: '"JetBrains Mono", "Fira Code", monospace'
    },
    space: {
      s0: '0',
      s1: '0.25rem',
      s2: '0.5rem',
      s3: '0.75rem',
      s4: '1rem',
      s5: '1.5rem',
      s6: '2rem',
      s7: '3rem',
      s8: '4rem'
    },
    size: {
      c20: '20ch',
      c40: '40ch',
      c60: '60ch',
      p25: '25%',
      p50: '50%',
      p75: '75%',
      p100: '100%',
      vw50: '50vw'
    },
    radius: {
      r1: '0.25rem',
      r2: '0.5rem',
      r3: '0.75rem',
      r4: '1rem',
      r5: '1.5rem'
    },
    blur: {
      b0: '0',
      b1: '4px',
      b2: '8px',
      b3: '16px',
      b4: '24px'
    },
    opacity: {
      o1: '0.04',
      o2: '0.08',
      o3: '0.12',
      o4: '0.2',
      o5: '0.35',
      o6: '0.6'
    },
    glow: {
      g0: '0 0 0 rgba(0, 0, 0, 0)',
      g1: '0 0 12px rgba(125, 212, 255, 0.35)',
      g2: '0 0 24px rgba(125, 212, 255, 0.45)',
      g3: '0 0 40px rgba(125, 212, 255, 0.6)'
    },
    shadow: {
      s1: '0 12px 30px rgba(8, 12, 22, 0.35)',
      s2: '0 18px 50px rgba(8, 12, 22, 0.45)',
      s3: '0 30px 80px rgba(8, 12, 22, 0.55)',
      s4: '0 40px 120px rgba(8, 12, 22, 0.65)'
    },
    border: {
      thin: '1px',
      thick: '2px'
    },
    ring: {
      r1: '1px',
      r2: '2px',
      r3: '4px'
    },
    duration: {
      d1: '120ms',
      d2: '200ms',
      d3: '320ms',
      d4: '480ms'
    },
    easing: {
      e1: 'cubic-bezier(0.2, 0.6, 0.2, 1)',
      e2: 'cubic-bezier(0.16, 1, 0.3, 1)'
    },
    z: {
      z1: '10',
      z2: '100',
      z3: '1000'
    },
    palette: {
      ink1: '#f8f7ff',
      ink2: '#cfd6f6',
      ink3: '#9aa6d1',
      base0: '#0b0f1a',
      base1: '#0f1426',
      base2: '#141a33',
      base3: '#1e2445',
      neon: '#7dd4ff',
      pulse: '#6ef7c6',
      alert: '#ff6b6b',
      warn: '#f4d35e'
    },
    glass: {
      surface1: 'rgba(18, 24, 40, 0.55)',
      surface2: 'rgba(18, 24, 40, 0.38)',
      surface3: 'rgba(18, 24, 40, 0.22)',
      line1: 'rgba(160, 186, 255, 0.25)',
      line2: 'rgba(160, 186, 255, 0.4)'
    },
    noise: {
      fine: '0.03',
      bold: '0.06'
    }
  }
};

export type FrameworkConfig = typeof framework;
export default framework;
