import { renderHook } from '@testing-library/react-hooks';
import { settingsStore } from '../../../settingsStore';

describe('Bluetooth slice', () => {
  it('should return default bluetooth state', () => {
    const { result } = renderHook(() => settingsStore());

    expect(result.current.Bluetooth).toEqual({
      enabled: true,
      setEnabled: expect.any(Function),
    });
  });
});
