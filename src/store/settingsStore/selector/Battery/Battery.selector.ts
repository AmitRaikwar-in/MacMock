import { SettingsStoreState } from '../../settingsStore';

const batterySelector = (state: SettingsStoreState) => ({
  lowPowerMode: state.Battery.lowPowerMode,
  setLowPowerMode: state.Battery.setLowPowerMode,
});

export { batterySelector };
