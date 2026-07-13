import { AppStoreSlice } from '../../appStore';
import { FinderState, FinderStateSlice } from './types';

const defaultFinderState: FinderState = {
  currentPath: '/Users/mr.robot',
};

const createFinderSlice: AppStoreSlice<FinderStateSlice> = (set) => ({
  ...defaultFinderState,
  setCurrentPath: (path) => {
    set((state) => {
      state.Finder.currentPath = path;
    });
  },
});

export default createFinderSlice;
