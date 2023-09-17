import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './terminal.css';

import commandDeclarations from './commands/commandDeclarations';
import {
  saveToCommandHistory,
  setInitialCommandHistory,
} from '../../reducers/commandReducer';
import { saveToOutputHistory } from '../../reducers/outputReducer';

const useFocus = () => {
  const htmlElRef = useRef(null);
  const setFocus = () => {
    htmlElRef.current && htmlElRef.current.focus();
  };

  return [htmlElRef, setFocus];
};

const Terminal = () => {
  const dispatch = useDispatch();

  // DOM Elements
  const [inputRef, setInputFocus] = useFocus();

  // Command History
  const commandHistory = useSelector((state) => state.commandHistory);
  const outputHistory = useSelector((state) => state.outputHistory);
  const [historyIndex, setHistoryIndex] = useState(commandHistory.length);
  const [currentInputValue, setCurrentInputValue] = useState('');

  const username = 'visitor';
  const hostname = window.location.host;
  const directory = window.location.pathname;

  useEffect(() => {
    dispatch(setInitialCommandHistory());
  }, [dispatch]);

  useEffect(() => {
    setHistoryIndex(commandHistory.length);
  }, [commandHistory]);

  useEffect(() => {
    inputRef.current.scrollIntoView();
  }, [outputHistory, inputRef]);

  // Command History Functions
  function saveCommandToHistory(input) {
    dispatch(saveToCommandHistory(input));
    setHistoryIndex(commandHistory.length);
  }

  // Command Execution
  function executeCommand(input) {
    if (input === '') {
      return dispatch(saveToOutputHistory({ input: '', output: '' }));
    }

    let output = 'Command not found';

    const commandInput = input.split(' ')[0];
    const properties = input.split(' ');

    if (commandDeclarations.hasOwnProperty(commandInput)) {
      properties.shift();
      const command = commandDeclarations[commandInput];
      output = command(dispatch, ...properties);
    }

    if (output !== '**clear**')
      dispatch(saveToOutputHistory({ input, output }));
  }

  // History Navigation
  function navigateHistoryUp(e) {
    if (historyIndex > 0) {
      const value = commandHistory[historyIndex - 1];
      e.target.setSelectionRange(value.length, value.length);
      setHistoryIndex(historyIndex - 1);
      setCurrentInputValue(value);
    }
  }

  function navigateHistoryDown(e) {
    if (historyIndex < commandHistory.length - 1) {
      const value = commandHistory[historyIndex + 1];
      e.target.setSelectionRange(value.length, value.length);
      setHistoryIndex(historyIndex + 1);
      setCurrentInputValue(value);
    } else {
      setCurrentInputValue('');
    }
  }

  function handleKeyDown(e) {
    const input = e.target.value.trim();

    if (e.key === 'Enter') {
      handleEnterKey(input);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      navigateHistoryUp(e);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      navigateHistoryDown(e);
    } else if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      e.preventDefault();
    }
  }

  function handleEnterKey(input) {
    if (input !== '') {
      saveCommandToHistory(input);
      executeCommand(input);
    } else {
      executeCommand(input);
    }
    setCurrentInputValue('');
  }

  return (
    <div
      id="terminalContainer"
      onClick={() => {
        setInputFocus();
      }}
    >
      <div id="terminal">
        <div id="outputList">
          {outputHistory.map((ioCombination, index) => (
            <div key={index}>
              <p className={'input'}>$ {ioCombination.input}</p>
              <div className={'output'}>{ioCombination.output}</div>
            </div>
          ))}
        </div>
        <div id="inputLine">
          <span id="inputStart">
            {`[${username}@${hostname} ${directory}]$ `}
          </span>
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
            onChange={(e) => {
              setCurrentInputValue(e?.target?.value || '');
            }}
          />
          <div id="cursor"></div>
        </div>
      </div>
    </div>
  );
};

export default Terminal;
