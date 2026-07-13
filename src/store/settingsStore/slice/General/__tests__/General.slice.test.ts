import { act, renderHook } from '@testing-library/react-hooks';
import { settingsStore } from '../../../settingsStore';

describe('General slice', () => {
  it('should return default general state', () => {
    const { result } = renderHook(() => settingsStore());

    expect(result.current.General).toEqual({
      selectedTab: 'general',
      subPage: null,
      setSelectedTab: expect.any(Function),
      setSubPage: expect.any(Function),
    });
  });

  it('should update selected tab', () => {
    const { result } = renderHook(() => settingsStore());

    act(() => {
      result.current.General.setSelectedTab('wifi');
    });

    expect(result.current.General.selectedTab).toBe('wifi');
  });

  it('should update subPage', () => {
    const { result } = renderHook(() => settingsStore());

    act(() => {
      result.current.General.setSubPage('about');
    });

    expect(result.current.General.subPage).toBe('about');
  });
});
