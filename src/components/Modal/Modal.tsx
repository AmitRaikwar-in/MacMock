import { Box } from '@chakra-ui/react';
import { ModalProps } from './types';
import { SearchModal } from './Modals';
import { ModalID } from '@uiStore';

const ModalToShow = ({ modalID }: { modalID: ModalID }) => {
  switch (modalID) {
    case ModalID.SEARCH:
      return <SearchModal />;
    default:
      return <></>;
  }
};

const ModalComponent = ({ isOpen, modalID, onModalClose }: ModalProps) => {
  if (!isOpen || modalID === 'none' || modalID === ('none' as any)) return null;

  return (
    <>
      {/* Custom Backdrop */}
      <Box
        position="fixed"
        top="0"
        left="0"
        right="0"
        bottom="0"
        zIndex={19999}
        onClick={onModalClose}
      />

      {/* Custom Modal Content Container */}
      <Box
        position="fixed"
        top="20%"
        left="50%"
        transform="translate(-50%, 0)"
        w="90vw"
        maxW="600px"
        zIndex={20000}
        borderRadius={15}
        boxShadow="2xl"
      >
        <ModalToShow modalID={modalID} />
      </Box>
    </>
  );
};

export default ModalComponent;
