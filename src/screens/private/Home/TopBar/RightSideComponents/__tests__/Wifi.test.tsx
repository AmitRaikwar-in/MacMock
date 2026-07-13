import { fireEvent, render, screen } from '@testing-library/react';
import Wifi from '../Wifi';

describe('Wifi', () => {
  it('should render', () => {
    const { container } = render(<Wifi />);

    expect(container).toMatchSnapshot();
  });

  it('should open pop-up when Wifi icon is tapped', () => {
    const { container } = render(<Wifi />);

    fireEvent.click(screen.getByLabelText('wifi-top-bar-button'));

    expect(container).toMatchSnapshot();
  });

  it('should click wifi home option', () => {
    const { container } = render(<Wifi />);
 
    fireEvent.click(screen.getByLabelText('wifi-home'));
 
    expect(container).toMatchSnapshot();
  });

  it('should open wifi weak security on wifi weak security item clicked is tapped', () => {
    const { container } = render(<Wifi />);

    fireEvent.click(screen.getByLabelText('wifi-weak-security'));

    expect(container).toMatchSnapshot();
  });

  it('should open other network on other network item clicked is tapped', () => {
    const { container } = render(<Wifi />);

    fireEvent.click(screen.getByLabelText('other-network'));

    expect(container).toMatchSnapshot();
  });

  it('should open wifi settings on wifi settings item clicked is tapped', () => {
    const { container } = render(<Wifi />);

    fireEvent.click(screen.getByLabelText('wifi-settings'));

    expect(container).toMatchSnapshot();
  });
});
