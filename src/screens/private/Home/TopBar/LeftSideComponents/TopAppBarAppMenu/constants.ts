import { ProgramType } from '@processStore';
import { TopAppMenuTreeStructure } from './types';

// Import options from program folders using absolute aliases
import { options as finderOptions } from '../../../../program/Finder/data/Options';
import { options as notesOptions } from '../../../../program/Notes/data/Options';
import { options as binOptions } from '../../../../program/Bin/data/Options';
import { options as terminalOptions } from '../../../../program/Terminal/data/Options';
import { options as vsCodeOptions } from '../../../../program/VsCode/data/Options';
import { options as chromeOptions } from '../../../../program/Chrome/data/Options';
import { options as spotifyOptions } from '../../../../program/Spotify/data/Options';
import { options as githubOptions } from '../../../../program/Github/data/Options';
import { options as settingsOptions } from '../../../../program/Settings/data/Options';
import { options as calendarOptions } from '../../../../program/Calendar/data/Options';

const emptyMenu = { id: '', menuTree: [] };

export const TopAppBarAppMenuDatMap: Record<
  ProgramType,
  TopAppMenuTreeStructure
> = {
  [ProgramType.VSCODE]: vsCodeOptions,
  [ProgramType.FINDER]: finderOptions,
  [ProgramType.NOTES]: notesOptions,
  [ProgramType.CHROME]: chromeOptions,
  [ProgramType.TERMINAL]: terminalOptions,
  [ProgramType.SPOTIFY]: spotifyOptions,
  [ProgramType.GITHUB]: githubOptions,
  [ProgramType.SETTINGS]: settingsOptions,
  [ProgramType.BIN]: binOptions,
  [ProgramType.CALENDAR]: calendarOptions,
  [ProgramType.LAUNCHPAD]: emptyMenu,
  [ProgramType.APP_STORE]: emptyMenu,
  [ProgramType.SAFARI]: emptyMenu,
  [ProgramType.MAILS]: emptyMenu,
  [ProgramType.CONTACTS]: emptyMenu,
  [ProgramType.REMINDERS]: emptyMenu,
  [ProgramType.FACE_TIME]: emptyMenu,
  [ProgramType.MESSAGES]: emptyMenu,
  [ProgramType.MAPS]: emptyMenu,
  [ProgramType.FIND_MY]: emptyMenu,
  [ProgramType.PHOTO_BOOTH]: emptyMenu,
  [ProgramType.PHOTOS]: emptyMenu,
  [ProgramType.PREVIEW]: emptyMenu,
  [ProgramType.MUSIC]: emptyMenu,
  [ProgramType.PODCASTS]: emptyMenu,
  [ProgramType.TV]: emptyMenu,
  [ProgramType.VOICE_MEMOS]: emptyMenu,
  [ProgramType.NEWS]: emptyMenu,
  [ProgramType.STOCKS]: emptyMenu,
  [ProgramType.GARAGE_BAND]: emptyMenu,
  [ProgramType.I_MOVIE]: emptyMenu,
  [ProgramType.HOME]: emptyMenu,
  [ProgramType.CLOCK]: emptyMenu,
  [ProgramType.CALCULATOR]: emptyMenu,
  [ProgramType.FREEFORM]: emptyMenu,
  [ProgramType.BOOKS]: emptyMenu,
  [ProgramType.DICTIONARY]: emptyMenu,
  [ProgramType.WEATHER]: emptyMenu,
  [ProgramType.KEYNOTE]: emptyMenu,
  [ProgramType.NUMBERS]: emptyMenu,
  [ProgramType.PAGES]: emptyMenu,
  [ProgramType.XCODE]: emptyMenu,
};
