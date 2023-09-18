import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './terminal.css';
import { setInitialCommandHistory } from '../../reducers/commandReducer';
import { setInitialState } from '../../reducers/appsListReducer';

import TerminalInput from './components/Input';
import TerminalOutput from './components/Output';

const Terminal = () => {
  const dispatch = useDispatch();
  const inputLineRef = useRef(null);
  const outputHistory = useSelector((state) => state.outputHistory);
  const openAppList = useSelector((state) => state.listOfAppsOpen);

  useEffect(() => {
    dispatch(setInitialCommandHistory());
    dispatch(setInitialState());
  }, [dispatch]);

  useEffect(() => {
    inputLineRef.current.scrollIntoView();
  }, [outputHistory, inputLineRef]);

  return (
    <div id="terminal">
      <div id="container">
        <TerminalOutput outputHistory={outputHistory} />
        <div ref={inputLineRef}>
          <TerminalInput />
        </div>

        {openAppList.map((app) => app.component)}
      </div>
    </div>
  );
};

export default Terminal;
