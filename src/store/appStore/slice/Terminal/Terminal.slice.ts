import { AppStoreSlice } from '../../appStore';
import { TerminalState, TerminalStateSlice } from './types';

const defaultTerminalState: TerminalState = {
  history: ['Last login: Mon Jul 13 23:25:25 on ttys001'],
};

const createTerminalSlice: AppStoreSlice<TerminalStateSlice> = (set) => ({
  ...defaultTerminalState,
  addHistory: (cmd) => {
    set((state) => {
      state.Terminal.history.push(cmd);
    });
  },
  clearHistory: () => {
    set((state) => {
      state.Terminal.history = [];
    });
  },
});

export default createTerminalSlice;
