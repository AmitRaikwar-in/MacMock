import { ProgramType } from '@processStore';
import { ProgramDataRecord } from './types';
import AppStore from '../../../../assets/logo/appstore.png';
import Safari from '../../../../assets/logo/safari.png';
import Mails from '../../../../assets/logo/mails.png';
import Contacts from '../../../../assets/logo/contacts.png';
import Calendar from '../../../../assets/logo/contacts.png';
import Reminders from '../../../../assets/logo/reminders.png';
import FaceTime from '../../../../assets/logo/face_time.png';
import Messages from '../../../../assets/logo/messages.png';
import Maps from '../../../../assets/logo/maps.png';
import FindMy from '../../../../assets/logo/findmy.png';
import PhotoBooth from '../../../../assets/logo/photo_booth.png';
import Photos from '../../../../assets/logo/photos.png';
import Preview from '../../../../assets/logo/preview.png';
import Music from '../../../../assets/logo/music.png';
import Podcasts from '../../../../assets/logo/podcasts.png';
import TV from '../../../../assets/logo/tv.png';
import VoiceMemos from '../../../../assets/logo/voice_memos.png';
import GarageBand from '../../../../assets/logo/garage_band.png';
import iMovie from '../../../../assets/logo/i_movie.png';
import Keynote from '../../../../assets/logo/keynote.png';
import Numbers from '../../../../assets/logo/numbers.png';
import Pages from '../../../../assets/logo/pages.png';
import Weather from '../../../../assets/logo/weather.png';
import Stocks from '../../../../assets/logo/stocks.png';
import Books from '../../../../assets/logo/books.png';
import Dictionary from '../../../../assets/logo/dictionary.png';
import Calculator from '../../../../assets/logo/calculator.png';
import Freeform from '../../../../assets/logo/freeform.png';
import Home from '../../../../assets/logo/home.png';
import Clock from '../../../../assets/logo/xcode.png';
import Xcode from '../../../../assets/logo/xcode.png';
import Finder from '../../../../assets/logo/finder.png';
import Chrome from '../../../../assets/logo/chrome.png';
import VsCode from '../../../../assets/logo/vscode.png';
import Terminal from '../../../../assets/logo/terminal.png';
import Spotify from '../../../../assets/logo/spotify.png';
import Github from '../../../../assets/logo/github.png';
import Settings from '../../../../assets/logo/settings.png';
import Bin from '../../../../assets/logo/bin.png';
import Notes from '../../../../assets/logo/notes.png';
import News from '../../../../assets/logo/news.png';

export const LaunchpadProgramsList: ProgramDataRecord = {
  [ProgramType.APP_STORE]: {
    name: 'App Store',
    icon: AppStore,
    programType: ProgramType.APP_STORE,
  },
  [ProgramType.SAFARI]: {
    name: 'Safari',
    icon: Safari,
    programType: ProgramType.SAFARI,
  },
  [ProgramType.MAILS]: {
    name: 'Mails',
    icon: Mails,
    programType: ProgramType.MAILS,
  },
  [ProgramType.CONTACTS]: {
    name: 'Contacts',
    icon: Contacts,
    programType: ProgramType.CONTACTS,
  },
  [ProgramType.FINDER]: {
    name: 'Finder',
    icon: Finder,
    programType: ProgramType.FINDER,
  },
  [ProgramType.NOTES]: {
    name: 'Notes',
    icon: Notes,
    programType: ProgramType.NOTES,
  },
  [ProgramType.CHROME]: {
    name: 'Chrome',
    icon: Chrome,
    programType: ProgramType.CHROME,
  },
  [ProgramType.VSCODE]: {
    name: 'VsCode',
    icon: VsCode,
    programType: ProgramType.VSCODE,
  },
  [ProgramType.TERMINAL]: {
    name: 'Terminal',
    icon: Terminal,
    programType: ProgramType.TERMINAL,
  },
  [ProgramType.SPOTIFY]: {
    name: 'Spotify',
    icon: Spotify,
    programType: ProgramType.SPOTIFY,
  },
  [ProgramType.GITHUB]: {
    name: 'Github',
    icon: Github,
    programType: ProgramType.GITHUB,
  },
  [ProgramType.SETTINGS]: {
    name: 'Settings',
    icon: Settings,
    programType: ProgramType.SETTINGS,
  },
  [ProgramType.BIN]: {
    name: 'Bin',
    icon: Bin,
    programType: ProgramType.BIN,
  },
  [ProgramType.CALENDAR]: {
    name: 'Calendar',
    icon: Calendar,
    programType: ProgramType.CALENDAR,
  },
  [ProgramType.REMINDERS]: {
    name: 'Reminders',
    icon: Reminders,
    programType: ProgramType.REMINDERS,
  },
  [ProgramType.FACE_TIME]: {
    name: 'FaceTime',
    icon: FaceTime,
    programType: ProgramType.FACE_TIME,
  },
  [ProgramType.MESSAGES]: {
    name: 'Messages',
    icon: Messages,
    programType: ProgramType.MESSAGES,
  },
  [ProgramType.MAPS]: {
    name: 'Maps',
    icon: Maps,
    programType: ProgramType.MAPS,
  },
  [ProgramType.FIND_MY]: {
    name: 'Find My',
    icon: FindMy,
    programType: ProgramType.FIND_MY,
  },
  [ProgramType.PHOTO_BOOTH]: {
    name: 'PhotoBooth',
    icon: PhotoBooth,
    programType: ProgramType.PHOTO_BOOTH,
  },
  [ProgramType.PHOTOS]: {
    name: 'Photos',
    icon: Photos,
    programType: ProgramType.PHOTOS,
  },
  [ProgramType.PREVIEW]: {
    name: 'Preview',
    icon: Preview,
    programType: ProgramType.PREVIEW,
  },
  [ProgramType.MUSIC]: {
    name: 'Music',
    icon: Music,
    programType: ProgramType.MUSIC,
  },
  [ProgramType.PODCASTS]: {
    name: 'Podcasts',
    icon: Podcasts,
    programType: ProgramType.PODCASTS,
  },
  [ProgramType.TV]: {
    name: 'TV',
    icon: TV,
    programType: ProgramType.TV,
  },
  [ProgramType.VOICE_MEMOS]: {
    name: 'Voice Memos',
    icon: VoiceMemos,
    programType: ProgramType.VOICE_MEMOS,
  },
  [ProgramType.GARAGE_BAND]: {
    name: 'GarageBand',
    icon: GarageBand,
    programType: ProgramType.GARAGE_BAND,
  },
  [ProgramType.I_MOVIE]: {
    name: 'iMovie',
    icon: iMovie,
    programType: ProgramType.I_MOVIE,
  },
  [ProgramType.KEYNOTE]: {
    name: 'Keynote',
    icon: Keynote,
    programType: ProgramType.KEYNOTE,
  },
  [ProgramType.NUMBERS]: {
    name: 'Numbers',
    icon: Numbers,
    programType: ProgramType.NUMBERS,
  },
  [ProgramType.PAGES]: {
    name: 'Pages',
    icon: Pages,
    programType: ProgramType.PAGES,
  },
  [ProgramType.WEATHER]: {
    name: 'Weather',
    icon: Weather,
    programType: ProgramType.WEATHER,
  },
  [ProgramType.STOCKS]: {
    name: 'Stocks',
    icon: Stocks,
    programType: ProgramType.STOCKS,
  },
  [ProgramType.BOOKS]: {
    name: 'Books',
    icon: Books,
    programType: ProgramType.BOOKS,
  },
  [ProgramType.DICTIONARY]: {
    name: 'Dictionary',
    icon: Dictionary,
    programType: ProgramType.DICTIONARY,
  },
  [ProgramType.CALCULATOR]: {
    name: 'Calculator',
    icon: Calculator,
    programType: ProgramType.CALCULATOR,
  },
  [ProgramType.FREEFORM]: {
    name: 'Freeform',
    icon: Freeform,
    programType: ProgramType.FREEFORM,
  },
  [ProgramType.HOME]: {
    name: 'Home',
    icon: Home,
    programType: ProgramType.HOME,
  },
  [ProgramType.CLOCK]: {
    name: 'Clock',
    icon: Clock,
    programType: ProgramType.CLOCK,
  },
  [ProgramType.XCODE]: {
    name: 'Xcode',
    icon: Xcode,
    programType: ProgramType.XCODE,
  },
  [ProgramType.LAUNCHPAD]: {
    name: '',
    icon: '',
    programType: ProgramType.FINDER,
  },
  [ProgramType.NEWS]: {
    name: '',
    icon: News,
    programType: ProgramType.NEWS,
  },
};

