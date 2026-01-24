import fs from 'node:fs/promises';
import path from 'node:path';
import postcss from 'postcss';
import autoprefixer from 'autoprefixer';
import framework from '../../../framework.config';

const rootDir = process.cwd();
const outDir = path.join(rootDir, 'dist');

const layerOrder = '@layer base, tokens, utilities, components, overrides;\n';

const readText = async (file: string) => {
  const filePath = path.join(rootDir, file);
  return fs.readFile(filePath, 'utf8');
};

const toVars = (group: string, tokens: Record<string, string>) => {
  return Object.entries(tokens)
    .map(([key, value]) => `  --vx-${group}-${key}: ${value};`)
    .join('\n');
};

const buildTokens = () => {
  const t = framework.tokens;
  const blocks = [
    toVars('space', t.space),
    toVars('size', t.size),
    toVars('radius', t.radius),
    toVars('blur', t.blur),
    toVars('opacity', t.opacity),
    toVars('glow', t.glow),
    toVars('border', t.border),
    toVars('duration', t.duration),
    toVars('easing', t.easing),
    toVars('z', t.z),
    toVars('palette', t.palette),
    toVars('glass', t.glass),
    toVars('noise', t.noise)
  ].join('\n');

  return `@layer tokens {\n:root {\n${blocks}\n}\n}\n`;
};

const classRule = (name: string, body: string) => `.${name} {\n${body}\n}\n`;

