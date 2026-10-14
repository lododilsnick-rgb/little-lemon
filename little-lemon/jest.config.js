const {defineConfig, mergeConfig} = require('jest');
const jestConfig = require('./jest.config');

module.exports = mergeConfig(
  jestConfig,
  defineConfig({
    // ... Specify options here.
  }),
);