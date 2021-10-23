import * as fs from 'fs'
import * as path from 'path'
import chalk = require("chalk");
import { SEP, TMP, TMP_DIRNAME } from "../contants/tmp";
import { readFiles, rmdir } from "../helpers/files";
import { uncompress } from "../helpers/zip";
import { print } from "../helpers/console";

export async function importFiles(zip: string) {
  const dir = zip.replace('.zip', '');
  await uncompress(zip, TMP);
  const filenames = [];
  const files = await readFiles(TMP + '/**/.env*');
  print('yellow')(`${chalk.bold('USE')} ${process.cwd()}/${zip}`, false);
  for (const file of files) {
    const dest = file.replace(`${TMP_DIRNAME}${SEP}`, '');
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest.replace(/\.env.*/, ''), {recursive: true})
    }
    fs.renameSync(file, dest);
    filenames.push(dest);
    print('green')(`${chalk.bold('CREATED')} ${file.replace(TMP_DIRNAME + SEP, '').replace(`${path.resolve()}/`, '')}`, false);
  };
  rmdir(TMP);
}