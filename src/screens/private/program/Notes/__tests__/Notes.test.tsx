import { fireEvent, render, screen } from '@testing-library/react';
import Notes from '../Notes';
import { renderHook } from '@testing-library/react-hooks';
import { appStore } from '@appStore';

describe('Notes', () => {
  it('should render correctly to match snapshot', () => {
    const { container } = render(<Notes />);

    expect(container).toMatchSnapshot();
  });

  it('should invoke add note on clicking add note button', () => {
    const { result } = renderHook(() => appStore());
    const { container } = render(<Notes />);

    fireEvent.click(screen.getByLabelText('add-note'));

    expect(container).toMatchSnapshot();
    expect(result.current.Notes.notes['1']).toEqual({
      id: '1',
      title: 'Title',
      description: 'Description',
      date: new Date().toLocaleDateString('en-GB'),
    });
  });

  it('should invoke delete note on clicking delete note button', () => {
    const { result } = renderHook(() => appStore());
    const { container } = render(<Notes />);

    fireEvent.click(screen.getByLabelText('add-note'));
    fireEvent.click(screen.getByLabelText('note-card-1'));
    fireEvent.click(screen.getByLabelText('delete-note'));

    expect(container).toMatchSnapshot();
    expect(result.current.Notes.notes['1']).toBeUndefined();
  });

  it('should select and deselect on clicking on card', () => {
    renderHook(() => appStore());
    const { container } = render(<Notes />);

    fireEvent.click(screen.getByLabelText('add-note'));
    fireEvent.click(screen.getByLabelText('add-note'));

    fireEvent.click(screen.getByLabelText('note-card-2'));
    fireEvent.click(screen.getByLabelText('note-card-1'));

    // Card 1 is selected
    expect(container).toMatchSnapshot();
  });

  it('should select all on clicking select all', () => {
    renderHook(() => appStore());
    const { container } = render(<Notes />);
    // Adding notes
    fireEvent.click(screen.getByLabelText('add-note'));
    // Clicking on text area to get focus on editor
    fireEvent.click(screen.getByLabelText('note-editor-box'));

    // Card 1 is selected
    expect(container).toMatchSnapshot();
  });
});
