const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

/** @type {import('jest').Config} */
const customJestConfig = {
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^@components/(.*)$': '<rootDir>/components/$1',
    '^next/image$': '<rootDir>/__mocks__/next/image.js',
    '^next/navigation$': '<rootDir>/__mocks__/next/navigation.ts',
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
    '^.+\\.(css|sass|scss)$': '<rootDir>/__mocks__/styleMock.js',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  collectCoverage: false,
  coverageProvider: 'v8',
  collectCoverageFrom: ['components/**/*.{ts,tsx}', 'app/**/*.{ts,tsx}', '!**/node_modules/**'],
};

module.exports = createJestConfig(customJestConfig);