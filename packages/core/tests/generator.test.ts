import { describe, it, expect } from 'vitest';
import fs from 'node:fs/promises';
import path from 'node:path';
import { buildOutput } from '../scripts/build-css';

describe('css generator', () => {
  it(
    'writes core, extended, and tokens css',
    async () => {
      await buildOutput();
      const dist = path.join(process.cwd(), 'dist');
      const files = await fs.readdir(dist);
      expect(files).toContain('velynx.core.css');
      expect(files).toContain('velynx.extended.css');
      expect(files).toContain('velynx.tokens.css');
      expect(files).toContain('velynx.core.min.css');
      expect(files).toContain('velynx.extended.min.css');
      expect(files).toContain('velynx.tokens.min.css');
    },
    20000
  );
});
