import { SettingsStoreState } from '../../settingsStore';

const generalSelector = (state: SettingsStoreState) => ({
  selectedTab: state.General.selectedTab,
  subPage: state.General.subPage,
  setSelectedTab: state.General.setSelectedTab,
  setSubPage: state.General.setSubPage,
});

export { generalSelector };
