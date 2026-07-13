import { AppStoreSlice } from '../../appStore';
import { NotesState, NotesStateSlice } from './types';

const defaultNotesState: NotesState = {
  notes: {},
};

const createNotesSlice: AppStoreSlice<NotesStateSlice> = (set) => ({
  ...defaultNotesState,
  addNote: (note) =>
    set((state) => {
      state.Notes.notes[note.id] = note;
    }),
  deleteNote: (id) =>
    set((state) => {
      delete state.Notes.notes[id];
    }),
  editNote: (newNote) =>
    set((state) => {
      state.Notes.notes[newNote.id] = newNote;
    }),
  pinNote: (id) =>
    set((state) => {
      if (state.Notes.notes[id]) {
        state.Notes.notes[id].pinned = !state.Notes.notes[id].pinned;
      }
    }),
});

export default createNotesSlice;
