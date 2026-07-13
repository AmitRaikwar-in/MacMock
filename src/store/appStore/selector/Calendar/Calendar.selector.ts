import { AppStoreState } from '../../appStore';

const calendarSelector = (state: AppStoreState) => ({
  events: state.Calendar.events,
  addEvent: state.Calendar.addEvent,
  setEvents: state.Calendar.setEvents,
  clearEvents: state.Calendar.clearEvents,
});

export { calendarSelector };
