import { zip } from 'zip-a-folder';
import * as unzip from 'extract-zip';

export function compress(node: string, file: string): Promise<void | Error> {
  return zip(node, file);
}

export function uncompress(file: string, target: string): Promise<void> {
  return unzip(file, { dir: target });
}