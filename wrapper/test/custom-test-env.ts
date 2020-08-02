const Environment = require('jest-environment-jsdom');

/**
 * A custom environment to set the TextEncoder and TextDecoder that are required by worker.js.
 * https://stackoverflow.com/questions/57712235/referenceerror-textencoder-is-not-defined-when-running-react-scripts-test
 */
module.exports = class CustomTestEnvironment extends Environment {
  async setup() {
    await super.setup();
    const { TextDecoder, TextEncoder } = require('util');
    this.global.TextDecoder = TextDecoder;
    this.global.TextEncoder = TextEncoder;
  }
}