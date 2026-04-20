import { Box } from '@chakra-ui/react';
import { appStore, notesSelector, useShallow } from '@appStore';
import { useCallback, useEffect, useState } from 'react';
import { Note } from '@appStore';
import { darkModeColorSelector, settingsStore } from '@settingsStore';
import { generateNoteId } from './utils';
import { NotesProps } from './type';
import { motion, AnimatePresence } from 'framer-motion';

import NoteToolbar from './component/NoteToolbar';
import NoteList from './component/NoteList';
import NoteEditor from './component/NoteEditor';

// ─── Component ───────────────────────────────────────────────────────────────

const Notes = (_props: NotesProps) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  const { notes, notesList, addNote, deleteNote, editNote, pinNote } = appStore(
    useShallow(notesSelector),
  );
  const { mainColor } = settingsStore(useShallow(darkModeColorSelector));

  const selectedNote = selectedId ? notes[selectedId] : undefined;

  // Auto-select first note on initial load if none selected
  useEffect(() => {
    if (!selectedId && notesList.length > 0) {
      setSelectedId(notesList[0].id);
    }
  }, [notesList, selectedId]);

  // ─── Handlers ──────────────────────────────────────────────────────────────

  const handleNewNote = useCallback(() => {
    const id = generateNoteId();
    const now = new Date().toISOString();
    const newNote: Note = {
      id,
      title: 'New Note',
      description: '',
      date: now,
      updatedAt: now,
      content: '<div>New Note</div><div></div>',
      pinned: false,
    };
    addNote(newNote);
    setSelectedId(id);
  }, [addNote]);

  const handleDelete = useCallback(() => {
    if (!selectedId) return;
    deleteNote(selectedId);
    // Select the next available note
    const remaining = notesList.filter((n) => n.id !== selectedId);
    setSelectedId(remaining.length > 0 ? remaining[0].id : null);
  }, [deleteNote, notesList, selectedId]);

  const handlePin = useCallback(() => {
    if (!selectedId) return;
    pinNote(selectedId);
  }, [pinNote, selectedId]);

  const handleUpdate = useCallback(
    (updatedNote: Note) => {
      editNote(updatedNote);
    },
    [editNote],
  );

  const toggleSidebar = useCallback(() => {
    setIsSidebarVisible((prev) => !prev);
  }, []);

  // Keyboard shortcut: ⌘N for new note
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'n') {
        e.preventDefault();
        handleNewNote();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handleNewNote]);

  // ─── Render ────────────────────────────────────────────────────────────────

  return (
    <Box
      width="100%"
      height="100%"
      display="flex"
      flexDirection="column"
      bg={mainColor}
      aria-label="notes-app"
      overflow="hidden"
    >
      {/* Top toolbar */}
      <NoteToolbar
        hasSelection={!!selectedId}
        isPinned={!!selectedNote?.pinned}
        onNew={handleNewNote}
        onDelete={handleDelete}
        onPin={handlePin}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onToggleSidebar={toggleSidebar}
        notesCount={notesList.length}
      />

      {/* Body: sidebar + editor */}
      <Box flex={1} display="flex" flexDirection="row" overflow="hidden">
        <AnimatePresence initial={false}>
          {isSidebarVisible && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 260, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              style={{ overflow: 'hidden', height: '100%' }}
            >
              <NoteList
                notesList={notesList}
                selectedId={selectedId ?? ''}
                searchQuery={searchQuery}
                onSelect={setSelectedId}
              />
            </motion.div>
          )}
        </AnimatePresence>
        <Box flex={1} height="100%">
          <NoteEditor note={selectedNote} onUpdate={handleUpdate} />
        </Box>
      </Box>
    </Box>
  );
};

export default Notes;
