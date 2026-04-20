import { AppStoreSlice } from '../../appStore';
import { NotesState, NotesStateSlice } from './types';

const defaultNotesState: NotesState = {
  notes: {
    'note-1': {
      id: 'note-1',
      title: 'Teaching Holistic Health 🧘‍♀️',
      description: 'Brainstorm for first in-class session',
      date: new Date('2025-02-20T10:00:00Z').toISOString(),
      updatedAt: new Date('2025-02-20T10:00:00Z').toISOString(),
      content: '', // Will be injected by the editor
      pinned: false,
    },
    'note-2': {
      id: 'note-2',
      title: '80/20 Project: Smart...',
      description: 'UX Testing: Notes fr',
      date: new Date('2025-03-06T10:00:00Z').toISOString(),
      updatedAt: new Date('2025-03-06T10:00:00Z').toISOString(),
      content:
        '<div>80/20 Project: Smart...</div><div>UX Testing: Notes fr</div>',
      pinned: false,
    },
    'note-3': {
      id: 'note-3',
      title: 'Customized Filtration',
      description: 'Our mission is to pr',
      date: new Date('2025-02-28T10:00:00Z').toISOString(),
      updatedAt: new Date('2025-02-28T10:00:00Z').toISOString(),
      content:
        '<div>Customized Filtration</div><div>Our mission is to pr</div>',
      pinned: false,
    },
    'note-4': {
      id: 'note-4',
      title: 'Kitchen decorating id...',
      description: 'Rug next to island',
      date: new Date('2025-02-24T10:00:00Z').toISOString(),
      updatedAt: new Date('2025-02-24T10:00:00Z').toISOString(),
      content:
        '<div>Kitchen decorating id...</div><div>Rug next to island</div>',
      pinned: false,
    },
    'note-5': {
      id: 'note-5',
      title: 'New Note',
      description: 'Handwritten note',
      date: new Date('2025-02-22T10:00:00Z').toISOString(),
      updatedAt: new Date('2025-02-22T10:00:00Z').toISOString(),
      content: '<div>New Note</div><div>Handwritten note</div>',
      pinned: false,
    },
    'note-6': {
      id: 'note-6',
      title: 'Frozen Treats from In...',
      description: 'Handwritten note',
      date: new Date('2025-02-17T10:00:00Z').toISOString(),
      updatedAt: new Date('2025-02-17T10:00:00Z').toISOString(),
      content: '<div>Frozen Treats from In...</div><div>Handwritten note</div>',
      pinned: false,
    },
  },
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
