export type VsCodeState = {
  iframeUrl: string;
};

export interface VsCodeAppAction {
  setIframeUrl: (url: string) => void;
}

export type VsCodeStateSlice = VsCodeState & VsCodeAppAction;
