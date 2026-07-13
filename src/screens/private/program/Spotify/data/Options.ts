import { TopAppMenuTreeStructure } from '../../../../../types/menu';

export const options: TopAppMenuTreeStructure = {
  id: 'spotify',
  menuTree: [
    {
      title: 'Spotify',
      type: 'main',
      items: {
        aboutSpotify: {
          title: 'About Spotify',
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
      title: 'Playback',
      type: 'normal',
      items: {
        play: {
          title: 'Play/Pause',
          hasDivider: false,
          action: () => {},
        },
        next: {
          title: 'Next Track',
          hasDivider: false,
          action: () => {},
        },
      },
    },
  ],
};
