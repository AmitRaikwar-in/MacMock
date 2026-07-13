import { renderHook } from '@testing-library/react-hooks';
import {
  activeAppActionsSelector,
  activeAppRunningSelector,
  activeAppSelector,
} from '../ActiveApp.selector';
import { ProgramType, WindowSize, processStore } from '@processStore';

describe('Active app selector', () => {
  it('should return default active apps state', () => {
    const { result } = renderHook(() =>
      processStore((state) => ({
        getActiveApp: activeAppSelector(state),
        ...activeAppActionsSelector(state),
      })),
    );

    expect(result.current.getActiveApp(ProgramType.CHROME)).toEqual(undefined);
  });

  it('should add app', () => {
    const { result } = renderHook(() =>
      processStore((state) => ({
        getActiveApp: activeAppSelector(state),
        ...activeAppActionsSelector(state),
      })),
    );

    result.current.addApp(ProgramType.CHROME);

    expect(result.current.getActiveApp(ProgramType.CHROME)).toEqual({
      position: { x: 600, y: 150 },
      size: WindowSize.DEFAULT,
      zIndex: 1,
    });
  });

  it('should remove app', () => {
    const { result } = renderHook(() =>
      processStore((state) => ({
        getActiveApp: activeAppSelector(state),
        ...activeAppActionsSelector(state),
      })),
    );

    result.current.addApp(ProgramType.CHROME);
    expect(result.current.getActiveApp(ProgramType.CHROME)).toBeDefined();

    result.current.removeApp(ProgramType.CHROME);

    expect(result.current.getActiveApp(ProgramType.CHROME)).not.toBeDefined();
  });

  it('should set window size', () => {
    const { result } = renderHook(() =>
      processStore((state) => ({
        getActiveApp: activeAppSelector(state),
        ...activeAppActionsSelector(state),
      })),
    );

    result.current.addApp(ProgramType.CHROME);
    expect(result.current.getActiveApp(ProgramType.CHROME)?.size).toEqual(
      WindowSize.DEFAULT,
    );

    result.current.setWindowSize(ProgramType.CHROME, WindowSize.HIDE);

    expect(result.current.getActiveApp(ProgramType.CHROME)?.size).toEqual(
      WindowSize.HIDE,
    );
  });

  it('should update position', () => {
    const { result } = renderHook(() =>
      processStore((state) => ({
        getActiveApp: activeAppSelector(state),
        ...activeAppActionsSelector(state),
      })),
    );

    result.current.addApp(ProgramType.CHROME);
    expect(result.current.getActiveApp(ProgramType.CHROME)?.position).toEqual({
      x: 600,
      y: 150,
    });

    result.current.updatePosition(ProgramType.CHROME, { x: 100, y: 100 });

    expect(result.current.getActiveApp(ProgramType.CHROME)?.position).toEqual({
      x: 100,
      y: 100,
    });
  });

  it('should make app active', () => {
    const { result } = renderHook(() => processStore(activeAppRunningSelector));

    result.current.makeAppActive(ProgramType.CHROME);

    expect(result.current.activeAppRunning).toEqual(ProgramType.CHROME);
  });

  it('should make default app active', () => {
    const { result } = renderHook(() => processStore(activeAppRunningSelector));

    result.current.makeAppActive(ProgramType.CHROME);
    expect(result.current.activeAppRunning).toEqual(ProgramType.CHROME);

    result.current.makeDefaultAppActive(ProgramType.CHROME);
    expect(result.current.activeAppRunning).toEqual(ProgramType.FINDER);
  });

  it('should clear all active apps', () => {
    const { result } = renderHook(() =>
      processStore((state) => ({
        getActiveApp: activeAppSelector(state),
        ...activeAppActionsSelector(state),
      })),
    );

    result.current.addApp(ProgramType.CHROME);
    expect(result.current.getActiveApp(ProgramType.CHROME)).toBeDefined();

    result.current.addApp(ProgramType.VSCODE);
    // Multi-instance: both apps remain open
    expect(result.current.getActiveApp(ProgramType.CHROME)).toBeDefined();
    expect(result.current.getActiveApp(ProgramType.VSCODE)).toBeDefined();

    result.current.clearAllActiveApps();

    expect(result.current.getActiveApp(ProgramType.CHROME)).not.toBeDefined();
    expect(result.current.getActiveApp(ProgramType.VSCODE)).not.toBeDefined();
  });
});
