import { WifiIcon } from '@assets';
import {
  Box,
  Button,
  Menu,
  MenuDivider,
  Switch,
  Text,
} from '@chakra-ui/react';
import {
  MenuItemComponent,
  MenuListComponent,
  TopBarButton,
} from '@components';
import {
  ProgramType,
  activeAppActionsSelector,
  processStore,
} from '@processStore';
import {
  darkModeColorSelector,
  settingsStore,
  useShallow,
  wifiSelector,
  generalSelector,
} from '@settingsStore';
import { useTranslation } from 'react-i18next';

const WifiStack = () => {
  const { iconColor, textColor } = settingsStore(
    useShallow(darkModeColorSelector),
  );

  return (
    <>
      {/* Connected Network: Home-5G */}
      <Button
        width={'100%'}
        leftIcon={
          <WifiIcon
            width="1.5em"
            height="1.5em"
            color="white"
            style={{
              backgroundColor: '#007AFF',
              padding: '0.2em',
              borderRadius: '50%',
            }}
          />
        }
        aria-label="wifi-home"
        variant="ghost"
        display={'flex'}
        size={'sm'}
        flexDir={'row'}
        color={textColor}
        _hover={{ bg: '#f0f0f06f' }}
        bg={'transparent'}
        justifyContent={'space-between'}
        onClick={() => {}}
      >
        <Text fontSize="xs" fontWeight="semibold">Home-5G</Text>
        <Text fontSize="10px" color="blue.400" pr={2}>Connected</Text>
      </Button>

      {/* Other Networks */}
      <Button
        width={'100%'}
        leftIcon={
          <WifiIcon
            width="1.5em"
            height="1.5em"
            color={iconColor}
            style={{
              backgroundColor: '#f0f0f06f',
              padding: '0.2em',
              borderRadius: '50%',
            }}
          />
        }
        aria-label="wifi-coffeeshop"
        variant="ghost"
        display={'flex'}
        size={'sm'}
        flexDir={'row'}
        color={textColor}
        _hover={{ bg: '#f0f0f06f' }}
        bg={'transparent'}
        justifyContent={'flex-start'}
        onClick={() => {}}
      >
        <Text fontSize="xs" color="whiteAlpha.800">CoffeeShop-Free</Text>
      </Button>

      <Button
        width={'100%'}
        leftIcon={
          <WifiIcon
            width="1.5em"
            height="1.5em"
            color={iconColor}
            style={{
              backgroundColor: '#f0f0f06f',
              padding: '0.2em',
              borderRadius: '50%',
            }}
          />
        }
        aria-label="wifi-office"
        variant="ghost"
        display={'flex'}
        size={'sm'}
        flexDir={'row'}
        color={textColor}
        _hover={{ bg: '#f0f0f06f' }}
        bg={'transparent'}
        justifyContent={'flex-start'}
        onClick={() => {}}
      >
        <Text fontSize="xs" color="whiteAlpha.800">Office-WiFi</Text>
      </Button>
    </>
  );
};

const Wifi = () => {
  const { t } = useTranslation();
  const { iconColor, textColor } = settingsStore(
    useShallow(darkModeColorSelector),
  );
  const { wifiEnabled, setWifiEnabled } = settingsStore(
    useShallow(wifiSelector),
  );
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
        ariaLabel="wifi-top-bar-button"
        icon={
          <WifiIcon
            width="1.5em"
            height="1.5em"
            color={iconColor}
            style={{ opacity: wifiEnabled ? 1 : 0.4 }}
          />
        }
      />
      <MenuListComponent>
        <Box
          display={'flex'}
          justifyContent={'space-between'}
          width={'100%'}
          flexDirection={'row'}
          px={3}
          color={textColor}
          my={2}
        >
          <Text fontSize={14} fontWeight={600}>
            {t('TopAppBar.wifi.title')}
          </Text>
          <Switch
            size="sm"
            colorScheme="blue"
            isChecked={wifiEnabled}
            onChange={(e) => setWifiEnabled(e.target.checked)}
          />
        </Box>
        <MenuItemComponent
          text={t('TopAppBar.wifi.weakSecurity')}
          ariaLabel="wifi-weak-security"
          onClick={() => {}}
        />
        <MenuDivider p={0} m={0.5} />
        {wifiEnabled && (
          <>
            <WifiStack />
            <MenuDivider p={0} m={0.5} />
          </>
        )}
        <MenuItemComponent
          text={t('TopAppBar.wifi.otherNetwork')}
          ariaLabel="other-network"
          onClick={() => {}}
          command=">"
        />
        <MenuDivider p={0} m={0.5} />
        <MenuItemComponent
          text={t('TopAppBar.wifi.wifiSettings')}
          ariaLabel="wifi-settings"
          onClick={() => {
            setSelectedTab('wifi');
            setSubPage(null);
            addApp(ProgramType.SETTINGS);
          }}
        />
      </MenuListComponent>
    </Menu>
  );
};

export default Wifi;
