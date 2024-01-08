module.exports = {
  preset: 'ts-jest',
  verbose: true,
  roots: ['<rootDir>'],
  setupFiles: ['./jest.setup.js'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testEnvironment: 'node',
  coverageDirectory: './coverage',
  moduleNameMapper: {
    '^@app/(.*)': '<rootDir>/src/$1',
    '^@base/(.*)': '<rootDir>/src/base/$1',
    '^@decorators/(.*)': '<rootDir>/src/common/decorators/$1',
    '^@auth/(.*)': '<rootDir>/src/auth/$1',
    '^@shared/(.*)': '<rootDir>/src/shared/$1',
    '^@common/(.*)': '<rootDir>/src/common/$1',
    '^@config/(.*)': '<rootDir>/src/config/$1',
    '^@models/(.*)': '<rootDir>/src/core/models/$1',
    '^@enums/(.*)': '<rootDir>/src/core/enums/$1',
    '^@dtos/(.*)': '<rootDir>/src/core/dto/$1',
    '^@mappers/(.*)': '<rootDir>/src/core/mappers/$1',
    '^@controllers/(.*)': '<rootDir>/src/rest/controllers/$1',
    '^@repositories/(.*)': '<rootDir>/src/core/repositories/$1',
    '^@services/(.*)': '<rootDir>/src/core/services/$1',
    '^@test/(.*)': '<rootDir>/tests/$1',
  },
  setupFilesAfterEnv: ['./tests/setup.ts'],
  collectCoverage: true,
  coverageReporters: ['json', 'text'],
  collectCoverageFrom: ['src/**/*.ts', '!**/node_modules/**', '!**/tests/**/*.ts'],
  coverageThreshold: {
    global: {
      branches: 0, // 70
      functions: 0, // 85
      lines: 0, // 80
      statements: 0, // 80
    },
  },
};
