import { ProcessStoreState } from '../../processStore';
import { ProgramType } from '../../slice';

const activeAppSelector = (state: ProcessStoreState) => (app: ProgramType) =>
  state.ActiveApp.apps[app];

const activeAppRunningSelector = (state: ProcessStoreState) => ({
  activeAppRunning: state.ActiveApp.activeApp,
  makeAppActive: state.ActiveApp.makeAppActive,
  makeDefaultAppActive: state.ActiveApp.makeDefaultAppActive,
});

const allActiveAppsSelector = (state: ProcessStoreState) =>
  Object.keys(state.ActiveApp.apps).filter((app) => app !== undefined);

const activeAppActionsSelector = (state: ProcessStoreState) => ({
  makeAppActive: state.ActiveApp.makeAppActive,
  addApp: state.ActiveApp.addApp,
  removeApp: state.ActiveApp.removeApp,
  bringToFront: state.ActiveApp.bringToFront,
  setWindowSize: state.ActiveApp.setWindowSize,
  updatePosition: state.ActiveApp.updatePosition,
  clearAllActiveApps: state.ActiveApp.clearAllActiveApps,
});

export {
  activeAppSelector,
  allActiveAppsSelector,
  activeAppActionsSelector,
  activeAppRunningSelector,
};
