module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@src/(.*)$': '<rootDir>/src/$1',
  },
  testRegex: '__tests__/.*tests?\.tsx?$',
  roots: ['<rootDir>/src/'],
};
