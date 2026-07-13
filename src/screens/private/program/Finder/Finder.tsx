import { appStore, finderSelector, useShallow } from '@appStore';
import { Box, Input, Text, Heading } from '@chakra-ui/react';

const Finder = () => {
  const { currentPath, setCurrentPath } = appStore(useShallow(finderSelector));

  return (
    <Box p={6} color="white" bg="gray.800" h="100%">
      <Heading size="md" mb={4}>Finder</Heading>
      <Box mb={4}>
        <Text mb={2}>Current Directory:</Text>
        <Input
          aria-label="current-directory-input"
          value={currentPath}
          onChange={(e) => setCurrentPath(e.target.value)}
          bg="gray.700"
          borderColor="gray.600"
          _hover={{ borderColor: 'gray.500' }}
        />
      </Box>
    </Box>
  );
};

export default Finder;
