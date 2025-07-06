import { useState } from 'react';

const Stack = () => {
  const [stack, setStack] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [maxSize, setMaxSize] = useState(10);
  const [operationLog, setOperationLog] = useState([]);

  const push = () => {
    if (inputValue.trim() === '') return;
    if (stack.length >= maxSize) {
      addLog(`Stack Overflow! Cannot push ${inputValue}`);
      return;
    }
    setStack([...stack, inputValue]);
    addLog(`Pushed: ${inputValue}`);
    setInputValue('');
  };

  const pop = () => {
    if (stack.length === 0) {
      addLog('Stack Underflow! Stack is empty');
      return;
    }
    const poppedValue = stack[stack.length - 1];
    setStack(stack.slice(0, -1));
    addLog(`Popped: ${poppedValue}`);
  };

  const peek = () => {
    if (stack.length === 0) {
      addLog('Stack is empty');
      return;
    }
    addLog(`Peek: ${stack[stack.length - 1]}`);
  };

  const clearStack = () => {
    setStack([]);
    addLog('Stack cleared');
  };

  const addLog = (message) => {
    setOperationLog([message, ...operationLog.slice(0, 9)]);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">Stack Visualizer</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Controls */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Controls</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Max Stack Size</label>
                <input
                  type="number"
                  value={maxSize}
                  onChange={(e) => setMaxSize(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Value to Push</label>
                <div className="flex">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md"
                    placeholder="Enter value"
                  />
                  <button
                    onClick={push}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r-md gap-2"
                  >
                    Push
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={pop}
                  className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md"
                >
                  Pop
                </button>
                <button
                  onClick={peek}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-md"
                >
                  Peek
                </button>
                <button
                  onClick={clearStack}
                  className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-md col-span-2"
                >
                  Clear Stack
                </button>
              </div>
            </div>
          </div>
          
          {/* Stack Visualization */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Stack</h2>
            <div className="flex flex-col items-center">
              <div className="w-48 h-64 border-2 border-gray-300 rounded-t-lg flex flex-col-reverse overflow-hidden bg-gray-50">
                {stack.length === 0 ? (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    Stack is empty
                  </div>
                ) : (
                  stack.map((item, index) => (
                    <div
                      key={index}
                      className={`h-12 flex items-center justify-center border-b border-gray-200 
                        ${index === stack.length - 1 ? 'bg-blue-100 font-bold' : 'bg-white'}`}
                    >
                      {item}
                    </div>
                  ))
                )}
              </div>
              <div className="w-48 bg-gray-800 text-white text-center py-1 rounded-b-lg">
                Base
              </div>
            </div>
            
            <div className="mt-4 text-center">
              <p>Size: {stack.length}/{maxSize}</p>
              <p className={`font-semibold ${stack.length >= maxSize ? 'text-red-500' : 'text-green-500'}`}>
                {stack.length >= maxSize ? 'Stack is FULL' : 'Stack has space'}
              </p>
            </div>
          </div>
          
          {/* Operation Log */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Operation Log</h2>
            <div className="h-64 overflow-y-auto border border-gray-200 rounded-md p-2 bg-gray-50">
              {operationLog.length === 0 ? (
                <p className="text-gray-400">No operations yet</p>
              ) : (
                <ul className="space-y-1">
                  {operationLog.map((log, index) => (
                    <li key={index} className="text-sm p-1 border-b border-gray-100">
                      {log}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stack;