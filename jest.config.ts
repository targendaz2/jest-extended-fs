import { JestConfigWithTsJest } from 'ts-jest';

type ReporterConfig = Exclude<
  Required<JestConfigWithTsJest>['reporters'][number],
  string
>;

const reporters: (string | ReporterConfig)[] =
  process.env.CI === 'true'
    ? [['github-actions', { silent: false }], 'summary']
    : ['default'];

const config: JestConfigWithTsJest = {
  moduleFileExtensions: ['js', 'ts'],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  preset: 'ts-jest/presets/default-esm',
  reporters,
  testEnvironment: 'node',
  testRegex: '.+\\.test\\.ts$',
};

export default config;
