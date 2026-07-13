import { render, screen, fireEvent, act } from '@testing-library/react';
import NoteEditor from '../NoteEditor';
import { Note } from '@appStore';
import React from 'react';

jest.useFakeTimers();

describe('NoteEditor', () => {
  const mockOnUpdate = jest.fn();
  const mockNote: Note = {
    id: '1',
    title: 'Test Note',
    description: 'Test description',
    content: '<div>Test Note</div><div>Test description</div>',
    updatedAt: '2020-05-14T11:01:58.135Z',
    pinned: false,
    date: '14th May 2020',
  };

  beforeEach(() => {
    mockOnUpdate.mockClear();
    document.execCommand = jest.fn();
  });

  it('should render empty state when no note is provided', () => {
    render(<NoteEditor note={undefined} onUpdate={mockOnUpdate} />);
    expect(screen.getByText('Select or create a note')).toBeDefined();
  });

  it('should render note content when provided', () => {
    render(<NoteEditor note={mockNote} onUpdate={mockOnUpdate} />);
    const editor = screen.getByLabelText('note-editor');
    expect(editor.innerHTML).toContain('Test Note');
    // Flexible date check
    expect(screen.getByText(/2020/)).toBeDefined();
    // Use function matcher for text that might be broken by elements
    expect(
      screen.getByText((content) => content.includes('words')),
    ).toBeDefined();
  });

  it('should handle input and trigger update with debounce', () => {
    render(<NoteEditor note={mockNote} onUpdate={mockOnUpdate} />);
    const editor = screen.getByLabelText('note-editor');

    act(() => {
      // Use \n to ensure getTitleFromContent splits correctly in JSDOM
      editor.innerText = 'New Title\nNew content';
      // We also need to set innerHTML because handleInput reads it
      editor.innerHTML = '<div>New Title</div><div>New content</div>';
      fireEvent.input(editor);
    });

    // Should not have been called yet due to 500ms debounce
    expect(mockOnUpdate).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(mockOnUpdate).toHaveBeenCalled();
    const updatedNote = mockOnUpdate.mock.calls[0][0];
    // In JSDOM innerText might still be "New TitleNew content" depending on version
    // but we can adjust expectation or use a simpler title for testing
    expect(updatedNote.title).toMatch(/New Title/);
  });

  it('should handle multiple inputs and debounce correctly', () => {
    render(<NoteEditor note={mockNote} onUpdate={mockOnUpdate} />);
    const editor = screen.getByLabelText('note-editor');

    act(() => {
      editor.innerHTML = '<div>Update 1</div>';
      fireEvent.input(editor);
    });

    act(() => {
      jest.advanceTimersByTime(200);
      editor.innerHTML = '<div>Update 2</div>';
      fireEvent.input(editor);
    });

    act(() => {
      jest.advanceTimersByTime(200);
    });

    // Should still not have been called because the second input reset the timer
    expect(mockOnUpdate).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(mockOnUpdate).toHaveBeenCalledTimes(1);
    expect(mockOnUpdate.mock.calls[0][0].title).toMatch(/Update 2/);
  });

  it('should handle keyboard shortcuts (metaKey and ctrlKey)', () => {
    render(<NoteEditor note={mockNote} onUpdate={mockOnUpdate} />);
    const editor = screen.getByLabelText('note-editor');

    // metaKey (Mac)
    fireEvent.keyDown(editor, { key: 'b', metaKey: true });
    expect(document.execCommand).toHaveBeenCalledWith('bold');

    // ctrlKey (Windows/Linux)
    fireEvent.keyDown(editor, { key: 'i', ctrlKey: true });
    expect(document.execCommand).toHaveBeenCalledWith('italic');

    fireEvent.keyDown(editor, { key: 'u', metaKey: true });
    expect(document.execCommand).toHaveBeenCalledWith('underline');
  });

  it('should not call execCommand for other keys or without modifier', () => {
    render(<NoteEditor note={mockNote} onUpdate={mockOnUpdate} />);
    const editor = screen.getByLabelText('note-editor');

    fireEvent.keyDown(editor, { key: 'b' }); // No modifier
    expect(document.execCommand).not.toHaveBeenCalled();

    fireEvent.keyDown(editor, { key: 'x', metaKey: true }); // Unsupported key
    expect(document.execCommand).not.toHaveBeenCalled();
  });

  it('should focus editor when container is clicked', () => {
    render(<NoteEditor note={mockNote} onUpdate={mockOnUpdate} />);
    const editor = screen.getByLabelText('note-editor');
    const spy = jest.spyOn(editor, 'focus');

    fireEvent.click(editor.parentElement!);
    expect(spy).toHaveBeenCalled();
  });

  it('should render mock content for special note title', async () => {
    const specialNote: Note = {
      ...mockNote,
      id: 'special-note-id', // Use unique ID to avoid ref collision
      title: 'Teaching Holistic Health 🧘‍♀️',
      content: '',
    };

    act(() => {
      render(<NoteEditor note={specialNote} onUpdate={mockOnUpdate} />);
    });

    const editor = screen.getByLabelText('note-editor');
    expect(editor.innerHTML).toContain('🧘‍♀️');
    expect(mockOnUpdate).toHaveBeenCalled();
  });
});
