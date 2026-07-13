import React from 'react';
import {
  Flex,
  Heading,
  VStack,
  Text,
  Divider,
  Switch,
} from '@chakra-ui/react';

export const GameCenterSettings: React.FC = () => {
  return (
    <VStack align="stretch" spacing={4} p={1} color="white">
      <Heading size="sm">Game Center</Heading>

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
          <Text fontWeight="semibold">Game Center</Text>
          <Switch size="sm" defaultChecked colorScheme="blue" />
        </Flex>

        <Divider borderColor="whiteAlpha.100" />

        <Flex justify="space-between" align="center">
          <Text fontWeight="semibold">Nickname</Text>
          <input
            style={{
              background: '#2c2c2e',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '4px',
              padding: '2px 8px',
              fontSize: '11px',
              color: 'white',
              outline: 'none',
              textAlign: 'right',
            }}
            defaultValue="MacGamer"
          />
        </Flex>

        <Divider borderColor="whiteAlpha.100" />

        <Flex justify="space-between" align="center">
          <VStack align="start" spacing={0}>
            <Text fontWeight="semibold">Nearby Players</Text>
            <Text fontSize="10px" color="whiteAlpha.500">
              Allow nearby players to invite you to multiplayer games
            </Text>
          </VStack>
          <Switch size="sm" defaultChecked colorScheme="blue" />
        </Flex>
      </VStack>
    </VStack>
  );
};
