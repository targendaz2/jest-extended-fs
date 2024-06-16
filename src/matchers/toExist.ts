import fs from 'node:fs';
import { URL } from 'node:url';
import { MatcherFunction } from 'expect';
import { ValueError } from '../errors.js';

const toExist: MatcherFunction = (actual) => {
    if (
        !(typeof actual === 'string') &&
        !(actual instanceof Buffer) &&
        !(actual instanceof URL)
    ) {
        throw new TypeError('This must be of type PathLike!');
    } else if (actual === '') {
        throw new ValueError('This must not be an empty string!');
    }

    const pass = fs.existsSync(actual);
    return {
        pass,
        message: pass
            ? () => `expected "${actual}" not to exist`
            : () => `expected "${actual}" to exist`,
    };
};

export default toExist;
