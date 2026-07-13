import { renderHook } from '@testing-library/react-hooks';
import { settingsStore } from '../../../settingsStore';
import { bluetoothSelector } from '../Bluetooth.selector';

describe('Bluetooth selector', () => {
  it('should return default bluetooth state', () => {
    const { result } = renderHook(() => settingsStore(bluetoothSelector));

    expect(result.current).toEqual({
      bluetoothEnabled: true,
      setBluetoothEnabled: expect.any(Function),
    });
  });
});
