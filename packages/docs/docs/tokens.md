# Tokens and theming

Tokens live in `framework.config.ts` and compile into CSS variables in `velynx.tokens.css`. The base theme maps semantic variables to the palette and glass settings.

## Theme classes

- `vxt-dark` is the default dark-first theme.
- `vxt-light` switches to the light palette.
- `vxt-contrast` increases contrast and border visibility.

Try theme switching live in `showcase`.

## Glass tokens

- Surface opacity levels: `--vx-glass-surface1`, `--vx-glass-surface2`, `--vx-glass-surface3`
- Blur strength levels: `--vx-blur-b0` through `--vx-blur-b4`
- Border translucency: `--vx-glass-line1`, `--vx-glass-line2`
- Glow intensity: `--vx-glow-g1` through `--vx-glow-g3`
- Noise overlay: `--vx-noise-fine`, `--vx-noise-bold`

## Typography tokens

- Font families: `--vx-font-sans`, `--vx-font-serif`, `--vx-font-mono`
- Type scale: `--vx-typeScale-t1` through `--vx-typeScale-t7`
- Weights: `--vx-weight-thin` through `--vx-weight-black`
- Leading: `--vx-leading-tight` through `--vx-leading-loose`
- Tracking: `--vx-tracking-tight` through `--vx-tracking-widest`

## Layout + size tokens

- Spacing: `--vx-space-s0` through `--vx-space-s8`
- Size scales: `--vx-size-c20`, `--vx-size-c40`, `--vx-size-p100`, `--vx-size-vw50`
- Radius: `--vx-radius-r1` through `--vx-radius-r5`
- Icon sizing: `--vx-icon-i1` through `--vx-icon-i5`
- Container query sizes: `--vx-container-c1` through `--vx-container-c4`

## Shadow + ring tokens

- Elevation: `--vx-shadow-s1` through `--vx-shadow-s4`
- Ring widths: `--vx-ring-r1`, `--vx-ring-r2`, `--vx-ring-r3`

## Semantic aliases

- `--vx-primary`, `--vx-secondary`, `--vx-success`, `--vx-warning`, `--vx-danger`, `--vx-info`, `--vx-muted`
- `--vx-ring`, `--vx-ring-offset`

## Custom themes

Create a new theme by overriding semantic variables.

```css
.my-theme {
  --vx-bg: #0c0f18;
  --vx-ink: #f7f8ff;
  --vx-surface-1: rgba(18, 24, 40, 0.5);
  --vx-accent: #78e6ff;
}
```



