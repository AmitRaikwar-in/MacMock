import { AppStoreSlice } from '../../appStore';
import { VsCodeState, VsCodeStateSlice } from './types';

const defaultVsCodeState: VsCodeState = {
  iframeUrl: 'https://github1s.com/onemanfighter/ar-mac-portfolio',
};

const createVsCodeSlice: AppStoreSlice<VsCodeStateSlice> = (set) => ({
  ...defaultVsCodeState,
  setIframeUrl: (url) => {
    set((state) => {
      state.VsCode.iframeUrl = url;
    });
  },
});

export default createVsCodeSlice;
