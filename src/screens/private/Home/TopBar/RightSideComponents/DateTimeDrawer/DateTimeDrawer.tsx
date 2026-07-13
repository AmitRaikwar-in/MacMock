import React from 'react';
import {
  Box,
  useDisclosure,
  Grid,
  GridItem,
  Text,
  VStack,
  HStack,
  Flex,
  Button,
  Image,
} from '@chakra-ui/react';
import { uiStore, dateTimeSelector } from '@uiStore';
import {
  darkModeColorSelector,
  settingsStore,
  useShallow,
} from '@settingsStore';
import Clock from 'react-clock';
import 'react-clock/dist/Clock.css';

// Import logos for Screen Time
import XcodeLogo from '../../../../../../assets/logo/xcode.png';
import ChromeLogo from '../../../../../../assets/logo/chrome.png';
import SettingsLogo from '../../../../../../assets/logo/settings.png';
import FinderLogo from '../../../../../../assets/logo/finder.png';

// Cloud SVG icon for weather
const WeatherCloudIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path d="M19.36 10.04a6 6 0 0 0-11.11-1.5 4.5 4.5 0 0 0-1.89 8.78h13.36a4.12 4.12 0 0 0-.36-7.28z" />
  </svg>
);

// Individual timezone clock sub-component
const WorldClockItem = ({
  city,
  tz,
  dayOffset,
  offsetText,
  dateObject,
}: {
  city: string;
  tz: string;
  dayOffset: string;
  offsetText: string;
  dateObject?: Date;
}) => {
  // Convert dateObject to target timezone
  const getTzDate = (date: Date, timeZone: string) => {
    try {
      return new Date(date.toLocaleString('en-US', { timeZone }));
    } catch {
      return date;
    }
  };

  const tzDate = dateObject ? getTzDate(dateObject, tz) : new Date();

  return (
    <VStack spacing={1} align="center" flex={1}>
      <Box
        borderRadius="full"
        bg="white"
        p={0.5}
        display="flex"
        alignItems="center"
        justifyContent="center"
        boxShadow="inset 0 0 4px rgba(0,0,0,0.2)"
      >
        <Clock size={40} value={tzDate} renderNumbers={false} />
      </Box>
      <Text
        fontSize="10px"
        fontWeight="bold"
        color="white"
        mt={1}
        lineHeight="1"
      >
        {city}
      </Text>
      <Text fontSize="8px" color="gray.500" lineHeight="1">
        {dayOffset}
      </Text>
      <Text fontSize="8px" color="gray.500" lineHeight="1">
        {offsetText}
      </Text>
    </VStack>
  );
};

const DateTimeDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { timeInAmPm, dateWithoutYear, dateObject } = uiStore(dateTimeSelector);

  // Dynamic values for calendar widget based on current dateObject
  const calendarDay = dateObject
    ? dateObject.toLocaleDateString('en-US', { weekday: 'long' }).toUpperCase()
    : 'TUESDAY';
  const calendarDate = dateObject ? dateObject.getDate() : 14;

  const { iconColor } = settingsStore(useShallow(darkModeColorSelector));
  const cardBg = '#2c2c2e';

  return (
    <>
      <Button
        fontSize="12"
        px={2}
        py={0.5}
        h="auto"
        minW="auto"
        bg="transparent"
        color={iconColor}
        borderRadius={4}
        fontWeight="600"
        _hover={{
          bg: 'whiteAlpha.200',
        }}
        onClick={onOpen}
        aria-label="date-time-top-bar-button"
      >
        <Text>{`${dateWithoutYear} ${timeInAmPm()}`}</Text>
      </Button>
      {/* Backdrop Overlay */}
      {isOpen && (
        <Box
          position="fixed"
          top="0"
          left="0"
          right="0"
          bottom="0"
          bg="blackAlpha.300"
          zIndex={9999}
          onClick={onClose}
        />
      )}

      {/* Custom Sliding Drawer Content */}
      <Box
        position="fixed"
        top="28px"
        right={isOpen ? '0' : '-360px'}
        visibility={isOpen ? 'visible' : 'hidden'}
        zIndex={10000}
        w="350px"
        maxW="350px"
        boxShadow="-4px 0 16px rgba(0,0,0,0.5)"
        color="white"
        h="calc(100vh - 28px)"
        overflowY="auto"
        p={4}
        transition="right 0.3s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.3s"
        css={{
          '&::-webkit-scrollbar': {
            width: '4px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'transparent',
          },
          '&::-webkit-scrollbar-thumb': {
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '2px',
          },
        }}
      >
        <VStack spacing={4} align="stretch" w="100%">
          {/* Row 1: Calendar and Weather */}
          <Grid templateColumns="repeat(2, 1fr)" gap={3}>
            {/* Calendar Widget */}
            <GridItem
              bg={cardBg}
              borderRadius="2xl"
              p={3.5}
              h="130px"
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
            >
              <Box>
                <Text
                  fontSize="9px"
                  fontWeight="bold"
                  color="#FF453A"
                  m={0}
                  p={0}
                >
                  {calendarDay}
                </Text>
                <Text
                  fontSize="42px"
                  fontWeight="normal"
                  color="white"
                  mt={-1}
                  p={0}
                  lineHeight="1"
                >
                  {calendarDate}
                </Text>
              </Box>
              <Text fontSize="11px" color="gray.400">
                No Events Today
              </Text>
            </GridItem>

            {/* Weather Widget */}
            <GridItem
              bg="#1d2433"
              borderRadius="2xl"
              p={3.5}
              h="130px"
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
            >
              <Box>
                <Text fontSize="13px" fontWeight="bold" color="white">
                  Pune ↗
                </Text>
                <Text
                  fontSize="42px"
                  fontWeight="normal"
                  color="white"
                  mt={-2}
                  lineHeight="1"
                >
                  23°
                </Text>
              </Box>
              <Box>
                <HStack spacing={1} color="white">
                  <WeatherCloudIcon />
                  <Text fontSize="10px" fontWeight="bold">
                    Mostly Cloudy
                  </Text>
                </HStack>
                <Text fontSize="9px" color="gray.400">
                  H:29° L:22°
                </Text>
              </Box>
            </GridItem>
          </Grid>

          {/* Row 2: World Clock */}
          <Box bg={cardBg} borderRadius="2xl" p={3.5}>
            <HStack spacing={1} justify="space-between" align="center" w="100%">
              <WorldClockItem
                city="Cupertino"
                tz="America/Los_Angeles"
                dayOffset="Yesterday"
                offsetText="-12:30"
                dateObject={dateObject}
              />
              <WorldClockItem
                city="Tokyo"
                tz="Asia/Tokyo"
                dayOffset="Today"
                offsetText="+3:30"
                dateObject={dateObject}
              />
              <WorldClockItem
                city="Sydney"
                tz="Australia/Sydney"
                dayOffset="Today"
                offsetText="+4:30"
                dateObject={dateObject}
              />
              <WorldClockItem
                city="Paris"
                tz="Europe/Paris"
                dayOffset="Yesterday"
                offsetText="-3:30"
                dateObject={dateObject}
              />
            </HStack>
          </Box>

          {/* Row 3: Stocks */}
          <Grid templateColumns="repeat(2, 1fr)" gap={3}>
            <GridItem
              bg={cardBg}
              borderRadius="2xl"
              p={3.5}
              h="140px"
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
            >
              <VStack
                align="stretch"
                spacing={1}
                fontSize="11px"
                fontWeight="bold"
              >
                <HStack justify="space-between">
                  <Text color="gray.400">▼ DOW</Text>
                  <Text>52,499</Text>
                </HStack>
                <HStack justify="space-between">
                  <Text color="gray.400">▼ S&P 500</Text>
                  <Text>7,515</Text>
                </HStack>
                <HStack justify="space-between">
                  <Text color="#30D158">▲ AAPL</Text>
                  <Text color="#30D158">317.31</Text>
                </HStack>
              </VStack>
              <Box>
                <Text fontSize="9px" fontWeight="bold" color="gray.500">
                  Economic Times
                </Text>
                <Text
                  fontSize="10px"
                  color="white"
                  fontWeight="semibold"
                  noOfLines={2}
                >
                  US stocks today: S&P 500 and Nasdaq open lo...
                </Text>
              </Box>
            </GridItem>
          </Grid>

          {/* Row 4: Screen Time */}
          <Box bg={cardBg} borderRadius="2xl" p={3.5}>
            <Text fontSize="18px" fontWeight="semibold" color="white" mb={2}>
              1h 55m
            </Text>
            <Grid templateColumns="1fr 1fr" gap={4}>
              {/* Left Column: Bar Chart */}
              <Box
                position="relative"
                height="85px"
                borderBottom="1px solid rgba(255,255,255,0.1)"
              >
                {/* Y Axis Gridlines */}
                <Box
                  borderBottom="1px dashed rgba(255,255,255,0.05)"
                  h="33%"
                  position="relative"
                >
                  <Text
                    position="absolute"
                    right={0}
                    top={-2}
                    fontSize="7px"
                    color="gray.500"
                  >
                    60m
                  </Text>
                </Box>
                <Box
                  borderBottom="1px dashed rgba(255,255,255,0.05)"
                  h="33%"
                  position="relative"
                >
                  <Text
                    position="absolute"
                    right={0}
                    top={-2}
                    fontSize="7px"
                    color="gray.500"
                  >
                    30m
                  </Text>
                </Box>
                <Box h="34%" position="relative">
                  <Text
                    position="absolute"
                    right={0}
                    bottom={0}
                    fontSize="7px"
                    color="gray.500"
                  >
                    0
                  </Text>
                </Box>

                {/* Bars */}
                <HStack
                  spacing={2}
                  align="end"
                  h="100%"
                  w="80%"
                  position="absolute"
                  top={0}
                  left={0}
                  zIndex={5}
                >
                  <Box w="6px" h="40px" bg="#007AFF" borderRadius="sm" />
                  <Box w="6px" h="65px" bg="#007AFF" borderRadius="sm" />
                  <Box w="6px" h="30px" bg="#007AFF" borderRadius="sm" />
                </HStack>

                {/* X Axis Labels */}
                <HStack
                  justify="space-between"
                  w="100%"
                  mt={1}
                  fontSize="7px"
                  color="gray.500"
                >
                  <Text>12 AM</Text>
                  <Text>6 AM</Text>
                  <Text>12 PM</Text>
                </HStack>
              </Box>

              {/* Right Column: App List */}
              <VStack align="stretch" spacing={1.5} justify="center">
                <HStack justify="space-between" fontSize="9px">
                  <HStack spacing={1.5}>
                    <Image src={XcodeLogo} boxSize="12px" />
                    <Text color="gray.400" fontWeight="bold">
                      Xcode
                    </Text>
                  </HStack>
                  <Text color="white" fontWeight="semibold">
                    1h 14m
                  </Text>
                </HStack>
                <HStack justify="space-between" fontSize="9px">
                  <HStack spacing={1.5}>
                    <Image src={ChromeLogo} boxSize="12px" />
                    <Text color="gray.400" fontWeight="bold">
                      Chrome
                    </Text>
                  </HStack>
                  <Text color="white" fontWeight="semibold">
                    38m
                  </Text>
                </HStack>
                <HStack justify="space-between" fontSize="9px">
                  <HStack spacing={1.5}>
                    <Image src={SettingsLogo} boxSize="12px" />
                    <Text color="gray.400" fontWeight="bold">
                      Settings
                    </Text>
                  </HStack>
                  <Text color="white" fontWeight="semibold">
                    1m
                  </Text>
                </HStack>
                <HStack justify="space-between" fontSize="9px">
                  <HStack spacing={1.5}>
                    <Image src={FinderLogo} boxSize="12px" />
                    <Text color="gray.400" fontWeight="bold">
                      Finder
                    </Text>
                  </HStack>
                  <Text color="white" fontWeight="semibold">
                    18s
                  </Text>
                </HStack>
              </VStack>
            </Grid>
          </Box>

          {/* Bottom Row: Buttons */}
          <HStack spacing={3} justify="center" pt={2}>
            <Button
              size="xs"
              borderRadius="full"
              bg={cardBg}
              color="white"
              border="1.5px solid rgba(255,255,255,0.2)"
              _hover={{ bg: 'whiteAlpha.200' }}
              fontSize="11px"
              px={4}
              py={3}
            >
              Edit Widgets
            </Button>
            <Flex
              w="26px"
              h="26px"
              borderRadius="full"
              bg={cardBg}
              border="1.5px solid rgba(255,255,255,0.2)"
              color="white"
              align="center"
              justify="center"
              cursor="pointer"
              onClick={onClose}
              _hover={{ bg: 'whiteAlpha.200' }}
              transition="background-color 0.2s"
            >
              <Text fontSize="10px" fontWeight="bold" mt="-1px">
                ✕
              </Text>
            </Flex>
          </HStack>
        </VStack>
      </Box>
    </>
  );
};

export default DateTimeDrawer;
