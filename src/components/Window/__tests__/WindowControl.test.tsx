import { fireEvent, render, screen } from '@testing-library/react';
import WindowControl from '../WindowControl';
import {
  ProgramType,
  WindowSize,
  activeAppSelector,
  processStore,
} from '@processStore';
import { act, renderHook } from '@testing-library/react-hooks';

describe('WindowControl', () => {
  const maximizeClickHandler = jest.fn();

  beforeEach(() => {
    maximizeClickHandler.mockReset();
    const { result } = renderHook(() => processStore());
    act(() => {
      result.current.ActiveApp.addApp(ProgramType.FINDER);
    });
  });

  it('should render correctly', () => {
    const { container } = render(
      <WindowControl
        app={ProgramType.FINDER}
        onMaximizeClick={maximizeClickHandler}
      />,
    );

    expect(container).toMatchSnapshot();
  });

  it('should trigger maximize on maximize button press', () => {
    render(
      <WindowControl
        app={ProgramType.FINDER}
        onMaximizeClick={maximizeClickHandler}
      />,
    );

    fireEvent.click(screen.getByLabelText('maximize'));

    expect(maximizeClickHandler).toHaveBeenCalled();
  });

  it('should trigger minimize on minimize button press', async () => {
    const { result } = renderHook(() => processStore(activeAppSelector));
    render(
      <WindowControl
        app={ProgramType.FINDER}
        onMaximizeClick={maximizeClickHandler}
      />,
    );

    fireEvent.click(screen.getByLabelText('minimize'));
    await jest.advanceTimersByTimeAsync(1000);

    expect(result.current(ProgramType.FINDER)?.size).toEqual(WindowSize.HIDE);
  });

  it('should trigger close on close button press', async () => {
    const { result } = renderHook(() => processStore(activeAppSelector));
    render(
      <WindowControl
        app={ProgramType.FINDER}
        onMaximizeClick={maximizeClickHandler}
      />,
    );

    fireEvent.click(screen.getByLabelText('close'));
    await jest.advanceTimersByTimeAsync(1000);

    expect(result.current(ProgramType.FINDER)).toBeUndefined();
  });

  it('should trigger mouse enter and leave event', () => {
    const { container } = render(
      <WindowControl
        app={ProgramType.FINDER}
        onMaximizeClick={maximizeClickHandler}
      />,
    );

    fireEvent.mouseEnter(screen.getByTestId('traffic-lights'));

    expect(container).toMatchSnapshot();

    fireEvent.mouseLeave(screen.getByTestId('traffic-lights'));

    expect(container).toMatchSnapshot();
  });
});
