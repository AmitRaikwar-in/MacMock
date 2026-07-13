import React from 'react';
import {
  Flex,
  Heading,
  Switch,
  VStack,
  Text,
  Divider,
} from '@chakra-ui/react';

interface BluetoothSettingsProps {
  bluetoothEnabled: boolean;
  setBluetoothEnabled: (enabled: boolean) => void;
}

export const BluetoothSettings: React.FC<BluetoothSettingsProps> = ({
  bluetoothEnabled,
  setBluetoothEnabled,
}) => {
  return (
    <VStack align="stretch" spacing={4} p={1} color="white">
      <Flex justify="space-between" align="center">
        <Heading size="sm">Bluetooth</Heading>
        <Switch
          size="sm"
          isChecked={bluetoothEnabled}
          onChange={(e) => setBluetoothEnabled(e.target.checked)}
          colorScheme="blue"
        />
      </Flex>
      {bluetoothEnabled ? (
        <VStack
          align="stretch"
          bg="whiteAlpha.50"
          p={3}
          borderRadius="lg"
          border="1px solid"
          borderColor="whiteAlpha.100"
          spacing={2}
          fontSize="xs"
        >
          <Text fontWeight="semibold" fontSize="10px" color="whiteAlpha.600">
            My Devices
          </Text>
          <Flex justify="space-between" align="center" py={0.5}>
            <Text>Magic Mouse</Text>
            <Text fontSize="10px" color="whiteAlpha.500">
              Connected
            </Text>
          </Flex>
          <Divider borderColor="whiteAlpha.100" />
          <Flex justify="space-between" align="center" py={0.5}>
            <Text>AirPods Max</Text>
            <Text fontSize="10px" color="whiteAlpha.500">
              Connected
            </Text>
          </Flex>
          <Divider borderColor="whiteAlpha.100" />
          <Flex justify="space-between" align="center" py={0.5}>
            <Text>Keychron K2 Keyboard</Text>
            <Text fontSize="10px" color="whiteAlpha.500">
              Saved
            </Text>
          </Flex>
        </VStack>
      ) : (
        <Text color="whiteAlpha.500" fontSize="xs" textAlign="center" py={6}>
          Bluetooth is turned off.
        </Text>
      )}
    </VStack>
  );
};
