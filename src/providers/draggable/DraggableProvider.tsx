import Draggable from 'react-draggable';
import { useWindowDimensions } from '@hooks';
import { DraggableProps } from './types';

const DraggableProvider = ({
  children,
  position,
  maximized,
  onPositionChange,
  onStart,
}: DraggableProps) => {
  const { width, height } = useWindowDimensions();

  const draggableProps = {
    handle: '.handle',
    bounds: { left: 0, top: 0, right: width, bottom: height },
    positionOffset: { x: 0, y: 28 },
    defaultPosition: maximized ? position : { x: 0, y: 0 },
    position: !maximized ? position : { x: 0, y: 0 },
    grid: [3, 3] as [number, number],
    scale: 1,
    ...(maximized
      ? {}
      : {
          onStart: onStart ? () => onStart() : undefined,
          onStop: (_e: any, data: any) => {
            const { x, y } = data;
            onPositionChange({ x, y });
          },
        }),
  } as React.ComponentProps<typeof Draggable>;

  return <Draggable {...draggableProps}>{children}</Draggable>;
};

export default DraggableProvider;
