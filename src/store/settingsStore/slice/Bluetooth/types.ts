export type BluetoothState = {
  enabled: boolean;
};

export interface BluetoothSettingsAction {
  setEnabled: (enabled: boolean) => void;
}

export type BluetoothStateSlice = BluetoothState & BluetoothSettingsAction;
