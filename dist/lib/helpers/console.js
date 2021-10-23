"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.retrieveCols = exports.print = exports.printPostInstall = void 0;
var emojis_1 = require("../contants/emojis");
var child_process_1 = require("child_process");
var chalk = require("chalk");
function printPostInstall() {
    var dim = print('dim');
    var yellow = print('yellow');
    var emptyLine = print();
    emptyLine();
    yellow("Thanks for installing envpack " + emojis_1.EMOJIS.PRAY);
    dim('Please star the repository');
    dim('to help to maintain this package.');
    emptyLine();
    emptyLine();
    print('cyan')(chalk.bold(emojis_1.EMOJIS.PACKAGE + " Envpack") + " " + chalk.underline('https://github.com/fdorantesm/envpack'));
    emptyLine();
}
exports.printPostInstall = printPostInstall;
;
function print(color) {
    if (color === void 0) { color = null; }
    return function (str, pad) {
        if (str === void 0) { str = ''; }
        if (pad === void 0) { pad = true; }
        var terminalCols = retrieveCols();
        var strLength = str.replace(/\u001b\[[0-9]{2}m/g, '').length;
        var leftPaddingLength = Math.floor((terminalCols - strLength) / 2);
        var leftPadding = ' '.repeat(Math.max(leftPaddingLength, 0));
        if (color) {
            str = chalk[color](str);
        }
        console.log(pad ? leftPadding : '', str);
    };
}
exports.print = print;
function retrieveCols() {
    var defaultCols = 80;
    try {
        var terminalCols = (0, child_process_1.execSync)('tput cols', {
            stdio: ['pipe', 'pipe', 'ignore'],
        });
        return parseInt(terminalCols.toString(), 10) || defaultCols;
    }
    catch (_a) {
        return defaultCols;
    }
}
exports.retrieveCols = retrieveCols;
;
//# sourceMappingURL=console.js.map