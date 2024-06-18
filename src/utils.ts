import fs from 'node:fs';

export function isPathLike(data: any): data is fs.PathLike {
    return (
        typeof data === 'string' ||
        data instanceof Buffer ||
        data instanceof URL
    );
}
