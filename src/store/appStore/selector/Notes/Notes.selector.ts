import { AppStoreState } from '../../appStore';

const notesSelector = (state: AppStoreState) => {
  const notesList = Object.values(state.Notes.notes);

  // Pinned notes first, then both groups sorted by updatedAt desc
  const byDate = (
    a: { updatedAt?: string; date: string },
    b: { updatedAt?: string; date: string },
  ) =>
    new Date(b.updatedAt ?? b.date).getTime() -
    new Date(a.updatedAt ?? a.date).getTime();

  const pinned = notesList.filter((n) => n.pinned).sort(byDate);
  const unpinned = notesList.filter((n) => !n.pinned).sort(byDate);

  return {
    notes: state.Notes.notes,
    notesList: [...pinned, ...unpinned],
    getCurrentId: () => Object.keys(state.Notes.notes).length,
    selectedNote: (id: string) => state.Notes.notes[id],
    addNote: state.Notes.addNote,
    deleteNote: state.Notes.deleteNote,
    editNote: state.Notes.editNote,
    pinNote: state.Notes.pinNote,
  };
};

export { notesSelector };
