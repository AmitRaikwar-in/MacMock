import React from 'react';
import {
  Box,
  Heading,
  VStack,
  Text,
  Grid,
  GridItem,
} from '@chakra-ui/react';

import { WallpaperEnum } from '@settingsStore';

interface WallpaperSettingsProps {
  wallpaper: WallpaperEnum;
  setWallpaper: (value: WallpaperEnum) => void;
  wallpaperImages: Array<{ id: WallpaperEnum; name: string }>;
}

export const WallpaperSettings: React.FC<WallpaperSettingsProps> = ({
  wallpaper,
  setWallpaper,
  wallpaperImages,
}) => {
  return (
    <VStack align="stretch" spacing={4} p={1} color="white">
      <Heading size="sm">Wallpaper</Heading>
      <Grid templateColumns="repeat(3, 1fr)" gap={3}>
        {wallpaperImages.map((wp) => {
          const isActive = wallpaper === wp.id;
          return (
            <GridItem key={wp.id}>
              <VStack
                spacing={1}
                cursor="pointer"
                onClick={() => setWallpaper(wp.id)}
                position="relative"
              >
                <Box
                  w="100%"
                  h="54px"
                  borderRadius="md"
                  border="1.5px solid"
                  borderColor={isActive ? 'blue.400' : 'whiteAlpha.100'}
                  overflow="hidden"
                  bg="whiteAlpha.100"
                  _hover={{ opacity: 0.85 }}
                  transition="all 0.15s"
                >
                  <Box
                    w="100%"
                    h="100%"
                    bgGradient={`linear(to-br, ${
                      wp.id === 'wallpaper1'
                        ? 'blue.600, purple.600'
                        : wp.id === 'wallpaper2'
                        ? 'purple.900, black'
                        : wp.id === 'wallpaper3'
                        ? 'orange.400, red.600'
                        : wp.id === 'wallpaper4'
                        ? 'teal.500, blue.700'
                        : wp.id === 'wallpaper5'
                        ? 'blue.800, pink.600'
                        : wp.id === 'wallpaper6'
                        ? 'cyan.600, indigo.800'
                        : 'yellow.500, orange.700'
                    })`}
                  />
                </Box>
                <Text
                  fontSize="10px"
                  fontWeight={isActive ? 'semibold' : 'normal'}
                  textAlign="center"
                >
                  {wp.name}
                </Text>
              </VStack>
            </GridItem>
          );
        })}
      </Grid>
    </VStack>
  );
};
