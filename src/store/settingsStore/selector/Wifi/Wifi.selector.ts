import { SettingsStoreState } from '../../settingsStore';

const wifiSelector = (state: SettingsStoreState) => ({
  wifiEnabled: state.Wifi.enabled,
  setWifiEnabled: state.Wifi.setEnabled,
});

export { wifiSelector };
