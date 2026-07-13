import { SettingsStoreSlice } from '../../settingsStore';
import { SoundState, SoundStateSlice } from './types';

const defaultSoundState: SoundState = {
  volume: 75,
};

const createSoundSlice: SettingsStoreSlice<SoundStateSlice> = (set) => ({
  ...defaultSoundState,
  setVolume: (volume) =>
    set((state) => {
      state.Sound.volume = volume;
    }),
});

export default createSoundSlice;
