const fs = require('node:fs/promises');
const path = require('node:path');

const rootDir = path.resolve(__dirname, '..');
const examplesDir = path.join(rootDir, 'examples');
const docsDir = path.join(rootDir, 'packages', 'docs', 'docs');
const demosPublicDir = path.join(docsDir, 'public', 'demos');
const demosDocsDir = path.join(docsDir, 'demos');

const demoDescriptions = {
  auth: 'Authentication UI demonstrating form elements, toggles, and controlled input behavior with Velynx styling.',
  dashboard: 'Operational dashboard layout with cards, progress indicators, modal and drawer interactions.',
  landing: 'Marketing landing page with hero, feature sections, accordion FAQ, toast feedback, and modal CTA.',
  'live-demo': 'Comprehensive feature page that combines calendar modes, particles, modal angles, cookie banner, and image reveal.'
};

const demoWhatShows = {
  auth: [
    'Form controls and input grouping in a real auth flow',
    'Theme switching behavior',
    'Button and field state composition'
  ],
  dashboard: [
    'Layout composition for dashboards',
    'Data cards, tables, and loading visuals',
    'Drawer + modal interaction modules'
  ],
  landing: [
    'Marketing-oriented page assembly with reusable Velynx sections',
    'Accordion, toast, and modal interactivity',
    'Responsive layout behavior'
  ],
  'live-demo': [
    'Single/multi/range calendar selectors',
    'Particle-based loading bar and image reveal animation',
    'Directional modal animation and cookie banner behavior'
  ]
};

const ensureDir = async (dirPath) => {
  await fs.mkdir(dirPath, { recursive: true });
};

const fileExists = async (filePath) => {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
};

const readText = async (filePath) => fs.readFile(filePath, 'utf8');

const cleanCode = (value) => value.replace(/^\n+|\n+$/g, '');

const toSlug = (absoluteHtmlPath) => {
  const rel = path.relative(examplesDir, absoluteHtmlPath).replace(/\\/g, '/');
  const parsed = path.parse(rel);
  if (parsed.name === 'index' && parsed.dir) {
    return parsed.dir.toLowerCase().replace(/[^a-z0-9/-]/g, '-').replace(/\//g, '-');
  }
  const base = parsed.dir ? `${parsed.dir}-${parsed.name}` : parsed.name;
  return base.toLowerCase().replace(/[^a-z0-9/-]/g, '-').replace(/\//g, '-');
};

const listHtmlFiles = async (dirPath) => {
  const entries = await fs.readdir(dirPath, { withFileTypes: true });
  const collected = [];

  for (const entry of entries) {
    const absolutePath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      const nested = await listHtmlFiles(absolutePath);
      collected.push(...nested);
      continue;
    }
    if (entry.isFile() && entry.name.toLowerCase().endsWith('.html')) {
      collected.push(absolutePath);
    }
  }

  return collected;
};

const getTitle = (html) => {
  const match = /<title[^>]*>([\s\S]*?)<\/title>/i.exec(html);
  if (!match) {
    return 'Example demo';
  }
  return match[1].trim();
};

const getInlineStyles = (html) =>
  [...html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)]
    .map((match) => cleanCode(match[1]))
    .filter(Boolean);

const getInlineScripts = (html) =>
  [...html.matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi)]
    .map((match) => cleanCode(match[1]))
    .filter(Boolean);

const getExternalCssPaths = (html) =>
  [...html.matchAll(/<link[^>]*href=["']([^"']+)["'][^>]*>/gi)].map((match) => match[1]);

const getExternalJsPaths = (html) =>
  [...html.matchAll(/<script[^>]*src=["']([^"']+)["'][^>]*><\/script>/gi)].map((match) => match[1]);

const isRemotePath = (value) =>
  /^(https?:)?\/\//.test(value) || value.startsWith('data:') || value.startsWith('#') || value.startsWith('mailto:');

