const { spawn } = require('node:child_process');
const path = require('node:path');

const rootDir = path.resolve(__dirname, '..');

const run = (command, args) =>
  new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd: rootDir,
      stdio: 'inherit',
      shell: process.platform === 'win32'
    });

    child.on('close', (code) => {
      if (code === 0) {
        resolve();
        return;
      }
      reject(new Error(`${command} ${args.join(' ')} exited with code ${code}`));
    });
  });

const main = async () => {
  await run('pnpm', ['-C', 'packages/core', 'build:css']);
  await run('pnpm', ['-C', 'packages/js', 'build']);
  await run('node', ['scripts/sync-docs-assets.js']);
  await run('node', ['scripts/import-examples.js']);
  console.log('[prepare-docs] docs assets and demo pages are ready');
};

main().catch((error) => {
  console.error('[prepare-docs] failed', error);
  process.exit(1);
});
