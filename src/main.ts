#!/usr/bin/env node
import * as glob from 'glob';
import * as fs from 'fs';
import * as path from 'path';
import { zip } from 'zip-a-folder';
import { Command } from 'commander';
import * as rimraf from 'rimraf';
import * as unzip from 'extract-zip';

const program = new Command();
const TMP_DIRNAME = '.tmp'
const TMP = path.join(process.cwd(), `${TMP_DIRNAME}`);

program.option('-e, --export <filename>', 'Export env files');
program.option('-i, --import <filename>', 'Import env files');

program.parse(process.argv);

const options = program.opts();

if (options.export) {
  exportFiles(options.export);
}

if (options.import) {
  importFiles(options.import);
}

async function importFiles(zip: string) {
  const dir = zip.replace('.zip', '');
  await uncompress(zip, TMP);
  console.log(TMP + '/**/*.env*')
  const files = await readFiles(TMP + '/**/.env*');
  for (const file of files) {
    const dest = file.replace(`${TMP_DIRNAME}${path.sep}`, '');
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest.replace(/\.env.*/, ''), {recursive: true})
    }
    fs.renameSync(file, dest);
  };
  rmdir(TMP);
}

async function exportFiles(filename: string) {
  const files = await readFiles('**/.env*');
  files.map((file) => {
    const isDepth = file.split(path.sep);
    if (isDepth) {
      const dirname = TMP + file.replace(/\.env.*/, '');
      fs.mkdirSync(dirname, {
        recursive: true
      });
      fs.copyFileSync(file, path.join(TMP, file));
    }
  });
  await compress(TMP, filename);
  rmdir(TMP);
}

function readFiles(pattern: string): Promise<string[]> {
  return new Promise((resolve, reject) => {
    glob(pattern, {}, (error, files) => {
      if (error) {
        reject(error);
      }
      resolve(files);
    });
  });
}

function rmdir(node: string) {
  return rimraf.sync(node);
}

function compress(node: string, file: string): Promise<void | Error> {
  return zip(node, file);
}

function uncompress(file: string, target: string): Promise<void> {
  return unzip(file, { dir: target });
}
