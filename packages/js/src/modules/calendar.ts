type CalendarParts = {
  header: HTMLElement;
  title: HTMLElement;
  prev: HTMLButtonElement;
  next: HTMLButtonElement;
  weekdays: HTMLElement;
  grid: HTMLElement;
};

type CalendarMode = 'single' | 'multi' | 'range';

const parseDate = (value?: string | null) => {
  if (!value) {
    return null;
  }
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) {
    return null;
  }
  const year = Number(match[1]);
  const month = Number(match[2]) - 1;
  const day = Number(match[3]);
  const date = new Date(year, month, day);
  if (Number.isNaN(date.getTime())) {
    return null;
  }
  return date;
};

const splitDateValues = (value?: string | null) =>
  (value || '')
    .split(/[,\s;|]+/)
    .map((item) => item.trim())
    .filter(Boolean);

const compareDates = (a: Date, b: Date) => a.getTime() - b.getTime();

const toIsoDate = (date: Date) => {
  const y = date.getFullYear();
  const m = `${date.getMonth() + 1}`.padStart(2, '0');
  const d = `${date.getDate()}`.padStart(2, '0');
  return `${y}-${m}-${d}`;
};

const addMonths = (date: Date, offset: number) =>
  new Date(date.getFullYear(), date.getMonth() + offset, 1);

const getWeekdayLabels = (formatter: Intl.DateTimeFormat, weekStart: number) => {
  const base = new Date(2020, 5, 7);
  const labels = Array.from({ length: 7 }, (_, index) => {
    const d = new Date(base);
    d.setDate(base.getDate() + index);
    return formatter.format(d);
  });
  return labels.slice(weekStart).concat(labels.slice(0, weekStart));
};

const parseMode = (value?: string | null): CalendarMode => {
  if (value === 'multi' || value === 'range') {
    return value;
  }
  return 'single';
};

const parseDateList = (value?: string | null) =>
  splitDateValues(value)
    .map((token) => parseDate(token))
    .filter((date): date is Date => Boolean(date))
    .sort(compareDates);

const parseRangeSelection = (value?: string | null): [Date | null, Date | null] => {
  if (!value) {
    return [null, null];
  }
  const tokens =
    value.includes('..') || value.includes('/')
      ? value.split(/(?:\.\.|\/)/).map((item) => item.trim())
      : splitDateValues(value);
  const first = parseDate(tokens[0]);
  const second = parseDate(tokens[1]);
  if (!first && !second) {
    return [null, null];
  }
  if (first && second && second < first) {
    return [second, first];
  }
  return [first, second];
};

export class Calendar {
  private root: HTMLElement;
  private parts: CalendarParts;
  private mode: CalendarMode;
  private locale: string;
  private weekStart: number;
  private minDate: Date | null;
  private maxDate: Date | null;
  private selected: Date | null;
  private selectedDates: Set<string>;
  private rangeStart: Date | null;
  private rangeEnd: Date | null;
  private viewDate: Date;
  private today: Date;
  private todayIso: string;
  private monthFormatter: Intl.DateTimeFormat;
  private weekdayFormatter: Intl.DateTimeFormat;
  private weekdaysReady: boolean;

