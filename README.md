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

### Individual Matchers

In your Jest configuration file (e.g. `jest.config.ts`), do the following for each matcher you want to enable:

1. Import the matcher.

    ```TypeScript
    import 'jest-extended-fs/matchers/toBeAFile.js';
    ```

2. Add the matcher to the [`setupFilesAfterEnv`](setupFilesAfterEnv) setting.

    ```TypeScript
    const config = {
        setupFilesAfterEnv = ['jest-extended-fs/matchers/toBeAFile.js']
    };
    ```

### All Matchers

Follow the "Individual Matchers" instructions above using `jest-extended-fs` instead of any specific matcher.

```TypeScript
import 'jest-extended-fs';

const config = {
    setupFilesAfterEnv = ['jest-extended-fs']
};
```

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
