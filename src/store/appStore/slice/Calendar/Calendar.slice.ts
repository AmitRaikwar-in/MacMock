import { AppStoreSlice } from '../../appStore';
import { CalendarState, CalendarStateSlice } from './types';

const defaultCalendarState: CalendarState = {
  events: [],
};

const createCalendarSlice: AppStoreSlice<CalendarStateSlice> = (set) => ({
  ...defaultCalendarState,
  addEvent: (event) => {
    set((state) => {
      state.Calendar.events.push(event);
    });
  },
  setEvents: (events) => {
    set((state) => {
      state.Calendar.events = events;
    });
  },
  clearEvents: () => {
    set((state) => {
      state.Calendar.events = [];
    });
  },
});

export default createCalendarSlice;
