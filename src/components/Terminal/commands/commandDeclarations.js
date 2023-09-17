import { me } from './me';
import { help, clearTerminal, echoInput, exitWindow } from './utils';

const commandDeclarations = {
  help,
  clear: clearTerminal,
  echo: echoInput,
  exit: exitWindow,
  me: me,
};

export default commandDeclarations;
