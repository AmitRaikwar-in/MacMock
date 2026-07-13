export type Note = {
  id: string;
  title: string;
  description: string; // preview snippet (backward compat)
  date: string; // creation date
  updatedAt: string; // last modification ISO string
  content: string; // HTML content of the editor
  pinned: boolean;
};

export type NotesState = {
  notes: Record<string, Note>;
};

export interface NotesAppAction {
  addNote: (note: Note) => void;
  deleteNote: (id: string) => void;
  editNote: (note: Note) => void;
  pinNote: (id: string) => void;
}

export type NotesStateSlice = NotesState & NotesAppAction;
