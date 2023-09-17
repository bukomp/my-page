import ClearTerminal from './clearTerminal';

const echoInput = (dispatch, ...input) => {
  return input.join(' ');
};

const exitWindow = () => {
  window.close();
};

const help = () => {
  return 'List of commands: help, clear, echo, exit';
};
// Commands
const commandDeclarations = {
  help,
  clear: ClearTerminal,
  echo: echoInput,
  exit: exitWindow,
  '': () => '',
};

export default commandDeclarations;
