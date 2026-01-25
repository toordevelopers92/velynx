import fs from 'node:fs/promises';
import path from 'node:path';
import postcss from 'postcss';
import autoprefixer from 'autoprefixer';
import * as frameworkModule from '../../../framework.config';

const getFramework = () => frameworkModule.framework ?? frameworkModule.default;

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
  const framework = getFramework();
  const t = framework.tokens;
  const blocks = [
    toVars('font', t.font),
    toVars('space', t.space),
    toVars('size', t.size),
    toVars('radius', t.radius),
    toVars('blur', t.blur),
    toVars('opacity', t.opacity),
    toVars('glow', t.glow),
    toVars('shadow', t.shadow),
    toVars('border', t.border),
    toVars('ring', t.ring),
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

type UtilityRule = {
  name: string;
  body: string;
  selectorTemplate: string;
};

const escapeClassName = (name: string) => {
  let escaped = name.replace(/([:%/])/g, '\\$1');
  if (escaped.startsWith('-')) {
    escaped = `\\-${escaped.slice(1)}`;
  }
  if (/^[0-9]/.test(escaped)) {
    escaped = `\\3${escaped[0]} ${escaped.slice(1)}`;
  }
  return escaped;
};

const generateUtilities = () => {
  const framework = getFramework();
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

const generateAtomicUtilities = () => {
  const framework = getFramework();
  const t = framework.tokens;
  const utilities: UtilityRule[] = [];

  const addUtil = (name: string, body: string, selectorTemplate = '.{{class}}{{suffix}}') => {
    utilities.push({ name, body, selectorTemplate });
  };

  const buildSelector = (rule: UtilityRule, className: string, suffix = '') =>
    rule.selectorTemplate
      .replace('{{class}}', escapeClassName(className))
      .replace('{{suffix}}', suffix);

  const renderRule = (rule: UtilityRule, className: string, suffix = '') =>
    `${buildSelector(rule, className, suffix)} {\n${rule.body}\n}\n`;

  const renderWrappedRule = (wrapper: string, rule: UtilityRule, className: string, suffix = '') =>
    `${wrapper} ${buildSelector(rule, className, suffix)} {\n${rule.body}\n}\n`;

  const renderMultiRule = (selectors: string[], body: string) =>
    `${selectors.join(',\n')} {\n${body}\n}\n`;

  const addProps = (name: string, props: string[], value: string, selectorTemplate?: string) => {
    const body = props.map((prop) => `  ${prop}: ${value};`).join('\n');
    addUtil(name, body, selectorTemplate);
  };

  const spaceScale: Record<string, string> = {
    0: '0',
    1: 'var(--vx-space-s1)',
    2: 'var(--vx-space-s2)',
    3: 'var(--vx-space-s3)',
    4: 'var(--vx-space-s4)',
    5: 'var(--vx-space-s5)',
    6: 'var(--vx-space-s6)',
    7: 'var(--vx-space-s7)',
    8: 'var(--vx-space-s8)'
  };

  const sizeScale: Record<string, string> = {
    0: '0',
    auto: 'auto',
    full: '100%',
    min: 'min-content',
    max: 'max-content',
    fit: 'fit-content'
  };

  for (const key of Object.keys(t.size)) {
    sizeScale[key] = `var(--vx-size-${key})`;
  }

  const widthScale = { ...sizeScale, screen: '100vw' };
  const heightScale = { ...sizeScale, screen: '100vh' };

  const negativeValue = (value: string) => (value === '0' ? '0' : `calc(${value} * -1)`);

  const colorVars: Record<string, string> = {
    primary: 'var(--vx-primary)',
    secondary: 'var(--vx-secondary)',
    success: 'var(--vx-success)',
    warning: 'var(--vx-warning)',
    danger: 'var(--vx-danger)',
    info: 'var(--vx-info)',
    muted: 'var(--vx-muted)',
    ink: 'var(--vx-ink)',
    'ink-muted': 'var(--vx-ink-muted)',
    bg: 'var(--vx-bg)',
    'surface-1': 'var(--vx-surface-1)',
    'surface-2': 'var(--vx-surface-2)',
    'surface-3': 'var(--vx-surface-3)',
    'line-1': 'var(--vx-line-1)',
    'line-2': 'var(--vx-line-2)',
    accent: 'var(--vx-accent)',
    'accent-2': 'var(--vx-accent-2)'
  };

  addUtil('block', '  display: block;');
  addUtil('inline', '  display: inline;');
  addUtil('inline-block', '  display: inline-block;');
  addUtil('flex', '  display: flex;');
  addUtil('inline-flex', '  display: inline-flex;');
  addUtil('grid', '  display: grid;');
  addUtil('inline-grid', '  display: inline-grid;');
  addUtil('hidden', '  display: none !important;');
  addUtil('contents', '  display: contents;');

  addUtil('static', '  position: static;');
  addUtil('relative', '  position: relative;');
  addUtil('absolute', '  position: absolute;');
  addUtil('fixed', '  position: fixed;');
  addUtil('sticky', '  position: sticky;');

  addUtil('isolate', '  isolation: isolate;');
  addUtil('isolation-auto', '  isolation: auto;');

  addUtil(
    'container',
    '  width: 100%;\n  max-width: 72rem;\n  margin-inline: auto;\n  padding-inline: var(--vx-space-s4);'
  );
  addUtil('container-fluid', '  width: 100%;\n  padding-inline: var(--vx-space-s4);');
  addUtil('mx-auto', '  margin-left: auto;\n  margin-right: auto;');

  for (const [key, value] of Object.entries(spaceScale)) {
    addProps(`inset-${key}`, ['inset'], value);
    addProps(`inset-x-${key}`, ['left', 'right'], value);
    addProps(`inset-y-${key}`, ['top', 'bottom'], value);
    addProps(`top-${key}`, ['top'], value);
    addProps(`right-${key}`, ['right'], value);
    addProps(`bottom-${key}`, ['bottom'], value);
    addProps(`left-${key}`, ['left'], value);
  }

  addUtil('z-0', '  z-index: 0;');
  addUtil('z-1', '  z-index: var(--vx-z-z1);');
  addUtil('z-2', '  z-index: var(--vx-z-z2);');
  addUtil('z-3', '  z-index: var(--vx-z-z3);');
  addUtil('z-auto', '  z-index: auto;');

  for (const value of ['auto', 'hidden', 'clip', 'visible', 'scroll']) {
    addUtil(`overflow-${value}`, `  overflow: ${value};`);
    addUtil(`overflow-x-${value}`, `  overflow-x: ${value};`);
    addUtil(`overflow-y-${value}`, `  overflow-y: ${value};`);
  }

  addUtil('object-contain', '  object-fit: contain;');
  addUtil('object-cover', '  object-fit: cover;');
  addUtil('object-fill', '  object-fit: fill;');
  addUtil('object-none', '  object-fit: none;');
  addUtil('object-scale-down', '  object-fit: scale-down;');

  addUtil('object-top', '  object-position: top;');
  addUtil('object-bottom', '  object-position: bottom;');
  addUtil('object-left', '  object-position: left;');
  addUtil('object-right', '  object-position: right;');
  addUtil('object-center', '  object-position: center;');

  addUtil('float-left', '  float: left;');
  addUtil('float-right', '  float: right;');
  addUtil('float-none', '  float: none;');
  addUtil('clear-left', '  clear: left;');
  addUtil('clear-right', '  clear: right;');
  addUtil('clear-both', '  clear: both;');
  addUtil('clear-none', '  clear: none;');

  addUtil('aspect-auto', '  aspect-ratio: auto;');
  addUtil('aspect-square', '  aspect-ratio: 1 / 1;');
  addUtil('aspect-video', '  aspect-ratio: 16 / 9;');
  addUtil('aspect-4/3', '  aspect-ratio: 4 / 3;');
  addUtil('aspect-3/2', '  aspect-ratio: 3 / 2;');
  addUtil('aspect-16/9', '  aspect-ratio: 16 / 9;');

  for (const [key, value] of Object.entries(widthScale)) {
    addProps(`w-${key}`, ['width'], value);
    addProps(`min-w-${key}`, ['min-width'], value);
    addProps(`max-w-${key}`, ['max-width'], value);
  }

  for (const [key, value] of Object.entries(heightScale)) {
    addProps(`h-${key}`, ['height'], value);
    addProps(`min-h-${key}`, ['min-height'], value);
    addProps(`max-h-${key}`, ['max-height'], value);
  }

  const spacingProps: Record<string, string[]> = {
    p: ['padding'],
    px: ['padding-left', 'padding-right'],
    py: ['padding-top', 'padding-bottom'],
    pt: ['padding-top'],
    pr: ['padding-right'],
    pb: ['padding-bottom'],
    pl: ['padding-left'],
    m: ['margin'],
    mx: ['margin-left', 'margin-right'],
    my: ['margin-top', 'margin-bottom'],
    mt: ['margin-top'],
    mr: ['margin-right'],
    mb: ['margin-bottom'],
    ml: ['margin-left']
  };

  for (const [prefix, props] of Object.entries(spacingProps)) {
    for (const [key, value] of Object.entries(spaceScale)) {
      addProps(`${prefix}-${key}`, props, value);
      if (prefix.startsWith('m') && key !== '0') {
        addProps(`-${prefix}-${key}`, props, negativeValue(value));
      }
    }
  }

  for (const [key, value] of Object.entries(spaceScale)) {
    addProps(`gap-${key}`, ['gap'], value);
    addProps(`gap-x-${key}`, ['column-gap'], value);
    addProps(`gap-y-${key}`, ['row-gap'], value);
    addUtil(`space-x-${key}`, `  margin-left: ${value};`, '.{{class}}{{suffix}} > * + *');
    addUtil(`space-y-${key}`, `  margin-top: ${value};`, '.{{class}}{{suffix}} > * + *');
  }

  addUtil('flex-row', '  flex-direction: row;');
  addUtil('flex-col', '  flex-direction: column;');
  addUtil('flex-row-reverse', '  flex-direction: row-reverse;');
  addUtil('flex-col-reverse', '  flex-direction: column-reverse;');
  addUtil('flex-wrap', '  flex-wrap: wrap;');
  addUtil('flex-nowrap', '  flex-wrap: nowrap;');
  addUtil('flex-wrap-reverse', '  flex-wrap: wrap-reverse;');

  const alignMap: Record<string, string> = {
    start: 'flex-start',
    center: 'center',
    end: 'flex-end',
    stretch: 'stretch',
    baseline: 'baseline'
  };
  for (const [key, value] of Object.entries(alignMap)) {
    addUtil(`items-${key}`, `  align-items: ${value};`);
    addUtil(`self-${key}`, `  align-self: ${value};`);
  }
  addUtil('self-auto', '  align-self: auto;');

  const justifyMap: Record<string, string> = {
    start: 'flex-start',
    center: 'center',
    end: 'flex-end',
    between: 'space-between',
    around: 'space-around',
    evenly: 'space-evenly'
  };
  for (const [key, value] of Object.entries(justifyMap)) {
    addUtil(`justify-${key}`, `  justify-content: ${value};`);
    addUtil(`content-${key}`, `  align-content: ${value};`);
  }

  addUtil('flex-1', '  flex: 1 1 0%;');
  addUtil('flex-auto', '  flex: 1 1 auto;');
  addUtil('flex-initial', '  flex: 0 1 auto;');
  addUtil('flex-none', '  flex: none;');
  addUtil('grow', '  flex-grow: 1;');
  addUtil('grow-0', '  flex-grow: 0;');
  addUtil('shrink', '  flex-shrink: 1;');
  addUtil('shrink-0', '  flex-shrink: 0;');

  addUtil('order-first', '  order: -9999;');
  addUtil('order-last', '  order: 9999;');
  addUtil('order-none', '  order: 0;');
  for (let i = 1; i <= 6; i += 1) {
    addUtil(`order-${i}`, `  order: ${i};`);
  }

  for (const [key, value] of Object.entries(sizeScale)) {
    addProps(`basis-${key}`, ['flex-basis'], value);
  }

  for (let i = 1; i <= 12; i += 1) {
    addUtil(`grid-cols-${i}`, `  grid-template-columns: repeat(${i}, minmax(0, 1fr));`);
    addUtil(`col-span-${i}`, `  grid-column: span ${i} / span ${i};`);
    addUtil(`col-start-${i}`, `  grid-column-start: ${i};`);
    addUtil(`col-end-${i}`, `  grid-column-end: ${i};`);
  }

  addUtil('col-start-auto', '  grid-column-start: auto;');
  addUtil('col-end-auto', '  grid-column-end: auto;');

  for (let i = 1; i <= 6; i += 1) {
    addUtil(`grid-rows-${i}`, `  grid-template-rows: repeat(${i}, minmax(0, 1fr));`);
    addUtil(`row-span-${i}`, `  grid-row: span ${i} / span ${i};`);
    addUtil(`row-start-${i}`, `  grid-row-start: ${i};`);
    addUtil(`row-end-${i}`, `  grid-row-end: ${i};`);
  }

  addUtil('grid-flow-row', '  grid-auto-flow: row;');
  addUtil('grid-flow-col', '  grid-auto-flow: column;');
  addUtil('grid-flow-row-dense', '  grid-auto-flow: row dense;');
  addUtil('grid-flow-col-dense', '  grid-auto-flow: column dense;');

  for (const [key, value] of Object.entries(alignMap)) {
    addUtil(`place-items-${key}`, `  place-items: ${value};`);
    addUtil(`place-self-${key}`, `  place-self: ${value};`);
  }
  for (const [key, value] of Object.entries(justifyMap)) {
    addUtil(`place-content-${key}`, `  place-content: ${value};`);
  }

  addUtil('font-sans', '  font-family: var(--vx-font-sans);');
  addUtil('font-serif', '  font-family: var(--vx-font-serif);');
  addUtil('font-mono', '  font-family: var(--vx-font-mono);');

  const fontSizeScale: Record<string, string> = {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.375rem',
    '2xl': '1.75rem',
    '3xl': '2.25rem',
    '4xl': '3rem',
    '5xl': '3.75rem'
  };
  for (const [key, value] of Object.entries(fontSizeScale)) {
    addUtil(`text-${key}`, `  font-size: ${value};`);
  }

  const fontWeightScale: Record<string, string> = {
    thin: '100',
    extralight: '200',
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
    black: '900'
  };
  for (const [key, value] of Object.entries(fontWeightScale)) {
    addUtil(`font-${key}`, `  font-weight: ${value};`);
  }

  const leadingScale: Record<string, string> = {
    none: '1',
    tight: '1.1',
    snug: '1.3',
    normal: '1.5',
    relaxed: '1.65',
    loose: '1.8'
  };
  for (const [key, value] of Object.entries(leadingScale)) {
    addUtil(`leading-${key}`, `  line-height: ${value};`);
  }

  const trackingScale: Record<string, string> = {
    tighter: '-0.04em',
    tight: '-0.02em',
    normal: '0',
    wide: '0.1em',
    wider: '0.2em',
    widest: '0.3em'
  };
  for (const [key, value] of Object.entries(trackingScale)) {
    addUtil(`tracking-${key}`, `  letter-spacing: ${value};`);
  }

  addUtil('italic', '  font-style: italic;');
  addUtil('not-italic', '  font-style: normal;');
  addUtil('uppercase', '  text-transform: uppercase;');
  addUtil('lowercase', '  text-transform: lowercase;');
  addUtil('capitalize', '  text-transform: capitalize;');
  addUtil('normal-case', '  text-transform: none;');
  addUtil('underline', '  text-decoration-line: underline;');
  addUtil('line-through', '  text-decoration-line: line-through;');
  addUtil('no-underline', '  text-decoration-line: none;');
  addUtil('text-left', '  text-align: left;');
  addUtil('text-center', '  text-align: center;');
  addUtil('text-right', '  text-align: right;');
  addUtil('text-justify', '  text-align: justify;');
  addUtil('truncate', '  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;');
  addUtil('text-ellipsis', '  text-overflow: ellipsis;');
  addUtil('break-words', '  overflow-wrap: break-word;');
  addUtil('break-all', '  word-break: break-all;');
  addUtil('whitespace-normal', '  white-space: normal;');
  addUtil('whitespace-nowrap', '  white-space: nowrap;');
  addUtil('whitespace-pre', '  white-space: pre;');
  addUtil('whitespace-pre-line', '  white-space: pre-line;');
  addUtil('whitespace-pre-wrap', '  white-space: pre-wrap;');
  addUtil('tabular-nums', '  font-variant-numeric: tabular-nums;');
  addUtil('lining-nums', '  font-variant-numeric: lining-nums;');
  addUtil('oldstyle-nums', '  font-variant-numeric: oldstyle-nums;');
  addUtil('proportional-nums', '  font-variant-numeric: proportional-nums;');

  for (const clamp of [1, 2, 3, 4]) {
    addUtil(
      `line-clamp-${clamp}`,
      `  display: -webkit-box;\n  -webkit-line-clamp: ${clamp};\n  -webkit-box-orient: vertical;\n  overflow: hidden;`
    );
  }

  addUtil('bg-transparent', '  background-color: transparent;');
  addUtil('text-transparent', '  color: transparent;');

  for (const [key, value] of Object.entries(colorVars)) {
    addUtil(`text-${key}`, `  color: ${value};`);
    addUtil(`bg-${key}`, `  background-color: ${value};`);
    addUtil(`border-${key}`, `  border-color: ${value};`);
    addUtil(`ring-${key}`, `  --vx-ring-color: ${value};`);
    addUtil(`ring-offset-${key}`, `  --vx-ring-offset-color: ${value};`);
    addUtil(`divide-${key}`, `  --vx-divide-color: ${value};`);
    addUtil(`outline-${key}`, `  outline-color: ${value};`);
    addUtil(`fill-${key}`, `  fill: ${value};`);
    addUtil(`stroke-${key}`, `  stroke: ${value};`);
  }

  addUtil(
    'bg-gradient-1',
    '  background-image: linear-gradient(135deg, var(--vx-surface-1), var(--vx-accent));'
  );
  addUtil(
    'bg-gradient-2',
    '  background-image: linear-gradient(135deg, var(--vx-accent), var(--vx-accent-2));'
  );
  addUtil('bg-none', '  background-image: none;');
  addUtil('bg-cover', '  background-size: cover;');
  addUtil('bg-contain', '  background-size: contain;');
  addUtil('bg-center', '  background-position: center;');
  addUtil('bg-top', '  background-position: top;');
  addUtil('bg-bottom', '  background-position: bottom;');
  addUtil('bg-left', '  background-position: left;');
  addUtil('bg-right', '  background-position: right;');
  addUtil('bg-no-repeat', '  background-repeat: no-repeat;');
  addUtil('bg-repeat', '  background-repeat: repeat;');
  addUtil('bg-repeat-x', '  background-repeat: repeat-x;');
  addUtil('bg-repeat-y', '  background-repeat: repeat-y;');
  addUtil('bg-fixed', '  background-attachment: fixed;');
  addUtil('bg-local', '  background-attachment: local;');
  addUtil('bg-scroll', '  background-attachment: scroll;');

  addUtil(
    'border',
    '  border-width: var(--vx-border-thin);\n  border-style: solid;\n  border-color: var(--vx-line-1);'
  );
  addUtil('border-0', '  border-width: 0;');
  addUtil(
    'border-2',
    '  border-width: var(--vx-border-thick);\n  border-style: solid;\n  border-color: var(--vx-line-1);'
  );
  addUtil('border-4', '  border-width: 4px;\n  border-style: solid;\n  border-color: var(--vx-line-1);');
  addUtil('border-8', '  border-width: 8px;\n  border-style: solid;\n  border-color: var(--vx-line-1);');
  addUtil(
    'border-x',
    '  border-left-width: var(--vx-border-thin);\n  border-right-width: var(--vx-border-thin);\n  border-style: solid;\n  border-color: var(--vx-line-1);'
  );
  addUtil(
    'border-y',
    '  border-top-width: var(--vx-border-thin);\n  border-bottom-width: var(--vx-border-thin);\n  border-style: solid;\n  border-color: var(--vx-line-1);'
  );
  addUtil(
    'border-t',
    '  border-top-width: var(--vx-border-thin);\n  border-style: solid;\n  border-color: var(--vx-line-1);'
  );
  addUtil(
    'border-r',
    '  border-right-width: var(--vx-border-thin);\n  border-style: solid;\n  border-color: var(--vx-line-1);'
  );
  addUtil(
    'border-b',
    '  border-bottom-width: var(--vx-border-thin);\n  border-style: solid;\n  border-color: var(--vx-line-1);'
  );
  addUtil(
    'border-l',
    '  border-left-width: var(--vx-border-thin);\n  border-style: solid;\n  border-color: var(--vx-line-1);'
  );
  addUtil('border-solid', '  border-style: solid;');
  addUtil('border-dashed', '  border-style: dashed;');
  addUtil('border-dotted', '  border-style: dotted;');
  addUtil('border-double', '  border-style: double;');
  addUtil('border-none', '  border-style: none;');

  addUtil('rounded-none', '  border-radius: 0;');
  addUtil('rounded-sm', '  border-radius: var(--vx-radius-r1);');
  addUtil('rounded', '  border-radius: var(--vx-radius-r2);');
  addUtil('rounded-md', '  border-radius: var(--vx-radius-r3);');
  addUtil('rounded-lg', '  border-radius: var(--vx-radius-r4);');
  addUtil('rounded-xl', '  border-radius: var(--vx-radius-r5);');
  addUtil('rounded-full', '  border-radius: 999px;');
  addUtil('rounded-t', '  border-top-left-radius: var(--vx-radius-r2);\n  border-top-right-radius: var(--vx-radius-r2);');
  addUtil('rounded-b', '  border-bottom-left-radius: var(--vx-radius-r2);\n  border-bottom-right-radius: var(--vx-radius-r2);');
  addUtil('rounded-l', '  border-top-left-radius: var(--vx-radius-r2);\n  border-bottom-left-radius: var(--vx-radius-r2);');
  addUtil('rounded-r', '  border-top-right-radius: var(--vx-radius-r2);\n  border-bottom-right-radius: var(--vx-radius-r2);');
  addUtil('rounded-tl', '  border-top-left-radius: var(--vx-radius-r2);');
  addUtil('rounded-tr', '  border-top-right-radius: var(--vx-radius-r2);');
  addUtil('rounded-bl', '  border-bottom-left-radius: var(--vx-radius-r2);');
  addUtil('rounded-br', '  border-bottom-right-radius: var(--vx-radius-r2);');

  addUtil('outline-none', '  outline: 2px solid transparent;\n  outline-offset: 2px;');
  addUtil('outline', '  outline: 2px solid var(--vx-ring);\n  outline-offset: 2px;');
  addUtil('outline-2', '  outline-width: 2px;');
  addUtil('outline-4', '  outline-width: 4px;');
  addUtil('outline-offset-2', '  outline-offset: 2px;');
  addUtil('outline-offset-4', '  outline-offset: 4px;');

  const ringShadow =
    '  box-shadow: 0 0 0 var(--vx-ring-offset-width, 0px) var(--vx-ring-offset-color, var(--vx-ring-offset, transparent)),\n' +
    '    0 0 0 calc(var(--vx-ring-offset-width, 0px) + var(--vx-ring-width, var(--vx-ring-r2))) var(--vx-ring-color, var(--vx-ring));';
  addUtil('ring', `  --vx-ring-width: var(--vx-ring-r2);\n${ringShadow}`);
  addUtil('ring-0', '  --vx-ring-width: 0px;\n  box-shadow: none;');
  addUtil('ring-1', `  --vx-ring-width: var(--vx-ring-r1);\n${ringShadow}`);
  addUtil('ring-2', `  --vx-ring-width: var(--vx-ring-r2);\n${ringShadow}`);
  addUtil('ring-4', `  --vx-ring-width: var(--vx-ring-r3);\n${ringShadow}`);
  addUtil('ring-offset-0', '  --vx-ring-offset-width: 0px;');
  addUtil('ring-offset-1', '  --vx-ring-offset-width: var(--vx-ring-r1);');
  addUtil('ring-offset-2', '  --vx-ring-offset-width: var(--vx-ring-r2);');
  addUtil('ring-offset-4', '  --vx-ring-offset-width: var(--vx-ring-r3);');

  addUtil(
    'divide-x',
    '  border-left: var(--vx-divide-width, var(--vx-border-thin)) solid var(--vx-divide-color, var(--vx-line-1));',
    '.{{class}}{{suffix}} > * + *'
  );
  addUtil(
    'divide-y',
    '  border-top: var(--vx-divide-width, var(--vx-border-thin)) solid var(--vx-divide-color, var(--vx-line-1));',
    '.{{class}}{{suffix}} > * + *'
  );
  addUtil('divide-0', '  --vx-divide-width: 0px;');
  addUtil('divide-2', '  --vx-divide-width: var(--vx-border-thick);');
  addUtil('divide-4', '  --vx-divide-width: 4px;');
  addUtil('divide-8', '  --vx-divide-width: 8px;');

  addUtil('shadow-none', '  box-shadow: none;');
  addUtil('shadow-sm', '  box-shadow: var(--vx-shadow-s1);');
  addUtil('shadow', '  box-shadow: var(--vx-shadow-s2);');
  addUtil('shadow-md', '  box-shadow: var(--vx-shadow-s2);');
  addUtil('shadow-lg', '  box-shadow: var(--vx-shadow-s3);');
  addUtil('shadow-xl', '  box-shadow: var(--vx-shadow-s4);');
  addUtil('shadow-glow', '  box-shadow: var(--vx-glow-g2);');

  const opacityScale: Record<string, string> = {
    0: '0',
    10: 'var(--vx-opacity-o1)',
    20: 'var(--vx-opacity-o2)',
    25: '0.25',
    30: 'var(--vx-opacity-o3)',
    40: 'var(--vx-opacity-o4)',
    50: '0.5',
    60: 'var(--vx-opacity-o5)',
    75: '0.75',
    80: 'var(--vx-opacity-o6)',
    100: '1'
  };
  for (const [key, value] of Object.entries(opacityScale)) {
    addUtil(`opacity-${key}`, `  opacity: ${value};`);
  }

  addUtil('blur-none', '  filter: none;');
  addUtil('blur-sm', '  filter: blur(var(--vx-blur-b1));');
  addUtil('blur', '  filter: blur(var(--vx-blur-b2));');
  addUtil('blur-lg', '  filter: blur(var(--vx-blur-b3));');
  addUtil('blur-xl', '  filter: blur(var(--vx-blur-b4));');
  addUtil('brightness-90', '  filter: brightness(0.9);');
  addUtil('brightness-100', '  filter: brightness(1);');
  addUtil('brightness-110', '  filter: brightness(1.1);');
  addUtil('contrast-90', '  filter: contrast(0.9);');
  addUtil('contrast-100', '  filter: contrast(1);');
  addUtil('contrast-110', '  filter: contrast(1.1);');
  addUtil('grayscale', '  filter: grayscale(1);');
  addUtil('grayscale-0', '  filter: grayscale(0);');

  addUtil('backdrop-blur-none', '  backdrop-filter: none;');
  addUtil('backdrop-blur-sm', '  backdrop-filter: blur(var(--vx-blur-b1));');
  addUtil('backdrop-blur', '  backdrop-filter: blur(var(--vx-blur-b2));');
  addUtil('backdrop-blur-lg', '  backdrop-filter: blur(var(--vx-blur-b3));');
  addUtil('backdrop-blur-xl', '  backdrop-filter: blur(var(--vx-blur-b4));');

  addUtil('transition-none', '  transition-property: none;');
  addUtil(
    'transition',
    '  transition-property: all;\n  transition-duration: var(--vx-duration-d2);\n  transition-timing-function: var(--vx-easing-e1);'
  );
  addUtil(
    'transition-colors',
    '  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;\n  transition-duration: var(--vx-duration-d2);\n  transition-timing-function: var(--vx-easing-e1);'
  );
  addUtil(
    'transition-opacity',
    '  transition-property: opacity;\n  transition-duration: var(--vx-duration-d2);\n  transition-timing-function: var(--vx-easing-e1);'
  );
  addUtil(
    'transition-transform',
    '  transition-property: transform;\n  transition-duration: var(--vx-duration-d2);\n  transition-timing-function: var(--vx-easing-e1);'
  );
  addUtil(
    'transition-shadow',
    '  transition-property: box-shadow;\n  transition-duration: var(--vx-duration-d2);\n  transition-timing-function: var(--vx-easing-e1);'
  );

  const durationScale: Record<string, string> = {
    1: 'var(--vx-duration-d1)',
    2: 'var(--vx-duration-d2)',
    3: 'var(--vx-duration-d3)',
    4: 'var(--vx-duration-d4)',
    75: '75ms',
    150: '150ms',
    300: '300ms',
    500: '500ms'
  };
  for (const [key, value] of Object.entries(durationScale)) {
    addUtil(`duration-${key}`, `  transition-duration: ${value};`);
  }

  const easingScale: Record<string, string> = {
    1: 'var(--vx-easing-e1)',
    2: 'var(--vx-easing-e2)',
    linear: 'linear'
  };
  for (const [key, value] of Object.entries(easingScale)) {
    addUtil(`ease-${key}`, `  transition-timing-function: ${value};`);
  }

  for (const [key, value] of Object.entries({ 0: '0ms', 150: '150ms', 300: '300ms', 500: '500ms' })) {
    addUtil(`delay-${key}`, `  transition-delay: ${value};`);
  }

  const transformTemplate =
    '  transform: translate3d(var(--vx-translate-x, 0), var(--vx-translate-y, 0), 0) rotate(var(--vx-rotate, 0)) skewX(var(--vx-skew-x, 0)) skewY(var(--vx-skew-y, 0)) scaleX(var(--vx-scale-x, 1)) scaleY(var(--vx-scale-y, 1));';

  addUtil('transform', transformTemplate);

  for (const [key, value] of Object.entries(spaceScale)) {
    addUtil(`translate-x-${key}`, `  --vx-translate-x: ${value};\n${transformTemplate}`);
    addUtil(`translate-y-${key}`, `  --vx-translate-y: ${value};\n${transformTemplate}`);
    if (key !== '0') {
      addUtil(`-translate-x-${key}`, `  --vx-translate-x: ${negativeValue(value)};\n${transformTemplate}`);
      addUtil(`-translate-y-${key}`, `  --vx-translate-y: ${negativeValue(value)};\n${transformTemplate}`);
    }
  }

  const scaleValues: Record<string, string> = {
    90: '0.9',
    95: '0.95',
    100: '1',
    105: '1.05',
    110: '1.1'
  };
  for (const [key, value] of Object.entries(scaleValues)) {
    addUtil(
      `scale-${key}`,
      `  --vx-scale-x: ${value};\n  --vx-scale-y: ${value};\n${transformTemplate}`
    );
  }

  const rotateValues: Record<string, string> = {
    0: '0deg',
    6: '6deg',
    12: '12deg',
    45: '45deg',
    90: '90deg',
    180: '180deg'
  };
  for (const [key, value] of Object.entries(rotateValues)) {
    addUtil(`rotate-${key}`, `  --vx-rotate: ${value};\n${transformTemplate}`);
  }

  const skewValues: Record<string, string> = {
    0: '0deg',
    6: '6deg',
    12: '12deg'
  };
  for (const [key, value] of Object.entries(skewValues)) {
    addUtil(`skew-x-${key}`, `  --vx-skew-x: ${value};\n${transformTemplate}`);
    addUtil(`skew-y-${key}`, `  --vx-skew-y: ${value};\n${transformTemplate}`);
  }

  const originValues: Record<string, string> = {
    center: 'center',
    top: 'top',
    bottom: 'bottom',
    left: 'left',
    right: 'right',
    'top-left': 'top left',
    'top-right': 'top right',
    'bottom-left': 'bottom left',
    'bottom-right': 'bottom right'
  };
  for (const [key, value] of Object.entries(originValues)) {
    addUtil(`origin-${key}`, `  transform-origin: ${value};`);
  }

  addUtil('animate-spin', '  animation: vx-spin 1s linear infinite;');
  addUtil('animate-bounce', '  animation: vx-bounce 1.2s ease-in-out infinite;');
  addUtil('animate-pulse', '  animation: vx-pulse 1.5s ease-in-out infinite;');
  addUtil(
    'animate-fade',
    '  animation: vx-fade-in var(--vx-duration-d3) var(--vx-easing-e2) both;'
  );
  addUtil('animate-glow', '  animation: vx-glow-pulse 2.2s ease-in-out infinite;');
  addUtil('animate-none', '  animation: none;');

  const cursorValues: Record<string, string> = {
    auto: 'auto',
    default: 'default',
    pointer: 'pointer',
    move: 'move',
    text: 'text',
    wait: 'wait',
    grab: 'grab',
    grabbing: 'grabbing',
    'not-allowed': 'not-allowed'
  };
  for (const [key, value] of Object.entries(cursorValues)) {
    addUtil(`cursor-${key}`, `  cursor: ${value};`);
  }

  addUtil('pointer-events-none', '  pointer-events: none;');
  addUtil('pointer-events-auto', '  pointer-events: auto;');
  addUtil('select-none', '  user-select: none;');
  addUtil('select-text', '  user-select: text;');
  addUtil('select-all', '  user-select: all;');
  addUtil('select-auto', '  user-select: auto;');
  addUtil('appearance-none', '  appearance: none;');

  addUtil('touch-auto', '  touch-action: auto;');
  addUtil('touch-none', '  touch-action: none;');
  addUtil('touch-pan-x', '  touch-action: pan-x;');
  addUtil('touch-pan-y', '  touch-action: pan-y;');
  addUtil('touch-manipulation', '  touch-action: manipulation;');

  addUtil('scroll-smooth', '  scroll-behavior: smooth;');
  addUtil('scroll-auto', '  scroll-behavior: auto;');

  addUtil('snap-x', '  scroll-snap-type: x var(--vx-snap-strictness, mandatory);');
  addUtil('snap-y', '  scroll-snap-type: y var(--vx-snap-strictness, mandatory);');
  addUtil('snap-both', '  scroll-snap-type: both var(--vx-snap-strictness, mandatory);');
  addUtil('snap-mandatory', '  --vx-snap-strictness: mandatory;');
  addUtil('snap-proximity', '  --vx-snap-strictness: proximity;');
  addUtil('snap-start', '  scroll-snap-align: start;');
  addUtil('snap-center', '  scroll-snap-align: center;');
  addUtil('snap-end', '  scroll-snap-align: end;');

  addUtil('resize', '  resize: both;');
  addUtil('resize-none', '  resize: none;');
  addUtil('resize-x', '  resize: horizontal;');
  addUtil('resize-y', '  resize: vertical;');

  addUtil(
    'sr-only',
    '  position: absolute;\n  width: 1px;\n  height: 1px;\n  padding: 0;\n  margin: -1px;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  white-space: nowrap;\n  border: 0;'
  );
  addUtil(
    'not-sr-only',
    '  position: static;\n  width: auto;\n  height: auto;\n  padding: 0;\n  margin: 0;\n  overflow: visible;\n  clip: auto;\n  white-space: normal;'
  );

  const rules: string[] = [];

  for (const rule of utilities) {
    rules.push(renderRule(rule, rule.name));
  }

  const pseudoVariants = [
    { prefix: 'hover', suffix: ':hover' },
    { prefix: 'focus', suffix: ':focus' },
    { prefix: 'focus-visible', suffix: ':focus-visible' },
    { prefix: 'active', suffix: ':active' }
  ];
  for (const variant of pseudoVariants) {
    for (const rule of utilities) {
      rules.push(renderRule(rule, `${variant.prefix}:${rule.name}`, variant.suffix));
    }
  }

  for (const rule of utilities) {
    const className = `disabled:${rule.name}`;
    const selectors = [
      buildSelector(rule, className, ':disabled'),
      buildSelector(rule, className, '[aria-disabled="true"]')
    ];
    rules.push(renderMultiRule(selectors, rule.body));
  }

  for (const rule of utilities) {
    rules.push(renderWrappedRule('.group:hover', rule, `group-hover:${rule.name}`));
    rules.push(renderWrappedRule('.peer:checked ~', rule, `peer-checked:${rule.name}`));
    rules.push(renderRule(rule, `aria-expanded:${rule.name}`, '[aria-expanded="true"]'));
    rules.push(renderRule(rule, `data-state-open:${rule.name}`, '[data-state="open"]'));
    rules.push(renderRule(rule, `data-state-closed:${rule.name}`, '[data-state="closed"]'));
    rules.push(renderWrappedRule('.t-dark', rule, `dark:${rule.name}`));
    rules.push(renderWrappedRule('.t-contrast', rule, `contrast:${rule.name}`));
    rules.push(renderWrappedRule('[dir="rtl"]', rule, `rtl:${rule.name}`));
  }

  const breakpoints: Record<string, string | undefined> = {
    sm: framework.breakpoints.s,
    md: framework.breakpoints.m,
    lg: framework.breakpoints.l,
    xl: framework.breakpoints.xl,
    '2xl': framework.breakpoints['2xl']
  };

  for (const [prefix, width] of Object.entries(breakpoints)) {
    if (!width) {
      continue;
    }
    const bpRules: string[] = [];
    for (const rule of utilities) {
      bpRules.push(renderRule(rule, `${prefix}:${rule.name}`));
    }
    rules.push(`@media (min-width: ${width}) {\n${bpRules.join('')}\n}\n`);
  }

  const motionSafeRules: string[] = [];
  for (const rule of utilities) {
    motionSafeRules.push(renderRule(rule, `motion-safe:${rule.name}`));
  }
  rules.push(
    `@media (prefers-reduced-motion: no-preference) {\n${motionSafeRules.join('')}\n}\n`
  );

  const motionReduceRules: string[] = [];
  for (const rule of utilities) {
    motionReduceRules.push(renderRule(rule, `motion-reduce:${rule.name}`));
  }
  rules.push(`@media (prefers-reduced-motion: reduce) {\n${motionReduceRules.join('')}\n}\n`);

  return `@layer utilities {\n${rules.join('')}\n}\n`;
};

export const buildOutput = async () => {
  await fs.mkdir(outDir, { recursive: true });
  const baseCss = await readText('src/base.css');
  const componentsCore = await readText('src/components-core.css');
  const componentsExtended = await readText('src/components-extended.css');
  const tokensCss = buildTokens();
  const utilitiesCss = `${generateUtilities()}\n${generateAtomicUtilities()}`;

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
