import { renderHook } from '@testing-library/react-hooks';
import { settingsStore } from '../../../settingsStore';

describe('Sound slice', () => {
  it('should return default sound state', () => {
    const { result } = renderHook(() => settingsStore());

    expect(result.current.Sound).toEqual({
      volume: 75,
      setVolume: expect.any(Function),
    });
  });
});
