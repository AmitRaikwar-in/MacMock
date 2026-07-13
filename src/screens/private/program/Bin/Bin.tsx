import { appStore, binSelector, useShallow } from '@appStore';
import { Box, Button, Text, Heading, List, ListItem } from '@chakra-ui/react';

const Bin = () => {
  const { items, emptyBin } = appStore(useShallow(binSelector));

  return (
    <Box p={6} color="white" bg="gray.900" h="100%" display="flex" flexDirection="column">
      <Heading size="md" mb={4}>Trash Bin</Heading>
      <Box flex={1} overflowY="auto" mb={4}>
        {items.length === 0 ? (
          <Text color="gray.500">Trash is empty</Text>
        ) : (
          <List spacing={2}>
            {items.map((item, idx) => (
              <ListItem key={idx} bg="gray.800" p={2} borderRadius="md">
                {item}
              </ListItem>
            ))}
          </List>
        )}
      </Box>
      <Button colorScheme="red" onClick={emptyBin} isDisabled={items.length === 0}>
        Empty Trash
      </Button>
    </Box>
  );
};

export default Bin;
