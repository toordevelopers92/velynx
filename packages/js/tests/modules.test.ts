import { describe, it, expect } from 'vitest';
import { autoInit, Modal, Calendar, Navbar } from '../src/index';

describe('velynx modules', () => {
  it('exports modules', () => {
    expect(Modal).toBeTypeOf('function');
    expect(Calendar).toBeTypeOf('function');
    expect(Navbar).toBeTypeOf('function');
  });

  it('autoInit runs without throwing', () => {
    document.body.innerHTML = `
      <div data-vx="modal" id="m1"></div>
      <nav data-vx="navbar">
        <button data-vx-toggle>Menu</button>
        <div data-vx-menu></div>
      </nav>
      <div data-vx="calendar"></div>
    `;
    expect(() => autoInit()).not.toThrow();
  });
});
