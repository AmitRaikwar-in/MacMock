import React from 'react';
import {
  WifiIcon,
  BluetoothIcon,
  NetworkIcon,
  BatteryIcon,
  GeneralIcon,
  AppearanceIcon,
  AccessibilityIcon,
  SiriIcon,
  DesktopDockIcon,
  DisplaysIcon,
  WallpaperIcon,
  NotificationsIcon,
  SoundIcon,
  FocusIcon,
  ScreenTimeIcon,
  LockScreenIcon,
  PrivacySecurityIcon,
  TouchIdPasswordIcon,
  UsersGroupsIcon,
  InternetAccountsIcon,
  GameCenterIcon,
  ICloudIcon,
  WalletIcon,
} from '@assets/icons/SettingsIcons';

export const menuItems = [
  // Group 1: Connectivity & Power
  { id: 'wifi', label: 'Wi-Fi', icon: <WifiIcon />, group: 1 },
  { id: 'bluetooth', label: 'Bluetooth', icon: <BluetoothIcon />, group: 1 },
  { id: 'network', label: 'Network', icon: <NetworkIcon />, group: 1 },
  { id: 'battery', label: 'Battery', icon: <BatteryIcon />, group: 1 },

  // Group 2: Core Customization
  { id: 'general', label: 'General', icon: <GeneralIcon />, group: 2 },
  { id: 'appearance', label: 'Appearance', icon: <AppearanceIcon />, group: 2 },
  { id: 'accessibility', label: 'Accessibility', icon: <AccessibilityIcon />, group: 2 },
  { id: 'siri', label: 'Apple Intelligence & Siri', icon: <SiriIcon />, group: 2 },
  { id: 'desktop_dock', label: 'Desktop & Dock', icon: <DesktopDockIcon />, group: 2 },
  { id: 'displays', label: 'Displays', icon: <DisplaysIcon />, group: 2 },
  { id: 'wallpaper', label: 'Wallpaper', icon: <WallpaperIcon />, group: 2 },

  // Group 3: Notifications & Sounds
  { id: 'notifications', label: 'Notifications', icon: <NotificationsIcon />, group: 3 },
  { id: 'sound', label: 'Sound', icon: <SoundIcon />, group: 3 },
  { id: 'focus', label: 'Focus', icon: <FocusIcon />, group: 3 },
  { id: 'screen_time', label: 'Screen Time', icon: <ScreenTimeIcon />, group: 3 },

  // Group 4: Privacy & Authentication
  { id: 'lock_screen', label: 'Lock Screen', icon: <LockScreenIcon />, group: 4 },
  { id: 'privacy_security', label: 'Privacy & Security', icon: <PrivacySecurityIcon />, group: 4 },
  { id: 'touch_id_password', label: 'Touch ID & Password', icon: <TouchIdPasswordIcon />, group: 4 },
  { id: 'users_groups', label: 'Users & Groups', icon: <UsersGroupsIcon />, group: 4 },

  // Group 5: Accounts & Integration
  { id: 'internet_accounts', label: 'Internet Accounts', icon: <InternetAccountsIcon />, group: 5 },
  { id: 'game_center', label: 'Game Center', icon: <GameCenterIcon />, group: 5 },
  { id: 'icloud', label: 'iCloud', icon: <ICloudIcon />, group: 5 },
  { id: 'wallet_apple_pay', label: 'Wallet & Apple Pay', icon: <WalletIcon />, group: 5 },
];
