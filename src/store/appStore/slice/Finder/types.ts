export type FinderState = {
  currentPath: string;
};

export interface FinderAppAction {
  setCurrentPath: (path: string) => void;
}

export type FinderStateSlice = FinderState & FinderAppAction;
