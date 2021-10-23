import { EMOJIS } from "../contants/emojis";
import { execSync } from 'child_process';
import * as chalk from 'chalk';

export function printPostInstall() {
  const dim = print('dim');
  const yellow = print('yellow');
  const emptyLine = print();
  emptyLine();
  yellow(`Thanks for installing envpack ${EMOJIS.PRAY}`);
  dim('Please star the repository');
  dim('to help to maintain this package.');
  emptyLine();
  emptyLine();
  print('cyan')(
    `${chalk.bold(`${EMOJIS.PACKAGE} Envpack`)} ${chalk.underline('https://github.com/fdorantesm/envpack')}`,
  );
  emptyLine();
};

export function print(color: string | null = null) {
  return function (str = '', pad = true) {
    const terminalCols = retrieveCols();
    const strLength = str.replace(/\u001b\[[0-9]{2}m/g, '').length;
    const leftPaddingLength = Math.floor((terminalCols - strLength) / 2);
    const leftPadding = ' '.repeat(Math.max(leftPaddingLength, 0));
    if (color) {
      str = (chalk as any)[color](str);
    }
    console.log(pad ? leftPadding : '', str);
  }
}

export function retrieveCols() {
  const defaultCols = 80;
  try {
    const terminalCols = execSync('tput cols', {
      stdio: ['pipe', 'pipe', 'ignore'],
    });
    return parseInt(terminalCols.toString(), 10) || defaultCols;
  } catch {
    return defaultCols;
  }
};