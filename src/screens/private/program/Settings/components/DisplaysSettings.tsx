import React from 'react';
import {
  Box,
  Flex,
  Heading,
  Switch,
  VStack,
  Text,
  Divider,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from '@chakra-ui/react';

interface DisplaysSettingsProps {
  brightness: number;
  setBrightness: (value: number) => void;
  nightShift: boolean;
  toggleNightShift: () => void;
  trueTone: boolean;
  toggleTrueTone: () => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export const DisplaysSettings: React.FC<DisplaysSettingsProps> = ({
  brightness,
  setBrightness,
  nightShift,
  toggleNightShift,
  trueTone,
  toggleTrueTone,
  darkMode,
  toggleDarkMode,
}) => {
  return (
    <VStack align="stretch" spacing={4} p={1} color="white">
      <Heading size="sm">Displays</Heading>
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
        {/* Brightness */}
        <Box>
          <Flex justify="space-between" mb={1.5}>
            <Text fontWeight="semibold">Brightness</Text>
            <Text color="whiteAlpha.600">{brightness}%</Text>
          </Flex>
          <Slider
            aria-label="brightness"
            value={brightness}
            onChange={setBrightness}
            min={10}
            max={100}
            focusThumbOnChange={false}
          >
            <SliderTrack bg="whiteAlpha.200">
              <SliderFilledTrack bg="blue.400" />
            </SliderTrack>
            <SliderThumb boxSize={3} />
          </Slider>
        </Box>

        <Divider borderColor="whiteAlpha.100" />

        {/* Switches */}
        <Flex justify="space-between" align="center">
          <VStack align="start" spacing={0}>
            <Text fontWeight="semibold">Night Shift</Text>
            <Text fontSize="10px" color="whiteAlpha.500">
              Warm up colors after dark to help sleep
            </Text>
          </VStack>
          <Switch
            size="sm"
            isChecked={nightShift}
            onChange={toggleNightShift}
            colorScheme="blue"
          />
        </Flex>

        <Divider borderColor="whiteAlpha.100" />

        <Flex justify="space-between" align="center">
          <VStack align="start" spacing={0}>
            <Text fontWeight="semibold">True Tone</Text>
            <Text fontSize="10px" color="whiteAlpha.500">
              Adapt colors to match ambient lighting
            </Text>
          </VStack>
          <Switch
            size="sm"
            isChecked={trueTone}
            onChange={toggleTrueTone}
            colorScheme="blue"
          />
        </Flex>

        <Divider borderColor="whiteAlpha.100" />

        <Flex justify="space-between" align="center">
          <VStack align="start" spacing={0}>
            <Text fontWeight="semibold">Dark Mode</Text>
            <Text fontSize="10px" color="whiteAlpha.500">
              Apply a sleek, dark aesthetic to menus and windows
            </Text>
          </VStack>
          <Switch
            size="sm"
            isChecked={darkMode}
            onChange={toggleDarkMode}
            colorScheme="blue"
          />
        </Flex>
      </VStack>
    </VStack>
  );
};
