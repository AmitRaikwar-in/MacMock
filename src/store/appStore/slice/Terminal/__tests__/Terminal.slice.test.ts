import { renderHook } from '@testing-library/react-hooks';
import { appStore } from '../../../appStore';

describe('Terminal slice', () => {
  it('should return default terminal state', () => {
    const { result } = renderHook(() => appStore());

    expect(result.current.Terminal.history).toEqual(['Last login: Mon Jul 13 23:25:25 on ttys001']);
    expect(result.current.Terminal.addHistory).toBeDefined();
    expect(result.current.Terminal.clearHistory).toBeDefined();
  });
});
