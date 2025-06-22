module.exports = {
  projects: [
    {
      displayName: 'api',
      testMatch: ['<rootDir>/**/*.spec.ts'],
      moduleFileExtensions: ['js', 'json', 'ts'],
      rootDir: '.',
      transform: {
        '^.+\\.ts$': 'ts-jest',
      },
      collectCoverageFrom: ['**/*.(t|j)s'],
      coverageDirectory: '../../coverage/api',
      testEnvironment: 'node',
      setupFiles: ['<rootDir>/apps/api/src/test/setup.ts'],
      moduleNameMapper: {
        '^@api/(.*)$': '<rootDir>/apps/api/src/$1',
        '^@web/(.*)$': '<rootDir>/apps/web/src/$1',
        '^@tools/(.*)$': '<rootDir>/tools/$1',
        '^@dto/(.*)$': '<rootDir>/shared/dto/$1',
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
