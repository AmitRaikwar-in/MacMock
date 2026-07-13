import { AppStoreState } from '../../appStore';

const vsCodeSelector = (state: AppStoreState) => ({
  iframeUrl: state.VsCode.iframeUrl,
  setIframeUrl: state.VsCode.setIframeUrl,
});

export { vsCodeSelector };
