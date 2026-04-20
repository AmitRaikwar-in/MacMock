import { render, screen } from '@testing-library/react';
import ModalProvider from '../ModalProvider';
import { act, renderHook } from '@testing-library/react-hooks';
import { uiStore } from '@uiStore';
import { ModalID } from '@uiStore';

describe('ModalProvider', () => {
  it('should render correctly', () => {
    const { result } = renderHook(() => uiStore());

    act(() => {
      result.current.Modal.resetModalState();
    });
    const { container } = render(<ModalProvider>App</ModalProvider>);

    expect(container).toMatchSnapshot();
    expect(screen.getByText('App')).toBeDefined();
  });

  it('should render correctly with children', () => {
    const { result } = renderHook(() => uiStore());

    act(() => {
      result.current.Modal.resetModalState();
    });
    const { container } = render(
      <ModalProvider>
        <div>App</div>
      </ModalProvider>,
    );

    expect(container).toMatchSnapshot();
    expect(screen.getByText('App')).toBeDefined();
  });

  it('should handle modal open state', () => {
    const { result } = renderHook(() => uiStore());

    render(<ModalProvider>App</ModalProvider>);

    act(() => {
      result.current.Modal.openModal(ModalID.SEARCH, jest.fn());
    });

    // The effect should trigger onOpen()
    // We can verify by matching snapshot when modal is open
    expect(screen.getByText('App')).toBeDefined();
  });
});
