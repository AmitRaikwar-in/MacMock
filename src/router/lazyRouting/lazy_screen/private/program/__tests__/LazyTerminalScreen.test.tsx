import { render, screen, waitFor } from '@testing-library/react';
import { LazyTerminalComponent } from '../LazyTerminalScreen';
import '../../../../../../screens/private/program/Terminal/Terminal';

describe('LazyTerminalComponent', () => {
  it('should render correctly to match snapshot', async () => {
    const { container } = render(<LazyTerminalComponent />);

    await waitFor(() => expect(screen.getByText('Last login:', { exact: false })).toBeDefined());
    expect(container).toMatchSnapshot();
  });
});
