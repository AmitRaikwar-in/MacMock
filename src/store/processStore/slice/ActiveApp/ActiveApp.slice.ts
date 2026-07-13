import { ProcessStoreSlice } from '../../processStore';
import { DEFAULT_ACTIVE_STATE } from './constants';
import { ActiveAppsSlice, ProgramType, WindowSize } from './types';

/**
 * Finds the next visible app from the apps record with the highest z-index,
 * excluding a specified app type (the one being minimized or removed).
 * Falls back to FINDER if no other visible apps are open.
 */
const getNextActiveApp = (
  apps: Record<ProgramType, any>,
  excludeType: ProgramType,
): ProgramType => {
  let nextActiveApp = ProgramType.FINDER;
  let maxZIndex = -1;

  Object.entries(apps).forEach(([appKey, appVal]) => {
    const val = appVal as any;
    if (
      appKey !== excludeType &&
      val !== undefined &&
      val.size !== WindowSize.HIDE &&
      val.zIndex > maxZIndex
    ) {
      maxZIndex = val.zIndex;
      nextActiveApp = appKey as ProgramType;
    }
  });

  return nextActiveApp;
};

const createActiveAppsSlice: ProcessStoreSlice<ActiveAppsSlice> = (
  set,
  get,
) => ({
  ...DEFAULT_ACTIVE_STATE,
  makeAppActive: (type) => {
    set((state) => {
      state.ActiveApp.activeApp = type;
    });
  },
  makeDefaultAppActive: (type) => {
    set((state) => {
      state.ActiveApp.activeApp = DEFAULT_ACTIVE_STATE.activeApp;
    });
  },
  addApp: (type) => {
    const existing = get().ActiveApp.apps[type];
    set((state) => {
      state.ActiveApp.activeApp = type;
      // If already open, just bring it to front
      if (existing !== undefined) {
        state.ActiveApp.zCounter += 1;
        state.ActiveApp.apps[type] = {
          ...existing,
          size:
            existing.size === WindowSize.HIDE
              ? WindowSize.DEFAULT
              : existing.size,
          zIndex: state.ActiveApp.zCounter,
        };
      } else {
        // Open fresh window at the top of the stack
        state.ActiveApp.zCounter += 1;
        state.ActiveApp.apps[type] = {
          position: { x: 600, y: 150 },
          size: WindowSize.DEFAULT,
          zIndex: state.ActiveApp.zCounter,
        };
      }
    });
  },
  bringToFront: (type) => {
    const appData = get().ActiveApp.apps[type];
    if (appData !== undefined) {
      set((state) => {
        state.ActiveApp.zCounter += 1;
        state.ActiveApp.activeApp = type;
        state.ActiveApp.apps[type] = {
          ...appData,
          // Un-hide if minimised; otherwise preserve the user's current size
          size:
            appData.size === WindowSize.HIDE ? WindowSize.DEFAULT : appData.size,
          zIndex: state.ActiveApp.zCounter,
        };
      });
    }
  },
  removeApp: (type) => {
    const appData = get().ActiveApp.apps[type];
    if (appData !== undefined) {
      set((state) => {
        state.ActiveApp.apps[type] = undefined;
        // Reset to next active visible app or Finder when the active app is closed
        if (state.ActiveApp.activeApp === type) {
          state.ActiveApp.activeApp = getNextActiveApp(
            state.ActiveApp.apps,
            type,
          );
        }
      });
    }
  },
  setWindowSize: (type, size) => {
    const appData = get().ActiveApp.apps[type];
    if (appData !== undefined) {
      set((state) => {
        if (size !== WindowSize.HIDE) {
          state.ActiveApp.activeApp = type;
        } else if (state.ActiveApp.activeApp === type) {
          // If we are hiding (minimising) the currently active app,
          // find the next active app from the remaining visible ones.
          state.ActiveApp.activeApp = getNextActiveApp(
            state.ActiveApp.apps,
            type,
          );
        }
        state.ActiveApp.apps[type] = {
          ...appData,
          size: size,
        };
      });
    }
  },
  updatePosition: (type, position) => {
    const appData = get().ActiveApp.apps[type];
    if (appData !== undefined) {
      set((state) => {
        state.ActiveApp.apps[type] = {
          ...appData,
          position: position,
        };
      });
    }
  },

  clearAllActiveApps: () => {
    set((state) => {
      state.ActiveApp.activeApp = DEFAULT_ACTIVE_STATE.activeApp;
      state.ActiveApp.apps = DEFAULT_ACTIVE_STATE.apps;
      state.ActiveApp.zCounter = 0;
    });
  },
});

export default createActiveAppsSlice;
