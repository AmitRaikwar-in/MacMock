import { render, screen, fireEvent } from '@testing-library/react';
import DraggableProvider from '../DraggableProvider';
import { Box } from '@chakra-ui/react';
import React from 'react';

// Mock hooks
jest.mock('@hooks', () => ({
  useWindowDimensions: () => ({ width: 1024, height: 768 }),
}));

describe('Draggable provider', () => {
  const mockOnPositionChange = jest.fn();

  beforeEach(() => {
    mockOnPositionChange.mockClear();
    jest.resetModules();
  });

  it('should render correctly to match snapshot', () => {
    const { container } = render(
      <DraggableProvider
        maximized={false}
        position={{ x: 0, y: 0 }}
        onPositionChange={mockOnPositionChange}
      >
        <Box>test</Box>
      </DraggableProvider>,
    );

    expect(container).toMatchSnapshot();
  });

  it('should render correctly with custom position', () => {
    const { container } = render(
      <DraggableProvider
        maximized={false}
        position={{ x: 10, y: 10 }}
        onPositionChange={mockOnPositionChange}
      >
        <Box>test</Box>
      </DraggableProvider>,
    );

    expect(container).toMatchSnapshot();
  });

  it('should render correctly with custom position for maximized', () => {
    const { container } = render(
      <DraggableProvider
        maximized
        position={{ x: 10, y: 10 }}
        onPositionChange={mockOnPositionChange}
      >
        <Box>test</Box>
      </DraggableProvider>,
    );

    expect(container).toMatchSnapshot();
  });

  it('should call onPositionChange when dragging stops', () => {
    // Use jest.doMock for local mocking
    jest.doMock('react-draggable', () => {
      const MockDraggable = (props: any) => {
        return (
          <div
            id="draggable-mock"
            onClick={() => props.onStop({}, { x: 150, y: 250 })}
          >
            {props.children}
          </div>
        );
      };
      MockDraggable.displayName = 'MockDraggable';
      return MockDraggable;
    });

    // Re-import after mocking
    const DraggableProviderMocked = require('../DraggableProvider').default;

    render(
      <DraggableProviderMocked
        maximized={false}
        position={{ x: 0, y: 0 }}
        onPositionChange={mockOnPositionChange}
      >
        <Box>test</Box>
      </DraggableProviderMocked>,
    );

    fireEvent.click(screen.getByText('test'));
    expect(mockOnPositionChange).toHaveBeenCalledWith({ x: 150, y: 250 });
  });

  it('should pass correct bounds based on window dimensions', () => {
    let capturedProps: any;
    jest.doMock('react-draggable', () => {
      const MockDraggableProps = (props: any) => {
        capturedProps = props;
        return <div>{props.children}</div>;
      };
      MockDraggableProps.displayName = 'MockDraggableProps';
      return MockDraggableProps;
    });

    const DraggableProviderMocked = require('../DraggableProvider').default;

    render(
      <DraggableProviderMocked
        maximized={false}
        position={{ x: 0, y: 0 }}
        onPositionChange={mockOnPositionChange}
      >
        <Box>test</Box>
      </DraggableProviderMocked>,
    );

    expect(capturedProps.bounds).toEqual({
      left: 0,
      top: 0,
      right: 1024,
      bottom: 768,
    });
  });
});
