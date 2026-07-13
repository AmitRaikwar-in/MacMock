import { appStore, vsCodeSelector, useShallow } from '@appStore';

const VsCode = () => {
  const { iframeUrl } = appStore(useShallow(vsCodeSelector));

  return (
    // eslint-disable-next-line jsx-a11y/iframe-has-title
    <iframe
      aria-label="github"
      width="100%"
      height="100%"
      src={iframeUrl}
    ></iframe>
  );
};

export default VsCode;
