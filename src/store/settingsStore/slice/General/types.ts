export type SubPage =
  | null
  | 'about'
  | 'software_update'
  | 'storage'
  | 'applecare'
  | 'continuity'
  | 'autofill'
  | 'datetime'
  | 'language'
  | 'login'
  | 'sharing';

export type GeneralState = {
  selectedTab: string;
  subPage: SubPage;
};

export interface GeneralSettingsAction {
  setSelectedTab: (tab: string) => void;
  setSubPage: (subPage: SubPage) => void;
}

export type GeneralStateSlice = GeneralState & GeneralSettingsAction;
