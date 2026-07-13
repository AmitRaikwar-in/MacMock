import { LaunchpadProgramsList, appCategoryMap, categories } from './constants';
import { Box, SimpleGrid, Img, Text, Center, Divider } from '@chakra-ui/react';
import { useShallow } from '@settingsStore';
import {
  WindowSize,
  activeAppActionsSelector,
  activeAppSelector,
  processStore,
  ProgramType,
} from '@processStore';
import { useState, useEffect, useContext } from 'react';
import { LaunchpadContext } from '../../Mac';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.015,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 25,
    },
  },
};

const Launchpad = () => {
  const { setLaunchpad } = useContext(LaunchpadContext);
  const [activeCategory, setActiveCategory] = useState('All');

  const { getActiveApp, addApp, setWindowSize } = processStore(
    useShallow((state) => ({
      getActiveApp: activeAppSelector(state),
      ...activeAppActionsSelector(state),
    })),
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLaunchpad(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [setLaunchpad]);

  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setLaunchpad(false);
    }
  };

  const handleAppClick = (programType: ProgramType) => {
    const currentApp = getActiveApp(programType);
    if (!currentApp) {
      setTimeout(() => {
        addApp(programType);
      }, 300);
    } else {
      setWindowSize(programType, WindowSize.DEFAULT);
    }
    setLaunchpad(false);
  };

  const programs = Object.values(LaunchpadProgramsList).filter(
    (program) => program.name && program.icon,
  );

  const filteredPrograms = programs.filter((program) => {
    if (activeCategory === 'All') return true;
    const category = appCategoryMap[program.programType] || 'Utilities';
    return category === activeCategory;
  });

  return (
    <Box
      aria-label="launchpad"
      position="fixed"
      inset={0}
      zIndex={1100}
      onClick={handleBackgroundClick}
      display="flex"
      alignItems="center"
      justifyContent="center"
      as={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 } as any}
    >

      {/* Centered Applications Window */}
      <Box
        onClick={(e) => e.stopPropagation()}
        position="relative"
        width={{ base: '92vw', md: '720px' }}
        height={{ base: '80vh', md: '540px' }}
        maxHeight="90vh"
        bg="rgba(24, 24, 24, 0.72)"
        backdropFilter="blur(20px)"
        border="1px solid rgba(255, 255, 255, 0.15)"
        borderRadius="20px"
        boxShadow="0 25px 50px -12px rgba(0, 0, 0, 0.6), inset 0 1px 0px rgba(255, 255, 255, 0.15)"
        display="flex"
        flexDirection="column"
        overflow="hidden"
        as={motion.div}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 } as any}
      >
        {/* Title Bar */}
        <Box
          height="52px"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          px={6}
          flexShrink={0}
          userSelect="none"
        >
          <Box display="flex" alignItems="center">
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              boxSize="26px"
              bg="rgba(255, 255, 255, 0.12)"
              borderRadius="full"
              mr={3}
              border="1px solid rgba(255, 255, 255, 0.1)"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ color: '#fff', opacity: 0.9 }}
              >
                <line x1="6" y1="20" x2="18" y2="4" />
                <line x1="18" y1="20" x2="12" y2="4" />
                <line x1="9" y1="14" x2="15" y2="14" />
              </svg>
            </Box>
            <Text
              color="white"
              fontSize="14px"
              fontWeight="600"
              letterSpacing="-0.1px"
            >
              Applications
            </Text>
          </Box>

          <Box
            aria-label="more-options"
            as="button"
            display="flex"
            alignItems="center"
            justifyContent="center"
            boxSize="26px"
            borderRadius="full"
            bg="rgba(255, 255, 255, 0.08)"
            border="1px solid rgba(255, 255, 255, 0.05)"
            color="white"
            cursor="pointer"
            _hover={{ bg: 'rgba(255, 255, 255, 0.15)' }}
            _active={{ bg: 'rgba(255, 255, 255, 0.05)' }}
            transition="background-color 0.2s"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="1.5" fill="currentColor" />
              <circle cx="18" cy="12" r="1.5" fill="currentColor" />
              <circle cx="6" cy="12" r="1.5" fill="currentColor" />
            </svg>
          </Box>
        </Box>

        {/* Category Tabs */}
        <Box
          display="flex"
          alignItems="center"
          overflowX="auto"
          px={6}
          pb={4}
          flexShrink={0}
          css={{
            '&::-webkit-scrollbar': { display: 'none' },
            msOverflowStyle: 'none',
            scrollbarWidth: 'none',
          }}
        >
          {categories.map((category) => {
            const isSelected = activeCategory === category;
            return (
              <Box
                key={category}
                as="button"
                onClick={() => setActiveCategory(category)}
                px="12px"
                py="5px"
                borderRadius="full"
                bg={
                  isSelected
                    ? 'rgba(255, 255, 255, 0.15)'
                    : 'rgba(255, 255, 255, 0.05)'
                }
                border="1px solid"
                borderColor={
                  isSelected
                    ? 'rgba(255, 255, 255, 0.22)'
                    : 'rgba(255, 255, 255, 0.08)'
                }
                color={isSelected ? 'white' : 'whiteAlpha.800'}
                fontSize="12px"
                fontWeight="500"
                mr="8px"
                flexShrink={0}
                cursor="pointer"
                transition="all 0.2s"
                _hover={{
                  bg: isSelected
                    ? 'rgba(255, 255, 255, 0.18)'
                    : 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                }}
                _active={{
                  transform: 'scale(0.97)',
                }}
              >
                {category}
              </Box>
            );
          })}
        </Box>

        <Divider borderColor="rgba(255, 255, 255, 0.08)" px={6} />

        {/* App Grid Container */}
        <Box
          flex={1}
          overflowY="auto"
          px={6}
          pt={5}
          pb={8}
          css={{
            '&::-webkit-scrollbar': { display: 'none' },
            msOverflowStyle: 'none',
            scrollbarWidth: 'none',
          }}
        >
          {filteredPrograms.length === 0 ? (
            <Center height="100%">
              <Text color="whiteAlpha.600" fontSize="14px">
                No Applications Found
              </Text>
            </Center>
          ) : (
            <SimpleGrid
              as={motion.div}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              columns={{ base: 4, sm: 5, md: 7 }}
              spacingY={6}
              spacingX={4}
              width="100%"
            >
              {filteredPrograms.map((program) => (
                <Box
                  key={program.programType}
                  as={motion.div}
                  variants={itemVariants}
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  role="button"
                  tabIndex={0}
                  aria-label={`program-button-${program.name}`}
                  onClick={() => handleAppClick(program.programType)}
                  _hover={{ cursor: 'pointer' }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  width="100%"
                  textAlign="center"
                >
                  <Box
                    position="relative"
                    boxSize="52px"
                    mb={2.5}
                    borderRadius="12px"
                    bg="rgba(255, 255, 255, 0.05)"
                    border="1px solid rgba(255, 255, 255, 0.08)"
                    boxShadow="inset 0 1px 1px rgba(255,255,255,0.1), 0 4px 6px -1px rgba(0,0,0,0.15)"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    p="6px"
                    transition="all 0.2s"
                    _active={{
                      filter: 'brightness(0.7)',
                    }}
                  >
                    <Img
                      src={program.icon}
                      alt={program.name}
                      boxSize="100%"
                      objectFit="contain"
                      draggable="false"
                    />
                  </Box>
                  <Text
                    color="whiteAlpha.900"
                    fontSize="11px"
                    fontWeight={500}
                    width="100%"
                    px={1}
                    noOfLines={1}
                  >
                    {program.name}
                  </Text>
                </Box>
              ))}
            </SimpleGrid>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Launchpad;
