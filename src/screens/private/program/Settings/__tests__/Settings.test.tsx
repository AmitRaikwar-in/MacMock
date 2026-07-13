import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Settings from '../Settings';
import { settingsStore } from '@settingsStore';

describe('Settings', () => {
  it('should render correctly to match snapshot', () => {
    const { container } = render(<Settings />);
    expect(container).toMatchSnapshot();
  });

  it('should open Change Password modal and update password on submit', async () => {
    render(<Settings />);

    // Click Users & Groups tab in sidebar
    const tab = screen.getByText('Users & Groups');
    fireEvent.click(tab);

    // Verify Users & Groups view is rendered
    expect(screen.getByText('CURRENT USER')).toBeDefined();

    // Click "Change Password..." button
    const changeBtn = screen.getByText('Change Password...');
    fireEvent.click(changeBtn);

    // Verify modal is open and shows fields
    expect(screen.getByText('Current Password')).toBeDefined();
    expect(screen.getByText('New Password')).toBeDefined();
    expect(screen.getByText('Verify Password')).toBeDefined();

    // Fill out the inputs
    // Let's use screen.getByText sibling/labels or specific inputs
    const currentInput = screen.getByText('Current Password').nextElementSibling as HTMLInputElement;
    const newInput = screen.getByText('New Password').nextElementSibling as HTMLInputElement;
    const verifyInput = screen.getByText('Verify Password').nextElementSibling as HTMLInputElement;

    fireEvent.change(currentInput, { target: { value: '1234' } });
    fireEvent.change(newInput, { target: { value: '5678' } });
    fireEvent.change(verifyInput, { target: { value: '5678' } });

    // Click Change Password submit button inside modal
    const submitBtn = screen.getAllByText('Change Password')[1]; // Modal footer button
    fireEvent.click(submitBtn);

    // Verify the password was updated in settingsStore
    await waitFor(() => {
      const state = settingsStore.getState();
      expect(state.Users['amitraikwar'].password).toBe('5678');
    });
  });
});
