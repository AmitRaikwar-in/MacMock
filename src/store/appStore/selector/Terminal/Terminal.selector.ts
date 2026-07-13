import { AppStoreState } from '../../appStore';

const terminalSelector = (state: AppStoreState) => ({
  history: state.Terminal.history,
  addHistory: state.Terminal.addHistory,
  clearHistory: state.Terminal.clearHistory,
});

export { terminalSelector };
