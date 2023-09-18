import { useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { saveToCommandHistory } from '../../../reducers/commandReducer';
import { saveToOutputHistory } from '../../../reducers/outputReducer';
import commandDeclarations from '../commands/commandDeclarations';

/**
 * Custom hook for focus management
 * @returns {Array} An array containing a ref to an HTML element and a function to set focus to that element
 */
const useFocus = () => {
  const htmlElRef = useRef(null);
  const setFocus = () => {
    htmlElRef.current?.focus();
  };
  return [htmlElRef, setFocus];
};

/**
 * Component for terminal input
 * @returns {JSX.Element} The rendered JSX element
 */
const TerminalInput = () => {
  const dispatch = useDispatch();
  const username = 'visitor';
  const hostname = window.location.host;
  const directory = window.location.pathname;

  const commandHistory = useSelector((state) => state.commandHistory);
  const [historyIndex, setHistoryIndex] = useState(commandHistory.length);
  const [currentInputValue, setCurrentInputValue] = useState('');

  const [inputRef, setInputFocus] = useFocus();

  useEffect(() => {
    setHistoryIndex(commandHistory.length);
  }, [commandHistory]);

  /**
   * Save command to history and update history index
   * @param {string} input The command to save
   */
  const saveCommandToHistory = (input) => {
    dispatch(saveToCommandHistory(input));
    setHistoryIndex(commandHistory.length);
  };

  /**
   * Execute command and save output to history
   * @param {string} input The command to execute
   */
  const executeCommand = (input) => {
    if (input === '') {
      return dispatch(saveToOutputHistory({ input: '', output: '' }));
    }
    let output = 'Command not found';
    const [commandInput, ...properties] = input.split(' ');
    if (commandDeclarations.hasOwnProperty(commandInput)) {
      const command = commandDeclarations[commandInput];
      output = command(dispatch, ...properties);
    }
    if (output !== '**clear**')
      dispatch(saveToOutputHistory({ input, output }));
  };

  /**
   * Navigate command history up
   * @param {Event} e The event object
   */
  const navigateHistoryUp = (e) => {
    if (historyIndex > 0) {
      const value = commandHistory[historyIndex - 1];
      e.target.setSelectionRange(value.length, value.length);
      setHistoryIndex(historyIndex - 1);
      setCurrentInputValue(value);
    }
  };

  /**
   * Navigate command history down
   * @param {Event} e The event object
   */
  const navigateHistoryDown = (e) => {
    if (historyIndex < commandHistory.length - 1) {
      const value = commandHistory[historyIndex + 1];
      e.target.setSelectionRange(value.length, value.length);
      setHistoryIndex(historyIndex + 1);
      setCurrentInputValue(value);
    } else {
      if (historyIndex === commandHistory.length - 1) {
        setHistoryIndex(historyIndex + 1);
      }
      setCurrentInputValue('');
    }
  };

  /**
   * Handle key down events
   * @param {Event} e The event object
   */
  const handleKeyDown = (e) => {
    const input = e.target.value.trim();
    switch (e.key) {
      case 'Enter':
        handleEnterKey(input);
        break;
      case 'ArrowUp':
        e.preventDefault();
        navigateHistoryUp(e);
        break;
      case 'ArrowDown':
        e.preventDefault();
        navigateHistoryDown(e);
        break;
      case 'ArrowRight':
      case 'ArrowLeft':
        e.preventDefault();
        break;
      default:
        break;
    }
  };

  /**
   * Handle enter key press
   * @param {string} input The input string
   */
  const handleEnterKey = (input) => {
    if (input !== '') {
      saveCommandToHistory(input);
      executeCommand(input);
    } else {
      executeCommand(input);
    }
    setCurrentInputValue('');
  };

  /**
   * Handle change events on the input field
   * @param {Event} e The event object
   */
  const handleOnChange = (e) => {
    setCurrentInputValue(e?.target?.value || '');
  };

  /**
   * Handle click events on the input line
   */
  const handleOnClick = () => {
    setInputFocus();
  };

  return (
    <div id="inputLine" onClick={handleOnClick}>
      <span id="inputStart">{`[${username}@${hostname} ${directory}]$ `}</span>
      <input
        id="inputField"
        ref={inputRef}
        type="text"
        spellCheck="false"
        autoFocus
        onKeyDown={handleKeyDown}
        value={currentInputValue}
        style={{
          width: `${(currentInputValue?.length || 0) * 1.12}ch`,
        }}
        onChange={handleOnChange}
      />
      <div id="cursor"></div>
    </div>
  );
};

export default TerminalInput;
