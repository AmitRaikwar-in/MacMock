import React, { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  Text,
  Input,
  InputGroup,
  InputLeftElement,
  Avatar,
  VStack,
  Divider,
  Button,
  Heading,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import {
  settingsStore,
  useShallow,
  usersSelector,
  displayBrightnessSelector,
  displayNightShiftSelector,
  displayTrueToneSelector,
  displayDarkModeSelector,
  wallpaperSelector,
  displayDockSelector,
  WallpaperEnum,
  wifiSelector,
  bluetoothSelector,
  soundSelector,
  batterySelector,
  generalSelector,
} from '@settingsStore';
import {
  SearchIcon,
  BackIcon,
  ForwardIcon,
} from '@assets/icons/SettingsIcons';
import { menuItems } from './const';

// Import refactored sub-components
import {
  WifiSettings,
  BluetoothSettings,
  DisplaysSettings,
  WallpaperSettings,
  DesktopDockSettings,
  SoundSettings,
  NotificationsSettings,
  FocusSettings,
  ScreenTimeSettings,
  LockScreenSettings,
  PrivacySecuritySettings,
  TouchIdPasswordSettings,
  UsersGroupsSettings,
  GeneralSettings,
  GeneralSubPageSettings,
  AppearanceSettings,
  AccessibilitySettings,
  SiriSettings,
  InternetAccountsSettings,
  GameCenterSettings,
  ICloudSettings,
  WalletSettings,
  BatterySettings,
  NetworkSettings,
} from './components';


// Sub-page types under General
type SubPage =
  | null
  | 'about'
  | 'software_update'
  | 'storage'
  | 'applecare'
  | 'continuity'
  | 'autofill'
  | 'datetime'
  | 'language'
  | 'login'
  | 'sharing';

const Settings = () => {
  // Navigation State from Store
  const { selectedTab, setSelectedTab, subPage, setSubPage } = settingsStore(
    useShallow(generalSelector),
  );
  const [searchQuery, setSearchQuery] = useState<string>('');

  // History for Back/Forward buttons
  const [history, setHistory] = useState<{ tab: string; sub: SubPage }[]>([
    { tab: selectedTab, sub: subPage },
  ]);
  const [historyIndex, setHistoryIndex] = useState<number>(0);

  // Sync external changes (e.g. from top bar menu actions) to history
  useEffect(() => {
    const currentHistoryItem = history[historyIndex];
    if (
      !currentHistoryItem ||
      currentHistoryItem.tab !== selectedTab ||
      currentHistoryItem.sub !== subPage
    ) {
      const newHistory = history.slice(0, historyIndex + 1);
      newHistory.push({ tab: selectedTab, sub: subPage });
      setHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);
    }
  }, [selectedTab, subPage, history, historyIndex]);

  // Change Password State
  const {
    isOpen: isPwdOpen,
    onOpen: onPwdOpen,
    onClose: onPwdClose,
  } = useDisclosure();
  const [currentPwd, setCurrentPwd] = useState('');
  const [newPwd, setNewPwd] = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');
  const [pwdError, setPwdError] = useState('');

  const handlePasswordChangeSubmit = () => {
    if (!userData) return;
    if (currentPwd !== userData.password) {
      setPwdError('Incorrect current password.');
      return;
    }
    if (newPwd.length < 4) {
      setPwdError('New password must be at least 4 characters.');
      return;
    }
    if (newPwd !== confirmPwd) {
      setPwdError('New passwords do not match.');
      return;
    }

    updatePassword(userData.id, newPwd);

    setCurrentPwd('');
    setNewPwd('');
    setConfirmPwd('');
    setPwdError('');
    onPwdClose();
  };

  // Store selections
  const { userData, updatePassword } = settingsStore(useShallow(usersSelector));
  const { brightness, setBrightness } = settingsStore(
    useShallow(displayBrightnessSelector),
  );
  const { nightShift, toggleNightShift } = settingsStore(
    useShallow(displayNightShiftSelector),
  );
  const { trueTone, toggleTrueTone } = settingsStore(
    useShallow(displayTrueToneSelector),
  );
  const { darkMode, toggleDarkMode } = settingsStore(
    useShallow(displayDarkModeSelector),
  );
  const { wallpaper, setWallpaper } = settingsStore(
    useShallow(wallpaperSelector),
  );
  const { dockSize, setDockSize } = settingsStore(
    useShallow(displayDockSelector),
  );

  const { wifiEnabled, setWifiEnabled } = settingsStore(
    useShallow(wifiSelector),
  );
  const { bluetoothEnabled, setBluetoothEnabled } = settingsStore(
    useShallow(bluetoothSelector),
  );
  const { soundVolume, setSoundVolume } = settingsStore(
    useShallow(soundSelector),
  );
  const { lowPowerMode, setLowPowerMode } = settingsStore(
    useShallow(batterySelector),
  );
  const sidebarCollapsed = false;

  // Navigation handlers
  const navigateTo = (tab: string, sub: SubPage = null) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push({ tab, sub });
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    setSelectedTab(tab);
    setSubPage(sub);
  };

  const handleBack = () => {
    if (historyIndex > 0) {
      const prev = history[historyIndex - 1];
      setHistoryIndex(historyIndex - 1);
      setSelectedTab(prev.tab);
      setSubPage(prev.sub);
    }
  };

  const handleForward = () => {
    if (historyIndex < history.length - 1) {
      const next = history[historyIndex + 1];
      setHistoryIndex(historyIndex + 1);
      setSelectedTab(next.tab);
      setSubPage(next.sub);
    }
  };

  // Filter menu items by search query
  const filteredMenuItems = menuItems.filter((item) =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // Wallpaper asset mappings
  const wallpaperImages = [
    { id: WallpaperEnum.Wallpaper1, name: 'Sequoia Light' },
    { id: WallpaperEnum.Wallpaper2, name: 'Sequoia Dark' },
    { id: WallpaperEnum.Wallpaper3, name: 'Sonoma Horizon' },
    { id: WallpaperEnum.Wallpaper4, name: 'Ventura Abstract' },
    { id: WallpaperEnum.Wallpaper5, name: 'Monterey Hills' },
    { id: WallpaperEnum.Wallpaper6, name: 'Big Sur Peak' },
    { id: WallpaperEnum.Wallpaper7, name: 'Catalina Island' },
  ];

  // Render Right Main Panel Content
  const renderRightPanelContent = () => {
    if (subPage !== null) {
      return (
        <GeneralSubPageSettings
          subPage={subPage}
          setSubPage={setSubPage}
          userData={userData}
        />
      );
    }

    switch (selectedTab) {
      case 'wifi':
        return (
          <WifiSettings
            wifiEnabled={wifiEnabled}
            setWifiEnabled={setWifiEnabled}
          />
        );

      case 'bluetooth':
        return (
          <BluetoothSettings
            bluetoothEnabled={bluetoothEnabled}
            setBluetoothEnabled={setBluetoothEnabled}
          />
        );

      case 'displays':
        return (
          <DisplaysSettings
            brightness={brightness}
            setBrightness={setBrightness}
            nightShift={nightShift}
            toggleNightShift={toggleNightShift}
            trueTone={trueTone}
            toggleTrueTone={toggleTrueTone}
            darkMode={darkMode}
            toggleDarkMode={toggleDarkMode}
          />
        );

      case 'wallpaper':
        return (
          <WallpaperSettings
            wallpaper={wallpaper}
            setWallpaper={setWallpaper}
            wallpaperImages={wallpaperImages}
          />
        );

      case 'desktop_dock':
        return (
          <DesktopDockSettings dockSize={dockSize} setDockSize={setDockSize} />
        );

      case 'sound':
        return (
          <SoundSettings
            soundVolume={soundVolume}
            setSoundVolume={setSoundVolume}
          />
        );

      case 'notifications':
        return <NotificationsSettings />;

      case 'focus':
        return <FocusSettings />;

      case 'screen_time':
        return <ScreenTimeSettings />;

      case 'lock_screen':
        return <LockScreenSettings />;

      case 'privacy_security':
        return <PrivacySecuritySettings />;

      case 'touch_id_password':
        return <TouchIdPasswordSettings />;

      case 'users_groups':
        return (
          <UsersGroupsSettings userData={userData} onPwdOpen={onPwdOpen} />
        );

      case 'general':
        return <GeneralSettings navigateTo={navigateTo} />;

      case 'appearance':
        return (
          <AppearanceSettings
            darkMode={darkMode}
            toggleDarkMode={toggleDarkMode}
          />
        );

      case 'accessibility':
        return <AccessibilitySettings />;

      case 'siri':
        return <SiriSettings />;

      case 'internet_accounts':
        return <InternetAccountsSettings />;

      case 'game_center':
        return <GameCenterSettings />;

      case 'icloud':
        return <ICloudSettings />;

      case 'wallet_apple_pay':
        return <WalletSettings />;

      case 'battery':
        return (
          <BatterySettings
            lowPowerMode={lowPowerMode}
            setLowPowerMode={setLowPowerMode}
          />
        );

      case 'network':
        return <NetworkSettings />;

      default:
        return (
          <VStack align="stretch" spacing={4} p={1} color="white">
            <Heading size="sm" textTransform="capitalize">
              {selectedTab?.replace('_', ' ')}
            </Heading>
            <Box
              bg="whiteAlpha.50"
              p={4}
              borderRadius="lg"
              border="1px solid"
              borderColor="whiteAlpha.100"
              fontSize="xs"
            >
              <Text>
                Preferences for {selectedTab?.replace('_', ' ')} are active.
              </Text>
            </Box>
          </VStack>
        );
    }
  };

  return (
    <Flex h="100%" bg="#1e1e1e" borderRadius="6px" overflow="hidden">
      {/* Sidebar Panel */}
      {!sidebarCollapsed && (
        <Flex
          direction="column"
          w="260px"
          h="100%"
          bg="#282828"
          borderRight="1.5px solid"
          borderColor="whiteAlpha.100"
          p={3}
          flexShrink={0}
          overflow="hidden"
        >
          {/* Header Actions */}
          <Flex align="center" gap={3} mb={3}>
            <Button
              size="xs"
              variant="ghost"
              onClick={handleBack}
              disabled={historyIndex === 0}
              _hover={historyIndex > 0 ? { bg: 'whiteAlpha.200' } : {}}
              p={0}
              borderRadius="full"
              minW="24px"
              h="24px"
            >
              <BackIcon disabled={historyIndex === 0} />
            </Button>
            <Button
              size="xs"
              variant="ghost"
              onClick={handleForward}
              disabled={historyIndex === history.length - 1}
              _hover={
                historyIndex < history.length - 1
                  ? { bg: 'whiteAlpha.200' }
                  : {}
              }
              p={0}
              borderRadius="full"
              minW="24px"
              h="24px"
            >
              <ForwardIcon disabled={historyIndex === history.length - 1} />
            </Button>
          </Flex>

          {/* Search Field */}
          <InputGroup size="sm" mb={4}>
            <InputLeftElement
              pointerEvents="none"
              color="whiteAlpha.500"
              h="100%"
            >
              <SearchIcon />
            </InputLeftElement>
            <Input
              placeholder="Search"
              bg="whiteAlpha.100"
              border="none"
              _focus={{ bg: 'whiteAlpha.200', border: 'none' }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              borderRadius="md"
              color="white"
              pl={8}
            />
          </InputGroup>

          {/* User Profile Header Card */}
          <Flex
            align="center"
            gap={3}
            p={2}
            borderRadius="lg"
            bg="whiteAlpha.50"
            border="1px solid"
            borderColor="whiteAlpha.50"
            mb={4}
          >
            <Avatar
              size="sm"
              src={userData?.profilePicture}
              name={userData?.name}
            />
            <VStack align="start" spacing={0}>
              <Text
                fontSize="sm"
                fontWeight="bold"
                color="white"
                lineHeight="1.2"
              >
                {userData?.name || 'Amit Raikwar'}
              </Text>
              <Text fontSize="10px" color="whiteAlpha.500">
                Apple Account
              </Text>
            </VStack>
          </Flex>

          {/* Sidebar Menu Options Scroll Box */}
          <Flex
            direction="column"
            flex={1}
            overflowY="auto"
            gap={1}
            pr={1}
            css={{
              '&::-webkit-scrollbar': {
                width: '4px',
              },
              '&::-webkit-scrollbar-track': {
                background: 'transparent',
              },
              '&::-webkit-scrollbar-thumb': {
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '2px',
              },
              '&::-webkit-scrollbar-thumb:hover': {
                background: 'rgba(255, 255, 255, 0.25)',
              },
            }}
          >
            {filteredMenuItems.map((item, index) => {
              const isSelected = selectedTab === item.id && subPage === null;
              const showDivider =
                index > 0 && filteredMenuItems[index - 1].group !== item.group;
              return (
                <React.Fragment key={item.id}>
                  {showDivider && (
                    <Divider borderColor="whiteAlpha.100" my={1} />
                  )}
                  <Flex
                    align="center"
                    gap={3}
                    p={2}
                    borderRadius="md"
                    cursor="pointer"
                    bg={isSelected ? '#007AFF' : 'transparent'}
                    _hover={!isSelected ? { bg: 'whiteAlpha.100' } : {}}
                    onClick={() => {
                      setSelectedTab(item.id);
                      setSubPage(null);
                      navigateTo(item.id, null);
                    }}
                    transition="background-color 0.1s ease"
                  >
                    {item.icon}
                    <Text
                      fontSize="sm"
                      fontWeight={isSelected ? 'semibold' : 'normal'}
                      color={isSelected ? 'white' : 'whiteAlpha.800'}
                    >
                      {item.label}
                    </Text>
                  </Flex>
                </React.Fragment>
              );
            })}
          </Flex>
        </Flex>
      )}

      {/* Main Settings Display Area */}
      <Flex direction="column" flex={1} bg="#1e1e1e" overflowY="auto" p={4}>
        {renderRightPanelContent()}
      </Flex>

      {/* Password Change Modal */}
      <Modal isOpen={isPwdOpen} onClose={onPwdClose} isCentered size="xs">
        <ModalOverlay bg="blackAlpha.600" backdropFilter="blur(8px)" />
        <ModalContent
          bg="#282828"
          border="1px solid"
          borderColor="whiteAlpha.200"
          color="white"
          borderRadius="xl"
        >
          <ModalHeader
            fontSize="sm"
            fontWeight="bold"
            borderBottom="1px solid"
            borderColor="whiteAlpha.100"
            py={3}
          >
            Change Password
          </ModalHeader>
          <ModalCloseButton size="sm" mt={1} />
          <ModalBody py={4}>
            <VStack spacing={3} align="stretch" fontSize="xs">
              {pwdError && (
                <Text
                  color="red.400"
                  fontSize="10px"
                  bg="red.900"
                  py={1.5}
                  px={2.5}
                  borderRadius="md"
                  border="1px solid"
                  borderColor="red.700"
                >
                  {pwdError}
                </Text>
              )}
              <Box>
                <Text mb={1} color="whiteAlpha.700">
                  Current Password
                </Text>
                <Input
                  type="password"
                  size="xs"
                  bg="#1e1e1e"
                  border="1px solid"
                  borderColor="whiteAlpha.100"
                  _focus={{ borderColor: 'blue.400', bg: '#1e1e1e' }}
                  value={currentPwd}
                  onChange={(e) => setCurrentPwd(e.target.value)}
                />
              </Box>
              <Box>
                <Text mb={1} color="whiteAlpha.700">
                  New Password
                </Text>
                <Input
                  type="password"
                  size="xs"
                  bg="#1e1e1e"
                  border="1px solid"
                  borderColor="whiteAlpha.100"
                  _focus={{ borderColor: 'blue.400', bg: '#1e1e1e' }}
                  value={newPwd}
                  onChange={(e) => setNewPwd(e.target.value)}
                />
              </Box>
              <Box>
                <Text mb={1} color="whiteAlpha.700">
                  Verify Password
                </Text>
                <Input
                  type="password"
                  size="xs"
                  bg="#1e1e1e"
                  border="1px solid"
                  borderColor="whiteAlpha.100"
                  _focus={{ borderColor: 'blue.400', bg: '#1e1e1e' }}
                  value={confirmPwd}
                  onChange={(e) => setConfirmPwd(e.target.value)}
                />
              </Box>
            </VStack>
          </ModalBody>
          <ModalFooter
            borderTop="1px solid"
            borderColor="whiteAlpha.100"
            py={2.5}
            gap={2}
          >
            <Button
              size="xs"
              variant="ghost"
              color="whiteAlpha.700"
              _hover={{ bg: 'whiteAlpha.100' }}
              onClick={onPwdClose}
            >
              Cancel
            </Button>
            <Button
              size="xs"
              colorScheme="blue"
              onClick={handlePasswordChangeSubmit}
            >
              Change Password
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default Settings;
