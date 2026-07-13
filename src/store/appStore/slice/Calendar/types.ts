export type CalendarEvent = {
  title: string;
  start: Date | string;
  end: Date | string;
  allDay?: boolean;
};

export type CalendarState = {
  events: CalendarEvent[];
};

export interface CalendarAppAction {
  addEvent: (event: CalendarEvent) => void;
  setEvents: (events: CalendarEvent[]) => void;
  clearEvents: () => void;
}

export type CalendarStateSlice = CalendarState & CalendarAppAction;
