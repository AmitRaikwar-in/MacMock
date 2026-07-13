import { TopAppMenuTreeStructure } from '../../../../../types/menu';

export const options: TopAppMenuTreeStructure = {
  id: 'terminal',
  menuTree: [
    {
      title: 'Terminal',
      type: 'main',
      items: {
        aboutTerminal: {
          title: 'About Terminal',
          hasDivider: true,
          action: () => {},
        },
        preferences: {
          title: 'Preferences...',
          hasDivider: false,
          action: () => {},
        },
      },
    },
    {
      title: 'Shell',
      type: 'normal',
      items: {
        newWindow: {
          title: 'New Window',
          hasDivider: false,
          action: () => {},
        },
        newTab: {
          title: 'New Tab',
          hasDivider: false,
          action: () => {},
        },
      },
    },
  ],
};
