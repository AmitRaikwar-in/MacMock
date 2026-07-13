import {
  Calendar as CalendarFromLib,
  momentLocalizer,
} from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { events as defaultEvents } from './constants';
import { appStore, calendarSelector, useShallow } from '@appStore';
import { useEffect } from 'react';
import { Box, Button } from '@chakra-ui/react';

const localizer = momentLocalizer(moment);

const Calendar = () => {
  const { events, setEvents, addEvent } = appStore(useShallow(calendarSelector));

  // Sync data when program is opened (on component mount)
  useEffect(() => {
    if (events.length === 0) {
      setEvents(
        defaultEvents.map((e) => ({
          ...e,
          start: typeof e.start === 'string' ? e.start : e.start.toISOString(),
          end: typeof e.end === 'string' ? e.end : e.end.toISOString(),
        }))
      );
    }
  }, [events.length, setEvents]);

  // Convert ISO string dates to Date objects for the library
  const formattedEvents = events.map((event) => ({
    ...event,
    start: new Date(event.start),
    end: new Date(event.end),
  }));

  const handleAddSampleEvent = () => {
    const newEvent = {
      title: 'New Sync Event',
      start: new Date().toISOString(),
      end: moment().add(1, 'hour').toDate().toISOString(),
    };
    addEvent(newEvent);
  };

  return (
    <Box height="100%" display="flex" flexDirection="column" bg="white" color="black">
      <Box p={2} bg="gray.100" display="flex" justifyContent="flex-end">
        <Button size="xs" colorScheme="blue" onClick={handleAddSampleEvent}>
          Add Sample Event
        </Button>
      </Box>
      <Box flex={1}>
        <CalendarFromLib
          localizer={localizer}
          events={formattedEvents}
          startAccessor="start"
          endAccessor="end"
          style={{ height: '90%' }}
        />
      </Box>
    </Box>
  );
};

export default Calendar;
