module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleNameMapper: {
      "@server/(.*)": "<rootDir>/src/$1"
    },
  };