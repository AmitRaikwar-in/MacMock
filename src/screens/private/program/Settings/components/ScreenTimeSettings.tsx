import React from 'react';
import {
  Box,
  Flex,
  Heading,
  VStack,
  Text,
  Divider,
  Switch,
  HStack,
} from '@chakra-ui/react';

export const ScreenTimeSettings: React.FC = () => {
  return (
    <VStack align="stretch" spacing={4} p={1} color="white">
      <Heading size="sm">Screen Time</Heading>
      <VStack
        align="stretch"
        bg="whiteAlpha.50"
        p={4}
        borderRadius="lg"
        border="1px solid"
        borderColor="whiteAlpha.100"
        spacing={3}
        fontSize="xs"
      >
        <Flex justify="space-between" align="center">
          <VStack align="start" spacing={0}>
            <Text fontWeight="semibold">Screen Time Settings</Text>
            <Text fontSize="10px" color="whiteAlpha.500">
              Track and limit device usage
            </Text>
          </VStack>
          <Switch size="sm" defaultChecked colorScheme="blue" />
        </Flex>
      </VStack>

      <Text
        fontWeight="bold"
        fontSize="10px"
        color="whiteAlpha.600"
        px={1}
        pt={2}
      >
        DAILY AVERAGE
      </Text>
      <VStack
        align="stretch"
        bg="whiteAlpha.50"
        p={4}
        borderRadius="lg"
        border="1px solid"
        borderColor="whiteAlpha.100"
        spacing={3}
        fontSize="xs"
      >
        <VStack align="start" spacing={0}>
          <Text fontSize="2xl" fontWeight="bold">
            2h 45m
          </Text>
          <Text fontSize="10px" color="green.400">
            ↓ 12% from last week
          </Text>
        </VStack>

        <HStack
          h="60px"
          spacing={3}
          align="end"
          justify="space-between"
          pt={2}
          px={2}
        >
          {[
            { day: 'M', height: '40%' },
            { day: 'T', height: '60%' },
            { day: 'W', height: '35%' },
            { day: 'T', height: '80%' },
            { day: 'F', height: '50%' },
            { day: 'S', height: '20%' },
            { day: 'S', height: '15%' },
          ].map((item) => (
            <VStack key={item.day} spacing={1} flex={1}>
              <Box w="100%" h={item.height} bg="blue.400" borderRadius="sm" />
              <Text fontSize="9px" color="whiteAlpha.500">
                {item.day}
              </Text>
            </VStack>
          ))}
        </HStack>
      </VStack>

      <VStack
        align="stretch"
        bg="whiteAlpha.50"
        p={3}
        borderRadius="lg"
        border="1px solid"
        borderColor="whiteAlpha.100"
        spacing={3}
        fontSize="xs"
      >
        {[
          {
            name: 'Downtime',
            desc: 'Schedule time away from the screen',
            status: 'Off',
          },
          { name: 'App Limits', desc: 'Set time limits for apps', status: 'Active' },
          {
            name: 'Always Allowed',
            desc: 'Choose apps allowed at all times',
            status: '3 apps',
          },
        ].map((opt, idx) => (
          <React.Fragment key={opt.name}>
            {idx > 0 && <Divider borderColor="whiteAlpha.100" />}
            <Flex justify="space-between" align="center">
              <VStack align="start" spacing={0}>
                <Text fontWeight="semibold">{opt.name}</Text>
                <Text fontSize="10px" color="whiteAlpha.500">
                  {opt.desc}
                </Text>
              </VStack>
              <Text fontSize="11px" color="whiteAlpha.500">
                {opt.status}
              </Text>
            </Flex>
          </React.Fragment>
        ))}
      </VStack>
    </VStack>
  );
};
