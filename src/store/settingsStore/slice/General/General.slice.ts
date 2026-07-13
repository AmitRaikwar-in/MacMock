import { SettingsStoreSlice } from '../../settingsStore';
import { GeneralState, GeneralStateSlice } from './types';

const defaultGeneralState: GeneralState = {
  selectedTab: 'general',
  subPage: null,
};

const createGeneralSlice: SettingsStoreSlice<GeneralStateSlice> = (set) => ({
  ...defaultGeneralState,
  setSelectedTab: (tab) =>
    set((state) => {
      state.General.selectedTab = tab;
    }),
  setSubPage: (subPage) =>
    set((state) => {
      state.General.subPage = subPage;
    }),
});

export default createGeneralSlice;
