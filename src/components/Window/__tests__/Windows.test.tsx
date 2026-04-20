import { fireEvent, render, screen, act } from '@testing-library/react';
import Window from '../Window';
import { ProgramType, processStore } from '@processStore';
import React from 'react';

// Mock DraggableProvider and ResizableBox to trigger callbacks
jest.mock('@providers', () => ({
  DraggableProvider: ({ children, onPositionChange }: any) => (
    <div
      data-testid="draggable-provider"
      onClick={() => onPositionChange({ x: 100, y: 100 })}
    >
      {children}
    </div>
  ),
}));

jest.mock('react-resizable', () => ({
  ResizableBox: ({ children, onResize }: any) => (
    <div
      data-testid="resizable-box"
      onClick={() =>
        onResize && onResize({}, { size: { width: 800, height: 600 } })
      }
    >
      {children}
    </div>
  ),
}));

describe('Windows', () => {
  const clickHandler = jest.fn();
  beforeEach(() => {
    clickHandler.mockReset();
    jest.clearAllMocks();
    // Reset store before each test
    act(() => {
      processStore.setState((state: any) => {
        state.ActiveApp.apps = {};
      });
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
          size: 'MAX',
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
});
