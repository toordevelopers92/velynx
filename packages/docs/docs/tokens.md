# Tokens and theming

Tokens live in `framework.config.ts` and compile into CSS variables in `velynx.tokens.css`. The base theme maps semantic variables to the palette and glass settings.

## Theme classes

- `t-dark` is the default dark-first theme.
- `t-light` switches to the light palette.
- `t-contrast` increases contrast and border visibility.

## Glass tokens

- Surface opacity levels: `--vx-glass-surface1`, `--vx-glass-surface2`, `--vx-glass-surface3`
- Blur strength levels: `--vx-blur-b0` through `--vx-blur-b4`
- Border translucency: `--vx-glass-line1`, `--vx-glass-line2`
- Glow intensity: `--vx-glow-g1` through `--vx-glow-g3`
- Noise overlay: `--vx-noise-fine`, `--vx-noise-bold`

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
