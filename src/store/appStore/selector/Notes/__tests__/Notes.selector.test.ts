import { renderHook } from '@testing-library/react-hooks';
import { appStore } from '../../../appStore';
import { notesSelector } from '../Notes.selector';

describe('Notes selector', () => {
  it('should return default notes state', () => {
    const { result } = renderHook(() => appStore(notesSelector));

    expect(Object.keys(result.current.notes).length).toBe(6);
  });

  it('should return default current id', () => {
    const { result } = renderHook(() => appStore(notesSelector));

    expect(result.current.getCurrentId()).toBe(6);
  });

  it('should add note', () => {
    const { result } = renderHook(() => appStore(notesSelector));

    result.current.addNote({
      id: 'test-1',
      title: 'Title',
      description: 'Description',
      date: '2021-09-01',
    } as any);

    expect(result.current.selectedNote('test-1')).toEqual({
      id: 'test-1',
      title: 'Title',
      description: 'Description',
      date: '2021-09-01',
    });
  });

  it('should delete note', () => {
    const { result } = renderHook(() => appStore(notesSelector));

    result.current.addNote({
      id: 'test-1',
      title: 'Title',
      description: 'Description',
      date: '2021-09-01',
    } as any);

    result.current.deleteNote('test-1');

    expect(result.current.selectedNote('test-1')).toBeUndefined();
  });

  it('should edit note', () => {
    const { result } = renderHook(() => appStore(notesSelector));

    result.current.addNote({
      id: 'test-1',
      title: 'Title',
      description: 'Description',
      date: '2021-09-01',
    } as any);

    result.current.editNote({
      id: 'test-1',
      title: 'New Title',
      description: 'New Description',
      date: '2021-09-02',
    } as any);

    expect(result.current.selectedNote('test-1')).toEqual({
      id: 'test-1',
      title: 'New Title',
      description: 'New Description',
      date: '2021-09-02',
    });
  });

  it('should return selected note', () => {
    const { result } = renderHook(() => appStore(notesSelector));

    result.current.addNote({
      id: 'test-1',
      title: 'Title',
      description: 'Description',
      date: '2021-09-01',
    } as any);

    expect(result.current.selectedNote('test-1')).toEqual({
      id: 'test-1',
      title: 'Title',
      description: 'Description',
      date: '2021-09-01',
    });
  });

  it('should return all notes', () => {
    const { result } = renderHook(() => appStore(notesSelector));

    result.current.addNote({
      id: 'test-1',
      title: 'Title',
      description: 'Description',
      date: '2021-09-01',
    } as any);

    result.current.addNote({
      id: 'test-2',
      title: 'Title',
      description: 'Description',
      date: '2021-09-01',
    } as any);

    expect(result.current.notes['test-1']).toBeDefined();
    expect(result.current.notes['test-2']).toBeDefined();
    expect(Object.keys(result.current.notes).length).toBe(8);
  });
});
