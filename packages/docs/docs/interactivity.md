# Interactivity modules

Velynx modules are dependency-free and use data attributes. You can import modules individually or call `autoInit()`.

To enable auto-init without calling `autoInit()`, add `data-vx-auto` to the `<html>` element.

## Data attributes

- Modal: `data-vx="modal"`, `data-vx-open="id"`, `data-vx-close="id"`
- Drawer: `data-vx="drawer"`, `data-vx-open`, `data-vx-close`
- Dropdown: `data-vx="dropdown"`, `data-vx-toggle`, `data-vx-menu`
- Tabs: `data-vx="tabs"`, `data-vx-tab`, `data-vx-panel`
- Accordion: `data-vx="accordion"`, `data-vx-trigger`, `data-vx-panel`
- Toast: `data-vx="toast-stack"`, `data-vx-toast`, `data-vx-toast-msg`
- Tooltip: `data-vx-tooltip="text"`
- Popover: `data-vx-popover="id"`

## Events

The modules are intentionally small and do not emit custom events. You can listen to click handlers on triggers if you need telemetry.

## API

```ts
import { Modal, autoInit } from '@toordevelopers92/velynx-js';

const modal = new Modal(document.getElementById('modal-a')!);
modal.open();

autoInit();
```
