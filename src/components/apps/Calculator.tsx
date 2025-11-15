import { useState } from 'react';

interface CalculatorProps {
  windowId: string;
  onClose: () => void;
}

const Calculator = ({ windowId, onClose }: CalculatorProps) => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);

  const inputNumber = (num: string) => {
    if (waitingForNewValue) {
      setDisplay(num);
      setWaitingForNewValue(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const inputOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForNewValue(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue: number, secondValue: number, operation: string): number => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '×':
        return firstValue * secondValue;
      case '÷':
        return secondValue !== 0 ? firstValue / secondValue : 0;
      default:
        return secondValue;
    }
  };

  const performCalculation = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation);
      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForNewValue(true);
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForNewValue(false);
  };

  const Button = ({ onClick, className = '', children, ...props }: any) => (
    <button
      onClick={onClick}
      className={`h-12 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded text-lg font-medium transition-colors duration-150 ${className}`}
      {...props}
    >
      {children}
    </button>
  );

  return (
    <div className="h-full flex flex-col bg-gray-50 p-4">
      {/* Display */}
      <div className="bg-white border-2 border-gray-300 rounded-lg p-4 mb-4">
        <div className="text-right text-3xl font-mono text-gray-800 min-h-12 flex items-center justify-end">
          {display}
        </div>
      </div>

      {/* Button Grid */}
      <div className="grid grid-cols-4 gap-2 flex-1">
        <Button onClick={clear} className="bg-red-100 hover:bg-red-200 text-red-700 col-span-2">
          Clear
        </Button>
        <Button onClick={() => inputOperation('÷')} className="bg-blue-100 hover:bg-blue-200 text-blue-700">
          ÷
        </Button>
        <Button onClick={() => inputOperation('×')} className="bg-blue-100 hover:bg-blue-200 text-blue-700">
          ×
        </Button>

        <Button onClick={() => inputNumber('7')}>7</Button>
        <Button onClick={() => inputNumber('8')}>8</Button>
        <Button onClick={() => inputNumber('9')}>9</Button>
        <Button onClick={() => inputOperation('-')} className="bg-blue-100 hover:bg-blue-200 text-blue-700">
          -
        </Button>

        <Button onClick={() => inputNumber('4')}>4</Button>
        <Button onClick={() => inputNumber('5')}>5</Button>
        <Button onClick={() => inputNumber('6')}>6</Button>
        <Button onClick={() => inputOperation('+')} className="bg-blue-100 hover:bg-blue-200 text-blue-700">
          +
        </Button>

        <Button onClick={() => inputNumber('1')}>1</Button>
        <Button onClick={() => inputNumber('2')}>2</Button>
        <Button onClick={() => inputNumber('3')}>3</Button>
        <Button onClick={performCalculation} className="bg-green-100 hover:bg-green-200 text-green-700 row-span-2">
          =
        </Button>

        <Button onClick={() => inputNumber('0')} className="col-span-2">
          0
        </Button>
        <Button onClick={() => inputNumber('.')}>
          .
        </Button>
      </div>
    </div>
  );
};

export default Calculator;