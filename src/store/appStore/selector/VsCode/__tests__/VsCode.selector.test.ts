import { renderHook } from '@testing-library/react-hooks';
import { appStore } from '../../../appStore';
import { vsCodeSelector } from '../VsCode.selector';

describe('VsCode selector', () => {
  it('should return default vsCode state', () => {
    const { result } = renderHook(() => appStore(vsCodeSelector));

    expect(result.current.iframeUrl).toEqual('https://github1s.com/onemanfighter/ar-mac-portfolio');
    expect(result.current.setIframeUrl).toBeDefined();
  });
});
