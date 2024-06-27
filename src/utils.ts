import fs from 'node:fs';
import { FileSystemError, ValueError } from './errors.js';

export function parseUnixFileMode(mode: number): number {
    return Number.parseInt('0' + (mode & parseInt('777', 8)).toString(8));
}

export function isPathLike(path: any): path is fs.PathLike {
    return (
        typeof path === 'string' ||
        path instanceof Buffer ||
        path instanceof URL
    );
}

export function assertPathExists(path: any): asserts path is fs.PathLike {
    if (!isPathLike(path)) {
        throw new TypeError('This must be of type PathLike!');
    } else if (path === '') {
        throw new ValueError('This must not be an empty string!');
    } else if (!fs.existsSync(path)) {
        throw new FileSystemError(`Path "${path}" does not exist!`);
    }
}

export function assertPathIsFile(path: any): asserts path is fs.PathLike {
    assertPathExists(path);
    if (!fs.statSync(path).isFile()) {
        throw new FileSystemError(`Path "${path}" is not a file!`);
    }
}

export function assertPathIsDirectory(path: any): asserts path is fs.PathLike {
    assertPathExists(path);
    if (!fs.statSync(path).isDirectory()) {
        throw new FileSystemError(`Path "${path}" is not a directory!`);
    }
}
