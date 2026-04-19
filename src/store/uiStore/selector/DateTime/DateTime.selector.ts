import { UiStoreState } from '../../uiStore';

const dateTimeSelector = (state: UiStoreState) => ({
  dateObject: state.DateTime.date,
  date: state.DateTime.date?.toDateString(),
  dateWithoutYear: state.DateTime.date?.toDateString().slice(0, -5),
  time: state.DateTime.date?.toLocaleTimeString(),
  timeInAmPm: () => {
    return state.DateTime.date?.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    }) || '';
  },
  initTimer: state.DateTime.init,
});

export { dateTimeSelector };
