import React from 'react';
import {
  Box,
  Flex,
  Heading,
  VStack,
  Text,
  Divider,
  HStack,
} from '@chakra-ui/react';
import {
  WifiIcon,
  NetworkIcon,
  BluetoothIcon,
} from '@assets/icons/SettingsIcons';

export const NetworkSettings: React.FC = () => {
  return (
    <VStack align="stretch" spacing={4} p={1} color="white">
      <Heading size="sm">Network</Heading>
      <VStack
        align="stretch"
        bg="whiteAlpha.50"
        p={3}
        borderRadius="lg"
        border="1px solid"
        borderColor="whiteAlpha.100"
        spacing={2.5}
        fontSize="xs"
      >
        <Text fontWeight="semibold" fontSize="10px" color="whiteAlpha.600">
          Status Summary
        </Text>

        <Flex justify="space-between" align="center" py={0.5}>
          <HStack spacing={2.5}>
            <WifiIcon />
            <VStack align="start" spacing={0}>
              <Text fontWeight="semibold">Wi-Fi</Text>
              <Text fontSize="10px" color="whiteAlpha.600">
                Connected to Home-5G
              </Text>
            </VStack>
          </HStack>
          <Box w={1.5} height={1.5} borderRadius="full" bg="green.400" />
        </Flex>

        <Divider borderColor="whiteAlpha.100" />

        <Flex justify="space-between" align="center" py={0.5}>
          <HStack spacing={2.5}>
            <NetworkIcon />
            <VStack align="start" spacing={0}>
              <Text fontWeight="semibold">Ethernet</Text>
              <Text fontSize="10px" color="whiteAlpha.600">
                Not Connected
              </Text>
            </VStack>
          </HStack>
          <Box w={1.5} height={1.5} borderRadius="full" bg="whiteAlpha.400" />
        </Flex>

        <Divider borderColor="whiteAlpha.100" />

        <Flex justify="space-between" align="center" py={0.5}>
          <HStack spacing={2.5}>
            <BluetoothIcon />
            <VStack align="start" spacing={0}>
              <Text fontWeight="semibold">Firewall</Text>
              <Text fontSize="10px" color="whiteAlpha.600">
                Enabled
              </Text>
            </VStack>
          </HStack>
          <Box w={1.5} height={1.5} borderRadius="full" bg="green.400" />
        </Flex>
      </VStack>
    </VStack>
  );
};
