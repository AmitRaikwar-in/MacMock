import { renderHook } from '@testing-library/react-hooks';
import { ProgramType, WindowSize, processStore } from '@processStore';

describe('ActiveApps slice', () => {
  it('should return default ActiveApp state', () => {
    const { result } = renderHook(() => processStore());

    expect(result.current.ActiveApp.apps).toEqual({});
  });

  it('should add app', () => {
    const { result } = renderHook(() => processStore());

    result.current.ActiveApp.addApp(ProgramType.CHROME);

    expect(result.current.ActiveApp.apps.chrome).toEqual({
      position: { x: 600, y: 150 },
      size: WindowSize.DEFAULT,
      zIndex: 1,
    });
  });

  it('should remove app', () => {
    const { result } = renderHook(() => processStore());

    result.current.ActiveApp.addApp(ProgramType.CHROME);
    expect(result.current.ActiveApp.apps.chrome).not.toBeUndefined();

    result.current.ActiveApp.removeApp(ProgramType.CHROME);

    expect(result.current.ActiveApp.apps.chrome).toBeUndefined();
  });

  it('should set window size', () => {
    const { result } = renderHook(() => processStore());

    result.current.ActiveApp.addApp(ProgramType.CHROME);
    expect(result.current.ActiveApp.apps.chrome?.size).toEqual(
      WindowSize.DEFAULT,
    );

    result.current.ActiveApp.setWindowSize(ProgramType.CHROME, WindowSize.HIDE);

    expect(result.current.ActiveApp.apps.chrome?.size).toEqual(WindowSize.HIDE);
  });

  it('should update position', () => {
    const { result } = renderHook(() => processStore());

    result.current.ActiveApp.addApp(ProgramType.CHROME);
    expect(result.current.ActiveApp.apps.chrome?.position).toEqual({
      x: 600,
      y: 150,
    });

    result.current.ActiveApp.updatePosition(ProgramType.CHROME, {
      x: 500,
      y: 200,
    });

    expect(result.current.ActiveApp.apps.chrome?.position).toEqual({
      x: 500,
      y: 200,
    });
  });

  it('should make app active', () => {
    const { result } = renderHook(() => processStore());

    result.current.ActiveApp.addApp(ProgramType.CHROME);

    expect(result.current.ActiveApp.activeApp).toEqual(ProgramType.CHROME);
  });

  it('should make default app active', () => {
    const { result } = renderHook(() => processStore());

    result.current.ActiveApp.addApp(ProgramType.CHROME);

    expect(result.current.ActiveApp.activeApp).toEqual(ProgramType.CHROME);

    result.current.ActiveApp.makeDefaultAppActive(ProgramType.CHROME);

    expect(result.current.ActiveApp.activeApp).toEqual(ProgramType.FINDER);
  });

  it('should clear all active apps', () => {
    const { result } = renderHook(() => processStore());

    result.current.ActiveApp.addApp(ProgramType.CHROME);
    result.current.ActiveApp.addApp(ProgramType.VSCODE);

    // Multi-instance: both CHROME and VSCODE are open simultaneously
    expect(result.current.ActiveApp.apps.chrome).toBeDefined();
    expect(result.current.ActiveApp.apps.vscode).toBeDefined();

    result.current.ActiveApp.clearAllActiveApps();

    expect(result.current.ActiveApp.apps).toEqual({});
  });
});
