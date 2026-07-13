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

export const PrivacySecuritySettings: React.FC = () => {
  return (
    <VStack align="stretch" spacing={4} p={1} color="white">
      <Heading size="sm">Privacy & Security</Heading>

      <Text fontWeight="bold" fontSize="10px" color="whiteAlpha.600" px={1}>
        PRIVACY
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
            name: 'Location Services',
            desc: 'Allows apps to determine your location',
            status: 'On',
          },
          {
            name: 'Contacts',
            desc: 'Apps that have requested access to contacts',
            status: '2 Apps',
          },
          {
            name: 'Calendars',
            desc: 'Apps that have requested access to calendars',
            status: '3 Apps',
          },
          {
            name: 'Photos',
            desc: 'Apps that can read/write your photo library',
            status: '4 Apps',
          },
          {
            name: 'Camera',
            desc: 'Apps that have requested access to the camera',
            status: '2 Apps',
          },
          {
            name: 'Microphone',
            desc: 'Apps that have requested access to the microphone',
            status: '3 Apps',
          },
          {
            name: 'Screen Recording',
            desc: 'Apps that can record screen and system audio',
            status: '1 App',
          },
        ].map((item, idx) => (
          <React.Fragment key={item.name}>
            {idx > 0 && <Divider borderColor="whiteAlpha.100" />}
            <Flex justify="space-between" align="center">
              <VStack align="start" spacing={0}>
                <Text fontWeight="semibold">{item.name}</Text>
                <Text fontSize="10px" color="whiteAlpha.500">
                  {item.desc}
                </Text>
              </VStack>
              <Text fontSize="11px" color="whiteAlpha.500">
                {item.status}
              </Text>
            </Flex>
          </React.Fragment>
        ))}
      </VStack>

      <Text
        fontWeight="bold"
        fontSize="10px"
        color="whiteAlpha.600"
        px={1}
        pt={2}
      >
        SECURITY
      </Text>
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
        <VStack align="start" spacing={1.5}>
          <Text fontWeight="semibold">Allow apps downloaded from:</Text>
          <VStack align="start" spacing={1.5} pl={2}>
            <HStack spacing={2} cursor="pointer">
              <input type="radio" name="gatekeeper" defaultChecked id="gk1" />
              <label
                htmlFor="gk1"
                style={{ fontSize: '11px', cursor: 'pointer' }}
              >
                App Store
              </label>
            </HStack>
            <HStack spacing={2} cursor="pointer">
              <input type="radio" name="gatekeeper" id="gk2" />
              <label
                htmlFor="gk2"
                style={{ fontSize: '11px', cursor: 'pointer' }}
              >
                App Store and identified developers
              </label>
            </HStack>
          </VStack>
        </VStack>

        <Divider borderColor="whiteAlpha.100" />

        <Flex justify="space-between" align="center">
          <VStack align="start" spacing={0}>
            <Text fontWeight="semibold">FileVault</Text>
            <Text fontSize="10px" color="whiteAlpha.500">
              Secure your disk by encrypting its contents
            </Text>
          </VStack>
          <Switch size="sm" defaultChecked colorScheme="blue" />
        </Flex>
      </VStack>
    </VStack>
  );
};
