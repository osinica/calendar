module.exports = {
  presets: ["@babel/preset-typescript"],
  collectCoverageFrom: [
    "**/*.{js,jsx,ts,tsx}",
    "!**/*.d.ts",
    "!**/node_modules/**",
  ],
  moduleNameMapper: {
    // Handle absolute imports in Remix
    "~/(.*)": "<rootDir>/app/$1",
  },
  //setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testPathIgnorePatterns: [
    "<rootDir>/node_modules/",
    "<rootDir>/.cache/",
    "<rootDir>/build/",
  ],
  testEnvironment: "jsdom",
  transformIgnorePatterns: ["/node_modules/"],
};
