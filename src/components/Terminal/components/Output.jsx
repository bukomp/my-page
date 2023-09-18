const TerminalOutput = ({ outputHistory }) => {
  const outputItems = outputHistory.map((ioCombination, index) => (
    <OutputItem key={index} ioCombination={ioCombination} />
  ));
  return <div id="outputList">{outputItems}</div>;
};

const OutputItem = ({ ioCombination }) => (
  <div>
    <p className={'input'}>$ {ioCombination.input}</p>
    <div className={'output'}>{ioCombination.output}</div>
  </div>
);

export default TerminalOutput;
