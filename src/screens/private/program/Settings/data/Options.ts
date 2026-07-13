import { TopAppMenuTreeStructure } from '../../../../../types/menu';

export const options: TopAppMenuTreeStructure = {
  id: 'settings',
  menuTree: [
    {
      title: 'Settings',
      type: 'main',
      items: {
        aboutSettings: {
          title: 'About System Settings',
          hasDivider: true,
          action: () => {},
        },
      },
    },
    {
      title: 'View',
      type: 'normal',
      items: {
        reload: {
          title: 'Reload Settings',
          hasDivider: false,
          action: () => {},
        },
      },
    },
  ],
};
