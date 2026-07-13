import { renderHook } from '@testing-library/react-hooks';
import { settingsStore } from '../../../settingsStore';
import { soundSelector } from '../Sound.selector';

describe('Sound selector', () => {
  it('should return default Sound state', () => {
    const { result } = renderHook(() => settingsStore(soundSelector));

    expect(result.current).toEqual({
      soundVolume: 75,
      setSoundVolume: expect.any(Function),
    });
  });
});
