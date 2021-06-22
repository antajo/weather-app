module.exports = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testPathIgnorePatterns: [
    "<rootDir>/node_modules/",
    "<rootDir>/coverage",
    "<rootDir>/dist",
    "<rootDir>/__tests__/testHelper/",
  ],
  moduleDirectories: ["<rootDir>/node_modules", "<rootDir>/src"],
  moduleNameMapper: {
    "@src/(.*)": "<rootDir>/src/$1",
    "\\.scss$": "<rootDir>/__mocks__/styleMock.ts",
    "\\.css$": "<rootDir>/__mocks__/styleMock.ts",
    "\\.svg$": "<rootDir>/__mocks__/svgMock.ts",
  },
  coverageDirectory: "coverage",
  coveragePathIgnorePatterns: [
    "<rootDir>/src/index.tsx",
    "<rootDir>/src/reportWebVitals.ts",
  ],
  collectCoverageFrom: [
    "src/**/*.{js,jsx,ts,tsx}",
    "pages/**/*.{js,jsx,ts,tsx}",
  ],
  testMatch: ["<rootDir>/__tests__/**/*.{spec,test}.{js,jsx,ts,tsx}"],
  rootDir: "./",
  testEnvironment: "jsdom",
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
};