const normalizeFrameworkImports = (html) =>
  html
    .replace(
      /(?:\.\.\/)+packages\/core\/dist\/(velynx\.[^"'?#]+\.css)/g,
      '../../velynx/$1'
    )
    .replace(
      /(?:\.\.\/)+packages\/js\/dist\/(velynx\.[^"'?#]+\.js)/g,
      '../../velynx/$1'
    );

const copyReferencedAssets = async (sourceHtmlPath, rewrittenHtml, demoDir) => {
  const sourceDir = path.dirname(sourceHtmlPath);
  const urlRegex = /(href|src)=["']([^"']+)["']/gi;
  const seen = new Map();
  let output = rewrittenHtml;

  for (const match of rewrittenHtml.matchAll(urlRegex)) {
    const originalUrl = match[2];
    if (isRemotePath(originalUrl)) {
      continue;
    }
    if (originalUrl.startsWith('../../velynx/')) {
      continue;
    }
    if (originalUrl.startsWith('./') || originalUrl.startsWith('../')) {
      const noQuery = originalUrl.split('?')[0].split('#')[0];
      const absolute = path.resolve(sourceDir, noQuery);
      if (!(await fileExists(absolute))) {
        continue;
      }

      if (!seen.has(originalUrl)) {
        const targetName = path.basename(noQuery);
        const targetRel = `./assets/${targetName}`;
        const targetAbs = path.join(demoDir, 'assets', targetName);
        await ensureDir(path.dirname(targetAbs));
        await fs.copyFile(absolute, targetAbs);
        seen.set(originalUrl, targetRel);
      }
      output = output.split(originalUrl).join(seen.get(originalUrl));
    }
  }

  return output;
};

const collectExternalSource = async (sourceHtmlPath, urls) => {
  const sourceDir = path.dirname(sourceHtmlPath);
  const blocks = [];

  for (const url of urls) {
    if (isRemotePath(url)) {
      continue;
    }
    if (url.includes('/packages/core/dist/velynx') || url.includes('/packages/js/dist/velynx')) {
      continue;
    }
    const normalized = url.split('?')[0].split('#')[0];
    const absolute = path.resolve(sourceDir, normalized);
    if (!(await fileExists(absolute))) {
      continue;
    }
    const content = cleanCode(await readText(absolute));
    if (!content) {
      continue;
    }
    blocks.push({ path: normalized.replace(/\\/g, '/'), content });
  }

  return blocks;
};

const renderDemoDoc = ({ title, slug, description, whatShows, sourcePath }) => {
  const bullets = whatShows.map((item) => `- ${item}`).join('\n');
  return `# ${title}

${description}

## What this demo shows

${bullets}

## Source in repository

\`${sourcePath}\`

## Live demo + code

<DemoViewer slug="${slug}" title="${title}" />
`;
};

const renderDemosIndex = (manifest) => {
  const cards = manifest
    .map(
      (entry) => `<article class="vxc-feature-card">
  <div class="vxc-feature-title">${entry.title}</div>
  <p class="vxu-tone-ink--mute">${entry.description}</p>
  <a class="vxc-button vxs-variant-solid" href="./${entry.slug}">Open demo</a>
</article>`
    )
    .join('\n');

  return `# Demos

All demo pages below are imported automatically from the repository \`examples/\` folder.
Each demo page includes live preview, extracted source code tabs, and implementation notes.

<div class="vxc-feature-grid">
${cards}
</div>
`;
};

const run = async () => {
  await fs.rm(demosPublicDir, { recursive: true, force: true });
  await fs.rm(demosDocsDir, { recursive: true, force: true });
  await ensureDir(demosPublicDir);
  await ensureDir(demosDocsDir);

  const htmlFiles = await listHtmlFiles(examplesDir);
  htmlFiles.sort();

  const manifest = [];

  for (const htmlPath of htmlFiles) {
    const sourcePath = path.relative(rootDir, htmlPath).replace(/\\/g, '/');
    const slug = toSlug(htmlPath);
    const originalHtml = await readText(htmlPath);
    const title = getTitle(originalHtml);
    const description = demoDescriptions[slug] || `Live imported demo for ${title}.`;
    const whatShows = demoWhatShows[slug] || [
      'Real-world Velynx layout and component usage',
      'Runtime behavior from Velynx interaction modules',
      'Production-oriented markup composition'
    ];

    const demoDir = path.join(demosPublicDir, slug);
    await ensureDir(demoDir);

    let rewrittenHtml = normalizeFrameworkImports(originalHtml);
    rewrittenHtml = await copyReferencedAssets(htmlPath, rewrittenHtml, demoDir);
    await fs.writeFile(path.join(demoDir, 'index.html'), rewrittenHtml, 'utf8');

    const inlineStyles = getInlineStyles(originalHtml);
    const inlineScripts = getInlineScripts(originalHtml);
    const externalCss = await collectExternalSource(htmlPath, getExternalCssPaths(originalHtml));
    const externalJs = await collectExternalSource(htmlPath, getExternalJsPaths(originalHtml));

    const sourcePayload = {
      slug,
      title,
      sourcePath,
      html: cleanCode(rewrittenHtml),
      css: cleanCode(
        [...inlineStyles, ...externalCss.map((entry) => `/* ${entry.path} */\n${entry.content}`)].join(
          '\n\n'
        )
      ),
      js: cleanCode(
        [...inlineScripts, ...externalJs.map((entry) => `// ${entry.path}\n${entry.content}`)].join('\n\n')
      )
    };

    await fs.writeFile(path.join(demoDir, 'source.json'), `${JSON.stringify(sourcePayload, null, 2)}\n`, 'utf8');

    const demoDoc = renderDemoDoc({
      title,
      slug,
      description,
      whatShows,
      sourcePath
    });
    await fs.writeFile(path.join(demosDocsDir, `${slug}.md`), demoDoc, 'utf8');

    manifest.push({
      slug,
      title,
      description,
      whatShows,
      sourcePath
    });
  }

  await fs.writeFile(path.join(demosPublicDir, 'manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');
  await fs.writeFile(path.join(demosDocsDir, 'index.md'), renderDemosIndex(manifest), 'utf8');

  console.log(`[import-examples] imported ${manifest.length} demo pages from examples/`);
};

run().catch((error) => {
  console.error('[import-examples] failed', error);
  process.exit(1);
});
