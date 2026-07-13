import { AppStoreSlice } from '../../appStore';
import { BinState, BinStateSlice } from './types';

const defaultBinState: BinState = {
  items: ['deleted_file.txt', 'old_photo.png'],
};

const createBinSlice: AppStoreSlice<BinStateSlice> = (set) => ({
  ...defaultBinState,
  addItem: (item) => {
    set((state) => {
      state.Bin.items.push(item);
    });
  },
  emptyBin: () => {
    set((state) => {
      state.Bin.items = [];
    });
  },
});

export default createBinSlice;
