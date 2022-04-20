module.exports = {
  preset: 'ts-jest',
  roots: ['<rootDir>'],
  testMatch: ['**/__tests__/**/*.+(ts|tsx|js)', '**/?(*.)+(spec|test).+(ts|tsx|js)'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.{js,jsx,ts,tsx}', '!**/*.d.ts', '!**/node_modules/**'],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.jest.json',
      isolatedModules: true,
    },
  },
  modulePaths: ['<rootDir>', 'src', 'node_modules', '.', '<rootDir>/node_modules'],
  moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx', 'd.ts', 'node'],
  moduleNameMapper: {
    '^@src/(.*)$': ['<rootDir>/src/$1'],
  },
  moduleDirectories: ['node_modules', '<rootDir>/node_modules', '.', 'src'],
}
