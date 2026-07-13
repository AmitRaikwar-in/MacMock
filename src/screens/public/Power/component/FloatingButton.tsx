import { InfoIcon } from '@assets';
import {
  Box,
  CloseButton,
  IconButton,
  useDisclosure,
} from '@chakra-ui/react';
import SocialButtons from './SocialButtons';
import AboutProject from './AboutProject';

const FloatingButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <IconButton
        variant="outline"
        color="white"
        _hover={{
          bg: 'white',
          color: 'black',
        }}
        icon={<InfoIcon width={'1em'} height={'1em'} />}
        aria-label="landing-page-top-bar-button"
        onClick={onOpen}
        position={'absolute'}
        right={5}
        top={5}
      />

      {/* Backdrop Overlay */}
      {isOpen && (
        <Box
          position="fixed"
          top="0"
          left="0"
          right="0"
          bottom="0"
          bg="blackAlpha.300"
          zIndex={9999}
          onClick={onClose}
        />
      )}

      {/* Custom Sliding Sidebar Panel */}
      <Box
        position="fixed"
        top="0"
        right={isOpen ? "0" : "-360px"}
        visibility={isOpen ? "visible" : "hidden"}
        w="350px"
        h="100vh"
        bg="black"
        borderLeftWidth="1px"
        borderColor="white"
        zIndex={10000}
        transition="right 0.3s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.3s"
        p={4}
      >
        {isOpen && (
          <Box boxSize="100%" position="relative" color="white">
            <IconButton
              variant="outline"
              color="white"
              _hover={{
                bg: 'white',
                color: 'black',
              }}
              icon={<CloseButton width={'1em'} height={'1em'} />}
              aria-label="landing-page-top-bar-button"
              onClick={onClose}
              position={'absolute'}
              right={5}
              top={5}
            />
            <AboutProject />
            <SocialButtons />
          </Box>
        )}
      </Box>
    </>
  );
};

export default FloatingButton;
