import { appStore, terminalSelector, useShallow } from '@appStore';
import { Box, Input, Text } from '@chakra-ui/react';
import { useState } from 'react';

const Terminal = () => {
  const { history, addHistory } = appStore(useShallow(terminalSelector));
  const [inputVal, setInputVal] = useState('');

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const trimmedVal = inputVal.trim();
      addHistory(`$ ${trimmedVal}`);
      
      const cmd = trimmedVal.toLowerCase();
      if (cmd === 'help') {
        addHistory('Available commands: help, date, whoami');
      } else if (cmd === 'date') {
        addHistory(new Date().toString());
      } else if (cmd === 'whoami') {
        addHistory('mr.robot');
      } else if (cmd) {
        addHistory(`bash: command not found: ${trimmedVal}`);
      }
      setInputVal('');
    }
  };

  return (
    <Box p={4} bg="black" color="green.300" fontFamily="monospace" h="100%" display="flex" flexDirection="column">
      <Box flex={1} overflowY="auto" mb={2}>
        {history.map((line, idx) => (
          <Text key={idx}>{line}</Text>
        ))}
      </Box>
      <Box display="flex" alignItems="center">
        <Text mr={2}>$</Text>
        <Input
          aria-label="terminal-input"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={handleKeyDown}
          variant="unstyled"
          color="green.300"
          fontFamily="monospace"
        />
      </Box>
    </Box>
  );
};

export default Terminal;
