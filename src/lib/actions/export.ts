import path = require("path");
import { TMP } from "../contants/tmp";
import { readFiles, rmdir } from "../helpers/files";
import { compress } from "../helpers/zip";
import * as fs from 'fs';
import { print } from "../helpers/console";
import chalk = require("chalk");

export async function exportFiles(filename: string) {
  const files = await readFiles('**/.env*');
  files.map((file) => {
    const isDepth = file.split(path.sep);
    if (isDepth) {
      const dirname = `${TMP}/${file.replace(/\.env.*/, '')}`;
      fs.mkdirSync(dirname, {
        recursive: true
      });
      fs.copyFileSync(file, path.join(TMP, file));
      print('yellow')(`${chalk.bold('COPIED')} ${process.cwd()}/${file}`, false);
    }
  });
  await compress(TMP, filename);
  rmdir(TMP);
  print('green')(`${chalk.bold('CREATED')} ${process.cwd()}/${filename}`, false);
}