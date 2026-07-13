import React from 'react';
import {
  Box,
  Flex,
  Heading,
  VStack,
  Text,
  Divider,
  Switch,
} from '@chakra-ui/react';

export const ICloudSettings: React.FC = () => {
  return (
    <VStack align="stretch" spacing={4} p={1} color="white">
      <Heading size="sm">iCloud</Heading>

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
        <Text fontWeight="semibold">iCloud Storage</Text>
        <Flex
          height="16px"
          w="100%"
          borderRadius="md"
          overflow="hidden"
          bg="whiteAlpha.200"
        >
          <Box w="15%" bg="orange.400" title="Photos" />
          <Box w="25%" bg="purple.400" title="iCloud Drive" />
          <Box w="10%" bg="yellow.400" title="Backups" />
          <Box w="50%" bg="transparent" title="Available" />
        </Flex>
        <Flex justify="space-between" fontSize="11px">
          <Text color="whiteAlpha.600">1.0 TB of 2 TB used</Text>
          <Text fontWeight="bold">1.0 TB Available</Text>
        </Flex>
      </VStack>

      <Text
        fontWeight="bold"
        fontSize="10px"
        color="whiteAlpha.600"
        px={1}
        pt={2}
      >
        APPS USING ICLOUD
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
          { name: 'Photos', desc: 'Sync and store photo library' },
          { name: 'iCloud Drive', desc: 'Sync files and folders' },
          {
            name: 'Passwords & Keychain',
            desc: 'Sync login credentials and passkeys',
          },
          { name: 'Find My Mac', desc: 'Locate and secure this Mac' },
        ].map((app, idx) => (
          <React.Fragment key={app.name}>
            {idx > 0 && <Divider borderColor="whiteAlpha.100" />}
            <Flex justify="space-between" align="center">
              <VStack align="start" spacing={0}>
                <Text fontWeight="semibold">{app.name}</Text>
                <Text fontSize="10px" color="whiteAlpha.500">
                  {app.desc}
                </Text>
              </VStack>
              <Switch size="sm" defaultChecked colorScheme="blue" />
            </Flex>
          </React.Fragment>
        ))}
      </VStack>
    </VStack>
  );
};
