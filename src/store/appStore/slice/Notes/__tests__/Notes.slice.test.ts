import { renderHook } from '@testing-library/react-hooks';
import { appStore } from '../../../appStore';
import { act } from '@testing-library/react';

describe('Notes slice', () => {
  const setupNotes = (count = 6) => {
    const { result } = renderHook(() => appStore());
    act(() => {
      for (let i = 1; i <= count; i++) {
        result.current.Notes.addNote({
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

  it('should return default notes state (empty)', () => {
    const { result } = renderHook(() => appStore());
    expect(Object.keys(result.current.Notes.notes).length).toBe(0);
  });

  it('should add note', () => {
    const { result } = renderHook(() => appStore());

    act(() => {
      result.current.Notes.addNote({
        id: 'test-1',
        title: 'Title',
        description: 'Description',
        content: '<div>Content</div>',
        date: '2021-09-01',
        updatedAt: '2021-09-01',
        pinned: false,
      });
    });

    expect(result.current.Notes.notes['test-1']).toMatchObject({
      id: 'test-1',
      title: 'Title',
    });
  });

  it('should delete note', () => {
    const result = setupNotes(1);

    act(() => {
      result.current.Notes.deleteNote('note-1');
    });

    expect(result.current.Notes.notes['note-1']).toBeUndefined();
  });

  it('should not throw when deleting non-existent note', () => {
    const { result } = renderHook(() => appStore());
    expect(() => {
      act(() => {
        result.current.Notes.deleteNote('non-existent');
      });
    }).not.toThrow();
  });

  it('should edit note', () => {
    const result = setupNotes(1);

    act(() => {
      result.current.Notes.editNote({
        id: 'note-1',
        title: 'New Title',
        description: 'New Description',
        content: '<div>New Content</div>',
        date: '2021-09-01',
        updatedAt: '2021-09-02',
        pinned: false,
      });
    });

    expect(result.current.Notes.notes['note-1'].title).toBe('New Title');
  });

  it('should toggle pin note', () => {
    const result = setupNotes(1);

    // note-1 is initially not pinned
    expect(result.current.Notes.notes['note-1'].pinned).toBe(false);

    act(() => {
      result.current.Notes.pinNote('note-1');
    });
    expect(result.current.Notes.notes['note-1'].pinned).toBe(true);

    act(() => {
      result.current.Notes.pinNote('note-1');
    });
    expect(result.current.Notes.notes['note-1'].pinned).toBe(false);
  });

  it('should not throw when pinning non-existent note', () => {
    const { result } = renderHook(() => appStore());
    expect(() => {
      act(() => {
        result.current.Notes.pinNote('non-existent');
      });
    }).not.toThrow();
  });
});
