import { renderHook } from '@testing-library/react-hooks';
import { settingsStore } from '../../../settingsStore';
import { wifiSelector } from '../Wifi.selector';

describe('Wifi selector', () => {
  it('should return default Wifi state', () => {
    const { result } = renderHook(() => settingsStore(wifiSelector));

    expect(result.current).toEqual({
      wifiEnabled: true,
      setWifiEnabled: expect.any(Function),
    });
  });
});
