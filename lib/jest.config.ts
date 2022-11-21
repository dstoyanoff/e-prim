import { pathsToModuleNameMapper } from "ts-jest";
import tsConfig from "./tsconfig.json";

const config = {
  collectCoverage: true,
  coverageProvider: "v8",
  snapshotSerializers: ["@emotion/jest/serializer"],
  collectCoverageFrom: [
    "**/*.ts",
    "**/*.tsx",
    "!**/index.ts",
    "!**/*.config.ts",
    "!**/types.ts",
    "!dist/**",
    "!jest-setup-after-env.ts",
  ],
  coverageReporters: ["text-summary", "text"],
  testPathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/.next/"],
  testEnvironment: "node",
  moduleNameMapper: pathsToModuleNameMapper(tsConfig.compilerOptions.paths, { prefix: "<rootDir>" }),

  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": [
      "babel-jest",
      {
        presets: ["next/babel", "@emotion/babel-preset-css-prop"],
      },
    ],
  },
  transformIgnorePatterns: ["^.+\\.module\\.(css|sass|scss)$", "/node_modules/"],
};

export default config;
