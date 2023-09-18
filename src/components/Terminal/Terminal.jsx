import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './terminal.css';
import commandDeclarations from './commands/commandDeclarations';
import {
  saveToCommandHistory,
  setInitialCommandHistory,
} from '../../reducers/commandReducer';
import { saveToOutputHistory } from '../../reducers/outputReducer';

import TerminalInput from './components/Input';
import TerminalOutput from './components/Output';

// Custom hook for focus management
const useFocus = () => {
  const htmlElRef = useRef(null);
  const setFocus = () => {
    htmlElRef.current?.focus();
  };
  return [htmlElRef, setFocus];
};

const Terminal = () => {
  const dispatch = useDispatch();
  const [inputRef, setInputFocus] = useFocus();
  const commandHistory = useSelector((state) => state.commandHistory);
  const outputHistory = useSelector((state) => state.outputHistory);
  const [historyIndex, setHistoryIndex] = useState(commandHistory.length);
  const [currentInputValue, setCurrentInputValue] = useState('');
  const username = 'visitor';
  const hostname = window.location.host;
  const directory = window.location.pathname;

  // Initialize command history on component mount
  useEffect(() => {
    dispatch(setInitialCommandHistory());
  }, [dispatch]);

  // Update history index when command history changes
  useEffect(() => {
    setHistoryIndex(commandHistory.length);
  }, [commandHistory]);

  // Scroll to the latest command output
  useEffect(() => {
    inputRef.current.scrollIntoView();
  }, [outputHistory, inputRef]);

  // Save command to history and update history index
  const saveCommandToHistory = (input) => {
    dispatch(saveToCommandHistory(input));
    setHistoryIndex(commandHistory.length);
  };

  // Execute command and save output to history
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

  // Navigate command history up
  const navigateHistoryUp = (e) => {
    if (historyIndex > 0) {
      const value = commandHistory[historyIndex - 1];
      e.target.setSelectionRange(value.length, value.length);
      setHistoryIndex(historyIndex - 1);
      setCurrentInputValue(value);
    }
  };

  // Navigate command history down
  const navigateHistoryDown = (e) => {
    if (historyIndex < commandHistory.length - 1) {
      const value = commandHistory[historyIndex + 1];
      e.target.setSelectionRange(value.length, value.length);
      setHistoryIndex(historyIndex + 1);
      setCurrentInputValue(value);
    } else {
      setCurrentInputValue('');
    }
  };

  // Handle key down events
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

  // Handle enter key press
  const handleEnterKey = (input) => {
    if (input !== '') {
      saveCommandToHistory(input);
      executeCommand(input);
    } else {
      executeCommand(input);
    }
    setCurrentInputValue('');
  };

  const handleOnClick = () => {
    setInputFocus();
  };

  const handleOnChange = (e) => {
    setCurrentInputValue(e?.target?.value || '');
  };

  return (
    <div id="terminal">
      <div id="container" onClick={handleOnClick}>
        <TerminalOutput outputHistory={outputHistory} />
        <TerminalInput
          inputRef={inputRef}
          handleKeyDown={handleKeyDown}
          currentInputValue={currentInputValue}
          handleOnChange={handleOnChange}
          username={username}
          hostname={hostname}
          directory={directory}
        />
      </div>
    </div>
  );
};

export default Terminal;
