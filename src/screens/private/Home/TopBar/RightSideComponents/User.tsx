import { Box, Image, Menu, MenuDivider, Text } from '@chakra-ui/react';
import {
  MenuItemComponent,
  MenuListComponent,
  TopBarButton,
} from '@components';
import {
  darkModeColorSelector,
  settingsStore,
  useShallow,
  usersSelector,
  generalSelector,
} from '@settingsStore';
import {
  ProgramType,
  activeAppActionsSelector,
  processStore,
} from '@processStore';
import { useTranslation } from 'react-i18next';

const User = () => {
  const { t } = useTranslation();
  const { textColor } = settingsStore(useShallow(darkModeColorSelector));
  const { name, profilePicture } = settingsStore(
    useShallow(usersSelector),
  ).userData;
  const { addApp } = processStore(
    useShallow(activeAppActionsSelector),
  );
  const { setSelectedTab, setSubPage } = settingsStore(
    useShallow(generalSelector),
  );

  return (
    <Menu>
      <TopBarButton
        text={name}
        onClick={() => {}}
        ariaLabel="user-top-bar-button"
      />
      <MenuListComponent>
        <Box
          display={'flex'}
          width={'100%'}
          justifyContent={'center'}
          flexDirection={'column'}
          alignItems={'center'}
          py={2}
          color={textColor}
        >
          <Image
            borderRadius="full"
            src={profilePicture}
            alt="Profile"
            width="48px"
            loading="lazy"
            border={'2px solid white'}
          />
          <Text fontSize={11} fontWeight={600}>
            {name}
          </Text>
        </Box>
        <MenuDivider p={0} m={0.5} />
        <MenuItemComponent
          text={t('TopAppBar.user.loginWindow')}
          ariaLabel="login-window"
          onClick={() => {}}
        />
        <MenuDivider p={0} m={0.5} />
        <MenuItemComponent
          text={t('TopAppBar.user.setting')}
          ariaLabel="user-setting"
          onClick={() => {
            setSelectedTab('users_groups');
            setSubPage(null);
            addApp(ProgramType.SETTINGS);
          }}
        />
      </MenuListComponent>
    </Menu>
  );
};

export default User;
