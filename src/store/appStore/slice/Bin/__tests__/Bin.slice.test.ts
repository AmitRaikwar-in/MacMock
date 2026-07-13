import { renderHook } from '@testing-library/react-hooks';
import { appStore } from '../../../appStore';

describe('Bin slice', () => {
  it('should return default bin state', () => {
    const { result } = renderHook(() => appStore());

    expect(result.current.Bin.items).toEqual(['deleted_file.txt', 'old_photo.png']);
    expect(result.current.Bin.addItem).toBeDefined();
    expect(result.current.Bin.emptyBin).toBeDefined();
  });
});
