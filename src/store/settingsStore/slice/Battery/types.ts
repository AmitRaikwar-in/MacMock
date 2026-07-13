export type BatteryState = {
  lowPowerMode: boolean;
};

export interface BatterySettingsAction {
  setLowPowerMode: (lowPowerMode: boolean) => void;
}

export type BatteryStateSlice = BatteryState & BatterySettingsAction;
