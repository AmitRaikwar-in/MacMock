import { useTranslation } from 'react-i18next';
import { SearchIcon } from '@assets';
import { Box, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { fuse } from '@providers';
import { settingsStore, darkModeColorSelector } from '@settingsStore';
import { useShallow } from 'zustand/react/shallow';

const SearchModal = () => {
  const { t } = useTranslation();
  const [searchText, setSearchText] = useState<string>('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const { bottomBarBgColor } = settingsStore(useShallow(darkModeColorSelector));

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchText.length > 0) {
        const searchResults = fuse.search(searchText);
        setSearchResults(searchResults);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchText]);

  return (
    <Box
      width={'100%'}
      height={'100%'}
      bgColor={bottomBarBgColor}
      style={{ backdropFilter: 'blur(6px)' }}
      borderRadius={15}
      dropShadow={'md'}
      aria-label="search-modal"
    >
      <InputGroup>
        <InputLeftElement
          display={'flex'}
          alignItems={'center'}
          justifyContent={'center'}
          h={'100%'}
          pointerEvents="none"
        >
          <SearchIcon color="gray" width={'1.5em'} height={'1.5em'} />
        </InputLeftElement>
        <Input
          aria-label="search-input"
          width={'100%'}
          borderRadius={15}
          height={12}
          type="text"
          borderBottom={1}
          borderBottomColor={'black'}
          borderColor={'black'}
          _hover={{ borderColor: 'black' }}
          _focus={{ borderColor: 'black' }}
          _placeholder={{ color: 'gray' }}
          placeholder={t('SearchModal.searchPlaceholder')}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </InputGroup>
      {searchResults && (
        <Box aria-label="search-result">
          {searchResults.map((result) => (
            <Box key={result.item.title}>{result.item.title}</Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default SearchModal;
