import { SettingsStoreSlice } from '../../settingsStore';
import { UsersState, UsersStateSlice } from './types';

const defaultUsersState: UsersState = {
  amitraikwar: {
    id: 'amitraikwar',
    name: 'Amit Raikwar',
    profilePicture:
      'https://avatars.githubusercontent.com/u/104697219?s=400&u=7ecc539c268755cfe0409ca5863773bb726387ba&v=4',
    password: '1234',
    email: '',
    role: 'admin',
    createdAt: '2024-05-13',
    updatedAt: '2021-09-02',
  },
};

const createUsersSlice: SettingsStoreSlice<UsersStateSlice> = (set) =>
  ({
    ...defaultUsersState,
    updatePassword: (userId: string, newPassword: string) =>
      set((state) => {
        if (state.Users[userId]) {
          state.Users[userId].password = newPassword;
        }
      }),
  }) as UsersStateSlice;

export default createUsersSlice;
