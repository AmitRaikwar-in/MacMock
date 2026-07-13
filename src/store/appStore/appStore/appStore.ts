import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { createJSONStorage, persist } from 'zustand/middleware';
import { AppStoreState } from './types';
import {
  createBinSlice,
  createChromeSlice,
  createFinderSlice,
  createGithubSlice,
  createNotesSlice,
  createSettingsSlice,
  createSpotifySlice,
  createTerminalSlice,
  createVsCodeSlice,
  createCalendarSlice,
} from '../slice';

export const appStore = create<AppStoreState>()(
  persist(
    immer((...api) => ({
      Finder: createFinderSlice(...api),
      Notes: createNotesSlice(...api),
      Bin: createBinSlice(...api),
      Terminal: createTerminalSlice(...api),
      VsCode: createVsCodeSlice(...api),
      Chrome: createChromeSlice(...api),
      Spotify: createSpotifySlice(...api),
      Github: createGithubSlice(...api),
      Settings: createSettingsSlice(...api),
      Calendar: createCalendarSlice(...api),
    })),
    {
      name: 'appStore',
      storage: createJSONStorage(() => localStorage),
      merge: (persistedState, currentState) =>
        deepMerge(currentState, persistedState as AppStoreState),
    },
  ),
);

function deepMerge(
  currentState: AppStoreState,
  persistedState: AppStoreState,
): AppStoreState {
  return {
    Github: { ...currentState.Github, ...persistedState.Github },
    Notes: { ...currentState.Notes, ...persistedState.Notes },
    Finder: { ...currentState.Finder, ...persistedState.Finder },
    Bin: { ...currentState.Bin, ...persistedState.Bin },
    Terminal: { ...currentState.Terminal, ...persistedState.Terminal },
    VsCode: { ...currentState.VsCode, ...persistedState.VsCode },
    Chrome: { ...currentState.Chrome, ...persistedState.Chrome },
    Spotify: { ...currentState.Spotify, ...persistedState.Spotify },
    Settings: { ...currentState.Settings, ...persistedState.Settings },
    Calendar: { ...currentState.Calendar, ...persistedState.Calendar },
  };
}
