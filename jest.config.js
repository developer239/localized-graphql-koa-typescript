module.exports = {
  "setupTestFrameworkScriptFile": "<rootDir>/__tests__/_utils/init.ts",
  'moduleFileExtensions': ['js', 'jsx', 'json', 'ts', 'tsx'],
  'verbose': true,
  'collectCoverage': false,
  'collectCoverageFrom': [
    '**/*.{ts,js}',
    '!**/node_modules/**',
    '!**/build/**',
    '!**/coverage/**',
    '!jest.config.js',
    '!knexfile.ts',
    '!**/src/database/sql/migrations/**',
    '!**/src/database/sql/models/**',
    '!**/src/database/sql/seeds/**',
  ],
  'transform': {
    '\\.ts$': 'ts-jest',
  },
  'coverageThreshold': {
    'global': {
      'branches': 80,
      'functions': 80,
      'lines': 80,
      'statements': 80,
    },
  },
  'coverageReporters': [
    'text',
    'text-summary',
  ],
  'testRegex': '\\.test\\.(js|ts)x?$',
  'testPathIgnorePatterns': [
    '/node_modules/',
    '/build/',
    '/coverage/',
  ],
  'moduleDirectories': [
    'node_modules',
    'src'
  ],
  "moduleNameMapper": {
    "^~/(.*)$": "<rootDir>/src/$1",
    "^~test/(.*)$": "<rootDir>/__tests__/$1",
    "^~mock/(.*)$": "<rootDir>/__mocks__/$1"
  }
};
