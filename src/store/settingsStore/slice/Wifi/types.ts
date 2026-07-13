export type WifiState = {
  enabled: boolean;
};

export interface WifiSettingsAction {
  setEnabled: (enabled: boolean) => void;
}

export type WifiStateSlice = WifiState & WifiSettingsAction;
