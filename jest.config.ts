module.exports = {
  roots: ['<rootDir>/src'],
  testTimeout: 10000,
  transform: {
    '^.+.tsx?$': 'ts-jest',
  },
  moduleFileExtensions: ['js', 'json', 'ts'],
  testRegex: '.*\\.spec\\.ts$',
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
  moduleDirectories: ['node_modules', 'src'],
  moduleNameMapper: {
    '@snapSystem/(.*)': '<rootDir>/src/snap-system/$1',
    '@common/(.*)': '<rootDir>/src/common/$1',
    '@models/(.*)': '<rootDir>/src/common/models/$1',
    '@globalModules/(.*)': '<rootDir>/src/global-modules/$1',
    '@sportModules/(.*)': '<rootDir>/src/sport-modules/$1',
    'src/(.*)': '<rootDir>/src/$1',
  },
};
