import { StateCreator } from 'zustand';
import {
  BinStateSlice,
  ChromeStateSlice,
  FinderStateSlice,
  GithubStateSlice,
  NotesStateSlice,
  SettingsStateSlice,
  TerminalStateSlice,
  VsCodeStateSlice,
  CalendarStateSlice,
} from '../slice';
import { SpotifyStateSlice } from '../slice/Spotify';

export interface AppStoreState {
  Finder: FinderStateSlice;
  Notes: NotesStateSlice;
  Bin: BinStateSlice;
  Terminal: TerminalStateSlice;
  VsCode: VsCodeStateSlice;
  Chrome: ChromeStateSlice;
  Spotify: SpotifyStateSlice;
  Settings: SettingsStateSlice;
  Github: GithubStateSlice;
  Calendar: CalendarStateSlice;
}

export type AppStoreSlice<T> = StateCreator<
  AppStoreState,
  [['zustand/immer', never]],
  [],
  T
>;
