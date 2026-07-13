import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { LazySettingsComponent } from '../LazySettingsScreen';
import '@settingsStore';

describe('LazySettingsComponent', () => {
  it('should render correctly to match snapshot', async () => {
    const { container } = render(<LazySettingsComponent />);

    await waitFor(() => expect(screen.getAllByText('General')[0]).toBeDefined());
    expect(container).toMatchSnapshot();
  });
});
