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

export const SiriSettings: React.FC = () => {
  return (
    <VStack align="stretch" spacing={4} p={1} color="white">
      <Heading size="sm">Apple Intelligence & Siri</Heading>

      {/* Sequoia Apple Intelligence Hero Card */}
      <VStack
        align="stretch"
        p={4}
        borderRadius="xl"
        bgGradient="linear(to-br, #5E00A3, #00128C)"
        border="1.5px solid"
        borderColor="purple.400"
        spacing={2}
      >
        <HStack justify="space-between">
          <Text fontWeight="bold" fontSize="sm" color="white">
            Apple Intelligence
          </Text>
          <Text
            fontSize="9px"
            bg="green.500"
            px={2}
            py={0.5}
            borderRadius="md"
          >
            Active
          </Text>
        </HStack>
        <Text fontSize="10px" color="whiteAlpha.800">
          Writing Tools, Clean Up in Photos, and Siri are powered by local
          private models.
        </Text>
      </VStack>

      {/* Siri Settings */}
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
          <Text fontWeight="semibold">&quot;Hey Siri&quot; Activation</Text>
          <Switch size="sm" colorScheme="blue" defaultChecked />
        </Flex>
        <Divider borderColor="whiteAlpha.100" />
        <Flex justify="space-between" align="center">
          <Text fontWeight="semibold">Siri Language</Text>
          <Text fontSize="xs" color="whiteAlpha.600">
            English (United States)
          </Text>
        </Flex>
      </VStack>
    </VStack>
  );
};
