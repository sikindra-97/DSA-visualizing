import React, { useState, useEffect } from 'react';

export default function Array() {
  const [array, setArray] = useState([]);
  const [size, setSize] = useState(10);
  const [operation, setOperation] = useState('access');
  const [index, setIndex] = useState(0);
  const [value, setValue] = useState('');
  const [speed, setSpeed] = useState(500);
  const [isAnimating, setIsAnimating] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    generateArray();
  }, [size]);

  const generateArray = () => {
    const newArray = [];
    for (let i = 0; i < size; i++) {
      newArray.push(Math.floor(Math.random() * 100) + 1);
    }
    setArray(newArray);
    setMessage('Array generated');
  };

  const visualizeOperation = async () => {
    setIsAnimating(true);
    setMessage('');
    
    try {
      switch(operation) {
        case 'access':
          await visualizeAccess();
          break;
        case 'search':
          await visualizeSearch();
          break;
        case 'insert':
          await visualizeInsert();
          break;
        case 'delete':
          await visualizeDelete();
          break;
        case 'update':
          await visualizeUpdate();
          break;
        default:
          break;
      }
    } catch (error) {
      setMessage(error.message);
    }
    
    setIsAnimating(false);
  };

  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const visualizeAccess = async () => {
    if (index < 0 || index >= array.length) {
      throw new Error('Index out of bounds');
    }
    
    setHighlightedIndex(index);
    setMessage(`Accessing index ${index} (O(1) operation)`);
    await delay(speed);
    setHighlightedIndex(null);
    setMessage(`Value at index ${index}: ${array[index]}`);
  };

  const visualizeSearch = async () => {
    if (!value) {
      throw new Error('Please enter a value to search');
    }
    
    const searchValue = parseInt(value);
    let found = false;
    
    for (let i = 0; i < array.length; i++) {
      setHighlightedIndex(i);
      setMessage(`Checking index ${i}...`);
      await delay(speed / 2);
      
      if (array[i] === searchValue) {
        found = true;
        setMessage(`Found ${searchValue} at index ${i} (O(n) operation)`);
        await delay(speed * 2);
        break;
      }
    }
    
    if (!found) {
      setMessage(`${searchValue} not found in array`);
    }
    setHighlightedIndex(null);
  };

  const visualizeInsert = async () => {
    if (index < 0 || index > array.length) {
      throw new Error('Invalid insertion index');
    }
    if (!value) {
      throw new Error('Please enter a value to insert');
    }
    
    setHighlightedIndex(index);
    setMessage(`Preparing to insert at index ${index}...`);
    await delay(speed);
    
    const newArray = [...array];
    newArray.splice(index, 0, parseInt(value));
    setArray(newArray);
    
    setHighlightedIndex(index);
    setMessage(`Inserted ${value} at index ${index} (O(n) operation)`);
    await delay(speed * 2);
    setHighlightedIndex(null);
  };

  const visualizeDelete = async () => {
    if (index < 0 || index >= array.length) {
      throw new Error('Index out of bounds');
    }
    
    setHighlightedIndex(index);
    setMessage(`Preparing to delete at index ${index}...`);
    await delay(speed);
    
    const newArray = [...array];
    const deletedValue = newArray.splice(index, 1);
    setArray(newArray);
    
    setMessage(`Deleted value ${deletedValue} from index ${index} (O(n) operation)`);
    await delay(speed * 2);
    setHighlightedIndex(null);
  };

  const visualizeUpdate = async () => {
    if (index < 0 || index >= array.length) {
      throw new Error('Index out of bounds');
    }
    if (!value) {
      throw new Error('Please enter a new value');
    }
    
    setHighlightedIndex(index);
    setMessage(`Preparing to update index ${index}...`);
    await delay(speed);
    
    const newArray = [...array];
    const oldValue = newArray[index];
    newArray[index] = parseInt(value);
    setArray(newArray);
    
    setMessage(`Updated index ${index} from ${oldValue} to ${value} (O(1) operation)`);
    await delay(speed * 2);
    setHighlightedIndex(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
          Array Operations Visualizer
        </h1>
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Array Size: {size}
              </label>
              <input
                type="range"
                min="5"
                max="20"
                value={size}
                onChange={(e) => setSize(parseInt(e.target.value))}
                disabled={isAnimating}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Operation
              </label>
              <select
                value={operation}
                onChange={(e) => setOperation(e.target.value)}
                disabled={isAnimating}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="access">Access</option>
                <option value="search">Search</option>
                <option value="insert">Insert</option>
                <option value="delete">Delete</option>
                <option value="update">Update</option>
              </select>
            </div>
            {(operation === 'access' || operation === 'insert' || operation === 'delete' || operation === 'update') && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Index (0-{operation === 'insert' ? array.length : array.length - 1})
                </label>
                <input
                  type="number"
                  min="0"
                  max={operation === 'insert' ? array.length : array.length - 1}
                  value={index}
                  onChange={(e) => setIndex(parseInt(e.target.value))}
                  disabled={isAnimating}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            )}
            {(operation === 'search' || operation === 'insert' || operation === 'update') && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {operation === 'search' ? 'Value to Search' : 
                   operation === 'insert' ? 'Value to Insert' : 'New Value'}
                </label>
                <input
                  type="number"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  disabled={isAnimating}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Animation Speed: {1100 - speed}ms
              </label>
              <input
                type="range"
                min="100"
                max="1000"
                step="100"
                value={speed}
                onChange={(e) => setSpeed(parseInt(e.target.value))}
                disabled={isAnimating}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-3 mt-6">
            <button
              onClick={visualizeOperation}
              disabled={isAnimating}
              className={`px-4 py-2 rounded-md font-medium ${
                isAnimating ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              Visualize Operation
            </button>
            <button
              onClick={generateArray}
              disabled={isAnimating}
              className={`px-4 py-2 rounded-md font-medium ${
                isAnimating ? 'bg-gray-300 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 text-white'
              }`}
            >
              Generate New Array
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Array Visualization</h2>
          <div className="flex flex-wrap justify-center gap-2">
            {array.map((item, i) => (
              <div
                key={i}
                className={`w-16 h-20 flex flex-col items-center justify-center border-2 rounded-lg transition-all duration-300 ${
                  highlightedIndex === i 
                    ? 'bg-yellow-300 border-yellow-500 scale-110 shadow-md' 
                    : 'bg-white border-gray-300'
                }`}
              >
                <div className="font-bold text-lg">{item}</div>
                <div className="text-xs text-gray-500 mt-1">index {i}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-blue-50 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Operation Information</h2>
          {message && (
            <div className="p-3 bg-blue-100 border border-blue-200 rounded-md">
              <p className="text-blue-800">{message}</p>
            </div>
          )}
          <div className="mt-4">
            <h3 className="font-medium text-gray-700">Time Complexity:</h3>
            <ul className="list-disc pl-5 text-gray-600">
              <li>Access: O(1)</li>
              <li>Search: O(n)</li>
              <li>Insert: O(n)</li>
              <li>Delete: O(n)</li>
              <li>Update: O(1)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
