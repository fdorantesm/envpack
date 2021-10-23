#!/usr/bin/env node
import { Command } from 'commander';
import { importFiles } from './lib/actions/import';
import { exportFiles } from './lib/actions/export';

const program = new Command();

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
