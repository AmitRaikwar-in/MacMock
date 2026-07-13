import { TopAppMenuTreeStructure } from '../../../../../types/menu';

export const options: TopAppMenuTreeStructure = {
  id: 'chrome',
  menuTree: [
    {
      title: 'Chrome',
      type: 'main',
      items: {
        aboutChrome: {
          title: 'About Google Chrome',
          hasDivider: true,
          action: () => {},
        },
        preferences: {
          title: 'Settings',
          hasDivider: false,
          action: () => {},
        },
      },
    },
    {
      title: 'File',
      type: 'normal',
      items: {
        newTab: {
          title: 'New Tab',
          hasDivider: false,
          action: () => {},
        },
        newWindow: {
          title: 'New Window',
          hasDivider: false,
          action: () => {},
        },
      },
    },
  ],
};
