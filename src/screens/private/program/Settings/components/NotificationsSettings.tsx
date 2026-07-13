import React from 'react';
import {
  Flex,
  Heading,
  VStack,
  Text,
  Divider,
  Switch,
} from '@chakra-ui/react';

export const NotificationsSettings: React.FC = () => {
  return (
    <VStack align="stretch" spacing={4} p={1} color="white">
      <Heading size="sm">Notifications</Heading>
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
          <Text fontWeight="semibold">Allow Notifications</Text>
          <Switch size="sm" defaultChecked colorScheme="blue" />
        </Flex>
        <Divider borderColor="whiteAlpha.100" />
        <Flex justify="space-between" align="center">
          <VStack align="start" spacing={0}>
            <Text fontWeight="semibold">Show Previews</Text>
            <Text fontSize="10px" color="whiteAlpha.500">
              Choose when notification content is visible
            </Text>
          </VStack>
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
            defaultValue="unlocked"
          >
            <option value="always">Always</option>
            <option value="unlocked">When Unlocked</option>
            <option value="never">Never</option>
          </select>
        </Flex>
      </VStack>

      <Text
        fontWeight="bold"
        fontSize="10px"
        color="whiteAlpha.600"
        px={1}
        pt={2}
      >
        APPLICATION NOTIFICATIONS
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
          { name: 'Safari', desc: 'Banners, Sounds, Badges' },
          { name: 'Mail', desc: 'Badges' },
          { name: 'Messages', desc: 'Banners, Sounds, Badges' },
          { name: 'Calendar', desc: 'Banners, Sounds' },
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
