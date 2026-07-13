import React from 'react';
import {
  Flex,
  Heading,
  VStack,
  Text,
  Divider,
  Button,
} from '@chakra-ui/react';

export const InternetAccountsSettings: React.FC = () => {
  return (
    <VStack align="stretch" spacing={4} p={1} color="white">
      <Heading size="sm">Internet Accounts</Heading>

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
            name: 'iCloud',
            type: 'Apple Account',
            details: 'Mail, Contacts, Calendar, iCloud Drive',
          },
          {
            name: 'Google',
            type: 'Google Account',
            details: 'Mail, Contacts, Calendar',
          },
          { name: 'Exchange', type: 'Microsoft Exchange', details: 'Inactive' },
        ].map((acc, idx) => (
          <React.Fragment key={acc.name}>
            {idx > 0 && <Divider borderColor="whiteAlpha.100" />}
            <Flex justify="space-between" align="center">
              <VStack align="start" spacing={0}>
                <Text fontWeight="semibold">{acc.name}</Text>
                <Text fontSize="10px" color="whiteAlpha.500">
                  {acc.details}
                </Text>
              </VStack>
              <Text fontSize="11px" color="whiteAlpha.500">
                {acc.type}
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
        Add Account...
      </Button>
    </VStack>
  );
};
