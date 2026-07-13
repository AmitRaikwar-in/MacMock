import { renderHook } from '@testing-library/react-hooks';
import { appStore } from '@appStore';

describe('Finder slice', () => {
  it('should return default finder state', () => {
    const { result } = renderHook(() => appStore());

    expect(result.current.Finder.currentPath).toEqual('/Users/mr.robot');
    expect(result.current.Finder.setCurrentPath).toBeDefined();
  });
});
