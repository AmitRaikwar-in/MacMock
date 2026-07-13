import { SettingsStoreSlice } from '../../settingsStore';
import { BluetoothState, BluetoothStateSlice } from './types';

const defaultBluetoothState: BluetoothState = {
  enabled: true,
};

const createBluetoothSlice: SettingsStoreSlice<BluetoothStateSlice> = (
  set,
) => ({
  ...defaultBluetoothState,
  setEnabled: (enabled) =>
    set((state) => {
      state.Bluetooth.enabled = enabled;
    }),
});

export default createBluetoothSlice;
