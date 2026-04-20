import { Box, Text } from '@chakra-ui/react';
import { Note } from '@appStore';
import NoteCard from './NoteCard';
import moment from 'moment';
import {
  darkModeColorSelector,
  settingsStore,
  useShallow,
} from '@settingsStore';

// ─── Props ───────────────────────────────────────────────────────────────────

interface NoteListProps {
  notesList: Note[];
  selectedId: string;
  searchQuery: string;
  onSelect: (id: string) => void;
}

// ─── Component ───────────────────────────────────────────────────────────────

const NoteList = ({
  notesList,
  selectedId,
  searchQuery,
  onSelect,
}: NoteListProps) => {
  const { mainColor, textColor } = settingsStore(
    useShallow(darkModeColorSelector),
  );
  const isDark = settingsStore((state) => state.Display.darkMode);

  const filtered = searchQuery.trim()
    ? notesList.filter(
        (n) =>
          n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          n.description.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : notesList;

  // Split pinned and others
  const pinnedNotes = filtered
    .filter((n) => n.pinned)
    .sort(
      (a, b) =>
        new Date(b.updatedAt || b.date).getTime() -
        new Date(a.updatedAt || a.date).getTime(),
    );

  const otherNotes = filtered
    .filter((n) => !n.pinned)
    .sort(
      (a, b) =>
        new Date(b.updatedAt || b.date).getTime() -
        new Date(a.updatedAt || a.date).getTime(),
    );

  // Group other notes by month
  const groupedNotes: Record<string, Note[]> = {};
  otherNotes.forEach((note) => {
    const month = moment(note.updatedAt || note.date).format('MMMM');
    if (!groupedNotes[month]) {
      groupedNotes[month] = [];
    }
    groupedNotes[month].push(note);
  });

  const SectionHeader = ({ children }: { children: React.ReactNode }) => (
    <Text
      fontSize="14px"
      fontWeight="700"
      color={textColor}
      px={4}
      pt={2}
      pb={2}
    >
      {children}
    </Text>
  );

  return (
    <Box
      width="260px"
      minW="260px"
      height="100%"
      bg={mainColor}
      borderRight={`1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`}
      display="flex"
      flexDirection="column"
      overflow="hidden"
    >
      {/* Note list */}
      <Box flex={1} overflowY="auto" css={{ scrollbarWidth: 'none' }} pb={4}>
        {filtered.length === 0 && (
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            height="100%"
            opacity={0.6}
            gap={2}
            py={10}
          >
            <Text fontSize="32px">🗒️</Text>
            <Text
              fontSize="13px"
              color={isDark ? 'rgba(255,255,255,0.5)' : '#8e8e93'}
            >
              {searchQuery ? 'No results' : 'No notes yet'}
            </Text>
          </Box>
        )}

        {/* Pinned Section */}
        {pinnedNotes.length > 0 && (
          <Box mt={2}>
            <SectionHeader>Pinned</SectionHeader>
            {pinnedNotes.map((note) => (
              <Box key={note.id} px={3} py={0.5}>
                <NoteCard
                  note={note}
                  isSelected={selectedId === note.id}
                  onClick={() => onSelect(note.id)}
                />
              </Box>
            ))}
          </Box>
        )}

        {/* Other Sections (Monthly) */}
        {Object.entries(groupedNotes).map(([month, notesInMonth]) => (
          <Box key={month} mt={pinnedNotes.length > 0 ? 4 : 2}>
            <SectionHeader>{month}</SectionHeader>
            {notesInMonth.map((note) => (
              <Box key={note.id} px={3} py={0.5}>
                <NoteCard
                  note={note}
                  isSelected={selectedId === note.id}
                  onClick={() => onSelect(note.id)}
                />
              </Box>
            ))}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default NoteList;
