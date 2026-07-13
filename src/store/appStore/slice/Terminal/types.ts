export type TerminalState = {
  history: string[];
};

export interface TerminalAppAction {
  addHistory: (cmd: string) => void;
  clearHistory: () => void;
}

export type TerminalStateSlice = TerminalState & TerminalAppAction;
