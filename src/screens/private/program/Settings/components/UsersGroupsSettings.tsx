import React from 'react';
import {
  Flex,
  Heading,
  VStack,
  Text,
  Button,
  HStack,
  Avatar,
} from '@chakra-ui/react';

interface UsersGroupsSettingsProps {
  userData: any;
  onPwdOpen: () => void;
}

export const UsersGroupsSettings: React.FC<UsersGroupsSettingsProps> = ({
  userData,
  onPwdOpen,
}) => {
  return (
    <VStack align="stretch" spacing={4} p={1} color="white">
      <Heading size="sm">Users & Groups</Heading>

      <Text fontWeight="bold" fontSize="10px" color="whiteAlpha.600" px={1}>
        CURRENT USER
      </Text>
      <VStack
        align="stretch"
        bg="whiteAlpha.50"
        p={3.5}
        borderRadius="lg"
        border="1px solid"
        borderColor="whiteAlpha.100"
        spacing={3}
        fontSize="xs"
      >
        <Flex justify="space-between" align="center">
          <HStack spacing={3}>
            <Avatar
              size="sm"
              src={userData?.profilePicture}
              name={userData?.name}
            />
            <VStack align="start" spacing={0}>
              <Text fontWeight="bold">{userData?.name || 'Amit Raikwar'}</Text>
              <Text fontSize="10px" color="whiteAlpha.500">
                Admin
              </Text>
            </VStack>
          </HStack>
          <Button
            size="xs"
            variant="outline"
            borderColor="whiteAlpha.200"
            color="white"
            _hover={{ bg: 'whiteAlpha.100' }}
            fontSize="10px"
            px={2.5}
            h="22px"
            onClick={onPwdOpen}
          >
            Change Password...
          </Button>
        </Flex>
      </VStack>
    </VStack>
  );
};
