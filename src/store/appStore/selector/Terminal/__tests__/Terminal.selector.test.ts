import { renderHook } from '@testing-library/react-hooks';
import { appStore } from '../../../appStore';
import { terminalSelector } from '../Terminal.selector';

describe('Terminal selector', () => {
  it('should return default terminal state', () => {
    const { result } = renderHook(() => appStore(terminalSelector));

    expect(result.current.history).toEqual(['Last login: Mon Jul 13 23:25:25 on ttys001']);
    expect(result.current.addHistory).toBeDefined();
    expect(result.current.clearHistory).toBeDefined();
  });
});
