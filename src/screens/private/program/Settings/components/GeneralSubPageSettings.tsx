import React from 'react';
import {
  Box,
  Flex,
  Heading,
  VStack,
  Text,
  Divider,
  HStack,
  Button,
  Avatar,
} from '@chakra-ui/react';
import {
  GeneralIcon,
  SoftwareUpdateIcon,
  StorageIcon,
  AppleCareIcon,
} from '@assets/icons/SettingsIcons';

interface GeneralSubPageSettingsProps {
  subPage: string | null;
  setSubPage: (sub: any) => void;
  userData: any;
}

export const GeneralSubPageSettings: React.FC<GeneralSubPageSettingsProps> = ({
  subPage,
  setSubPage,
  userData,
}) => {
  switch (subPage) {
    case 'about':
      return (
        <VStack align="stretch" spacing={4} p={1} color="white">
          <Flex align="center" gap={3}>
            <GeneralIcon />
            <Heading size="sm">About this Mac</Heading>
          </Flex>
          <VStack
            align="center"
            py={4}
            bg="whiteAlpha.50"
            borderRadius="lg"
            border="1px solid"
            borderColor="whiteAlpha.100"
          >
            <Avatar
              size="lg"
              src={userData?.profilePicture}
              name={userData?.name}
              mb={1}
            />
            <Text fontWeight="bold" fontSize="sm">
              {userData?.name}&apos;s Mac Studio
            </Text>
            <Text fontSize="11px" color="whiteAlpha.600">
              Model: Mac Studio (2024)
            </Text>
          </VStack>
          <VStack
            align="stretch"
            spacing={2}
            bg="whiteAlpha.50"
            p={3}
            borderRadius="lg"
            border="1px solid"
            borderColor="whiteAlpha.100"
            fontSize="xs"
          >
            <Flex justify="space-between" w="100%">
              <Text color="whiteAlpha.600">Chip</Text>
              <Text fontWeight="semibold">Apple M2 Ultra</Text>
            </Flex>
            <Divider borderColor="whiteAlpha.100" />
            <Flex justify="space-between" w="100%">
              <Text color="whiteAlpha.600">Memory</Text>
              <Text fontWeight="semibold">64 GB (Unified)</Text>
            </Flex>
            <Divider borderColor="whiteAlpha.100" />
            <Flex justify="space-between" w="100%">
              <Text color="whiteAlpha.600">macOS Version</Text>
              <Text fontWeight="semibold">macOS Sequoia 15.0</Text>
            </Flex>
            <Divider borderColor="whiteAlpha.100" />
            <Flex justify="space-between" w="100%">
              <Text color="whiteAlpha.600">Serial Number</Text>
              <Text fontFamily="monospace">MOCK827492HD</Text>
            </Flex>
          </VStack>
          <Button
            size="xs"
            onClick={() => setSubPage(null)}
            colorScheme="blue"
            alignSelf="flex-start"
            fontSize="11px"
            px={3}
          >
            Back to General
          </Button>
        </VStack>
      );

    case 'software_update':
      return (
        <VStack align="stretch" spacing={4} p={1} color="white">
          <Flex align="center" gap={3}>
            <SoftwareUpdateIcon />
            <Heading size="sm">Software Update</Heading>
          </Flex>
          <VStack
            py={6}
            bg="whiteAlpha.50"
            borderRadius="lg"
            border="1px solid"
            borderColor="whiteAlpha.100"
            spacing={3}
          >
            <Box color="green.400">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </Box>
            <Text fontWeight="bold" fontSize="sm">
              Your Mac is up to date
            </Text>
            <Text fontSize="xs" color="whiteAlpha.600">
              macOS Sequoia 15.0
            </Text>
            <Text fontSize="10px" color="whiteAlpha.500">
              Last checked: Today at 12:04 AM
            </Text>
          </VStack>
          <Button
            size="xs"
            onClick={() => setSubPage(null)}
            colorScheme="blue"
            alignSelf="flex-start"
            fontSize="11px"
            px={3}
          >
            Back to General
          </Button>
        </VStack>
      );

    case 'storage':
      return (
        <VStack align="stretch" spacing={4} p={1} color="white">
          <Flex align="center" gap={3}>
            <StorageIcon />
            <Heading size="sm">Storage</Heading>
          </Flex>
          <VStack
            align="stretch"
            bg="whiteAlpha.50"
            p={4}
            borderRadius="lg"
            border="1px solid"
            borderColor="whiteAlpha.100"
            spacing={3}
          >
            <Text fontWeight="semibold" fontSize="xs">
              Macintosh HD
            </Text>
            <Flex
              height="16px"
              w="100%"
              borderRadius="md"
              overflow="hidden"
              bg="whiteAlpha.200"
            >
              <Box w="8%" bg="red.400" title="Apps" />
              <Box w="12%" bg="blue.400" title="macOS" />
              <Box w="15%" bg="yellow.400" title="System Data" />
              <Box w="65%" bg="transparent" title="Available" />
            </Flex>
            <Flex justify="space-between" fontSize="11px">
              <Text color="whiteAlpha.600">45 GB used of 512 GB</Text>
              <Text fontWeight="bold">467 GB Available</Text>
            </Flex>
            <HStack spacing={4} wrap="wrap" fontSize="10px" pt={1}>
              <HStack>
                <Box w={2} height={2} bg="red.400" borderRadius="sm" />
                <Text>Apps (8 GB)</Text>
              </HStack>
              <HStack>
                <Box w={2} height={2} bg="blue.400" borderRadius="sm" />
                <Text>macOS (12 GB)</Text>
              </HStack>
              <HStack>
                <Box w={2} height={2} bg="yellow.400" borderRadius="sm" />
                <Text>System Data (25 GB)</Text>
              </HStack>
            </HStack>
          </VStack>
          <Button
            size="xs"
            onClick={() => setSubPage(null)}
            colorScheme="blue"
            alignSelf="flex-start"
            fontSize="11px"
            px={3}
          >
            Back to General
          </Button>
        </VStack>
      );

    case 'applecare':
      return (
        <VStack align="stretch" spacing={4} p={1} color="white">
          <Flex align="center" gap={3}>
            <AppleCareIcon />
            <Heading size="sm">AppleCare & Warranty</Heading>
          </Flex>
          <VStack
            align="stretch"
            bg="whiteAlpha.50"
            p={4}
            borderRadius="lg"
            border="1px solid"
            borderColor="whiteAlpha.100"
            spacing={3}
          >
            <HStack justify="space-between">
              <Text fontWeight="semibold" fontSize="sm">
                AppleCare+ Covered
              </Text>
              <Text
                fontSize="10px"
                bg="green.500"
                px={2}
                py={0.5}
                borderRadius="md"
              >
                Active
              </Text>
            </HStack>
            <Text fontSize="xs" color="whiteAlpha.700">
              Accidental damage coverage and 24/7 technical support is active for
              this device.
            </Text>
            <Divider borderColor="whiteAlpha.100" />
            <Text fontSize="10px" color="whiteAlpha.500">
              Expiration Date: May 14, 2027
            </Text>
          </VStack>
          <Button
            size="xs"
            onClick={() => setSubPage(null)}
            colorScheme="blue"
            alignSelf="flex-start"
            fontSize="11px"
            px={3}
          >
            Back to General
          </Button>
        </VStack>
      );

    default:
      return (
        <VStack align="stretch" spacing={4} p={1} color="white">
          <Heading size="sm" textTransform="capitalize">
            {subPage?.replace('_', ' ')}
          </Heading>
          <Box
            bg="whiteAlpha.50"
            p={4}
            borderRadius="lg"
            border="1px solid"
            borderColor="whiteAlpha.100"
            fontSize="xs"
          >
            <Text>
              Detailed preference options for {subPage?.replace('_', ' ')} are
              active.
            </Text>
          </Box>
          <Button
            size="xs"
            onClick={() => setSubPage(null)}
            colorScheme="blue"
            alignSelf="flex-start"
            fontSize="11px"
            px={3}
          >
            Back to General
          </Button>
        </VStack>
      );
  }
};
