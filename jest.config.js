module.exports = {
  preset: "ts-jest",
  roots: ["<rootDir>/src"],
  setupFiles: ["./jest.setup.js"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
  testEnvironment: "node",
  coverageDirectory: "../coverage",
  moduleNameMapper: {
    "^@App/(.*)": "<rootDir>/src/$1",
    "^@Test/(.*)": "<rootDir>/src/tests/$1"
  },
  setupFilesAfterEnv: ["./src/tests/setup.ts"],
  collectCoverageFrom: ["src/**/*.ts", "!**/node_modules/**", "!**/tests/**"],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 86,
      lines: 78,
      statements: 77
    }
  }
};