export const appCategoryMap: Record<string, string> = {
  [ProgramType.APP_STORE]: 'Productivity & Finance',
  [ProgramType.SAFARI]: 'Productivity & Finance',
  [ProgramType.MAILS]: 'Productivity & Finance',
  [ProgramType.CALENDAR]: 'Productivity & Finance',
  [ProgramType.REMINDERS]: 'Productivity & Finance',
  [ProgramType.NOTES]: 'Productivity & Finance',
  [ProgramType.WEATHER]: 'Productivity & Finance',
  [ProgramType.STOCKS]: 'Productivity & Finance',
  [ProgramType.KEYNOTE]: 'Productivity & Finance',
  [ProgramType.NUMBERS]: 'Productivity & Finance',
  [ProgramType.PAGES]: 'Productivity & Finance',
  [ProgramType.CHROME]: 'Productivity & Finance',

  [ProgramType.VSCODE]: 'Developer Tools',
  [ProgramType.TERMINAL]: 'Developer Tools',
  [ProgramType.GITHUB]: 'Developer Tools',
  [ProgramType.XCODE]: 'Developer Tools',

  [ProgramType.FINDER]: 'Utilities',
  [ProgramType.SETTINGS]: 'Utilities',
  [ProgramType.BIN]: 'Utilities',
  [ProgramType.MAPS]: 'Utilities',
  [ProgramType.FIND_MY]: 'Utilities',
  [ProgramType.PREVIEW]: 'Utilities',
  [ProgramType.VOICE_MEMOS]: 'Utilities',
  [ProgramType.DICTIONARY]: 'Utilities',
  [ProgramType.CALCULATOR]: 'Utilities',
  [ProgramType.HOME]: 'Utilities',
  [ProgramType.CLOCK]: 'Utilities',

  [ProgramType.SPOTIFY]: 'Entertainment',
  [ProgramType.PHOTO_BOOTH]: 'Entertainment',
  [ProgramType.MUSIC]: 'Entertainment',
  [ProgramType.PODCASTS]: 'Entertainment',
  [ProgramType.TV]: 'Entertainment',

  [ProgramType.CONTACTS]: 'Social',
  [ProgramType.FACE_TIME]: 'Social',
  [ProgramType.MESSAGES]: 'Social',

  [ProgramType.PHOTOS]: 'Creativity',
  [ProgramType.GARAGE_BAND]: 'Creativity',
  [ProgramType.I_MOVIE]: 'Creativity',
  [ProgramType.FREEFORM]: 'Creativity',

  [ProgramType.BOOKS]: 'Information & Reading',
  [ProgramType.NEWS]: 'Information & Reading',
};

export const categories = [
  'All',
  'Productivity & Finance',
  'Developer Tools',
  'Utilities',
  'Entertainment',
  'Social',
  'Creativity',
  'Information & Reading',
];

