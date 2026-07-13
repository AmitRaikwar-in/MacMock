import React from 'react';
import { Box, Heading, VStack, Text, Divider, HStack } from '@chakra-ui/react';

interface AppearanceSettingsProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export const AppearanceSettings: React.FC<AppearanceSettingsProps> = ({
  darkMode,
  toggleDarkMode,
}) => {
  return (
    <VStack align="stretch" spacing={4} p={1} color="white">
      <Heading size="sm">Appearance</Heading>
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
        {/* Appearance Mode */}
        <Box>
          <Text fontWeight="semibold" mb={2}>
            Appearance Mode
          </Text>
          <HStack spacing={4}>
            <VStack cursor="pointer" onClick={toggleDarkMode} spacing={1}>
              <Box
                w="64px"
                h="40px"
                borderRadius="md"
                border={!darkMode ? '2px solid' : '1px solid'}
                borderColor={!darkMode ? 'blue.400' : 'whiteAlpha.200'}
                bg="gray.100"
                _hover={{ opacity: 0.8 }}
              />
              <Text fontSize="10px" fontWeight={!darkMode ? 'bold' : 'normal'}>
                Light
              </Text>
            </VStack>
            <VStack cursor="pointer" onClick={toggleDarkMode} spacing={1}>
              <Box
                w="64px"
                h="40px"
                borderRadius="md"
                border={darkMode ? '2px solid' : '1px solid'}
                borderColor={darkMode ? 'blue.400' : 'whiteAlpha.200'}
                bg="gray.800"
                _hover={{ opacity: 0.8 }}
              />
              <Text fontSize="10px" fontWeight={darkMode ? 'bold' : 'normal'}>
                Dark
              </Text>
            </VStack>
          </HStack>
        </Box>

        <Divider borderColor="whiteAlpha.100" />

        {/* Accent Color selection circles */}
        <Box>
          <Text fontWeight="semibold" mb={2}>
            Accent Color
          </Text>
          <HStack spacing={2.5}>
            {[
              '#FF3B30',
              '#FF9500',
              '#FFCC00',
              '#4CD964',
              '#5AC8FA',
              '#007AFF',
              '#5856D6',
              '#8E8E93',
            ].map((colorCode, idx) => (
              <Box
                key={idx}
                w="16px"
                h="16px"
                borderRadius="full"
                bg={colorCode}
                cursor="pointer"
                _hover={{ transform: 'scale(1.15)' }}
                transition="transform 0.1s"
              />
            ))}
          </HStack>
        </Box>
      </VStack>
    </VStack>
  );
};
