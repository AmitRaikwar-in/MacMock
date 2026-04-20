import { fireEvent, render, screen, act } from '@testing-library/react';
import BottomBar from '../BottomBar';
import { renderHook } from '@testing-library/react-hooks';
import { ProgramType, processStore, WindowSize } from '@processStore';
import { BottomBarProgramType } from '../components';
import { LaunchpadContext } from '../../../Mac';
import React from 'react';

// Mock react-beautiful-dnd to capture onDragEnd
jest.mock('react-beautiful-dnd', () => ({
  DragDropContext: ({ children, onDragEnd }: any) => {
    (global as any).triggerDragEnd = onDragEnd;
    return <div data-testid="drag-drop-context">{children}</div>;
  },
  Droppable: ({ children }: any) =>
    children(
      {
        innerRef: jest.fn(),
        droppableProps: {},
        placeholder: <div data-testid="placeholder" />,
      },
      {},
    ),
  Draggable: ({ children }: any) =>
    children(
      {
        innerRef: jest.fn(),
        draggableProps: {},
        dragHandleProps: {},
      },
      {},
    ),
}));

describe('BottomBar', () => {
  beforeEach(() => {
    const { result } = renderHook(() => processStore());
    act(() => {
      result.current.ActiveApp.removeApp(ProgramType.FINDER);
      result.current.ActiveApp.removeApp(ProgramType.CHROME);
      processStore.setState((state: any) => {
        state.ActiveApp.apps = {};
      });
    });
    jest.clearAllMocks();
    delete (global as any).triggerDragEnd;
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should render correctly to match snapshot', () => {
    const { container } = render(<BottomBar />);

    expect(container).toMatchSnapshot();
  });

  it('should render invoke onclick on launch pad click', async () => {
    const setLaunchpad = jest.fn();
    render(<BottomBar />);
    render(
      <LaunchpadContext.Provider value={{ launchpad: false, setLaunchpad }}>
        <BottomBar />
      </LaunchpadContext.Provider>,
    );

    fireEvent.click(screen.getAllByLabelText('program-button-launchPad')[0]);
    await act(async () => {
      jest.advanceTimersByTime(1000);
    });

    expect(setLaunchpad).toHaveBeenCalled();
  });

  it('should render correctly with props to match snapshot', async () => {
    const { result } = renderHook(() => processStore());
    render(<BottomBar />);

    fireEvent.click(screen.getByLabelText('program-button-finder'));
    await act(async () => {
      jest.advanceTimersByTime(1000);
    });

    expect(
      result.current.ActiveApp.apps[BottomBarProgramType.FINDER],
    ).toMatchSnapshot();
  });

  it('should render correctly finder app to match snapshot', async () => {
    const { result } = renderHook(() => processStore());
    render(<BottomBar />);

    fireEvent.click(screen.getByLabelText('program-button-finder'));
    await act(async () => {
      jest.advanceTimersByTime(1000);
    });

    expect(
      result.current.ActiveApp.apps[BottomBarProgramType.FINDER],
    ).toMatchSnapshot();
  });

  it('should render correctly chrome app to match snapshot', async () => {
    const { result } = renderHook(() => processStore());
    render(<BottomBar />);

    fireEvent.click(screen.getByLabelText('program-button-chrome'));
    await act(async () => {
      jest.advanceTimersByTime(1000);
    });

    expect(
      result.current.ActiveApp.apps[BottomBarProgramType.CHROME],
    ).toMatchSnapshot();
  });

  it('should render correctly spotify app to match snapshot', async () => {
    const { result } = renderHook(() => processStore());
    render(<BottomBar />);

    fireEvent.click(screen.getByLabelText('program-button-spotify'));
    await act(async () => {
      jest.advanceTimersByTime(1000);
    });

    expect(
      result.current.ActiveApp.apps[BottomBarProgramType.SPOTIFY],
    ).toMatchSnapshot();
  });

  it('should render correctly terminal app to match snapshot', async () => {
    const { result } = renderHook(() => processStore());
    render(<BottomBar />);

    fireEvent.click(screen.getByLabelText('program-button-terminal'));
    await act(async () => {
      jest.advanceTimersByTime(1000);
    });

    expect(
      result.current.ActiveApp.apps[BottomBarProgramType.TERMINAL],
    ).toMatchSnapshot();
  });

  it('should render correctly vscode app to match snapshot', async () => {
    const { result } = renderHook(() => processStore());
    render(<BottomBar />);

    fireEvent.click(screen.getByLabelText('program-button-vscode'));
    await act(async () => {
      jest.advanceTimersByTime(1000);
    });

    expect(
      result.current.ActiveApp.apps[BottomBarProgramType.VSCODE],
    ).toMatchSnapshot();
  });

  it('should render correctly github app to match snapshot', async () => {
    const { result } = renderHook(() => processStore());
    render(<BottomBar />);

    fireEvent.click(screen.getByLabelText('program-button-github'));
    await act(async () => {
      jest.advanceTimersByTime(1000);
    });

    expect(
      result.current.ActiveApp.apps[BottomBarProgramType.GITHUB],
    ).toMatchSnapshot();
  });

  it('should render correctly settings app to match snapshot', async () => {
    const { result } = renderHook(() => processStore());
    render(<BottomBar />);

    fireEvent.click(screen.getByLabelText('program-button-settings'));
    await act(async () => {
      jest.advanceTimersByTime(1000);
    });

    expect(
      result.current.ActiveApp.apps[BottomBarProgramType.SETTINGS],
    ).toMatchSnapshot();
  });

  it('should render correctly bin app to match snapshot', async () => {
    const { result } = renderHook(() => processStore());
    render(<BottomBar />);

    fireEvent.click(screen.getByLabelText('program-button-Bin'));
    await act(async () => {
      jest.advanceTimersByTime(1000);
    });

    expect(result.current.ActiveApp.apps[ProgramType.BIN]).toMatchSnapshot();
  });

  describe('Branch Coverage Extra Cases', () => {
    it('should handle onDragEnd with valid destination', () => {
      render(<BottomBar />);
      const onDragEnd = (global as any).triggerDragEnd;

      act(() => {
        onDragEnd({
          source: { index: 0 },
          destination: { index: 1 },
        });
      });
    });

    it('should handle onDragEnd with same index (no-op branch)', () => {
      render(<BottomBar />);
      const onDragEnd = (global as any).triggerDragEnd;

      act(() => {
        onDragEnd({
          source: { index: 0 },
          destination: { index: 0 },
        });
      });
    });

    it('should handle onDragEnd with no destination (no-op branch)', () => {
      render(<BottomBar />);
      const onDragEnd = (global as any).triggerDragEnd;

      act(() => {
        onDragEnd({
          source: { index: 0 },
          destination: null,
        });
      });
    });

    it('should render and click running middle apps', () => {
      act(() => {
        processStore.setState((state: any) => {
          state.ActiveApp.apps[ProgramType.CALENDAR] = {
            position: { x: 0, y: 0 },
            size: WindowSize.MAX,
          };
        });
      });

      render(<BottomBar />);

      const calendarButton = screen.getByLabelText('program-button-calendar');
      fireEvent.click(calendarButton);

      const appState =
        processStore.getState().ActiveApp.apps[ProgramType.CALENDAR];
      expect(appState?.size).toBe(WindowSize.DEFAULT);
    });

    it('should open a middle app if it was not running', () => {
      act(() => {
        processStore.setState((state: any) => {
          state.ActiveApp.apps[ProgramType.CALENDAR] = undefined as any;
        });
      });

      render(<BottomBar />);

      const calendarButton = screen.getByLabelText('program-button-calendar');
      fireEvent.click(calendarButton);

      act(() => {
        jest.advanceTimersByTime(500);
      });

      const appState =
        processStore.getState().ActiveApp.apps[ProgramType.CALENDAR];
      expect(appState).toBeDefined();
    });

    it('should set window size when clicking an already running bottom bar app', () => {
      act(() => {
        processStore.setState((state: any) => {
          state.ActiveApp.apps[ProgramType.FINDER] = {
            position: { x: 0, y: 0 },
            size: WindowSize.MAX,
          };
        });
      });

      render(<BottomBar />);

      fireEvent.click(screen.getByLabelText('program-button-finder'));

      const appState =
        processStore.getState().ActiveApp.apps[ProgramType.FINDER];
      expect(appState?.size).toBe(WindowSize.DEFAULT);
    });

    it('should set window size when clicking an already running Bin app', () => {
      act(() => {
        processStore.setState((state: any) => {
          state.ActiveApp.apps[ProgramType.FINDER] = {
            position: { x: 0, y: 0 },
            size: WindowSize.DEFAULT,
          };
          state.ActiveApp.apps[ProgramType.BIN] = {
            position: { x: 0, y: 0 },
            size: WindowSize.MAX,
          };
        });
      });

      render(<BottomBar />);

      fireEvent.click(screen.getByLabelText('program-button-Bin'));

      const appState = processStore.getState().ActiveApp.apps[ProgramType.BIN];
      expect(appState?.size).toBe(WindowSize.DEFAULT);
    });

    it('should close launchpad when activeAppRunning changes', () => {
      const setLaunchpad = jest.fn();
      const { rerender } = render(
        <LaunchpadContext.Provider value={{ launchpad: true, setLaunchpad }}>
          <BottomBar />
        </LaunchpadContext.Provider>,
      );

      act(() => {
        processStore.setState((state: any) => {
          state.ActiveApp.activeApp = ProgramType.NOTES;
        });
      });

      rerender(
        <LaunchpadContext.Provider value={{ launchpad: true, setLaunchpad }}>
          <BottomBar />
        </LaunchpadContext.Provider>,
      );

      expect(setLaunchpad).toHaveBeenCalledWith(false);
    });
  });
});
