// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ['dist/tractjs.js'],
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: ['node_modules/'],
  coverageReporters: ["text", "lcov"]
};
