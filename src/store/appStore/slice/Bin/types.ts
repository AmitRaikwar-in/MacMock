export type BinState = {
  items: string[];
};

export interface BinAppAction {
  addItem: (item: string) => void;
  emptyBin: () => void;
}

export type BinStateSlice = BinState & BinAppAction;