  constructor(root: HTMLElement) {
    this.root = root;
    this.mode = parseMode(this.root.dataset.vxSelection || this.root.dataset.vxCalendarMode);
    this.locale = this.root.dataset.vxLocale || 'en-US';
    this.weekStart = Number(this.root.dataset.vxWeekStart || 0);
    if (Number.isNaN(this.weekStart) || this.weekStart < 0 || this.weekStart > 6) {
      this.weekStart = 0;
    }
    this.minDate = parseDate(this.root.dataset.vxMin);
    this.maxDate = parseDate(this.root.dataset.vxMax);
    this.selected = parseDate(this.root.dataset.vxSelected);
    this.selectedDates = new Set(
      parseDateList(this.root.dataset.vxSelectedDates || this.root.dataset.vxSelected).map((date) =>
        toIsoDate(date)
      )
    );
    const [rangeStart, rangeEnd] = parseRangeSelection(
      `${this.root.dataset.vxRangeStart || ''}/${this.root.dataset.vxRangeEnd || ''}`
    );
    if (rangeStart || rangeEnd) {
      this.rangeStart = rangeStart;
      this.rangeEnd = rangeEnd;
    } else {
      const [fallbackStart, fallbackEnd] = parseRangeSelection(this.root.dataset.vxSelected);
      this.rangeStart = fallbackStart;
      this.rangeEnd = fallbackEnd;
    }
    this.today = new Date();
    this.todayIso = toIsoDate(this.today);
    this.monthFormatter = new Intl.DateTimeFormat(this.locale, { month: 'long', year: 'numeric' });
    this.weekdayFormatter = new Intl.DateTimeFormat(this.locale, { weekday: 'short' });
    this.weekdaysReady = false;
    this.normalizeSelection();
    const start = this.getInitialViewDate() || this.today;
    this.viewDate = new Date(start.getFullYear(), start.getMonth(), 1);
    this.parts = this.ensureStructure();
    this.bind();
    this.syncDataset();
    this.render();
  }

  private getInitialViewDate() {
    if (this.mode === 'range') {
      return this.rangeStart || this.rangeEnd;
    }
    if (this.mode === 'multi') {
      const firstIso = [...this.selectedDates].sort()[0];
      return parseDate(firstIso);
    }
    return this.selected;
  }

  private normalizeSelection() {
    if (this.mode !== 'single') {
      this.selected = null;
    }
    if (this.mode !== 'multi') {
      this.selectedDates.clear();
    }
    if (this.mode !== 'range') {
      this.rangeStart = null;
      this.rangeEnd = null;
    }

    if (this.mode === 'single' && this.selected && this.isOutOfRange(this.selected)) {
      this.selected = null;
    }
    if (this.mode === 'multi') {
      this.selectedDates = new Set(
        [...this.selectedDates].filter((iso) => {
          const date = parseDate(iso);
          return date ? !this.isOutOfRange(date) : false;
        })
      );
    }
    if (this.mode === 'range') {
      if (this.rangeStart && this.isOutOfRange(this.rangeStart)) {
        this.rangeStart = null;
      }
      if (this.rangeEnd && this.isOutOfRange(this.rangeEnd)) {
        this.rangeEnd = null;
      }
      if (this.rangeStart && this.rangeEnd && this.rangeEnd < this.rangeStart) {
        const start = this.rangeEnd;
        this.rangeEnd = this.rangeStart;
        this.rangeStart = start;
      }
    }
  }

  private ensureStructure(): CalendarParts {
    this.root.classList.add('vxc-calendar');
    this.root.classList.add('c-calendar');

    let header = this.root.querySelector<HTMLElement>('.vxc-calendar-header, .c-calendar-header');
    if (!header) {
      header = document.createElement('div');
      header.className = 'vxc-calendar-header';
      this.root.appendChild(header);
    } else {
      header.classList.add('vxc-calendar-header');
    }

    let prev = header.querySelector<HTMLButtonElement>('[data-vx-cal-prev]');
    if (!prev) {
      prev = document.createElement('button');
      prev.type = 'button';
      prev.className = 'vxc-calendar-nav';
      prev.dataset.vxCalPrev = '';
      prev.textContent = 'Prev';
      header.appendChild(prev);
    } else {
      prev.classList.add('vxc-calendar-nav');
    }

    let title = header.querySelector<HTMLElement>('.vxc-calendar-title, .c-calendar-title');
    if (!title) {
      title = document.createElement('div');
      title.className = 'vxc-calendar-title';
      header.appendChild(title);
    } else {
      title.classList.add('vxc-calendar-title');
    }

    let next = header.querySelector<HTMLButtonElement>('[data-vx-cal-next]');
    if (!next) {
      next = document.createElement('button');
      next.type = 'button';
      next.className = 'vxc-calendar-nav';
      next.dataset.vxCalNext = '';
      next.textContent = 'Next';
      header.appendChild(next);
    } else {
      next.classList.add('vxc-calendar-nav');
    }

    let weekdays = this.root.querySelector<HTMLElement>(
      '.vxc-calendar-weekdays, .c-calendar-weekdays'
    );
    if (!weekdays) {
      weekdays = document.createElement('div');
      weekdays.className = 'vxc-calendar-weekdays';
      this.root.appendChild(weekdays);
    } else {
      weekdays.classList.add('vxc-calendar-weekdays');
    }

    let grid = this.root.querySelector<HTMLElement>('.vxc-calendar-grid, .c-calendar-grid');
    if (!grid) {
      grid = document.createElement('div');
      grid.className = 'vxc-calendar-grid';
      this.root.appendChild(grid);
    } else {
      grid.classList.add('vxc-calendar-grid');
    }

    return { header, title, prev, next, weekdays, grid };
  }

