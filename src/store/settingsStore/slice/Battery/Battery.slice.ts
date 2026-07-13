import { SettingsStoreSlice } from '../../settingsStore';
import { BatteryState, BatteryStateSlice } from './types';

const defaultBatteryState: BatteryState = {
  lowPowerMode: false,
};

const createBatterySlice: SettingsStoreSlice<BatteryStateSlice> = (set) => ({
  ...defaultBatteryState,
  setLowPowerMode: (lowPowerMode) =>
    set((state) => {
      state.Battery.lowPowerMode = lowPowerMode;
    }),
});

export default createBatterySlice;
