const TerminalInput = ({
  inputRef,
  handleKeyDown,
  currentInputValue,
  handleOnChange,
  username,
  hostname,
  directory,
}) => (
  <div id="inputLine">
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

export default TerminalInput;
