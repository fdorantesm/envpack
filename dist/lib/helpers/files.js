"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rmdir = exports.readFiles = void 0;
var glob = require("glob");
var rimraf = require("rimraf");
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
exports.readFiles = readFiles;
function rmdir(node) {
    return rimraf.sync(node);
}
exports.rmdir = rmdir;
//# sourceMappingURL=files.js.map