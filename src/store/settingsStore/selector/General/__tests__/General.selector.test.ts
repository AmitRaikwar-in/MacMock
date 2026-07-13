import { renderHook } from '@testing-library/react-hooks';
import { settingsStore } from '../../../settingsStore';
import { generalSelector } from '../General.selector';

describe('General selector', () => {
  it('should return default general state', () => {
    const { result } = renderHook(() => settingsStore(generalSelector));

    expect(result.current).toEqual({
      selectedTab: 'general',
      subPage: null,
      setSelectedTab: expect.any(Function),
      setSubPage: expect.any(Function),
    });
  });
});
