type CalendarParts = {
  header: HTMLElement;
  title: HTMLElement;
  prev: HTMLButtonElement;
  next: HTMLButtonElement;
  weekdays: HTMLElement;
  grid: HTMLElement;
};

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

const toIsoDate = (date: Date) => {
  const y = date.getFullYear();
  const m = `${date.getMonth() + 1}`.padStart(2, '0');
  const d = `${date.getDate()}`.padStart(2, '0');
  return `${y}-${m}-${d}`;
};

const addMonths = (date: Date, offset: number) =>
  new Date(date.getFullYear(), date.getMonth() + offset, 1);

const getMonthLabel = (date: Date, locale: string) =>
  new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' }).format(date);

const getWeekdayLabels = (locale: string, weekStart: number) => {
  const formatter = new Intl.DateTimeFormat(locale, { weekday: 'short' });
  const base = new Date(2020, 5, 7);
  const labels = Array.from({ length: 7 }, (_, index) => {
    const d = new Date(base);
    d.setDate(base.getDate() + index);
    return formatter.format(d);
  });
  return labels.slice(weekStart).concat(labels.slice(0, weekStart));
};

export class Calendar {
  private root: HTMLElement;
  private parts: CalendarParts;
  private locale: string;
  private weekStart: number;
  private minDate: Date | null;
  private maxDate: Date | null;
  private selected: Date | null;
  private viewDate: Date;
  private today: Date;

  constructor(root: HTMLElement) {
    this.root = root;
    this.locale = this.root.dataset.vxLocale || 'en-US';
    this.weekStart = Number(this.root.dataset.vxWeekStart || 0);
    if (Number.isNaN(this.weekStart) || this.weekStart < 0 || this.weekStart > 6) {
      this.weekStart = 0;
    }
    this.minDate = parseDate(this.root.dataset.vxMin);
    this.maxDate = parseDate(this.root.dataset.vxMax);
    this.selected = parseDate(this.root.dataset.vxSelected);
    this.today = new Date();
    const start = this.selected || this.today;
    this.viewDate = new Date(start.getFullYear(), start.getMonth(), 1);
    this.parts = this.ensureStructure();
    this.bind();
    this.render();
  }

  private ensureStructure(): CalendarParts {
    this.root.classList.add('c-calendar');

    let header = this.root.querySelector<HTMLElement>('.c-calendar-header');
    if (!header) {
      header = document.createElement('div');
      header.className = 'c-calendar-header';
      this.root.appendChild(header);
    }

    let prev = header.querySelector<HTMLButtonElement>('[data-vx-cal-prev]');
    if (!prev) {
      prev = document.createElement('button');
      prev.type = 'button';
      prev.className = 'c-calendar-nav';
      prev.dataset.vxCalPrev = '';
      prev.textContent = 'Prev';
      header.appendChild(prev);
    }

    let title = header.querySelector<HTMLElement>('.c-calendar-title');
    if (!title) {
      title = document.createElement('div');
      title.className = 'c-calendar-title';
      header.appendChild(title);
    }

    let next = header.querySelector<HTMLButtonElement>('[data-vx-cal-next]');
    if (!next) {
      next = document.createElement('button');
      next.type = 'button';
      next.className = 'c-calendar-nav';
      next.dataset.vxCalNext = '';
      next.textContent = 'Next';
      header.appendChild(next);
    }

    let weekdays = this.root.querySelector<HTMLElement>('.c-calendar-weekdays');
    if (!weekdays) {
      weekdays = document.createElement('div');
      weekdays.className = 'c-calendar-weekdays';
      this.root.appendChild(weekdays);
    }

    let grid = this.root.querySelector<HTMLElement>('.c-calendar-grid');
    if (!grid) {
      grid = document.createElement('div');
      grid.className = 'c-calendar-grid';
      this.root.appendChild(grid);
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
      this.selected = date;
      if (
        date.getFullYear() !== this.viewDate.getFullYear() ||
        date.getMonth() !== this.viewDate.getMonth()
      ) {
        this.viewDate = new Date(date.getFullYear(), date.getMonth(), 1);
      }
      this.root.dataset.vxSelected = iso || '';
      this.render();
    });
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
    const labels = getWeekdayLabels(this.locale, this.weekStart);
    this.parts.weekdays.innerHTML = '';
    labels.forEach((label) => {
      const cell = document.createElement('div');
      cell.textContent = label;
      this.parts.weekdays.appendChild(cell);
    });
  }

  private renderGrid() {
    const year = this.viewDate.getFullYear();
    const month = this.viewDate.getMonth();
    const first = new Date(year, month, 1);
    const dayOfWeek = first.getDay();
    const leading = (dayOfWeek - this.weekStart + 7) % 7;
    const start = new Date(year, month, 1 - leading);
    const totalCells = 42;

    this.parts.grid.innerHTML = '';

    for (let i = 0; i < totalCells; i += 1) {
      const date = new Date(start.getFullYear(), start.getMonth(), start.getDate() + i);
      const isCurrentMonth = date.getMonth() === month;
      const iso = toIsoDate(date);
      const isSelected = this.selected ? toIsoDate(this.selected) === iso : false;
      const isToday = toIsoDate(this.today) === iso;
      const disabled = this.isOutOfRange(date);

      const cell = document.createElement('button');
      cell.type = 'button';
      cell.className = 'c-calendar-day';
      cell.textContent = `${date.getDate()}`;
      cell.setAttribute('data-vx-date', iso);

      if (!isCurrentMonth) {
        cell.classList.add('s-outside');
      }
      if (isToday) {
        cell.classList.add('s-today');
      }
      if (isSelected && !disabled) {
        cell.classList.add('s-selected');
        cell.setAttribute('aria-selected', 'true');
      }
      if (disabled) {
        cell.classList.add('s-disabled');
        cell.setAttribute('disabled', 'true');
      }

      this.parts.grid.appendChild(cell);
    }
  }

  private render() {
    this.parts.title.textContent = getMonthLabel(this.viewDate, this.locale);
    this.renderWeekdays();
    this.renderGrid();
  }

  static wire() {
    document.querySelectorAll<HTMLElement>('[data-vx="calendar"]').forEach((calendarEl) => {
      new Calendar(calendarEl);
    });
  }
}
