"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uncompress = exports.compress = void 0;
var zip_a_folder_1 = require("zip-a-folder");
var unzip = require("extract-zip");
function compress(node, file) {
    return (0, zip_a_folder_1.zip)(node, file);
}
exports.compress = compress;
function uncompress(file, target) {
    return unzip(file, { dir: target });
}
exports.uncompress = uncompress;
//# sourceMappingURL=zip.js.map