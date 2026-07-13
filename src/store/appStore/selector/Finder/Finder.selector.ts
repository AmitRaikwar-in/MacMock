import { AppStoreState } from '../../appStore';

const finderSelector = (state: AppStoreState) => ({
  currentPath: state.Finder.currentPath,
  setCurrentPath: state.Finder.setCurrentPath,
});

export { finderSelector };
