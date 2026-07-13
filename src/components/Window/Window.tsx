import { DraggableProvider } from '@providers';
import { WindowProps } from './types';
import { Box } from '@chakra-ui/react';
import { ResizableBox, ResizeCallbackData } from 'react-resizable';
import { useWindowDimensions } from '@hooks';
import React, { useState, useEffect } from 'react';
import './css/window.css';
import {
  darkModeColorSelector,
  settingsStore,
  useShallow,
} from '@settingsStore';
import {
  WindowSize,
  activeAppActionsSelector,
  activeAppSelector,
  processStore,
} from '@processStore';
import WindowCloseControl from './WindowControl';

const Window = ({ children, topBar, app }: WindowProps) => {
  const { windowTabBgColor } = settingsStore(useShallow(darkModeColorSelector));
  const currentApp = processStore(useShallow(activeAppSelector))(app);
  const { setWindowSize, updatePosition, bringToFront } = processStore(
    useShallow(activeAppActionsSelector),
  );

  const [componentDimension, setComponentDimension] = useState({
    width: 700,
    height: 500,
  });
  const { width, height } = useWindowDimensions();

  const onResize = (e: React.SyntheticEvent, { size }: ResizeCallbackData) => {
    const { width, height } = size;
    setComponentDimension({ width, height });
  };

  const maximized = currentApp?.size === WindowSize.MAX ? true : false;
  const [prevMaximized, setPrevMaximized] = useState(maximized);
  const [isTransitioning, setIsTransitioning] = useState(false);

  if (maximized !== prevMaximized) {
    setPrevMaximized(maximized);
    setIsTransitioning(true);
  }

  useEffect(() => {
    if (isTransitioning) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  const onMaximizeClick = () => {
    const newSize = maximized ? WindowSize.DEFAULT : WindowSize.MAX;
    setWindowSize(app, newSize);
  };

  const onPositionChange = (position: { x: number; y: number }) => {
    updatePosition(app, position);
  };

  const handleBringToFront = () => {
    bringToFront(app);
  };

  const [isOpening, setIsOpening] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpening(false);
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  const isMinimized = currentApp?.size === WindowSize.HIDE;

  // Bottom Center of the screen (mimicking Dock location)
  const targetX = width / 2 - 400;
  const targetY = height - 30;

  // Translation needed to move the window's center to the dock
  const translateX = targetX;
  const translateY = targetY;

  const shouldCollapse = isMinimized || isOpening;

  const minimizeStyle: React.CSSProperties = shouldCollapse
    ? {
        transform: `translate(${translateX}px, ${translateY}px) scale(0.01)`,
        opacity: 0,
        pointerEvents: 'none',
        visibility: 'hidden',
        zIndex: 0,
        transition:
          'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.4s ease-in-out, visibility 0.4s',
      }
    : {
        transform: 'translate(0px, 0px) scale(1)',
        opacity: 1,
        pointerEvents: 'auto',
        visibility: 'visible',
        transition:
          'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.2s ease-in-out, visibility 0s',
      };

  return (
    // Outer div uses the window's stored zIndex so it stacks correctly over siblings
    <div
      style={{
        position: 'absolute',
        zIndex: currentApp?.zIndex ?? 1,
        left: 0,
        top: 0,
        ...minimizeStyle,
      }}
      onMouseDown={handleBringToFront}
    >
      <DraggableProvider
        maximized={maximized}
        position={currentApp?.position ?? { x: 0, y: 0 }}
        onPositionChange={onPositionChange}
        onStart={handleBringToFront}
      >
        <ResizableBox
          width={maximized ? width : componentDimension.width}
          height={maximized ? height : componentDimension.height}
          onResize={onResize}
          lockAspectRatio={true}
          maxConstraints={[width * 0.99, height * 0.99]}
          // Below line decides whether window is resizable or not.
          resizeHandles={maximized ? [] : ['se']}
          handleSize={[10, 10]}
          minConstraints={[700, 500]}
          style={
            maximized || isTransitioning
              ? { transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)' }
              : { transition: 'all 0s' }
          }
        >
          <Box
            width={'100%'}
            height={'100%'}
            justifyContent={'flex-start'}
            alignItems={'flex-start'}
            flex={1}
            borderRadius={'6px'}
          >
            <Box
              // Below line decides whether window is movable or not.
              {...(!maximized ? { className: 'handle' } : {})}
              width={'100%'}
              height={6}
              display={'flex'}
              justifyContent={'flex-start'}
              alignItems={'center'}
              border={'0.5px solid #666'}
              bg={windowTabBgColor}
              onDoubleClick={onMaximizeClick}
              borderTopRadius={10}
              px={3}
              gap={2}
              transition={'all 0.3s ease-in-out'}
            >
              <WindowCloseControl app={app} onMaximizeClick={onMaximizeClick} />
              <Box width="100%" height={6}>
                {topBar}
              </Box>
            </Box>
            <Box
              width={'100%'}
              height={'100%'}
              bg={'#1f1f1f'}
              borderBottomRadius={6}
              border={'1px solid #000'}
            >
              {children}
            </Box>
          </Box>
        </ResizableBox>
      </DraggableProvider>
    </div>
  );
};

export default React.memo(Window, (prevProps, nextProps) => {
  return prevProps.children === nextProps.children;
});
