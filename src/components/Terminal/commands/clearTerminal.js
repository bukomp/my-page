import { clearOutputHistory } from '../../../reducers/outputReducer';

// Command Functions
const ClearTerminal = (dispatch) => {
  dispatch(clearOutputHistory());
  return '**clear**';
};

export default ClearTerminal;
