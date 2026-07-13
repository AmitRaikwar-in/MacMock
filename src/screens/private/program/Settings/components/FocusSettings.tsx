import React from 'react';
import {
  Flex,
  Heading,
  VStack,
  Text,
  Divider,
  Switch,
  HStack,
} from '@chakra-ui/react';
import { FocusIcon } from '@assets/icons/SettingsIcons';

export const FocusSettings: React.FC = () => {
  return (
    <VStack align="stretch" spacing={4} p={1} color="white">
      <Heading size="sm">Focus</Heading>
      <VStack
        align="stretch"
        bg="whiteAlpha.50"
        p={4}
        borderRadius="lg"
        border="1px solid"
        borderColor="whiteAlpha.100"
        spacing={4}
        fontSize="xs"
      >
        <Flex justify="space-between" align="center">
          <HStack spacing={2.5}>
            <FocusIcon />
            <VStack align="start" spacing={0}>
              <Text fontWeight="semibold">Do Not Disturb</Text>
              <Text fontSize="10px" color="whiteAlpha.500">
                Mute all notifications
              </Text>
            </VStack>
          </HStack>
          <Switch size="sm" colorScheme="blue" />
        </Flex>
        <Divider borderColor="whiteAlpha.100" />
        <Flex justify="space-between" align="center">
          <Text fontWeight="semibold">Share across devices</Text>
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
        FOCUS MODES
      </Text>
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
          { name: 'Work', status: 'Off' },
          { name: 'Personal', status: 'Off' },
          { name: 'Sleep', status: 'Scheduled (10:00 PM - 7:00 AM)' },
        ].map((mode, idx) => (
          <React.Fragment key={mode.name}>
            {idx > 0 && <Divider borderColor="whiteAlpha.100" />}
            <Flex justify="space-between" align="center">
              <Text fontWeight="semibold">{mode.name}</Text>
              <Text fontSize="11px" color="whiteAlpha.500">
                {mode.status}
              </Text>
            </Flex>
          </React.Fragment>
        ))}
      </VStack>
    </VStack>
  );
};
