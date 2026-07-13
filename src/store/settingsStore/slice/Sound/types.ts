export type SoundState = {
  volume: number;
};

export interface SoundSettingsAction {
  setVolume: (volume: number) => void;
}

export type SoundStateSlice = SoundState & SoundSettingsAction;
