import React from 'react';
import {
  Flex,
  Heading,
  VStack,
  Text,
  Divider,
  Switch,
} from '@chakra-ui/react';

export const LockScreenSettings: React.FC = () => {
  return (
    <VStack align="stretch" spacing={4} p={1} color="white">
      <Heading size="sm">Lock Screen</Heading>
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
          <Text fontWeight="semibold">Start Screen Saver when inactive</Text>
          <select
            style={{
              background: '#2c2c2e',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '4px',
              padding: '2px 8px',
              fontSize: '11px',
              color: 'white',
              outline: 'none',
            }}
            defaultValue="20"
          >
            <option value="never">Never</option>
            <option value="5">5 Minutes</option>
            <option value="10">10 Minutes</option>
            <option value="20">20 Minutes</option>
            <option value="60">1 Hour</option>
          </select>
        </Flex>

        <Divider borderColor="whiteAlpha.100" />

        <Flex justify="space-between" align="center">
          <Text fontWeight="semibold">
            Turn display off when inactive on power adapter
          </Text>
          <select
            style={{
              background: '#2c2c2e',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '4px',
              padding: '2px 8px',
              fontSize: '11px',
              color: 'white',
              outline: 'none',
            }}
            defaultValue="15"
          >
            <option value="never">Never</option>
            <option value="1">1 Minute</option>
            <option value="5">5 Minutes</option>
            <option value="15">15 Minutes</option>
            <option value="30">30 Minutes</option>
          </select>
        </Flex>

        <Divider borderColor="whiteAlpha.100" />

        <Flex justify="space-between" align="center">
          <VStack align="start" spacing={0}>
            <Text fontWeight="semibold">
              Require password after screen saver begins
            </Text>
            <Text fontSize="10px" color="whiteAlpha.500">
              Or after display is turned off
            </Text>
          </VStack>
          <select
            style={{
              background: '#2c2c2e',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '4px',
              padding: '2px 8px',
              fontSize: '11px',
              color: 'white',
              outline: 'none',
            }}
            defaultValue="immediately"
          >
            <option value="immediately">Immediately</option>
            <option value="5">after 5 seconds</option>
            <option value="60">after 1 minute</option>
            <option value="300">after 5 minutes</option>
          </select>
        </Flex>

        <Divider borderColor="whiteAlpha.100" />

        <Flex justify="space-between" align="center">
          <Text fontWeight="semibold">Show message when locked</Text>
          <Switch size="sm" defaultChecked colorScheme="blue" />
        </Flex>

        <Divider borderColor="whiteAlpha.100" />
        <Flex justify="space-between" align="center">
          <Text fontWeight="semibold">Show password hints</Text>
          <Switch size="sm" defaultChecked colorScheme="blue" />
        </Flex>
      </VStack>
    </VStack>
  );
};
