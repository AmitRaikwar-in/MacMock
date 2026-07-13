import React from 'react';
import {
  Flex,
  Heading,
  Switch,
  VStack,
  Text,
  Divider,
} from '@chakra-ui/react';

interface WifiSettingsProps {
  wifiEnabled: boolean;
  setWifiEnabled: (enabled: boolean) => void;
}

export const WifiSettings: React.FC<WifiSettingsProps> = ({
  wifiEnabled,
  setWifiEnabled,
}) => {
  return (
    <VStack align="stretch" spacing={4} p={1} color="white">
      <Flex justify="space-between" align="center">
        <Heading size="sm">Wi-Fi</Heading>
        <Switch
          size="sm"
          isChecked={wifiEnabled}
          onChange={(e) => setWifiEnabled(e.target.checked)}
          colorScheme="blue"
        />
      </Flex>
      {wifiEnabled ? (
        <VStack align="stretch" spacing={3}>
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
              Known Networks
            </Text>
            <Flex justify="space-between" align="center" py={0.5}>
              <Text fontWeight="semibold">✓ Home-5G</Text>
              <Text fontSize="10px" color="blue.400">
                Connected
              </Text>
            </Flex>
            <Divider borderColor="whiteAlpha.100" />
            <Flex justify="space-between" align="center" py={0.5}>
              <Text color="whiteAlpha.800">CoffeeShop-Free</Text>
              <svg
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </Flex>
            <Divider borderColor="whiteAlpha.100" />
            <Flex justify="space-between" align="center" py={0.5}>
              <Text color="whiteAlpha.800">Office-WiFi</Text>
              <svg
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </Flex>
          </VStack>
        </VStack>
      ) : (
        <Text color="whiteAlpha.500" fontSize="xs" textAlign="center" py={6}>
          Wi-Fi is turned off.
        </Text>
      )}
    </VStack>
  );
};
