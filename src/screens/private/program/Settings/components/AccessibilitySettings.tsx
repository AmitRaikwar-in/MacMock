import React from 'react';
import {
  Flex,
  Heading,
  VStack,
  Text,
  Divider,
  Switch,
} from '@chakra-ui/react';

export const AccessibilitySettings: React.FC = () => {
  return (
    <VStack align="stretch" spacing={4} p={1} color="white">
      <Heading size="sm">Accessibility</Heading>
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
        <Text fontWeight="bold" color="whiteAlpha.700" fontSize="10px">
          Vision
        </Text>
        <Flex justify="space-between" align="center">
          <Text>VoiceOver</Text>
          <Switch size="sm" colorScheme="blue" />
        </Flex>
        <Divider borderColor="whiteAlpha.100" />
        <Flex justify="space-between" align="center">
          <Text>Zoom</Text>
          <Switch size="sm" colorScheme="blue" />
        </Flex>
        <Divider borderColor="whiteAlpha.100" />
        <Flex justify="space-between" align="center">
          <Text>Display (Reduce motion, Increase contrast)</Text>
          <Switch size="sm" colorScheme="blue" />
        </Flex>

        <Divider borderColor="whiteAlpha.100" pt={1} />
        <Text fontWeight="bold" color="whiteAlpha.700" fontSize="10px" pt={1}>
          Hearing
        </Text>
        <Flex justify="space-between" align="center">
          <Text>Mono Audio</Text>
          <Switch size="sm" colorScheme="blue" />
        </Flex>
      </VStack>
    </VStack>
  );
};
