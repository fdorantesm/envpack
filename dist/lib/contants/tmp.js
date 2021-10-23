"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SEP = exports.TMP = exports.TMP_DIRNAME = void 0;
var path = require("path");
exports.TMP_DIRNAME = '.tmp';
exports.TMP = path.join(process.cwd(), "" + exports.TMP_DIRNAME);
exports.SEP = path.sep;
//# sourceMappingURL=tmp.js.map