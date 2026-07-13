import { renderHook } from '@testing-library/react-hooks';
import { settingsStore } from '../../../settingsStore';

describe('Battery slice', () => {
  it('should return default battery state', () => {
    const { result } = renderHook(() => settingsStore());

    expect(result.current.Battery).toEqual({
      lowPowerMode: false,
      setLowPowerMode: expect.any(Function),
    });
  });
});
