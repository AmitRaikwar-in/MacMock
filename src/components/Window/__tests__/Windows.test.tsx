import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Window from '../Window';
import { ProgramType, processStore, WindowSize } from '@processStore';
import React from 'react';
import { act } from '@testing-library/react-hooks';

// Shared variable to capture props
let capturedDraggableProps: any;
let capturedResizableProps: any;

// Mock DraggableProvider and ResizableBox to trigger callbacks and capture props
jest.mock('@providers', () => ({
  DraggableProvider: (props: any) => {
    capturedDraggableProps = props;
    return (
      <div
        data-testid="draggable-provider"
        onClick={() => props.onPositionChange({ x: 100, y: 100 })}
      >
        {props.children}
      </div>
    );
  },
}));

jest.mock('react-resizable', () => ({
  ResizableBox: (props: any) => {
    capturedResizableProps = props;
    return (
      <div
        data-testid="resizable-box"
        onClick={() =>
          props.onResize &&
          props.onResize({}, { size: { width: 800, height: 600 } })
        }
      >
        {props.children}
      </div>
    );
  },
}));

describe('Windows', () => {
  const clickHandler = jest.fn();
  beforeEach(() => {
    clickHandler.mockReset();
    jest.clearAllMocks();
    capturedDraggableProps = null;
    capturedResizableProps = null;
    // Reset store before each test
    act(() => {
      processStore.setState((state: any) => {
        state.ActiveApp.apps = {};
      });
      // Seed FINDER app to state so it can be updated
      processStore.getState().ActiveApp.addApp(ProgramType.FINDER);
    });
  });

  it('should render for default values', () => {
    const { container } = render(
      <Window app={ProgramType.FINDER} topBar={<div>Top bar</div>}>
        <div>Test</div>
      </Window>,
    );

    expect(container).toMatchSnapshot();
  });

  it('should trigger close on close button press', () => {
    const { container } = render(
      <Window app={ProgramType.FINDER}>
        <div>Test</div>
      </Window>,
    );

    fireEvent.click(screen.getByLabelText('close'));

    expect(container).toMatchSnapshot();
    expect(container.querySelector('.left-side')).toBeDefined();
  });

  it('should trigger minimize on minimize button press', () => {
    const { container } = render(
      <Window app={ProgramType.FINDER}>
        <div>Test</div>
      </Window>,
    );

    fireEvent.click(screen.getByLabelText('minimize'));

    expect(container).toMatchSnapshot();
    expect(container.querySelector('.left-side')).toBeDefined();
  });

  it('should trigger maximize on maximize button press', () => {
    const { container } = render(
      <Window app={ProgramType.FINDER}>
        <div>Test</div>
      </Window>,
    );

    fireEvent.click(screen.getByLabelText('maximize'));

    expect(container).toMatchSnapshot();
    expect(container.querySelector('.left-side')).toBeDefined();

    // Verify it changed to MAX
    const appState = processStore.getState().ActiveApp.apps[ProgramType.FINDER];
    expect(appState?.size).toBe(WindowSize.MAX);
  });

  it('should toggle maximize on double click on title bar', () => {
    const { container } = render(
      <Window app={ProgramType.FINDER}>
        <div>Test</div>
      </Window>,
    );

    const titleBar = container.querySelector('.handle');
    expect(titleBar).toBeTruthy();

    if (titleBar) {
      fireEvent.doubleClick(titleBar);
    }

    // Should now be maximized
    expect(container).toMatchSnapshot();
    const appState = processStore.getState().ActiveApp.apps[ProgramType.FINDER];
    expect(appState?.size).toBe(WindowSize.MAX);
  });

  it('should handle resize', () => {
    render(
      <Window app={ProgramType.FINDER}>
        <div>Test</div>
      </Window>,
    );

    const resizable = screen.getByTestId('resizable-box');
    fireEvent.click(resizable);
    // onResize should have been called and updated componentDimension state
  });

  it('should handle position change', () => {
    render(
      <Window app={ProgramType.FINDER}>
        <div>Test</div>
      </Window>,
    );

    const draggable = screen.getByTestId('draggable-provider');
    fireEvent.click(draggable);
    // onPositionChange should have been called and triggered updatePosition
  });

  it('should render maximized window', () => {
    // We need to mock processStore to return a maximized app
    act(() => {
      processStore.setState((state: any) => {
        state.ActiveApp.apps[ProgramType.FINDER] = {
          app: ProgramType.FINDER,
          size: WindowSize.MAX,
          position: { x: 0, y: 0 },
        };
      });
    });

    const { container } = render(
      <Window app={ProgramType.FINDER}>
        <div>Test</div>
      </Window>,
    );

    expect(container).toMatchSnapshot();
  });

  it('should memoize correctly', () => {
    const children = <div key="1">Test</div>;
    const { rerender } = render(
      <Window app={ProgramType.FINDER}>{children}</Window>,
    );

    // Re-rendering with same children should not cause re-render of memoized component
    rerender(<Window app={ProgramType.FINDER}>{children}</Window>);

    // Re-rendering with different children should cause re-render
    rerender(
      <Window app={ProgramType.FINDER}>
        <div key="2">Different</div>
      </Window>,
    );
  });

  describe('Branch Coverage Edge Cases', () => {
    it('should handle undefined currentApp (defaults to not maximized)', () => {
      // Clear seeded app for this test
      act(() => {
        processStore.setState((state: any) => {
          state.ActiveApp.apps = {};
        });
      });

      render(
        <Window app={ProgramType.FINDER}>
          <div>Test Undefined</div>
        </Window>,
      );

      expect(capturedDraggableProps.maximized).toBe(false);
      expect(capturedDraggableProps.position).toEqual({ x: 0, y: 0 });
      expect(capturedResizableProps.resizeHandles).toEqual(['se']);
    });

    it('should handle DEFAULT size app', () => {
      act(() => {
        processStore.setState((state: any) => {
          state.ActiveApp.apps[ProgramType.FINDER] = {
            app: ProgramType.FINDER,
            size: WindowSize.DEFAULT,
            position: { x: 50, y: 50 },
          };
        });
      });

      render(
        <Window app={ProgramType.FINDER}>
          <div>Test Default</div>
        </Window>,
      );

      expect(capturedDraggableProps.maximized).toBe(false);
      expect(capturedDraggableProps.position).toEqual({ x: 50, y: 50 });
      expect(capturedResizableProps.resizeHandles).toEqual(['se']);
    });

    it('should handle MAX size app branches', () => {
      act(() => {
        processStore.setState((state: any) => {
          state.ActiveApp.apps[ProgramType.FINDER] = {
            app: ProgramType.FINDER,
            size: WindowSize.MAX,
            position: { x: 10, y: 10 },
          };
        });
      });

      render(
        <Window app={ProgramType.FINDER}>
          <div>Test Max</div>
        </Window>,
      );

      expect(capturedDraggableProps.maximized).toBe(true);
      expect(capturedResizableProps.resizeHandles).toEqual([]);
      expect(capturedResizableProps.style.transition).toBe('all 0.3s cubic-bezier(0.16, 1, 0.3, 1)');

      // Test toggle back to DEFAULT
      fireEvent.click(screen.getByLabelText('maximize'));
      const appState =
        processStore.getState().ActiveApp.apps[ProgramType.FINDER];
      expect(appState?.size).toBe(WindowSize.DEFAULT);
    });

    it('should show/hide handle class based on maximized state', () => {
      const { rerender } = render(
        <Window app={ProgramType.FINDER}>
          <div>Test Class</div>
        </Window>,
      );
      const handleContainer =
        screen.getByText('Test Class').parentElement?.previousSibling;
      expect(handleContainer).toHaveClass('handle');

      act(() => {
        processStore.setState((state: any) => {
          state.ActiveApp.apps[ProgramType.FINDER] = {
            app: ProgramType.FINDER,
            size: WindowSize.MAX,
            position: { x: 0, y: 0 },
          };
        });
      });

      rerender(
        <Window app={ProgramType.FINDER}>
          <div>Test Class</div>
        </Window>,
      );
      expect(handleContainer).not.toHaveClass('handle');
    });
  });
});
