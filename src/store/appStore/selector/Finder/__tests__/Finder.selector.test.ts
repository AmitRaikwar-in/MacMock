import { renderHook } from '@testing-library/react-hooks';
import { appStore, finderSelector } from '@appStore';

describe('Finder selector', () => {
  it('should return default finder state', () => {
    const { result } = renderHook(() => appStore(finderSelector));

    expect(result.current.currentPath).toEqual('/Users/mr.robot');
    expect(result.current.setCurrentPath).toBeDefined();
  });
});
