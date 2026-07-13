import { TopAppMenuTreeStructure } from '../../../../../types/menu';

export const options: TopAppMenuTreeStructure = {
  id: 'calendar',
  menuTree: [
    {
      title: 'Calendar',
      type: 'main',
      items: {
        aboutCalendar: {
          title: 'About Calendar',
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
        newEvent: {
          title: 'New Event',
          hasDivider: false,
          action: () => {},
        },
      },
    },
  ],
};
