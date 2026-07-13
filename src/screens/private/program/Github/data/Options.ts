import { TopAppMenuTreeStructure } from '../../../../../types/menu';

export const options: TopAppMenuTreeStructure = {
  id: 'github',
  menuTree: [
    {
      title: 'Github',
      type: 'main',
      items: {
        aboutGithub: {
          title: 'About Github Desktop',
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
      title: 'File',
      type: 'normal',
      items: {
        cloneRepository: {
          title: 'Clone Repository...',
          hasDivider: false,
          action: () => {},
        },
      },
    },
  ],
};
