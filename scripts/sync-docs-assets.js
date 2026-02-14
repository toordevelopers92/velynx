const fs = require('node:fs/promises');
const path = require('node:path');

const rootDir = path.resolve(__dirname, '..');
const docsPublicDir = path.join(rootDir, 'packages', 'docs', 'docs', 'public');
const docsVelynxDir = path.join(docsPublicDir, 'velynx');

const filesToCopy = [
  { from: path.join(rootDir, 'packages', 'core', 'dist', 'velynx.extended.css'), to: 'velynx.extended.css' },
  { from: path.join(rootDir, 'packages', 'core', 'dist', 'velynx.extended.min.css'), to: 'velynx.extended.min.css' },
  { from: path.join(rootDir, 'packages', 'core', 'dist', 'velynx.core.css'), to: 'velynx.core.css' },
  { from: path.join(rootDir, 'packages', 'core', 'dist', 'velynx.tokens.css'), to: 'velynx.tokens.css' },
  { from: path.join(rootDir, 'packages', 'js', 'dist', 'velynx.esm.js'), to: 'velynx.esm.js' },
  { from: path.join(rootDir, 'packages', 'js', 'dist', 'velynx.umd.js'), to: 'velynx.umd.js' }
];

const readJson = async (filePath) => JSON.parse(await fs.readFile(filePath, 'utf8'));

const ensureDir = async (dirPath) => {
  await fs.mkdir(dirPath, { recursive: true });
};

const copyFiles = async () => {
  await ensureDir(docsVelynxDir);

  for (const file of filesToCopy) {
    await fs.copyFile(file.from, path.join(docsVelynxDir, file.to));
  }
};

const writeVersionFile = async () => {
  const rootPkg = await readJson(path.join(rootDir, 'package.json'));
  const corePkg = await readJson(path.join(rootDir, 'packages', 'core', 'package.json'));
  const jsPkg = await readJson(path.join(rootDir, 'packages', 'js', 'package.json'));
  const payload = {
    framework: 'Velynx',
    monorepoVersion: rootPkg.version,
    coreVersion: corePkg.version,
    jsVersion: jsPkg.version,
    generatedAt: new Date().toISOString()
  };

  await fs.writeFile(path.join(docsVelynxDir, 'version.json'), `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
};

const run = async () => {
  await copyFiles();
  await writeVersionFile();
  console.log('[sync-docs-assets] copied latest framework assets into docs public/velynx');
};

run().catch((error) => {
  console.error('[sync-docs-assets] failed', error);
  process.exit(1);
});