  private bind() {
    this.parts.prev.addEventListener('click', () => {
      this.viewDate = addMonths(this.viewDate, -1);
      this.render();
    });

    this.parts.next.addEventListener('click', () => {
      this.viewDate = addMonths(this.viewDate, 1);
      this.render();
    });

    this.parts.grid.addEventListener('click', (event) => {
      const target = (event.target as HTMLElement | null)?.closest<HTMLElement>('[data-vx-date]');
      if (!target || target.hasAttribute('disabled')) {
        return;
      }
      const iso = target.getAttribute('data-vx-date');
      const date = parseDate(iso);
      if (!date) {
        return;
      }
      if (this.isOutOfRange(date)) {
        return;
      }

      this.applySelection(date, iso || '');
      if (
        date.getFullYear() !== this.viewDate.getFullYear() ||
        date.getMonth() !== this.viewDate.getMonth()
      ) {
        this.viewDate = new Date(date.getFullYear(), date.getMonth(), 1);
      }
      this.syncDataset();
      this.render();
      this.root.dispatchEvent(new CustomEvent('vx:calendar-change', { detail: this.getValue() }));
    });
  }

  private applySelection(date: Date, iso: string) {
    if (this.mode === 'multi') {
      if (this.selectedDates.has(iso)) {
        this.selectedDates.delete(iso);
      } else {
        this.selectedDates.add(iso);
      }
      return;
    }

    if (this.mode === 'range') {
      if (!this.rangeStart || (this.rangeStart && this.rangeEnd)) {
        this.rangeStart = date;
        this.rangeEnd = null;
        return;
      }
      if (date < this.rangeStart) {
        this.rangeEnd = this.rangeStart;
        this.rangeStart = date;
        return;
      }
      this.rangeEnd = date;
      return;
    }

    this.selected = date;
  }

  private syncDataset() {
    this.root.dataset.vxSelection = this.mode;
    if (this.mode === 'single') {
      const iso = this.selected ? toIsoDate(this.selected) : '';
      this.root.dataset.vxSelected = iso;
      delete this.root.dataset.vxSelectedDates;
      delete this.root.dataset.vxRangeStart;
      delete this.root.dataset.vxRangeEnd;
      return;
    }

    if (this.mode === 'multi') {
      const dates = [...this.selectedDates].sort();
      const value = dates.join(',');
      this.root.dataset.vxSelected = value;
      this.root.dataset.vxSelectedDates = value;
      delete this.root.dataset.vxRangeStart;
      delete this.root.dataset.vxRangeEnd;
      return;
    }

    const startIso = this.rangeStart ? toIsoDate(this.rangeStart) : '';
    const endIso = this.rangeEnd ? toIsoDate(this.rangeEnd) : '';
    this.root.dataset.vxRangeStart = startIso;
    this.root.dataset.vxRangeEnd = endIso;
    this.root.dataset.vxSelected = endIso ? `${startIso}/${endIso}` : startIso;
    delete this.root.dataset.vxSelectedDates;
  }

  getValue() {
    if (this.mode === 'multi') {
      return {
        mode: this.mode,
        selectedDates: [...this.selectedDates].sort()
      };
    }
    if (this.mode === 'range') {
      return {
        mode: this.mode,
        rangeStart: this.rangeStart ? toIsoDate(this.rangeStart) : null,
        rangeEnd: this.rangeEnd ? toIsoDate(this.rangeEnd) : null
      };
    }
    return {
      mode: this.mode,
      selected: this.selected ? toIsoDate(this.selected) : null
    };
  }

