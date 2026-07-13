import React from 'react';
import {
  Flex,
  Heading,
  VStack,
  Text,
  Divider,
  Switch,
} from '@chakra-ui/react';

interface BatterySettingsProps {
  lowPowerMode: boolean;
  setLowPowerMode: (value: boolean) => void;
}

export const BatterySettings: React.FC<BatterySettingsProps> = ({
  lowPowerMode,
  setLowPowerMode,
}) => {
  return (
    <VStack align="stretch" spacing={4} p={1} color="white">
      <Heading size="sm">Battery</Heading>
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
          <Text fontWeight="semibold">Battery Health</Text>
          <Text color="green.400" fontWeight="bold">
            98% (Normal)
          </Text>
        </Flex>
        <Divider borderColor="whiteAlpha.100" />
        <Flex justify="space-between" align="center">
          <VStack align="start" spacing={0}>
            <Text fontWeight="semibold">Low Power Mode</Text>
            <Text fontSize="10px" color="whiteAlpha.500">
              Reduce energy usage to increase battery life
            </Text>
          </VStack>
          <Switch
            size="sm"
            isChecked={lowPowerMode}
            onChange={(e) => setLowPowerMode(e.target.checked)}
            colorScheme="blue"
          />
        </Flex>
      </VStack>
    </VStack>
  );
};
