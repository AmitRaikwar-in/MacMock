import { renderHook } from '@testing-library/react-hooks';
import { appStore } from '../../../appStore';

describe('Notes slice', () => {
  it('should return default notes state', () => {
    const { result } = renderHook(() => appStore());

    expect(Object.keys(result.current.Notes.notes).length).toBe(6);
  });

  it('should add note', () => {
    const { result } = renderHook(() => appStore());

    result.current.Notes.addNote({
      id: 'test-1',
      title: 'Title',
      description: 'Description',
      date: '2021-09-01',
    } as any);

    expect(result.current.Notes.notes['test-1']).toEqual({
      id: 'test-1',
      title: 'Title',
      description: 'Description',
      date: '2021-09-01',
    });
  });

  it('should delete note', () => {
    const { result } = renderHook(() => appStore());

    result.current.Notes.addNote({
      id: 'test-1',
      title: 'Title',
      description: 'Description',
      date: '2021-09-01',
    } as any);

    result.current.Notes.deleteNote('test-1');

    expect(result.current.Notes.notes['test-1']).toBeUndefined();
  });

  it('should edit note', () => {
    const { result } = renderHook(() => appStore());

    result.current.Notes.addNote({
      id: 'test-1',
      title: 'Title',
      description: 'Description',
      date: '2021-09-01',
    } as any);

    result.current.Notes.editNote({
      id: 'test-1',
      title: 'New Title',
      description: 'New Description',
      date: '2021-09-02',
    } as any);

    expect(result.current.Notes.notes['test-1']).toEqual({
      id: 'test-1',
      title: 'New Title',
      description: 'New Description',
      date: '2021-09-02',
    });
  });
});
