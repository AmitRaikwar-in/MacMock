import { BrightnessIcon, DarkModeIcon, MonitorIcon } from '@assets';
import {
  Box,
  HStack,
  IconButton,
  Menu,
  MenuDivider,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
} from '@chakra-ui/react';
import {
  MenuItemComponent,
  MenuListComponent,
  TopBarButton,
} from '@components';
import {
  darkModeColorSelector,
  displayBrightnessSelector,
  displayDarkModeSelector,
  displayNightShiftSelector,
  displayTrueToneSelector,
  settingsStore,
  useShallow,
  generalSelector,
} from '@settingsStore';
import {
  ProgramType,
  activeAppActionsSelector,
  processStore,
} from '@processStore';
import { useTranslation } from 'react-i18next';

const ModeStack = () => {
  const { t } = useTranslation();
  const { nightShift, toggleNightShift } = settingsStore(
    useShallow(displayNightShiftSelector),
  );
  const { trueTone, toggleTrueTone } = settingsStore(
    useShallow(displayTrueToneSelector),
  );
  const { darkMode, toggleDarkMode } = settingsStore(
    useShallow(displayDarkModeSelector),
  );
  const { textColor } = settingsStore(useShallow(darkModeColorSelector));

  return (
    <HStack
      width={'100%'}
      display={'flex'}
      justifyContent={'space-between'}
      flexDirection={'row'}
      px={2}
      color={textColor}
    >
      <Box
        display={'flex'}
        justifyContent={'center'}
        flexDirection={'column'}
        alignItems={'center'}
      >
        <IconButton
          p={2}
          borderRadius={'full'}
          aria-label="dark-mode-button"
          width={'1em'}
          _hover={{}}
          transition={'all 0.4s ease-in-out'}
          bg={darkMode ? 'white' : '#0f0f0f8f'}
          onClick={() => {
            toggleDarkMode();
          }}
          icon={<DarkModeIcon color={darkMode ? 'black' : 'white'} />}
        />
        <Text fontSize={'10'} fontWeight={'bold'}>
          {t('TopAppBar.monitor.darkMode')}
        </Text>
        <Text color={'gray'} fontSize={'10'} fontWeight={'bold'}>
          {darkMode ? t('TopAppBar.monitor.on') : t('TopAppBar.monitor.off')}
        </Text>
      </Box>
      <Box
        display={'flex'}
        justifyContent={'center'}
        flexDirection={'column'}
        alignItems={'center'}
      >
        <IconButton
          p={2}
          borderRadius={'full'}
          aria-label="night-shift-button"
          width={'1em'}
          _hover={{}}
          transition={'all 0.4s ease-in-out'}
          bg={nightShift ? 'yellow.500' : '#0f0f0f8f'}
          onClick={() => {
            toggleNightShift();
          }}
          icon={<DarkModeIcon color="white" />}
        />
        <Text fontSize={'10'} fontWeight={'bold'}>
          {t('TopAppBar.monitor.nightShift')}
        </Text>
        <Text color={'gray'} fontSize={'10'} fontWeight={'bold'}>
          {nightShift ? t('TopAppBar.monitor.on') : t('TopAppBar.monitor.off')}
        </Text>
      </Box>
      <Box
        display={'flex'}
        justifyContent={'center'}
        flexDirection={'column'}
        alignItems={'center'}
      >
        <IconButton
          p={2}
          borderRadius={'full'}
          aria-label="true-tone-button"
          width={'1em'}
          _hover={{}}
          transition={'all 0.4s ease-in-out'}
          bg={trueTone ? 'blue.500' : '#0f0f0f8f'}
          onClick={() => {
            toggleTrueTone();
          }}
          icon={<BrightnessIcon color="white" />}
        />
        <Text fontSize={'10'} fontWeight={'bold'}>
          {t('TopAppBar.monitor.trueTone')}
        </Text>
        <Text color={'gray'} fontSize={'10'} fontWeight={'bold'}>
          {trueTone ? t('TopAppBar.monitor.on') : t('TopAppBar.monitor.off')}
        </Text>
      </Box>
    </HStack>
  );
};

const Monitor = () => {
  const { t } = useTranslation();
  const { brightness, setBrightness } = settingsStore(
    useShallow(displayBrightnessSelector),
  );
  const { iconColor } = settingsStore(useShallow(darkModeColorSelector));
  const { addApp } = processStore(
    useShallow(activeAppActionsSelector),
  );
  const { setSelectedTab, setSubPage } = settingsStore(
    useShallow(generalSelector),
  );

  return (
    <Menu>
      <TopBarButton
        text=""
        onClick={() => {}}
        ariaLabel="monitor-top-bar-button"
        icon={<MonitorIcon width="1.5em" height="1.5em" color={iconColor} />}
      />
      <MenuListComponent>
        <Box
          display={'flex'}
          justifyContent={'space-between'}
          flexDirection={'column'}
          mx={2}
        >
          <Text color={'white'} fontSize={'xs'} fontWeight={'bold'}>
            {t('TopAppBar.monitor.title')}
          </Text>
          <Slider
            aria-label="slider-ex-1"
            defaultValue={30}
            my={2}
            onChange={(value) => {
              setBrightness(value);
            }}
            value={brightness}
          >
            <SliderTrack height={4} bg={'gray'} borderRadius={'100'}>
              <SliderFilledTrack
                alignItems={'start'}
                height={4}
                bg={'white'}
                borderRadius={'100'}
                padding={0.5}
              >
                <BrightnessIcon color="black" width={'12'} />
              </SliderFilledTrack>
            </SliderTrack>
            <SliderThumb boxSize={4} shadow={'-1px 1px gray'} />
          </Slider>
        </Box>
        <ModeStack />
        <MenuDivider mx={2} />
        <MenuItemComponent
          text={t('TopAppBar.monitor.monitorSettings')}
          ariaLabel="monitor-settings"
          onClick={() => {
            setSelectedTab('displays');
            setSubPage(null);
            addApp(ProgramType.SETTINGS);
          }}
        />
      </MenuListComponent>
    </Menu>
  );
};

export default Monitor;
