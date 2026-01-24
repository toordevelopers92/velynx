import { describe, it, expect } from 'vitest';
import { autoInit, Modal } from '../src/index';

describe('velynx modules', () => {
  it('exports modules', () => {
    expect(Modal).toBeTypeOf('function');
  });

  it('autoInit runs without throwing', () => {
    document.body.innerHTML = '<div data-vx="modal" id="m1"></div>';
    expect(() => autoInit()).not.toThrow();
  });
});