  private isOutOfRange(date: Date) {
    if (this.minDate && date < this.minDate) {
      return true;
    }
    if (this.maxDate && date > this.maxDate) {
      return true;
    }
    return false;
  }

  private renderWeekdays() {
    if (this.weekdaysReady) {
      return;
    }
    const labels = getWeekdayLabels(this.weekdayFormatter, this.weekStart);
    const fragment = document.createDocumentFragment();
    labels.forEach((label) => {
      const cell = document.createElement('div');
      cell.textContent = label;
      fragment.appendChild(cell);
    });
    this.parts.weekdays.replaceChildren(fragment);
    this.weekdaysReady = true;
  }

  private isDateSelected(iso: string) {
    if (this.mode === 'multi') {
      return this.selectedDates.has(iso);
    }
    if (this.mode === 'range') {
      return iso === (this.rangeStart ? toIsoDate(this.rangeStart) : null);
    }
    return this.selected ? toIsoDate(this.selected) === iso : false;
  }

  private isDateInRange(date: Date) {
    if (this.mode !== 'range' || !this.rangeStart || !this.rangeEnd) {
      return false;
    }
    const value = date.getTime();
    return value > this.rangeStart.getTime() && value < this.rangeEnd.getTime();
  }

  private isRangeStart(iso: string) {
    return this.mode === 'range' && this.rangeStart ? toIsoDate(this.rangeStart) === iso : false;
  }

  private isRangeEnd(iso: string) {
    return this.mode === 'range' && this.rangeEnd ? toIsoDate(this.rangeEnd) === iso : false;
  }

  private renderGrid() {
    const year = this.viewDate.getFullYear();
    const month = this.viewDate.getMonth();
    const first = new Date(year, month, 1);
    const dayOfWeek = first.getDay();
    const leading = (dayOfWeek - this.weekStart + 7) % 7;
    const start = new Date(year, month, 1 - leading);
    const totalCells = 42;

    const fragment = document.createDocumentFragment();

    for (let i = 0; i < totalCells; i += 1) {
      const date = new Date(start.getFullYear(), start.getMonth(), start.getDate() + i);
      const isCurrentMonth = date.getMonth() === month;
      const iso = toIsoDate(date);
      const isSelected = this.isDateSelected(iso);
      const isToday = this.todayIso === iso;
      const disabled = this.isOutOfRange(date);
      const isInRange = this.isDateInRange(date);
      const isRangeStart = this.isRangeStart(iso);
      const isRangeEnd = this.isRangeEnd(iso);

      const cell = document.createElement('button');
      cell.type = 'button';
      cell.className = 'vxc-calendar-day c-calendar-day';
      cell.textContent = `${date.getDate()}`;
      cell.setAttribute('data-vx-date', iso);
      cell.setAttribute('aria-label', iso);

      if (!isCurrentMonth) {
        cell.classList.add('vxs-outside');
      }
      if (isToday) {
        cell.classList.add('vxs-today');
        cell.setAttribute('aria-current', 'date');
      }
      if (isSelected && !disabled) {
        cell.classList.add('vxs-selected');
        cell.setAttribute('aria-selected', 'true');
      }
      if (isInRange && !disabled) {
        cell.classList.add('vxs-in-range');
      }
      if (isRangeStart && !disabled) {
        cell.classList.add('vxs-range-start');
      }
      if (isRangeEnd && !disabled) {
        cell.classList.add('vxs-range-end');
      }
      if (disabled) {
        cell.classList.add('vxs-disabled');
        cell.setAttribute('disabled', 'true');
      }

      fragment.appendChild(cell);
    }
    this.parts.grid.replaceChildren(fragment);
  }

  private render() {
    this.parts.title.textContent = this.monthFormatter.format(this.viewDate);
    this.renderWeekdays();
    this.renderGrid();
  }

  static wire() {
    document.querySelectorAll<HTMLElement>('[data-vx="calendar"]').forEach((calendarEl) => {
      new Calendar(calendarEl);
    });
  }
}

