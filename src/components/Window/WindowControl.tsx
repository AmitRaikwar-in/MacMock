import { Box, useBoolean } from '@chakra-ui/react';
import {
  ProgramType,
  WindowSize,
  activeAppActionsSelector,
  processStore,
  useShallow,
} from '@processStore';

const WindowControl = ({
  app,
  onMaximizeClick,
}: {
  app: ProgramType;
  onMaximizeClick: () => void;
}) => {
  const [isHovered, setIsHovered] = useBoolean(false);
  
  const { removeApp, setWindowSize } = processStore(
    useShallow(activeAppActionsSelector),
  );
  
  const activeAppRunning = processStore((state) => state.ActiveApp.activeApp);
  const isActive = activeAppRunning === app;

  const onClose = () => {
    setTimeout(() => {
      removeApp(app);
    }, 300);
  };

  const onMinimize = () => {
    setWindowSize(app, WindowSize.HIDE);
  };

  // macOS Traffic Light styling
  // Active Colors
  const redBg = '#FF5F56';
  const redBorder = '#E0443E';
  const yellowBg = '#FFBD2E';
  const yellowBorder = '#DEA123';
  const greenBg = '#27C93F';
  const greenBorder = '#1AAB29';

  // Inactive Colors (macOS Dark mode style since the design is dark-themed)
  const inactiveBg = '#4C4C4C';
  const inactiveBorder = '#3A3A3A';

  // Icon Stroke Colors (only visible on hover)
  const redStroke = '#4C0002';
  const yellowStroke = '#5C3E00';
  const greenStroke = '#004D05';

  return (
    <Box
      display="flex"
      alignItems="center"
      gap="8px"
      onMouseEnter={setIsHovered.on}
      onMouseLeave={setIsHovered.off}
      data-testid="traffic-lights"
    >
      {/* Close Button */}
      <Box
        aria-label="close"
        width="12px"
        height="12px"
        borderRadius="full"
        bg={isHovered || isActive ? redBg : inactiveBg}
        border="0.5px solid"
        borderColor={isHovered || isActive ? redBorder : inactiveBorder}
        onClick={onClose}
        display="flex"
        alignItems="center"
        justifyContent="center"
        cursor="pointer"
        transition="all 0.1s ease"
      >
        <svg
          width="6"
          height="6"
          viewBox="0 0 6 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            opacity: isHovered ? 1 : 0,
            transition: 'opacity 0.15s ease',
          }}
        >
          <path
            d="M1.2 1.2L4.8 4.8M4.8 1.2L1.2 4.8"
            stroke={redStroke}
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </svg>
      </Box>

      {/* Minimize Button */}
      <Box
        aria-label="minimize"
        width="12px"
        height="12px"
        borderRadius="full"
        bg={isHovered || isActive ? yellowBg : inactiveBg}
        border="0.5px solid"
        borderColor={isHovered || isActive ? yellowBorder : inactiveBorder}
        onClick={onMinimize}
        display="flex"
        alignItems="center"
        justifyContent="center"
        cursor="pointer"
        transition="all 0.1s ease"
      >
        <svg
          width="6"
          height="6"
          viewBox="0 0 6 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            opacity: isHovered ? 1 : 0,
            transition: 'opacity 0.15s ease',
          }}
        >
          <path
            d="M1 3H5"
            stroke={yellowStroke}
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </svg>
      </Box>

      {/* Maximize Button */}
      <Box
        aria-label="maximize"
        width="12px"
        height="12px"
        borderRadius="full"
        bg={isHovered || isActive ? greenBg : inactiveBg}
        border="0.5px solid"
        borderColor={isHovered || isActive ? greenBorder : inactiveBorder}
        onClick={onMaximizeClick}
        display="flex"
        alignItems="center"
        justifyContent="center"
        cursor="pointer"
        transition="all 0.1s ease"
      >
        <svg
          width="6"
          height="6"
          viewBox="0 0 6 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            opacity: isHovered ? 1 : 0,
            transition: 'opacity 0.15s ease',
          }}
        >
          <path
            d="M1.2 4.8L4.8 1.2M1.2 4.8H3.8M1.2 4.8V2.2M4.8 1.2L1.2 4.8M4.8 1.2H2.2M4.8 1.2V3.8"
            stroke={greenStroke}
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Box>
    </Box>
  );
};

export default WindowControl;
