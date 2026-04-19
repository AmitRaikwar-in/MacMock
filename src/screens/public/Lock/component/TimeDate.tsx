import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import { formatDate } from './utils';
import { useShallow } from '@processStore';
import { dateTimeSelector, uiStore } from '@uiStore';

const DateComponent = ({ date }: { date: string }) => {
  return (
    <Text fontSize={'2xl'} fontWeight={'bold'} color={'white'} opacity={0.8}>
      {formatDate(date)}
    </Text>
  );
};

const TimeComponent = ({ time }: { time: string }) => {
  return (
    <Text fontSize={'8xl'} fontWeight={'bold'} color={'white'} opacity={0.8}>
      {time}
    </Text>
  );
};
const MemoisedTimeComponent = React.memo(TimeComponent);
const MemoisedDateComponent = React.memo(DateComponent);

const TimeDateComponent = () => {
  const { dateObject } = uiStore(useShallow(dateTimeSelector));

  const formattedDate = dateObject?.toDateString().slice(0, 10) ?? '';
  const formattedTime = dateObject?.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }) ?? '';

  return (
    <Box
      width={'100%'}
      alignItems={'center'}
      position={'fixed'}
      top={'10%'}
      display={'flex'}
      flexDirection={'column'}
      zIndex={0}
      aria-label="time-date-component"
    >
      <MemoisedDateComponent date={formattedDate} />
      <MemoisedTimeComponent time={formattedTime} />
    </Box>
  );
};

export default TimeDateComponent;
