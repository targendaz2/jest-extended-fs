import fs from 'node:fs';
import path from 'node:path';
import tmp from 'tmp';

export function createTmpDir(contents?: Record<string, string | null>): string {
    const tmpDir = tmp.dirSync().name;

    if (contents) {
        Object.entries(contents).forEach(([fileName, fileContent]) => {
            const filePath = path.join(tmpDir.toString(), fileName);

            if (path.extname(fileName)) {
                fs.writeFileSync(filePath, fileContent || '');
            } else {
                fs.mkdirSync(filePath);
            }
        });
    }

    return tmpDir;
}

export function createTmpFile(options?: {
    content?: string;
    mode?: number;
}): string {
    const tmpFile = tmp.fileSync().name;

    if (options) {
        if (options.content) {
            fs.writeFileSync(tmpFile, options.content);
        }

        if (options.mode) {
            fs.chmodSync(tmpFile, options.mode);
        }
    }

    return tmpFile;
}
