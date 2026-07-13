import React, { useState } from 'react';
import {
  Menu,
  Box,
  Flex,
  Text,
  VStack,
  HStack,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Button,
  Grid,
  GridItem,
} from '@chakra-ui/react';
import {
  SettingsIcon,
  WifiIcon,
  BluetoothOnIcon,
  BluetoothOffIcon,
  AirDropIcon,
  MoonIcon,
  DarkModeIcon,
  BrightnessIcon,
  VolumeIcon,
} from '@assets';
import { MenuListComponent, TopBarButton } from '@components';
import {
  darkModeColorSelector,
  settingsStore,
  useShallow,
  generalSelector,
  wifiSelector,
  bluetoothSelector,
  displayBrightnessSelector,
  displayDarkModeSelector,
  soundSelector,
} from '@settingsStore';
import {
  ProgramType,
  activeAppActionsSelector,
  processStore,
} from '@processStore';


// Inline Custom Icons for Control Center
const StageManagerIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1.2em"
    height="1.2em"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect x="3" y="4" width="3" height="4" rx="1" />
    <rect x="3" y="10" width="3" height="4" rx="1" />
    <rect x="3" y="16" width="3" height="4" rx="1" />
    <rect x="8" y="4" width="13" height="16" rx="2" />
  </svg>
);

const ScreenMirroringIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1.2em"
    height="1.2em"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect x="2" y="6" width="13" height="10" rx="1.5" />
    <rect x="9" y="9" width="13" height="10" rx="1.5" />
  </svg>
);

const CameraIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1.2em"
    height="1.2em"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
    <circle cx="12" cy="13" r="4" />
  </svg>
);

