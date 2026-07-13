module.exports = {
  verbose: true,
  globals: {
    'ts-jest': {
      isolatedModules: true,
    },
  },
  setupFilesAfterEnv: ['<rootDir>/jest.js'],
  roots: ['./'],
  testEnvironment: 'jsdom',
  coverageReporters: ['lcov'],
  coverageDirectory: './coverage',
  collectCoverageFrom: [
    'src/**/*.ts',
    'src/**/*.tsx',
    // exclude files from coverage
    '!src/**/index.ts',
    '!src/**/index.tsx',
    '!src/**/App.tsx',
    '!src/**/react-app-env.d.ts',
    '!src/**/reportWebVitals.ts',
    '!src/**/setupTests.ts',
  ],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  moduleDirectories: ['node_modules'],
  moduleNameMapper: {
    '^@assets$': '<rootDir>/src/assets',
    '^@assets/(.*)$': '<rootDir>/src/assets/$1',
    '@router': '<rootDir>/src/router',
    '@screens': '<rootDir>/src/screens',
    '@hooks': '<rootDir>/src/hooks',
    '@components': '<rootDir>/src/components',
    '@localization': '<rootDir>/src/localization',
    '@providers': '<rootDir>/src/providers',
    // UI store
    '@uiStore': '<rootDir>/src/store/uiStore',
    // Process store
    '@processStore': '<rootDir>/src/store/processStore',
    // Settings store
    '@settingsStore': '<rootDir>/src/store/settingsStore',
    // App store
    '@appStore': '<rootDir>/src/store/appStore',
    '^.+.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$':
      'jest-transform-stub',
  },
  transform: {
    '.+\\.(css|scss|png|jpg|jpeg|svg)$': 'jest-transform-stub',
    '^.+\\.(js|jsx|ts|tsx)$': 'ts-jest',
  },
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: -50,
    },
  },
};
