# Interactivity modules

Velynx modules are dependency-free and use data attributes. You can import modules individually or call `autoInit()`.

To enable auto-init without calling `autoInit()`, add `data-vx-auto` to the `<html>` element.

## Data attributes

- Modal: `data-vx="modal"`, `data-vx-open="id"`, `data-vx-close="id"`, `data-vx-angle="center|top|right|bottom|left|top-left|top-right|bottom-left|bottom-right|random"`
- Drawer: `data-vx="drawer"`, `data-vx-open`, `data-vx-close`
- Dropdown: `data-vx="dropdown"`, `data-vx-toggle`, `data-vx-menu`
- Tabs: `data-vx="tabs"`, `data-vx-tab`, `data-vx-panel`
- Accordion: `data-vx="accordion"`, `data-vx-trigger`, `data-vx-panel`
- Toast: `data-vx="toast-stack"`, `data-vx-toast`, `data-vx-toast-msg`
- Tooltip: `data-vx-tooltip="text"`
- Popover: `data-vx-popover="id"`
- Navbar: `data-vx="navbar"`, `data-vx-toggle`, `data-vx-menu`
- Calendar: `data-vx="calendar"`, `data-vx-selection="single|multi|range"`, `data-vx-selected`, `data-vx-selected-dates`, `data-vx-range-start`, `data-vx-range-end`, `data-vx-week-start`, `data-vx-min`, `data-vx-max`, `data-vx-locale`
- Particle progress: `data-vx="particle-progress"`, `data-vx-progress`, `data-vx-particle-count`, `data-vx-progress-source`
- Image reveal: `data-vx="image-reveal"`

## Events

- Calendar emits `vx:calendar-change` with the selected payload (`selected`, `selectedDates`, or `rangeStart/rangeEnd` based on mode).
- Other modules are intentionally small and rely on trigger click handlers for telemetry.

## API

```ts
import { Modal, Calendar, Navbar, ParticleProgress, ImageReveal, autoInit } from '@toordevelopersinc/velynx-js';

const modal = new Modal(document.getElementById('modal-a')!);
modal.open();

const progress = new ParticleProgress(document.getElementById('load-x')!);
progress.setProgress(72);

new ImageReveal(document.querySelector('[data-vx="image-reveal"]')!);

autoInit();
```



