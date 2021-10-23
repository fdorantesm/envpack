#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var glob = require("glob");
var fs = require("fs");
var path = require("path");
var zip_a_folder_1 = require("zip-a-folder");
var commander_1 = require("commander");
var rimraf = require("rimraf");
var unzip = require("extract-zip");
var program = new commander_1.Command();
var TMP_DIRNAME = '.tmp';
var TMP = path.join(process.cwd(), "" + TMP_DIRNAME);
program.option('-e, --export <filename>', 'Export env files');
program.option('-i, --import <filename>', 'Import env files');
program.parse(process.argv);
var options = program.opts();
if (options.export) {
    exportFiles(options.export);
}
if (options.import) {
    importFiles(options.import);
}
function importFiles(zip) {
    return __awaiter(this, void 0, void 0, function () {
        var dir, files, _i, files_1, file, dest;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    dir = zip.replace('.zip', '');
                    return [4 /*yield*/, uncompress(zip, TMP)];
                case 1:
                    _a.sent();
                    console.log(TMP + '/**/*.env*');
                    return [4 /*yield*/, readFiles(TMP + '/**/.env*')];
                case 2:
                    files = _a.sent();
                    for (_i = 0, files_1 = files; _i < files_1.length; _i++) {
                        file = files_1[_i];
                        dest = file.replace("" + TMP_DIRNAME + path.sep, '');
                        if (!fs.existsSync(dest)) {
                            fs.mkdirSync(dest.replace(/\.env.*/, ''), { recursive: true });
                        }
                        fs.renameSync(file, dest);
                    }
                    ;
                    rmdir(TMP);
                    return [2 /*return*/];
            }
        });
    });
}
function exportFiles(filename) {
    return __awaiter(this, void 0, void 0, function () {
        var files;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, readFiles('**/.env*')];
                case 1:
                    files = _a.sent();
                    files.map(function (file) {
                        var isDepth = file.split(path.sep);
                        if (isDepth) {
                            var dirname = TMP + file.replace(/\.env.*/, '');
                            fs.mkdirSync(dirname, {
                                recursive: true
                            });
                            fs.copyFileSync(file, path.join(TMP, file));
                        }
                    });
                    return [4 /*yield*/, compress(TMP, filename)];
                case 2:
                    _a.sent();
                    rmdir(TMP);
                    return [2 /*return*/];
            }
        });
    });
}
function readFiles(pattern) {
    return new Promise(function (resolve, reject) {
        glob(pattern, {}, function (error, files) {
            if (error) {
                reject(error);
            }
            resolve(files);
        });
    });
}
function rmdir(node) {
    return rimraf.sync(node);
}
function compress(node, file) {
    return (0, zip_a_folder_1.zip)(node, file);
}
function uncompress(file, target) {
    return unzip(file, { dir: target });
}
//# sourceMappingURL=main.js.map