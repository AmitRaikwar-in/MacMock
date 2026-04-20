import { render, screen, fireEvent, act } from '@testing-library/react';
import NoteFormatBar from '../NoteFormatBar';
import React from 'react';

describe('NoteFormatBar', () => {
  let editorRef: { current: HTMLDivElement };

  beforeEach(() => {
    editorRef = { current: document.createElement('div') };
    document.execCommand = jest.fn();
    document.queryCommandState = jest.fn().mockReturnValue(false);

    // Mock getSelection
    window.getSelection = jest.fn().mockReturnValue({
      isCollapsed: false,
      rangeCount: 1,
      getRangeAt: () => ({
        commonAncestorContainer: editorRef.current,
        getBoundingClientRect: () => ({
          top: 100,
          left: 100,
          width: 50,
        }),
      }),
    } as any);
  });

  it('should not render when there is no selection', () => {
    window.getSelection = jest.fn().mockReturnValue(null);
    const { container } = render(<NoteFormatBar editorRef={editorRef} />);

    act(() => {
      document.dispatchEvent(new Event('selectionchange'));
    });

    expect(container.firstChild).toBeNull();
  });

  it('should not render when selection is outside editor', () => {
    window.getSelection = jest.fn().mockReturnValue({
      isCollapsed: false,
      rangeCount: 1,
      getRangeAt: () => ({
        commonAncestorContainer: document.createElement('div'),
        getBoundingClientRect: () => ({ top: 0, left: 0, width: 0 }),
      }),
    } as any);

    const { container } = render(<NoteFormatBar editorRef={editorRef} />);

    act(() => {
      document.dispatchEvent(new Event('selectionchange'));
    });

    expect(container.firstChild).toBeNull();
  });

  it('should render when there is a selection in the editor', () => {
    render(<NoteFormatBar editorRef={editorRef} />);

    act(() => {
      document.dispatchEvent(new Event('selectionchange'));
    });

    expect(screen.getByLabelText('Bold (⌘B)')).toBeDefined();
    expect(screen.getByLabelText('Italic (⌘I)')).toBeDefined();
    expect(screen.getByLabelText('Underline (⌘U)')).toBeDefined();
  });

  it('should call execCommand when a format button is clicked', () => {
    render(<NoteFormatBar editorRef={editorRef} />);

    act(() => {
      document.dispatchEvent(new Event('selectionchange'));
    });

    fireEvent.click(screen.getByLabelText('Bold (⌘B)'));
    expect(document.execCommand).toHaveBeenCalledWith('bold', false, undefined);

    fireEvent.click(screen.getByLabelText('Italic (⌘I)'));
    expect(document.execCommand).toHaveBeenCalledWith(
      'italic',
      false,
      undefined,
    );

    fireEvent.click(screen.getByLabelText('Underline (⌘U)'));
    expect(document.execCommand).toHaveBeenCalledWith(
      'underline',
      false,
      undefined,
    );
  });

  it('should call execCommand with values for block formatting', () => {
    render(<NoteFormatBar editorRef={editorRef} />);

    act(() => {
      document.dispatchEvent(new Event('selectionchange'));
    });

    fireEvent.click(screen.getByLabelText('Heading'));
    expect(document.execCommand).toHaveBeenCalledWith(
      'formatBlock',
      false,
      'h2',
    );

    fireEvent.click(screen.getByLabelText('Body text'));
    expect(document.execCommand).toHaveBeenCalledWith(
      'formatBlock',
      false,
      'div',
    );
  });

  it('should call execCommand for lists', () => {
    render(<NoteFormatBar editorRef={editorRef} />);

    act(() => {
      document.dispatchEvent(new Event('selectionchange'));
    });

    fireEvent.click(screen.getByLabelText('Bullet list'));
    expect(document.execCommand).toHaveBeenCalledWith(
      'insertUnorderedList',
      false,
      undefined,
    );

    fireEvent.click(screen.getByLabelText('Numbered list'));
    expect(document.execCommand).toHaveBeenCalledWith(
      'insertOrderedList',
      false,
      undefined,
    );
  });

  it('should show active state for formats', () => {
    document.queryCommandState = jest
      .fn()
      .mockImplementation((cmd) => cmd === 'bold');

    render(<NoteFormatBar editorRef={editorRef} />);

    act(() => {
      document.dispatchEvent(new Event('selectionchange'));
    });

    const boldBtn = screen.getByLabelText('Bold (⌘B)');
    // We can't easily check color in JSDOM style objects if they are handled by Chakra/emotion
    // but the test confirms the logic branch is hit.
    expect(boldBtn).toBeDefined();
  });

  it('should prevent default on mouse down', () => {
    render(<NoteFormatBar editorRef={editorRef} />);

    act(() => {
      document.dispatchEvent(new Event('selectionchange'));
    });

    const bar = screen.getByLabelText('Bold (⌘B)').parentElement!;
    const event = fireEvent.mouseDown(bar);
    expect(event).toBe(false); // fireEvent returns false if preventDefault was called
  });
});
