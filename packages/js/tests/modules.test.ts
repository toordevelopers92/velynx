import { describe, it, expect } from 'vitest';
import { autoInit, Modal, Calendar, Navbar, ParticleProgress, ImageReveal } from '../src/index';

describe('velynx modules', () => {
  it('exports modules', () => {
    expect(Modal).toBeTypeOf('function');
    expect(Calendar).toBeTypeOf('function');
    expect(Navbar).toBeTypeOf('function');
    expect(ParticleProgress).toBeTypeOf('function');
    expect(ImageReveal).toBeTypeOf('function');
  });

  it('autoInit runs without throwing', () => {
    document.body.innerHTML = `
      <div data-vx="modal" id="m1"></div>
      <nav data-vx="navbar">
        <button data-vx-toggle>Menu</button>
        <div data-vx-menu></div>
      </nav>
      <div data-vx="calendar"></div>
      <div data-vx="particle-progress" data-vx-progress="48"></div>
      <figure data-vx="image-reveal"><img alt="demo" src="about:blank" /></figure>
    `;
    expect(() => autoInit()).not.toThrow();
  });

  it('supports multi date selection in calendar', () => {
    document.body.innerHTML = `<div data-vx="calendar" data-vx-selection="multi"></div>`;
    autoInit();
    const calendar = document.querySelector<HTMLElement>('[data-vx="calendar"]');
    const day = calendar?.querySelector<HTMLButtonElement>(
      '.vxc-calendar-day:not(.vxs-outside):not([disabled])'
    );
    expect(calendar).toBeTruthy();
    expect(day).toBeTruthy();

    const iso = day?.getAttribute('data-vx-date') || '';
    day?.click();
    expect(calendar?.dataset.vxSelectedDates).toContain(iso);
    calendar?.querySelector<HTMLButtonElement>(`.vxc-calendar-day[data-vx-date="${iso}"]`)?.click();
    expect(calendar?.dataset.vxSelectedDates).toBe('');
  });

  it('supports range selection in calendar', () => {
    document.body.innerHTML = `<div data-vx="calendar" data-vx-selection="range"></div>`;
    autoInit();
    const calendar = document.querySelector<HTMLElement>('[data-vx="calendar"]');
    const days = Array.from(
      calendar?.querySelectorAll<HTMLButtonElement>('.vxc-calendar-day:not(.vxs-outside):not([disabled])') ||
        []
    );
    const first = days[0];
    const second = days[1];

    if (!calendar || !first || !second) {
      throw new Error('Calendar did not render enough selectable days');
    }

    const firstIso = first.getAttribute('data-vx-date') || '';
    const secondIso = second.getAttribute('data-vx-date') || '';
    first.click();
    calendar.querySelector<HTMLButtonElement>(`.vxc-calendar-day[data-vx-date="${secondIso}"]`)?.click();

    expect(calendar?.dataset.vxRangeStart).toBe(firstIso);
    expect(calendar?.dataset.vxRangeEnd).toBe(secondIso);
  });
});
