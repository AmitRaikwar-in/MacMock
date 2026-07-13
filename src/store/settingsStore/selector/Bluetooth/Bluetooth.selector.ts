import { SettingsStoreState } from '../../settingsStore';

const bluetoothSelector = (state: SettingsStoreState) => ({
  bluetoothEnabled: state.Bluetooth.enabled,
  setBluetoothEnabled: state.Bluetooth.setEnabled,
});

export { bluetoothSelector };
