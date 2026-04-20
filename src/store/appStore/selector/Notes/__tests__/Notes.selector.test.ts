import { renderHook } from '@testing-library/react-hooks';
import { appStore } from '../../../appStore';
import { notesSelector } from '../Notes.selector';
import { act } from '@testing-library/react';

describe('Notes selector', () => {
  const setupNotes = (count = 6) => {
    const { result } = renderHook(() => appStore(notesSelector));
    act(() => {
      for (let i = 1; i <= count; i++) {
        result.current.addNote({
          id: `note-${i}`,
          title: `Note ${i}`,
          description: `Description ${i}`,
          content: `<div>Note ${i}</div>`,
          date: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          pinned: false,
        });
      }
    });
    return result;
  };

  it('should return empty default notes state', () => {
    const { result } = renderHook(() => appStore(notesSelector));
    expect(Object.keys(result.current.notes).length).toBe(0);
  });

  it('should return 0 for default current count', () => {
    const { result } = renderHook(() => appStore(notesSelector));
    expect(result.current.getCurrentId()).toBe(0);
  });

  it('should add note', () => {
    const { result } = renderHook(() => appStore(notesSelector));

    act(() => {
      result.current.addNote({
        id: 'test-1',
        title: 'Title',
        description: 'Description',
        content: '<div>Content</div>',
        date: '2021-09-01',
        updatedAt: '2021-09-01',
        pinned: false,
      });
    });

    expect(result.current.selectedNote('test-1')).toMatchObject({
      id: 'test-1',
      title: 'Title',
    });
  });

  it('should delete note', () => {
    const result = setupNotes(1);

    act(() => {
      result.current.deleteNote('note-1');
    });

    expect(result.current.selectedNote('note-1')).toBeUndefined();
  });

  it('should edit note', () => {
    const result = setupNotes(1);

    act(() => {
      result.current.editNote({
        id: 'note-1',
        title: 'New Title',
        description: 'New Description',
        content: '<div>New Content</div>',
        date: '2021-09-01',
        updatedAt: '2021-09-02',
        pinned: false,
      });
    });

    expect(result.current.selectedNote('note-1').title).toBe('New Title');
  });

  it('should return selected note', () => {
    const result = setupNotes(1);

    expect(result.current.selectedNote('note-1')).toMatchObject({
      id: 'note-1',
      title: 'Note 1',
    });
  });

  it('should return all notes', () => {
    const result = setupNotes(2);

    expect(result.current.notes['note-1']).toBeDefined();
    expect(result.current.notes['note-2']).toBeDefined();
    expect(Object.keys(result.current.notes).length).toBe(2);
  });
});
