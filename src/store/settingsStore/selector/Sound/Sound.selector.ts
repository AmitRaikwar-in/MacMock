import { SettingsStoreState } from '../../settingsStore';

const soundSelector = (state: SettingsStoreState) => ({
  soundVolume: state.Sound.volume,
  setSoundVolume: state.Sound.setVolume,
});

export { soundSelector };
