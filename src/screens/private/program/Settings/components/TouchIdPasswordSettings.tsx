import React from 'react';
import {
  Flex,
  Heading,
  VStack,
  Text,
  Divider,
  Switch,
  Button,
} from '@chakra-ui/react';

export const TouchIdPasswordSettings: React.FC = () => {
  return (
    <VStack align="stretch" spacing={4} p={1} color="white">
      <Heading size="sm">Touch ID & Password</Heading>

      <Text fontWeight="bold" fontSize="10px" color="whiteAlpha.600" px={1}>
        FINGERPRINTS
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
        <Flex justify="space-between" align="center">
          <Text fontWeight="semibold">Finger 1</Text>
          <Text fontSize="10px" color="whiteAlpha.500">
            Added May 14, 2026
          </Text>
        </Flex>
        <Divider borderColor="whiteAlpha.100" />
        <Button
          size="xs"
          colorScheme="blue"
          alignSelf="start"
          fontSize="11px"
          px={3}
        >
          Add Fingerprint...
        </Button>
      </VStack>

      <Text
        fontWeight="bold"
        fontSize="10px"
        color="whiteAlpha.600"
        px={1}
        pt={2}
      >
        USE TOUCH ID FOR
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
          { name: 'Unlocking your Mac', key: 'unlock' },
          { name: 'Apple Pay', key: 'applepay' },
          { name: 'iTunes Store, App Store & Apple Books', key: 'stores' },
          { name: 'Password AutoFill', key: 'autofill' },
          { name: 'Fast User Switching', key: 'switching' },
        ].map((opt, idx) => (
          <React.Fragment key={opt.key}>
            {idx > 0 && <Divider borderColor="whiteAlpha.100" />}
            <Flex justify="space-between" align="center">
              <Text fontWeight="semibold">{opt.name}</Text>
              <Switch size="sm" defaultChecked colorScheme="blue" />
            </Flex>
          </React.Fragment>
        ))}
      </VStack>
    </VStack>
  );
};
