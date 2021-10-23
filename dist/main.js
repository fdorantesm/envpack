#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var commander_1 = require("commander");
var import_1 = require("./lib/actions/import");
var export_1 = require("./lib/actions/export");
var program = new commander_1.Command();
program.option('-e, --export <filename>', 'Export env files');
program.option('-i, --import <filename>', 'Import env files');
program.parse(process.argv);
var options = program.opts();
if (options.export) {
    (0, export_1.exportFiles)(options.export);
}
if (options.import) {
    (0, import_1.importFiles)(options.import);
}
//# sourceMappingURL=main.js.map