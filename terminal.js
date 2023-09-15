// DOM Elements
const inputField = document.getElementById('inputField');
const terminal = document.getElementById('terminal');
const cursor = document.getElementById('cursor');

// Command History
const getCommandHistory = () =>
  JSON.parse(localStorage.getItem('commandHistory')) || [];
let commandHistory = getCommandHistory();
let outputHistory = [];
let historyIndex = commandHistory.length;

// Commands
const commands = {
  help: 'List of commands: help, clear, echo, exit',
  clear: clearTerminal,
  echo: echoInput,
  exit: exitWindow,
  '': '',
};

// Command Functions
function clearTerminal() {
  const outputList = document.getElementById('outputList');
  outputList.innerHTML = '';
  return 'Terminal cleared!';
}

function echoInput(...input) {
  return input.join(' ');
}

function exitWindow() {
  window.close();
}

// Command History Functions
function saveCommandToHistory(input) {
  commandHistory.push(input);
  localStorage.setItem('commandHistory', JSON.stringify(commandHistory));
  historyIndex = commandHistory.length;
}

// Command Execution
function executeCommand(input, output) {
  const inputElement = createNewElement('p', `$ ${input}`);
  let commandOutput = 'Command not found';

  const commandInput = input.split(' ')[0];
  const properties = input.split(' ');

  if (commands.hasOwnProperty(commandInput)) {
    console.log(commandInput, properties);
    properties.shift();
    const command = commands[commandInput];
    commandOutput =
      typeof command === 'function' ? command(...properties) : command;
  }

  const outputElement = createNewElement('p', commandOutput);
  appendElementsToOutput(output, inputElement, outputElement);
  outputHistory.push(outputElement.textContent);
}

// DOM Manipulation
function createNewElement(tag, text) {
  const element = document.createElement(tag);
  element.textContent = text;
  return element;
}

function appendElementsToOutput(output, inputElement, outputElement) {
  output.appendChild(inputElement).classList.add('input');
  output.appendChild(outputElement).classList.add('output');
}

// History Navigation
function navigateHistoryUp(input) {
  if (historyIndex > 0) {
    historyIndex--;
    const value = commandHistory[historyIndex];
    input.value = value;
    input.setSelectionRange(value.length, value.length);
  }
}

function navigateHistoryDown(input) {
  if (historyIndex < commandHistory.length - 1) {
    historyIndex++;
    const value = commandHistory[historyIndex];
    input.value = value;
    input.setSelectionRange(value.length, value.length);
  } else {
    input.value = '';
  }
}

function handleKeyDown(e) {
  const input = e.target.value.trim();
  const output = document.getElementById('outputList');

  if (e.key === 'Enter') {
    handleEnterKey(input, output, e);
  } else if (e.key === 'ArrowUp') {
    handleArrowUpKey(e);
  } else if (e.key === 'ArrowDown') {
    handleArrowDownKey(e);
  } else if (e.key === 'ArrowRight') {
    e.preventDefault();
  } else if (e.key === 'ArrowLeft') {
    e.preventDefault();
  }
}

function handleEnterKey(input, output, e) {
  if (input !== '') {
    saveCommandToHistory(input);
    executeCommand(input, output);
  } else {
    executeCommand(input, output);
  }
  cursor.style.left = `0ch`;
  e.target.value = '';
  terminal.scrollTop = terminal.scrollHeight;
}

function handleArrowUpKey(e) {
  e.preventDefault();
  navigateHistoryUp(e.target);
  cursor.style.left = `${inputField.value.length * 1.12}ch`;
}

function handleArrowDownKey(e) {
  e.preventDefault();
  navigateHistoryDown(e.target);
  cursor.style.left = `${inputField.value.length * 1.12}ch`;
}

function setCursorInitialPosition() {
  const { left, bottom } = inputField.getBoundingClientRect();
  console.log(left, bottom);
  cursor.style.transform = `translate(${left + 1}px, ${bottom - 66}px)`;
}

// Initialization
function initialize() {
  const username = 'visitor'; // Replace with actual username
  const hostname = location.hostname; // Get the IP of the web page this is running on
  const directory = window.location.pathname; // Get the current path of the web page
  const promptStartElement = document.getElementById('inputStart');
  promptStartElement.innerHTML = `[${username}@${hostname} ${directory}]$ `;

  inputField.style.width = `calc(100% - ${promptStartElement.offsetWidth}px)`;
  setCursorInitialPosition();

  // Event Listeners
  inputField.addEventListener('keydown', handleKeyDown);

  // Make #cursor element always follow the text value end of the #inputField element
  inputField.addEventListener('input', () => {
    cursor.style.left = `${inputField.value.length * 1.12}ch`;
  });

  //// Make cursor flash with white background when inputting is activated
  //inputField.addEventListener('focus', () => {
  //  cursor.style.animation = 'none';
  //});
  //
  //// Stop cursor from flashing and remove white background when inputting is deactivated
  //inputField.addEventListener('blur', () => {
  //  cursor.style.animation = 'blink 1.3s step-end infinite';
  //});

  terminal.addEventListener('click', () => {
    inputField.focus();
  });
}

// Window Load
window.onload = initialize;