const generateUtilities = () => {
  const t = framework.tokens;
  const rules: string[] = [];

  for (const key of Object.keys(t.space)) {
    rules.push(classRule(`u-space-in--${key}`, `  padding: var(--vx-space-${key});`));
    rules.push(classRule(`u-space-x--${key}`, `  padding-inline: var(--vx-space-${key});`));
    rules.push(classRule(`u-space-y--${key}`, `  padding-block: var(--vx-space-${key});`));
    rules.push(classRule(`u-space-out--${key}`, `  margin: var(--vx-space-${key});`));
    rules.push(classRule(`u-space-gap--${key}`, `  gap: var(--vx-space-${key});`));
  }

  for (const key of Object.keys(t.size)) {
    rules.push(classRule(`u-measure-w--${key}`, `  width: var(--vx-size-${key});`));
    rules.push(classRule(`u-measure-h--${key}`, `  height: var(--vx-size-${key});`));
    rules.push(classRule(`u-measure-maxw--${key}`, `  max-width: var(--vx-size-${key});`));
    rules.push(classRule(`u-measure-minw--${key}`, `  min-width: var(--vx-size-${key});`));
  }

  const typeScale = {
    t1: '0.875rem',
    t2: '1rem',
    t3: '1.125rem',
    t4: '1.375rem',
    t5: '1.75rem',
    t6: '2.25rem',
    t7: '3rem'
  };

  for (const key of Object.keys(typeScale)) {
    rules.push(
      classRule(`u-type-scale--${key}`, `  font-size: ${typeScale[key as keyof typeof typeScale]};`)
    );
  }

  for (const key of Object.keys(t.radius)) {
    rules.push(classRule(`u-radius--${key}`, `  border-radius: var(--vx-radius-${key});`));
  }

  for (const key of Object.keys(t.blur)) {
    rules.push(classRule(`u-blur--${key}`, `  backdrop-filter: blur(var(--vx-blur-${key}));`));
  }

  for (const key of Object.keys(t.glow)) {
    rules.push(classRule(`u-glow--${key}`, `  box-shadow: var(--vx-glow-${key});`));
  }

  rules.push(classRule('u-tone-ink--main', '  color: var(--vx-ink);'));
  rules.push(classRule('u-tone-ink--mute', '  color: var(--vx-ink-muted);'));
  rules.push(classRule('u-tone-ink--accent', '  color: var(--vx-accent);'));
  rules.push(classRule('u-tone-surface--1', '  background: var(--vx-surface-1);'));
  rules.push(classRule('u-tone-surface--2', '  background: var(--vx-surface-2);'));
  rules.push(classRule('u-tone-surface--3', '  background: var(--vx-surface-3);'));
  rules.push(classRule('u-tone-line--1', '  border-color: var(--vx-line-1);'));
  rules.push(classRule('u-tone-line--2', '  border-color: var(--vx-line-2);'));

  rules.push(
    classRule(
      'u-glass--1',
      '  background: var(--vx-surface-1);\n  backdrop-filter: blur(var(--vx-blur-b3));'
    )
  );
  rules.push(
    classRule(
      'u-glass--2',
      '  background: var(--vx-surface-2);\n  backdrop-filter: blur(var(--vx-blur-b2));'
    )
  );

  rules.push(
    classRule(
      'u-noise--fine',
      '  background-image: repeating-linear-gradient(45deg, rgba(255,255,255,var(--vx-noise-fine)) 0 1px, transparent 1px 3px);\n  background-size: 120px 120px;'
    )
  );

  rules.push(classRule('u-flow-stack--s2', '  display: flex;\n  flex-direction: column;\n  gap: var(--vx-space-s2);'));
  rules.push(classRule('u-flow-stack--s4', '  display: flex;\n  flex-direction: column;\n  gap: var(--vx-space-s4);'));
  rules.push(classRule('u-flow-row--s2', '  display: flex;\n  flex-direction: row;\n  gap: var(--vx-space-s2);'));
  rules.push(classRule('u-flow-row--s4', '  display: flex;\n  flex-direction: row;\n  gap: var(--vx-space-s4);'));
  rules.push(classRule('u-flow-center', '  display: grid;\n  place-items: center;'));
  rules.push(classRule('u-grid--2', '  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: var(--vx-space-s4);'));
  rules.push(classRule('u-grid--3', '  display: grid;\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n  gap: var(--vx-space-s4);'));
  rules.push(classRule('u-container', '  width: 100%;\n  max-width: 72rem;\n  margin-inline: auto;\n  padding-inline: var(--vx-space-s4);'));
  rules.push(classRule('u-cq', '  container-type: inline-size;\n  container-name: vx;'));

  rules.push(classRule('u-sr-only', '  position: absolute;\n  width: 1px;\n  height: 1px;\n  padding: 0;\n  margin: -1px;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  border: 0;'));
  rules.push(classRule('u-focus-ring', '  outline: 2px solid var(--vx-accent);\n  outline-offset: 2px;'));

  rules.push(classRule('s-hidden', '  display: none !important;'));
  rules.push(classRule('s-open', '  display: block;'));
  rules.push(classRule('s-muted', '  opacity: 0.7;'));
  rules.push(classRule('s-disabled', '  pointer-events: none;\n  opacity: 0.6;'));

  rules.push(classRule('m-fade-1', '  animation: vx-fade-in var(--vx-duration-d3) var(--vx-easing-e2) both;'));
  rules.push(classRule('m-glow-pulse', '  animation: vx-glow-pulse 2.2s ease-in-out infinite;'));

  for (const [bp, width] of Object.entries(framework.breakpoints)) {
    const bpRules: string[] = [];
    for (const key of Object.keys(t.space)) {
      bpRules.push(classRule(`u-at-${bp}--space-in--${key}`, `  padding: var(--vx-space-${key});`));
      bpRules.push(classRule(`u-at-${bp}--space-out--${key}`, `  margin: var(--vx-space-${key});`));
      bpRules.push(classRule(`u-at-${bp}--space-gap--${key}`, `  gap: var(--vx-space-${key});`));
    }
    bpRules.push(classRule(`u-at-${bp}--grid--2`, '  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: var(--vx-space-s4);'));
    bpRules.push(classRule(`u-at-${bp}--grid--3`, '  display: grid;\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n  gap: var(--vx-space-s4);'));
    rules.push(`@media (min-width: ${width}) {\n${bpRules.join('')}\n}\n`);
  }

  return `@layer utilities {\n${rules.join('')}\n}\n`;
};

export const buildOutput = async () => {
  await fs.mkdir(outDir, { recursive: true });
  const baseCss = await readText('src/base.css');
  const componentsCore = await readText('src/components-core.css');
  const componentsExtended = await readText('src/components-extended.css');
  const tokensCss = buildTokens();
  const utilitiesCss = generateUtilities();

  const coreCss = `${layerOrder}${baseCss}\n${tokensCss}\n${utilitiesCss}\n${componentsCore}`;
  const extendedCss = `${layerOrder}${baseCss}\n${tokensCss}\n${utilitiesCss}\n${componentsCore}\n${componentsExtended}`;

  const processor = postcss([autoprefixer()]);
  const coreResult = await processor.process(coreCss, { from: undefined });
  const extendedResult = await processor.process(extendedCss, { from: undefined });
  const tokensResult = await processor.process(tokensCss, { from: undefined });

  await fs.writeFile(path.join(outDir, 'velynx.core.css'), coreResult.css);
  await fs.writeFile(path.join(outDir, 'velynx.extended.css'), extendedResult.css);
  await fs.writeFile(path.join(outDir, 'velynx.tokens.css'), tokensResult.css);
};

if (import.meta.url === `file://${process.argv[1]}`) {
  buildOutput().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
