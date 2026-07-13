import { Box, Text } from '@chakra-ui/react';
import { Note } from '@appStore';
import {
  darkModeColorSelector,
  settingsStore,
  useShallow,
} from '@settingsStore';

// ─── Props ───────────────────────────────────────────────────────────────────

interface NoteCardProps {
  note: Note;
  isSelected: boolean;
  onClick: () => void;
}

// ─── Component ───────────────────────────────────────────────────────────────

const NoteCard = ({ note, isSelected, onClick }: NoteCardProps) => {
  const { textColor } = settingsStore(useShallow(darkModeColorSelector));
  const isDark = settingsStore((state) => state.Display.darkMode);

  const title = note.title || 'New Note';
  const preview = note.description || '';

  // Custom format: 3/6/25
  const dateObj = new Date(note.updatedAt || note.date);
  const formattedDate = `${dateObj.getMonth() + 1}/${dateObj.getDate()}/${dateObj.getFullYear().toString().slice(-2)}`;

  const selectionBg = isDark ? 'rgba(255,255,255,0.15)' : '#e5e5e5';
  const hoverBg = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.04)';

  return (
    <Box
      role="button"
      tabIndex={0}
      aria-label={`note-card-${note.id}`}
      onClick={onClick}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
      px={3}
      py={2}
      cursor="pointer"
      position="relative"
      borderRadius="10px"
      bg={isSelected ? selectionBg : 'transparent'}
      transition="background 0.15s ease"
      _hover={{
        bg: isSelected ? selectionBg : hoverBg,
      }}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
    >
      <Box flex={1} overflow="hidden">
        <Text
          fontSize="14px"
          fontWeight={600}
          color={textColor}
          noOfLines={1}
          lineHeight="1.2"
          css={{
            // Use system font to ensure true bold looks right
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif',
          }}
        >
          {title}
        </Text>

        <Box display="flex" gap={2} mt="4px" alignItems="center">
          <Text
            fontSize="12px"
            color={textColor}
            whiteSpace="nowrap"
            flexShrink={0}
          >
            {formattedDate}
          </Text>
          {preview && (
            <Text
              fontSize="12px"
              color={isDark ? 'rgba(255,255,255,0.5)' : '#8e8e93'}
              noOfLines={1}
            >
              {preview}
            </Text>
          )}
        </Box>

        <Box display="flex" alignItems="center" mt="4px" gap={1}>
          {/* Folder Icon */}
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke={isDark ? 'rgba(255,255,255,0.5)' : '#8e8e93'}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
          </svg>
        </Box>
      </Box>
    </Box>
  );
};

export default NoteCard;
