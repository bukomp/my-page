import { useRef } from 'react';

// Custom hook for focus management
const useFocus = () => {
  const htmlElRef = useRef(null);
  const setFocus = () => {
    htmlElRef.current?.focus();
  };
  return [htmlElRef, setFocus];
};

const TerminalInput = ({
  handleKeyDown,
  currentInputValue,
  handleOnChange,
  username,
  hostname,
  directory,
}) => {
  const [inputRef, setInputFocus] = useFocus();

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
