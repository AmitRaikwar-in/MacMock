import { SettingsStoreSlice } from '../../settingsStore';
import { WifiState, WifiStateSlice } from './types';

const defaultWifiState: WifiState = {
  enabled: true,
};

const createWifiSlice: SettingsStoreSlice<WifiStateSlice> = (set) => ({
  ...defaultWifiState,
  setEnabled: (enabled) =>
    set((state) => {
      state.Wifi.enabled = enabled;
    }),
});

export default createWifiSlice;
