const inputField = document.getElementById('inputField');
const terminal = document.getElementById('terminal');
const cursor = document.getElementById('cursor');

const getCommandHistory = () =>
  JSON.parse(localStorage.getItem('commandHistory')) || [];

let commandHistory = getCommandHistory();
let outputHistory = [];
let historyIndex = commandHistory.length;

const commands = {
  help: 'List of commands: help, clear, echo, exit',
  clear: () => {
    const outputList = document.getElementById('outputList');
    outputList.innerHTML = '';
    return 'Terminal cleared!';
  },
  echo: (input) => input,
  exit: () => window.close(),
  '': '',
};

function saveCommandToHistory(input) {
  commandHistory.push(input);
  localStorage.setItem('commandHistory', JSON.stringify(commandHistory));
  historyIndex = commandHistory.length;
}

function executeCommand(input, output) {
  const inputElement = createNewElement('p', `$ ${input}`);
  let commandOutput = 'Command not found';

  if (commands.hasOwnProperty(input)) {
    const command = commands[input];
    commandOutput = typeof command === 'function' ? command(input) : command;
  }

  const outputElement = createNewElement('p', commandOutput);
  appendElementsToOutput(output, inputElement, outputElement);
  outputHistory.push(outputElement.textContent);
}

function createNewElement(tag, text) {
  const element = document.createElement(tag);
  element.textContent = text;
  return element;
}

function appendElementsToOutput(output, inputElement, outputElement) {
  output.appendChild(inputElement).classList.add('input');
  output.appendChild(outputElement).classList.add('output');
}

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

inputField.addEventListener('keydown', (e) => {
  const input = e.target.value.trim();
  const output = document.getElementById('outputList');

  if (e.key === 'Enter') {
    if (input !== '') {
      saveCommandToHistory(input);
      executeCommand(input, output);
    } else {
      executeCommand(input, output);
    }
    cursor.style.left = `0ch`;
    e.target.value = '';
    terminal.scrollTop = terminal.scrollHeight;
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    navigateHistoryUp(e.target);
    cursor.style.left = `${inputField.value.length * 1.205}ch`;
  } else if (e.key === 'ArrowDown') {
    e.preventDefault();
    navigateHistoryDown(e.target);
    cursor.style.left = `${inputField.value.length * 1.205}ch`;
  } else if (e.key === 'ArrowRight') {
    e.preventDefault();

    //cursor.style.left =
    //  inputField.value.length ===
    //  Math.round(cursor.style.left.split('ch')[0] / 1.205)
    //    ? cursor.style.left
    //    : +cursor.style.left.split('ch')[0] + 1 * 1.205 + 'ch';
  } else if (e.key === 'ArrowLeft') {
    e.preventDefault();

    //cursor.style.left =
    //  inputField.value.length === 0 ||
    //  +cursor.style.left.split('ch')[0] - 1 <= 0
    //    ? cursor.style.left
    //    : +cursor.style.left.split('ch')[0] - 1 * 1.205 + 'ch';
  }
});

function displayInitialPrompt() {
  const username = 'visitor'; // Replace with actual username
  const hostname = location.hostname; // Get the IP of the web page this is running on
  const directory = window.location.pathname; // Get the current path of the web page
  const promptStartElement = document.getElementById('inputStart');
  promptStartElement.innerHTML = `[${username}@${hostname} ${directory}]$ `;

  inputField.style.width = `calc(100% - ${promptStartElement.offsetWidth}px)`;

  // Make #cursor element always follow the text value end of the #inputField element
  inputField.addEventListener('input', () => {
    cursor.style.left = `${inputField.value.length * 1.205}ch`;
  });

  // Make cursor flash with white background when inputting is activated
  inputField.addEventListener('focus', () => {
    cursor.style.animation = 'none';
  });

  // Stop cursor from flashing and remove white background when inputting is deactivated
  inputField.addEventListener('blur', () => {
    cursor.style.animation = 'blink 1.3s step-end infinite';
  });
}

window.onload = displayInitialPrompt;
