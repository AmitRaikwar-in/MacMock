import { BatteryIcon } from '@assets';
import { Box, Menu, MenuDivider, Text } from '@chakra-ui/react';
import {
  MenuItemComponent,
  MenuListComponent,
  TopBarButton,
} from '@components';
import {
  darkModeColorSelector,
  settingsStore,
  useShallow,
  batterySelector,
  generalSelector,
} from '@settingsStore';
import {
  ProgramType,
  activeAppActionsSelector,
  processStore,
} from '@processStore';
import { useTranslation } from 'react-i18next';

const Battery = () => {
  const batteryPercentage = 98; // Match the health/status in Settings (98% Normal)
  const { t } = useTranslation();
  const { iconColor, textColor } = settingsStore(
    useShallow(darkModeColorSelector),
  );
  const { lowPowerMode } = settingsStore(
    useShallow(batterySelector),
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
        ariaLabel="battery-top-bar-button"
        icon={
          <BatteryIcon
            percentage={batteryPercentage}
            props={{
              width: '2em',
              height: '2em',
              // Use yellow icon color if lowPowerMode is enabled, mimicking macOS behavior!
              color: lowPowerMode ? '#FFCC00' : iconColor,
            }}
          />
        }
      />
      <MenuListComponent>
        <Box
          display={'flex'}
          justifyContent={'space-between'}
          flexDirection={'row'}
          mx={2}
          color={textColor}
          py={1}
        >
          <Text fontSize={'xs'} fontWeight={'bold'}>
            {t('TopAppBar.battery.title')}
          </Text>
          <Text fontSize={'xs'} fontWeight={'semibold'}>
            {batteryPercentage + '%'}
          </Text>
        </Box>
        {lowPowerMode && (
          <Box mx={2} mb={1}>
            <Text fontSize={'10px'} color="#FFCC00" fontWeight="bold">
              Low Power Mode: On
            </Text>
          </Box>
        )}
        <MenuDivider mx={2} />
        <MenuItemComponent
          text={t('TopAppBar.battery.batterySettings')}
          ariaLabel="battery-settings"
          onClick={() => {
            setSelectedTab('battery');
            setSubPage(null);
            addApp(ProgramType.SETTINGS);
          }}
        />
      </MenuListComponent>
    </Menu>
  );
};

export default Battery;
