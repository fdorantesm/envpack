import * as glob from 'glob';
import * as rimraf from 'rimraf';

export function readFiles(pattern: string): Promise<string[]> {
  return new Promise((resolve, reject) => {
    glob(pattern, {}, (error, files) => {
      if (error) {
        reject(error);
      }
      resolve(files);
    });
  });
}

export function rmdir(node: string) {
  return rimraf.sync(node);
}