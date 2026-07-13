import { renderHook } from '@testing-library/react-hooks';
import { settingsStore } from '../../../settingsStore';
import { batterySelector } from '../Battery.selector';

describe('Battery selector', () => {
  it('should return default Battery state', () => {
    const { result } = renderHook(() => settingsStore(batterySelector));

    expect(result.current).toEqual({
      lowPowerMode: false,
      setLowPowerMode: expect.any(Function),
    });
  });
});
