module.exports = {
  projects: [
    {
      displayName: 'api',
      testMatch: ['<rootDir>/**/*.spec.ts'],
      moduleFileExtensions: ['js', 'json', 'ts'],
      rootDir: './apps/api',
      transform: {
        '^.+\\.ts$': 'ts-jest',
      },
      collectCoverageFrom: ['**/*.(t|j)s'],
      coverageDirectory: '../../coverage/api',
      testEnvironment: 'node',
      setupFiles: ['<rootDir>/test/setup.ts'],
      moduleNameMapper: {
        '^@api/(.*)$': '<rootDir>/$1',
        '^@tools/(.*)$': '<rootDir>/../../tools/$1',
      },
    },
  ],
  collectCoverageFrom: [
    'apps/**/*.(t|j)s',
    '!apps/**/node_modules/**',
    '!apps/**/dist/**',
  ],
  coverageDirectory: './coverage',
};
