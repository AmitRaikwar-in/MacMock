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

export const WalletSettings: React.FC = () => {
  return (
    <VStack align="stretch" spacing={4} p={1} color="white">
      <Heading size="sm">Wallet & Apple Pay</Heading>

      <Text fontWeight="bold" fontSize="10px" color="whiteAlpha.600" px={1}>
        PAYMENT CARDS
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
          {
            name: 'Apple Card',
            details: ' Pay (Default Card)',
            status: 'Active',
          },
          {
            name: 'Chase Sapphire Preferred',
            details: 'Visa •••• 9876',
            status: 'Active',
          },
        ].map((card, idx) => (
          <React.Fragment key={card.name}>
            {idx > 0 && <Divider borderColor="whiteAlpha.100" />}
            <Flex justify="space-between" align="center">
              <VStack align="start" spacing={0}>
                <Text fontWeight="semibold">{card.name}</Text>
                <Text fontSize="10px" color="whiteAlpha.500">
                  {card.details}
                </Text>
              </VStack>
              <Text fontSize="11px" color="whiteAlpha.500">
                {card.status}
              </Text>
            </Flex>
          </React.Fragment>
        ))}
      </VStack>

      <Button
        size="xs"
        colorScheme="blue"
        alignSelf="start"
        fontSize="11px"
        px={3}
      >
        Add Card...
      </Button>

      <Divider borderColor="whiteAlpha.100" pt={2} />

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
          <Text fontWeight="semibold">Express Transit Card</Text>
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
            defaultValue="none"
          >
            <option value="none">None</option>
            <option value="apple_card">Apple Card</option>
            <option value="chase">Chase Sapphire</option>
          </select>
        </Flex>
        <Divider borderColor="whiteAlpha.100" />
        <Flex justify="space-between" align="center">
          <Text fontWeight="semibold">Show transaction history</Text>
          <Switch size="sm" defaultChecked colorScheme="blue" />
        </Flex>
      </VStack>
    </VStack>
  );
};
