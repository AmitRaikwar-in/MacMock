import { render, screen } from '@testing-library/react';
import ModalProvider from '../ModalProvider';
import { act, renderHook } from '@testing-library/react-hooks';
import { uiStore, ModalOpenState } from '@uiStore';
import { ModalID } from '@uiStore';
import React from 'react';

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
    expect(screen.getByText('App')).toBeDefined();
  });

  describe('Branch Coverage', () => {
    it('should call onModalClose when closing modal', () => {
      const { result } = renderHook(() => uiStore());
      const mockOnClose = jest.fn();

      render(<ModalProvider>App</ModalProvider>);

      // 1. Open modal
      act(() => {
        result.current.Modal.openModal(ModalID.SEARCH, mockOnClose);
      });

      // 2. Close modal (transition from OPEN to CLOSE)
      act(() => {
        uiStore.setState((state) => {
          state.Modal.modalOpenState = ModalOpenState.CLOSE;
        });
      });

      // Verify callback was called
      expect(mockOnClose).toHaveBeenCalled();
    });

    it('should handle transition to CLOSE when onModalClose is not provided', () => {
      act(() => {
        uiStore.setState((state) => {
          state.Modal.modalOpenState = ModalOpenState.CLOSE;
          state.Modal.modalID = ModalID.NONE;
          state.Modal.modalData = undefined;
        });
      });

      render(<ModalProvider>App</ModalProvider>);

      // 1. Open modal without callback
      act(() => {
        uiStore.setState((state) => {
          state.Modal.modalOpenState = ModalOpenState.OPEN;
          state.Modal.modalID = ModalID.SEARCH;
          state.Modal.modalData = undefined;
        });
      });

      // 2. Close modal
      act(() => {
        uiStore.setState((state) => {
          state.Modal.modalOpenState = ModalOpenState.CLOSE;
        });
      });

      // Should not throw
      expect(screen.getByText('App')).toBeDefined();
    });
  });
});
