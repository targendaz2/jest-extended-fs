import fs from 'node:fs';

export function isPathLike(data: any): data is fs.PathLike {
    return (
        typeof data === 'string' ||
        data instanceof Buffer ||
        data instanceof URL
    );
}

export function parseUnixFileMode(mode: number): number {
    return Number.parseInt('0' + (mode & parseInt('777', 8)).toString(8));
}
