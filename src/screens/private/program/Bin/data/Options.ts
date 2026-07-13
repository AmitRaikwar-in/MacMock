import { TopAppMenuTreeStructure } from '../../../../../types/menu';

export const options: TopAppMenuTreeStructure = {
  id: 'bin',
  menuTree: [
    {
      title: 'Finder',
      type: 'main',
      items: {
        aboutFinder: {
          title: 'About Finder',
          hasDivider: true,
          action: () => {},
        },
        emptyTrash: {
          title: 'Empty Trash',
          hasDivider: false,
          action: () => {},
        },
      },
    },
    {
      title: 'File',
      type: 'normal',
      items: {
        closeWindow: {
          title: 'Close Window',
          hasDivider: false,
          action: () => {},
        },
      },
    },
  ],
};
