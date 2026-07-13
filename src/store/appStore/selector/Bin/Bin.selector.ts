import { AppStoreState } from '../../appStore';

const binSelector = (state: AppStoreState) => ({
  items: state.Bin.items,
  addItem: state.Bin.addItem,
  emptyBin: state.Bin.emptyBin,
});

export { binSelector };
