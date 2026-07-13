import React from 'react';
import {
  Box,
  Flex,
  Heading,
  VStack,
  Text,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from '@chakra-ui/react';

interface DesktopDockSettingsProps {
  dockSize: number;
  setDockSize: (size: number) => void;
}

export const DesktopDockSettings: React.FC<DesktopDockSettingsProps> = ({
  dockSize,
  setDockSize,
}) => {
  return (
    <VStack align="stretch" spacing={4} p={1} color="white">
      <Heading size="sm">Desktop & Dock</Heading>
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
        <Box>
          <Flex justify="space-between" mb={1.5}>
            <Text fontWeight="semibold">Dock Size</Text>
            <Text color="whiteAlpha.600">{dockSize}px</Text>
          </Flex>
          <Slider
            aria-label="dock-size"
            value={dockSize}
            onChange={setDockSize}
            min={30}
            max={100}
            focusThumbOnChange={false}
          >
            <SliderTrack bg="whiteAlpha.200">
              <SliderFilledTrack bg="blue.400" />
            </SliderTrack>
            <SliderThumb boxSize={3} />
          </Slider>
        </Box>
      </VStack>
    </VStack>
  );
};
