export enum ProgramType {
  FINDER = 'finder',
  NOTES = 'notes',
  CHROME = 'chrome',
  VSCODE = 'vscode',
  TERMINAL = 'terminal',
  SPOTIFY = 'spotify',
  GITHUB = 'github',
  SETTINGS = 'settings',
  BIN = 'bin',
  LAUNCHPAD = 'launchPad',
  // Add new app here
  APP_STORE = 'appStore',
  SAFARI = 'safari',
  MAILS = 'mails',
  CONTACTS = 'contacts',
  CALENDAR = 'calendar',
  REMINDERS = 'reminders',
  FACE_TIME = 'faceTime',
  MESSAGES = 'messages',
  MAPS = 'maps',
  FIND_MY = 'findMy',
  PHOTO_BOOTH = 'photoBooth',
  PHOTOS = 'photos',
  PREVIEW = 'preview',
  MUSIC = 'music',
  PODCASTS = 'podcasts',
  TV = 'tv',
  VOICE_MEMOS = 'voiceMemos',
  NEWS = 'news',
  STOCKS = 'stocks',
  GARAGE_BAND = 'garageBand',
  I_MOVIE = 'iMovie',
  HOME = 'home',
  CLOCK = 'clock',
  CALCULATOR = 'calculator',
  FREEFORM = 'freeform',
  BOOKS = 'books',
  DICTIONARY = 'dictionary',
  WEATHER = 'weather',
  KEYNOTE = 'keynote',
  NUMBERS = 'numbers',
  PAGES = 'pages',
  XCODE = 'xcode',
}

export enum WindowSize {
  DEFAULT = 'default',
  HIDE = 'hide',
  MAX = 'max',
  FULL_SCREEN = 'fullScreen',
}

export type AppState = {
  size: WindowSize;
  position: {
    x: number;
    y: number;
  };
  /** Monotonically-increasing value — higher = in front */
  zIndex: number;
};

export type ActiveAppsState = {
  activeApp: ProgramType;
  apps: Record<ProgramType, AppState | undefined>;
  /** Global z-index counter; incremented on every bringToFront call */
  zCounter: number;
};

export interface ActiveAppsAction {
  /**
   * Make app active
   * @param type - type of app
   * @returns void
   */
  makeAppActive: (type: ProgramType) => void;

  /**
   * Make default app active
   * @param type - type of app
   */
  makeDefaultAppActive: (type: ProgramType) => void;

  /**
   * Add app to active apps
   * @param type - type of app
   * @returns void
   */
  addApp: (type: ProgramType) => void;

  /**
   * Remove app from active apps
   * @param type - type of app
   * @returns void
   */
  removeApp: (type: ProgramType) => void;

  /**
   * Set app to hide
   * @param type - type of app
   *
   * @returns void
   */
  setWindowSize: (type: ProgramType, size: WindowSize) => void;

  /**
   * Update position of app
   * @param type - type of app
   * @returns void
   */
  updatePosition: (
    type: ProgramType,
    position: { x: number; y: number },
  ) => void;

  /**
   * Bring a window to the front by giving it the highest z-index
   * @param type - type of app
   */
  bringToFront: (type: ProgramType) => void;

  /**
   * Clear all apps
   * @returns void
   */
  clearAllActiveApps: () => void;
}
export type ActiveAppsSlice = ActiveAppsState & ActiveAppsAction;
