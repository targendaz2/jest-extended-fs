# jest-extended-fs

![GitHub License](https://img.shields.io/github/license/targendaz2/jest-extended-fs)
![GitHub Release](https://img.shields.io/github/v/release/targendaz2/jest-extended-fs?label=version)
![NPM Version](https://img.shields.io/npm/v/jest-extended-fs?logo=npm&logoColor=%23999999)
![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/targendaz2/jest-extended-fs/test.yml?logo=github&label=tests&logoColor=%23999999)

This package adds file system matchers to [Jest](https://jestjs.io).

## Installation

This package is available on npm as [`jest-extended-fs`](https://npmjs.com/package/jest-extended-fs).

```bash
npm install -D jest jest-extended-fs
```

## Set Up

Matchers from `jest-extended-fs` must be added to the [`setupFilesAfterEnv`](setupFilesAfterEnv) setting in your Jest configuration file.

### All Matchers

To enable all matchers, add `jest-extended-fs`.

### Individual Matchers

To enable any individual matcher, add `jest-extended-fs/matchers/{matcherName}.js`.

For example, `jest-extended-fs/matchers/toExist.js`.

## Matchers

### Common Matchers

- `.toExist()`

### Directory Matchers

- `.toBeADirectory()`
- `.toBeADirectoryContaining(contents)`
- `.toBeAnEmptyDirectory()`

### File Matchers

- `.toBeAFile()`
- `.toBeAFileContaining(text)`
- `.toBeAnEmptyFile()`
- `.toHaveMode(mode)`
- `.toBeExecutable()`

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

This package is licensed under the [MIT License](https://github.com/targendaz2/jest-extended-fs/blob/main/LICENSE).
