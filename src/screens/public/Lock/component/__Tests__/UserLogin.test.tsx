import { fireEvent, render, screen, act } from '@testing-library/react';
import UserLoginComponent from '../UserLogin';
import { renderHook } from '@testing-library/react-hooks';
import { loginSelector, processStore } from '@processStore';

describe('UserLogin', () => {
  it('should return the default user login component', () => {
    const { container } = render(<UserLoginComponent />);

    expect(container).toMatchSnapshot();
  });

  it('should show spinner on click on login button', () => {
    const { container } = render(<UserLoginComponent />);

    expect(screen.queryByLabelText('spinner')).toBeNull();
    fireEvent.click(screen.getByLabelText('login-button'));

    expect(container).toMatchSnapshot();
    expect(screen.getByLabelText('spinner')).toBeDefined();
  });

  it('should toggle password visibility on click on user button', async () => {
    const { container } = render(<UserLoginComponent />);

    fireEvent.click(screen.getByLabelText('user-button'));

    await act(async () => {
      await jest.advanceTimersByTimeAsync(1000);
    });

    expect(
      screen.queryByText('Your password is required to enable Touch ID')?.style
        .opacity,
    ).toEqual('');
    expect(container).toMatchSnapshot();
  });

  it('should update password input field on change event', () => {
    const { container } = render(<UserLoginComponent />);

    fireEvent.change(screen.getByLabelText('password-text-input'), {
      target: { value: 'password-test-text' },
    });

    expect(container).toMatchSnapshot();
  });

  it('should log in when correct password is entered', async () => {
    const { result } = renderHook(() => processStore(loginSelector));
    const { container } = render(<UserLoginComponent />);

    expect(result.current.isLoggedIn).toBeFalsy();
    fireEvent.change(screen.getByLabelText('password-text-input'), {
      target: { value: '1234' },
    });
    fireEvent.click(screen.getByLabelText('login-button'));

    await act(async () => {
      await jest.advanceTimersByTimeAsync(3000);
    });

    expect(container).toMatchSnapshot();
    expect(result.current.isLoggedIn).toBeTruthy();
  });
});
