import { fireEvent, render, screen } from '@testing-library/react';
import ProgramButton from '../ProgramButton';

describe('ProgramButton', () => {
  const onClickHandler = jest.fn();

  beforeEach(() => {
    onClickHandler.mockClear();
  });

  it('should render correctly', () => {
    const { container } = render(
      <ProgramButton
        name={'Finder'}
        variant="default"
        isActive={false}
        onClickHandler={onClickHandler}
        icon={''}
      />,
    );

    expect(container).toMatchSnapshot();
  });

  it('should render correctly with active state', () => {
    const { container } = render(
      <ProgramButton
        name={'Finder'}
        variant="default"
        icon=""
        isActive={true}
        onClickHandler={onClickHandler}
      />,
    );

    expect(container).toMatchSnapshot();
  });

  it('should call onClickHandler when clicked', () => {
    render(
      <ProgramButton
        name={'Finder'}
        variant="default"
        icon=""
        isActive={false}
        onClickHandler={onClickHandler}
      />,
    );

    fireEvent.click(screen.getByLabelText('program-button-Finder'));
    expect(onClickHandler).toHaveBeenCalled();
  });
});
