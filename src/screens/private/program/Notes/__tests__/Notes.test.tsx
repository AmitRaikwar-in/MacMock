import { fireEvent, render, screen, act } from '@testing-library/react';
import Notes from '../Notes';
import { renderHook } from '@testing-library/react-hooks';
import { appStore } from '@appStore';

// Mock generateNoteId to return predictable IDs
jest.mock('../utils', () => ({
  ...jest.requireActual('../utils'),
  generateNoteId: jest.fn(() => '1'),
}));

describe('Notes', () => {
  beforeEach(() => {
    jest.useFakeTimers().setSystemTime(new Date('2025-04-20T10:00:00Z'));

    // Seed the store with initial notes since the slice is now empty by default
    const { result } = renderHook(() => appStore());
    act(() => {
      // note-1 is special (seeds mock content)
      result.current.Notes.addNote({
        id: 'note-1',
        title: 'Teaching Holistic Health 🧘‍♀️',
        description: 'Brainstorm for first in-class session...',
        content: '',
        date: '2025-04-20T10:00:00Z',
        updatedAt: '2025-04-20T10:00:00Z',
        pinned: false,
      });
      result.current.Notes.addNote({
        id: 'note-2',
        title: 'Grocery List 🛒',
        description: 'Milk, Eggs, Bread...',
        content: '<div>Grocery List 🛒</div>',
        date: '2025-04-19T15:30:00Z',
        updatedAt: '2025-04-19T15:30:00Z',
        pinned: true,
      });
    });
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should render correctly to match snapshot', () => {
    const { container } = render(<Notes />);
    expect(container).toMatchSnapshot();
  });

  it('should invoke add note on clicking add note button', () => {
    const { result } = renderHook(() => appStore());
    const { container } = render(<Notes />);

    fireEvent.click(screen.getByLabelText('New Note (⌘N)'));

    expect(container).toMatchSnapshot();
    expect(result.current.Notes.notes['1']).toMatchObject({
      id: '1',
      title: 'New Note',
    });
  });

  it('should invoke delete note on clicking delete note button', () => {
    const { result } = renderHook(() => appStore());
    const { container } = render(<Notes />);

    fireEvent.click(screen.getByLabelText('New Note (⌘N)'));
    // The newly added note has ID '1'
    fireEvent.click(screen.getByLabelText('note-card-1'));
    fireEvent.click(screen.getByLabelText('Delete'));

    expect(container).toMatchSnapshot();
    expect(result.current.Notes.notes['1']).toBeUndefined();
  });

  it('should select and deselect on clicking on card', () => {
    const { container } = render(<Notes />);

    fireEvent.click(screen.getByLabelText('note-card-note-2'));
    fireEvent.click(screen.getByLabelText('note-card-note-1'));

    // Card 1 is selected
    expect(container).toMatchSnapshot();
  });

  it('should show editor when a note is selected', () => {
    render(<Notes />);
    fireEvent.click(screen.getByLabelText('note-card-note-2'));
    expect(screen.getByLabelText('note-editor')).toBeDefined();
  });
});
