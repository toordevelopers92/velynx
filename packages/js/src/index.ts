import { Modal } from './modules/modal';
import { Drawer } from './modules/drawer';
import { Dropdown } from './modules/dropdown';
import { Tooltip } from './modules/tooltip';
import { Tabs } from './modules/tabs';
import { ToastStack } from './modules/toast';
import { Accordion } from './modules/accordion';
import { Popover } from './modules/popover';
import { Navbar } from './modules/navbar';
import { Calendar } from './modules/calendar';

export { Modal, Drawer, Dropdown, Tooltip, Tabs, ToastStack, Accordion, Popover, Navbar, Calendar };

export const autoInit = () => {
  Modal.wire();
  Drawer.wire();
  Dropdown.wire();
  Tooltip.wire();
  Tabs.wire();
  ToastStack.wire();
  Accordion.wire();
  Popover.wire();
  Navbar.wire();
  Calendar.wire();
};

const shouldAutoInit = () =>
  typeof document !== 'undefined' && document.documentElement?.hasAttribute('data-vx-auto');

if (shouldAutoInit()) {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => autoInit());
  } else {
    autoInit();
  }
}