const Settings = () => {
  const { iconColor, textColor } = settingsStore(
    useShallow(darkModeColorSelector),
  );
  const { addApp } = processStore(useShallow(activeAppActionsSelector));
  const { setSelectedTab, setSubPage } = settingsStore(
    useShallow(generalSelector),
  );

  // Store settings bindings
  const { wifiEnabled, setWifiEnabled } = settingsStore(
    useShallow(wifiSelector),
  );
  const { bluetoothEnabled, setBluetoothEnabled } = settingsStore(
    useShallow(bluetoothSelector),
  );
  const { brightness, setBrightness } = settingsStore(
    useShallow(displayBrightnessSelector),
  );
  const { darkMode, toggleDarkMode } = settingsStore(
    useShallow(displayDarkModeSelector),
  );
  const { soundVolume, setSoundVolume } = settingsStore(
    useShallow(soundSelector),
  );

  // Local UI-only toggles
  const [stageManager, setStageManager] = useState(false);
  const [airDrop, setAirDrop] = useState(false);
  const [focus, setFocus] = useState(false);

  // Custom colors matching system dark/light aesthetics without glass effects
  const cardBg = darkMode ? 'whiteAlpha.100' : 'blackAlpha.50';
  const sliderTrackBg = darkMode ? 'whiteAlpha.200' : 'blackAlpha.200';
  const sliderFilledBg = darkMode ? 'white' : 'black';
  const sliderIconColor = darkMode ? 'black' : 'white';

  return (
    <Menu>
      <TopBarButton
        text=""
        onClick={() => {}}
        ariaLabel="settings-top-bar-button"
        icon={<SettingsIcon width="1.5em" height="1.5em" color={iconColor} />}
      />
      <MenuListComponent>
        <Box width="300px" p={1.5} color={textColor}>
          {/* Top Grid: Connectivity & Now Playing */}
          <Grid templateColumns="repeat(2, 1fr)" gap={3} mb={3}>
            {/* Left Box: Connectivity */}
            <GridItem
              bg={cardBg}
              borderRadius="2xl"
              p={3}
              display="flex"
              flexDirection="column"
              gap={3}
            >
              {/* Wi-Fi Row */}
              <HStack
                spacing={2.5}
                cursor="pointer"
                onClick={() => setWifiEnabled(!wifiEnabled)}
                _hover={{ opacity: 0.8 }}
                transition="opacity 0.2s"
              >
                <Flex
                  w="26px"
                  h="26px"
                  borderRadius="full"
                  bg={wifiEnabled ? '#007AFF' : 'gray.500'}
                  align="center"
                  justify="center"
                  color="white"
                  transition="background-color 0.2s"
                >
                  <WifiIcon width="14px" height="14px" color="white" />
                </Flex>
                <VStack align="start" spacing={0} overflow="hidden">
                  <Text fontSize="11px" fontWeight="bold" lineHeight="1.2">
                    Wi-Fi
                  </Text>
                  <Text
                    fontSize="9px"
                    color="gray.400"
                    isTruncated
                    maxW="90px"
                    lineHeight="1"
                  >
                    {wifiEnabled ? 'Home-5G' : 'Off'}
                  </Text>
                </VStack>
              </HStack>

              {/* Bluetooth Row */}
              <HStack
                spacing={2.5}
                cursor="pointer"
                onClick={() => setBluetoothEnabled(!bluetoothEnabled)}
                _hover={{ opacity: 0.8 }}
                transition="opacity 0.2s"
              >
                <Flex
                  w="26px"
                  h="26px"
                  borderRadius="full"
                  bg={bluetoothEnabled ? '#007AFF' : 'gray.500'}
                  align="center"
                  justify="center"
                  color="white"
                  transition="background-color 0.2s"
                >
                  {bluetoothEnabled ? (
                    <BluetoothOnIcon width="14px" height="14px" color="white" />
                  ) : (
                    <BluetoothOffIcon width="14px" height="14px" color="white" />
                  )}
                </Flex>
                <VStack align="start" spacing={0}>
                  <Text fontSize="11px" fontWeight="bold" lineHeight="1.2">
                    Bluetooth
                  </Text>
                  <Text fontSize="9px" color="gray.400" lineHeight="1">
                    {bluetoothEnabled ? 'On' : 'Off'}
                  </Text>
                </VStack>
              </HStack>

              {/* AirDrop Row */}
              <HStack
                spacing={2.5}
                cursor="pointer"
                onClick={() => setAirDrop(!airDrop)}
                _hover={{ opacity: 0.8 }}
                transition="opacity 0.2s"
              >
                <Flex
                  w="26px"
                  h="26px"
                  borderRadius="full"
                  bg={airDrop ? '#007AFF' : 'gray.500'}
                  align="center"
                  justify="center"
                  color="white"
                  transition="background-color 0.2s"
                >
                  <AirDropIcon width="14px" height="14px" color="white" />
                </Flex>
                <VStack align="start" spacing={0}>
                  <Text fontSize="11px" fontWeight="bold" lineHeight="1.2">
                    AirDrop
                  </Text>
                  <Text fontSize="9px" color="gray.400" lineHeight="1">
                    {airDrop ? 'Everyone' : 'Off'}
                  </Text>
                </VStack>
              </HStack>
            </GridItem>

            {/* Right Box: Now Playing & Controls */}
            <Flex direction="column" gap={3}>
              {/* Now Playing Card */}
              <Box
                bg={cardBg}
                borderRadius="2xl"
                p={3}
                flex={1}
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
              >
                <HStack spacing={2.5} align="center">
                  <Box
                    w="30px"
                    h="30px"
                    borderRadius="md"
                    bg={darkMode ? 'whiteAlpha.100' : 'blackAlpha.200'}
                  />
                  <VStack align="start" spacing={0}>
                    <Text fontSize="11px" fontWeight="bold" lineHeight="1.2">
                      Not Playing
                    </Text>
                  </VStack>
                </HStack>
                {/* Playback Controls */}
                <HStack spacing={4} justify="center" mt={2}>
                  <Box cursor="pointer" opacity={0.6} _hover={{ opacity: 1 }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M6 19h2V5H6v14zm3.5-7L19 19V5l-9.5 7z" />
                    </svg>
                  </Box>
                  <Box cursor="pointer" opacity={0.6} _hover={{ opacity: 1 }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </Box>
                  <Box cursor="pointer" opacity={0.6} _hover={{ opacity: 1 }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M16 5v14h2V5h-2zm-12.5 14L13 12 3.5 5v14z" />
                    </svg>
                  </Box>
                </HStack>
              </Box>

              {/* Stage Manager and Screen Mirroring Row */}
              <HStack spacing={3} h="40px">
                <Flex
                  flex={1}
                  h="100%"
                  bg={stageManager ? '#007AFF' : cardBg}
                  borderRadius="2xl"
                  align="center"
                  justify="center"
                  cursor="pointer"
                  color={stageManager ? 'white' : textColor}
                  onClick={() => setStageManager(!stageManager)}
                  _hover={{ opacity: 0.8 }}
                  transition="all 0.2s"
                >
                  <StageManagerIcon />
                </Flex>
                <Flex
                  flex={1}
                  h="100%"
                  bg={cardBg}
                  borderRadius="2xl"
                  align="center"
                  justify="center"
                  cursor="pointer"
                  _hover={{ opacity: 0.8 }}
                  transition="opacity 0.2s"
                >
                  <ScreenMirroringIcon />
                </Flex>
              </HStack>
            </Flex>
          </Grid>

          {/* Row 3: Dark Mode, Camera, Focus */}
          <HStack spacing={3} mb={3}>
            {/* Dark Mode Toggle */}
            <Flex
              w="40px"
              h="40px"
              borderRadius="full"
              bg={darkMode ? 'white' : cardBg}
              color={darkMode ? 'black' : textColor}
              align="center"
              justify="center"
              cursor="pointer"
              onClick={toggleDarkMode}
              _hover={{ opacity: 0.9 }}
              transition="all 0.2s"
              shadow="sm"
            >
              <DarkModeIcon width="16px" height="16px" />
            </Flex>

            {/* Camera / Screen Capture */}
            <Flex
              w="40px"
              h="40px"
              borderRadius="full"
              bg={cardBg}
              align="center"
              justify="center"
              cursor="pointer"
              _hover={{ opacity: 0.85 }}
            >
              <CameraIcon />
            </Flex>

            {/* Focus Pill */}
            <HStack
              flex={1}
              h="40px"
              bg={focus ? '#007AFF' : cardBg}
              borderRadius="full"
              px={3.5}
              cursor="pointer"
              onClick={() => setFocus(!focus)}
              _hover={{ opacity: 0.8 }}
              transition="all 0.2s"
              color={focus ? 'white' : textColor}
              spacing={2}
            >
              <MoonIcon width="14px" height="14px" />
              <Text fontSize="11px" fontWeight="bold">
                Focus
              </Text>
            </HStack>
          </HStack>

          {/* Display Slider Card */}
          <Box bg={cardBg} borderRadius="2xl" p={3} mb={3}>
            <Text fontSize="11px" fontWeight="bold" mb={1.5} ml={1}>
              Display
            </Text>
            <Slider
              aria-label="display-brightness"
              min={10}
              max={100}
              value={brightness}
              onChange={setBrightness}
              focusThumbOnChange={false}
            >
              <SliderTrack height={5} bg={sliderTrackBg} borderRadius="full">
                <SliderFilledTrack
                  height={5}
                  bg={sliderFilledBg}
                  borderRadius="full"
                  display="flex"
                  alignItems="center"
                  pl={2}
                >
                  <BrightnessIcon color={sliderIconColor} width="12" height="12" />
                </SliderFilledTrack>
              </SliderTrack>
              <SliderThumb boxSize={4} shadow="-1px 1px gray" />
            </Slider>
          </Box>

          {/* Sound Slider Card */}
          <Box bg={cardBg} borderRadius="2xl" p={3} mb={3.5}>
            <Text fontSize="11px" fontWeight="bold" mb={1.5} ml={1}>
              Sound
            </Text>
            <Slider
              aria-label="sound-volume"
              min={0}
              max={100}
              value={soundVolume}
              onChange={setSoundVolume}
              focusThumbOnChange={false}
            >
              <SliderTrack height={5} bg={sliderTrackBg} borderRadius="full">
                <SliderFilledTrack
                  height={5}
                  bg={sliderFilledBg}
                  borderRadius="full"
                  display="flex"
                  alignItems="center"
                  pl={2}
                >
                  <VolumeIcon color={sliderIconColor} width="12" height="12" />
                </SliderFilledTrack>
              </SliderTrack>
              <SliderThumb boxSize={4} shadow="-1px 1px gray" />
            </Slider>
          </Box>

          {/* Bottom Button: Edit Controls (System Settings) */}
          <Flex justify="center" w="100%">
            <Button
              size="xs"
              px={4}
              py={3}
              borderRadius="full"
              border="1.5px solid"
              borderColor={darkMode ? 'whiteAlpha.300' : 'blackAlpha.200'}
              bg="transparent"
              color={textColor}
              _hover={{ bg: darkMode ? 'whiteAlpha.100' : 'blackAlpha.50' }}
              onClick={() => {
                setSelectedTab('general');
                setSubPage(null);
                addApp(ProgramType.SETTINGS);
              }}
            >
              Edit Controls
            </Button>
          </Flex>
        </Box>
      </MenuListComponent>
    </Menu>
  );
};

export default Settings;
