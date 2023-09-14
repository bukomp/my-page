const getCommandHistory = () =>
  JSON.parse(localStorage.getItem('commandHistory')) || [];
let commandHistory = getCommandHistory();
let outputHistory = [];
let historyIndex = commandHistory.length;

// Define the commands object
const commands = {
  help: 'List of commands: help, clear, echo, exit',
  clear: '',
  echo: (input) => input,
  exit: () => window.close(),
};

const handleEnterKey = (input, output) => {
  // Only save non-empty commands to history
  if (input !== '') {
    commandHistory.push(input);
    localStorage.setItem('commandHistory', JSON.stringify(commandHistory));
    historyIndex = commandHistory.length;
  }

  // Create new elements for input and output
  let inputElement = document.createElement('p');
  let outputElement = document.createElement('p');

  // Set the text of the input element
  inputElement.textContent = `$ ${input}`;

  if (commands.hasOwnProperty(input)) {
    const command = commands[input];
    if (typeof command === 'function') {
      const commandOutput = command(input);
      outputElement.textContent = commandOutput;
    } else {
      outputElement.textContent = command;
    }
  } else {
    outputElement.textContent = 'Command not found';
  }

  // Append the new elements to the output

  output.appendChild(inputElement).classList.add('input');
  output.appendChild(outputElement).classList.add('output');

  // Save the output to history
  outputHistory.push(outputElement.textContent);
};

const handleArrowUpKey = (input) => {
  if (historyIndex > 0) {
    historyIndex--;
    input.value = commandHistory[historyIndex];
  }
};

const handleArrowDownKey = (input) => {
  if (historyIndex < commandHistory.length - 1) {
    historyIndex++;
    input.value = commandHistory[historyIndex];
  } else {
    input.value = '';
  }
};

document.getElementById('inputField').addEventListener('keydown', (e) => {
  const input = e.target.value.trim();
  const output = document.getElementById('outputList');

  if (e.key === 'Enter') {
    handleEnterKey(input, output);
    e.target.value = '';
  } else if (e.key === 'ArrowUp') {
    handleArrowUpKey(e.target);
  } else if (e.key === 'ArrowDown') {
    handleArrowDownKey(e.target);
  }
});

// Display the initial prompt
const displayPrompt = () => {
  const username = 'visitor'; // Replace with actual username
  const hostname = location.hostname; // Get the IP of the web page this is running on
  const directory = window.location.pathname; // Get the current path of the web page
  document.getElementById(
    'promptStart'
  ).innerHTML = `[${username}@${hostname} ${directory}]$ `;
};

// Call the displayPrompt function when the page loads
window.onload = displayPrompt;
