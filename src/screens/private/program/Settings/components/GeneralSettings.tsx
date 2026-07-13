import React from 'react';
import {
  Flex,
  Heading,
  VStack,
  Text,
  Divider,
  HStack,
} from '@chakra-ui/react';
import {
  ChevronIcon,
  InfoIcon,
  SoftwareUpdateIcon,
  StorageIcon,
  AppleCareIcon,
  ContinuityIcon,
  AutoFillIcon,
  DateIcon,
  LanguageIcon,
  LoginItemsIcon,
  SharingIcon,
} from '@assets/icons/SettingsIcons';

interface GeneralSettingsProps {
  navigateTo: (tab: string, sub: any) => void;
}

export const GeneralSettings: React.FC<GeneralSettingsProps> = ({
  navigateTo,
}) => {
  return (
    <VStack align="stretch" spacing={4} p={1} color="white">
      <Heading size="sm">General</Heading>
      <VStack
        align="stretch"
        bg="whiteAlpha.50"
        p={1}
        borderRadius="lg"
        border="1px solid"
        borderColor="whiteAlpha.100"
        spacing={0}
      >
        <Flex
          justify="space-between"
          align="center"
          py={2}
          px={3.5}
          cursor="pointer"
          _hover={{ bg: 'whiteAlpha.100' }}
          onClick={() => navigateTo('general', 'about')}
        >
          <HStack spacing={3}>
            <InfoIcon />
            <Text fontSize="xs">About</Text>
          </HStack>
          <ChevronIcon />
        </Flex>
        <Divider borderColor="whiteAlpha.100" />
        <Flex
          justify="space-between"
          align="center"
          py={2}
          px={3.5}
          cursor="pointer"
          _hover={{ bg: 'whiteAlpha.100' }}
          onClick={() => navigateTo('general', 'software_update')}
        >
          <HStack spacing={3}>
            <SoftwareUpdateIcon />
            <Text fontSize="xs">Software Update</Text>
          </HStack>
          <ChevronIcon />
        </Flex>
        <Divider borderColor="whiteAlpha.100" />
        <Flex
          justify="space-between"
          align="center"
          py={2}
          px={3.5}
          cursor="pointer"
          _hover={{ bg: 'whiteAlpha.100' }}
          onClick={() => navigateTo('general', 'storage')}
        >
          <HStack spacing={3}>
            <StorageIcon />
            <Text fontSize="xs">Storage</Text>
          </HStack>
          <ChevronIcon />
        </Flex>
        <Divider borderColor="whiteAlpha.100" />
        <Flex
          justify="space-between"
          align="center"
          py={2}
          px={3.5}
          cursor="pointer"
          _hover={{ bg: 'whiteAlpha.100' }}
          onClick={() => navigateTo('general', 'applecare')}
        >
          <HStack spacing={3}>
            <AppleCareIcon />
            <Text fontSize="xs">AppleCare & Warranty</Text>
          </HStack>
          <ChevronIcon />
        </Flex>
        <Divider borderColor="whiteAlpha.100" />
        <Flex
          justify="space-between"
          align="center"
          py={2}
          px={3.5}
          cursor="pointer"
          _hover={{ bg: 'whiteAlpha.100' }}
          onClick={() => navigateTo('general', 'continuity')}
        >
          <HStack spacing={3}>
            <ContinuityIcon />
            <Text fontSize="xs">AirDrop & Continuity</Text>
          </HStack>
          <ChevronIcon />
        </Flex>
        <Divider borderColor="whiteAlpha.100" />
        <Flex
          justify="space-between"
          align="center"
          py={2}
          px={3.5}
          cursor="pointer"
          _hover={{ bg: 'whiteAlpha.100' }}
          onClick={() => navigateTo('general', 'autofill')}
        >
          <HStack spacing={3}>
            <AutoFillIcon />
            <Text fontSize="xs">AutoFill & Passwords</Text>
          </HStack>
          <ChevronIcon />
        </Flex>
        <Divider borderColor="whiteAlpha.100" />
        <Flex
          justify="space-between"
          align="center"
          py={2}
          px={3.5}
          cursor="pointer"
          _hover={{ bg: 'whiteAlpha.100' }}
          onClick={() => navigateTo('general', 'datetime')}
        >
          <HStack spacing={3}>
            <DateIcon />
            <Text fontSize="xs">Date & Time</Text>
          </HStack>
          <ChevronIcon />
        </Flex>
        <Divider borderColor="whiteAlpha.100" />
        <Flex
          justify="space-between"
          align="center"
          py={2}
          px={3.5}
          cursor="pointer"
          _hover={{ bg: 'whiteAlpha.100' }}
          onClick={() => navigateTo('general', 'language')}
        >
          <HStack spacing={3}>
            <LanguageIcon />
            <Text fontSize="xs">Language & Region</Text>
          </HStack>
          <ChevronIcon />
        </Flex>
        <Divider borderColor="whiteAlpha.100" />
        <Flex
          justify="space-between"
          align="center"
          py={2}
          px={3.5}
          cursor="pointer"
          _hover={{ bg: 'whiteAlpha.100' }}
          onClick={() => navigateTo('general', 'login')}
        >
          <HStack spacing={3}>
            <LoginItemsIcon />
            <Text fontSize="xs">Login Items & Extensions</Text>
          </HStack>
          <ChevronIcon />
        </Flex>
        <Divider borderColor="whiteAlpha.100" />
        <Flex
          justify="space-between"
          align="center"
          py={2}
          px={3.5}
          cursor="pointer"
          _hover={{ bg: 'whiteAlpha.100' }}
          onClick={() => navigateTo('general', 'sharing')}
        >
          <HStack spacing={3}>
            <SharingIcon />
            <Text fontSize="xs">Sharing</Text>
          </HStack>
          <ChevronIcon />
        </Flex>
      </VStack>
    </VStack>
  );
};
