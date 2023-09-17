import { clearOutputHistory } from '../../../reducers/outputReducer';
import commandDeclarations from './commandDeclarations';

export const echoInput = (dispatch, ...input) => {
  return input.join(' ');
};

export const exitWindow = () => {
  window.close();
};

export const help = () => {
  return (
    <pre>{`List of commands:\n - ${Object.keys(commandDeclarations)
      .slice(1)
      .join('\n - ')}`}</pre>
  );
};

export const clearTerminal = (dispatch) => {
  dispatch(clearOutputHistory());
  return '**clear**';
};
