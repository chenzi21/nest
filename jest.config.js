module.exports = {
  projects: [
    {
      displayName: 'api',
      testMatch: ['<rootDir>/apps/api/src/**/*.spec.ts'],
      moduleFileExtensions: ['js', 'json', 'ts'],
      rootDir: '.',
      setupFilesAfterEnv: ['<rootDir>/apps/api/src/test/setup.ts'],
      transform: {
        '^.+\\.ts$': [
          'ts-jest',
          {
            tsconfig: '<rootDir>/tsconfig.base.json',
          },
        ],
      },
      collectCoverageFrom: ['**/*.(t|j)s'],
      coverageDirectory: 'coverage',
      testEnvironment: 'node',
      setupFiles: ['<rootDir>/apps/api/src/test/setup.ts'],
      moduleNameMapper: {
        '^@api/(.*)$': '<rootDir>/apps/api/src/$1',
        '^@web/(.*)$': '<rootDir>/apps/web/src/$1',
        '^@tools/(.*)$': '<rootDir>/tools/$1',
        '^@schema/(.*)$': '<rootDir>/shared/schema/$1',
      },
    },
  ],
};
