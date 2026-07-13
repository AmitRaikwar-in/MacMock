import { AppleIcon } from '@assets';
import { Menu, MenuDivider } from '@chakra-ui/react';
import {
  MenuItemComponent,
  MenuListComponent,
  TopBarButton,
} from '@components';
import {
  activeAppActionsSelector,
  loginSelector,
  powerSelector,
  processStore,
  ProgramType,
} from '@processStore';
import {
  darkModeColorSelector,
  settingsStore,
  useShallow,
  usersSelector,
  generalSelector,
} from '@settingsStore';
import { useTranslation } from 'react-i18next';

const Apple = () => {
  const { t } = useTranslation();
  const { iconColor } = settingsStore(useShallow(darkModeColorSelector));
  const { name } = settingsStore(useShallow(usersSelector)).userData;
  const { lockUser, logout, sleep, turnOff, restart } = processStore(
    (state) => ({
      ...loginSelector(state),
      ...powerSelector(state),
    }),
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
        ariaLabel="apple-top-bar-button"
        icon={<AppleIcon width="1.5em" height="1.5em" color={iconColor} />}
      />
      <MenuListComponent>
        <MenuItemComponent
          text={t('TopAppBar.apple.aboutThisMac')}
          ariaLabel="about-this-mac"
          onClick={() => {
            setSelectedTab('general');
            setSubPage('about');
            addApp(ProgramType.SETTINGS);
          }}
          side="left"
        />
        <MenuDivider p={0} m={0.5} />
        <MenuItemComponent
          text={t('TopAppBar.apple.systemSettings')}
          ariaLabel="system-settings"
          onClick={() => {
            setSelectedTab('general');
            setSubPage(null);
            addApp(ProgramType.SETTINGS);
          }}
          side="left"
        />
        <MenuItemComponent
          text={t('TopAppBar.apple.appStore')}
          ariaLabel="app-store"
          onClick={() => {}}
          side="left"
        />
        <MenuDivider p={0} m={0.5} />
        <MenuItemComponent
          text={t('TopAppBar.apple.recentItems')}
          ariaLabel="recent-items"
          onClick={() => {}}
          command=">"
          side="left"
        />
        <MenuDivider p={0} m={0.5} />
        <MenuItemComponent
          text={t('TopAppBar.apple.forceQuit')}
          ariaLabel="force-quit"
          onClick={() => {}}
          side="left"
          command="⌥⌘⎋"
        />
        <MenuDivider p={0} m={0.5} />
        <MenuItemComponent
          text={t('TopAppBar.apple.sleep')}
          ariaLabel="sleep"
          side="left"
          onClick={sleep}
        />
        <MenuItemComponent
          text={t('TopAppBar.apple.restart')}
          ariaLabel="restart"
          side="left"
          onClick={restart}
        />
        <MenuItemComponent
          text={t('TopAppBar.apple.shutDown')}
          ariaLabel="shutDown"
          side="left"
          onClick={turnOff}
        />
        <MenuDivider p={0} m={0.5} />
        <MenuItemComponent
          text={t('TopAppBar.apple.lockScreen')}
          ariaLabel="lock-screen"
          side="left"
          onClick={lockUser}
          command="⌃⇧Q"
        />
        <MenuItemComponent
          text={t('TopAppBar.apple.logOut', { userName: name })}
          ariaLabel="logout"
          side="left"
          onClick={logout}
          command="⌘⇧Q"
        />
      </MenuListComponent>
    </Menu>
  );
};

export default Apple;
