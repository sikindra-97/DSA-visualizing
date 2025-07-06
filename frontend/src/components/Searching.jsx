import { useState } from 'react';

const Searching = () => {
  const [array, setArray] = useState([10, 25, 32, 45, 60, 78, 90]);
  const [target, setTarget] = useState(45);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [isFound, setIsFound] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [log, setLog] = useState([]);

  const visualizeSearch = async () => {
    setIsSearching(true);
    setIsFound(false);
    setCurrentIndex(-1);
    setLog([]);

    for (let i = 0; i < array.length; i++) {
      setCurrentIndex(i);
      addLog(`Checking index ${i}: ${array[i]}`);
      await delay(1000);

      if (array[i] === target) {
        setIsFound(true);
        addLog(`Found ${target} at index ${i}!`);
        break;
      }
    }

    if (!isFound) {
      addLog(`${target} not found in the array`);
    }
    setIsSearching(false);
  };

  const addLog = (message) => {
    setLog(prev => [message, ...prev]);
  };

  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const generateNewArray = () => {
    const newArray = Array.from({ length: 7 }, () => Math.floor(Math.random() * 100) + 1);
    setArray(newArray);
    setCurrentIndex(-1);
    setIsFound(false);
    setLog([]);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-center">Linear Search Visualizer</h1>
      
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex-1">
          <label className="block text-sm font-medium mb-1">Target Value</label>
          <input
            type="number"
            value={target}
            onChange={(e) => setTarget(Number(e.target.value))}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          />
        </div>
        <button
          onClick={visualizeSearch}
          disabled={isSearching}
          className={`px-4 py-2 rounded-md ${isSearching ? 'bg-gray-300' : 'bg-blue-600 hover:bg-blue-700'} text-white self-end`}
        >
          {isSearching ? 'Searching...' : 'Start Search'}
        </button>
      </div>

      <div className="mb-6">
        <div className="flex justify-center gap-2 mb-4">
          {array.map((num, index) => (
            <div
              key={index}
              className={`w-12 h-12 flex items-center justify-center rounded-md border-2 font-bold
                ${currentIndex === index ? 'bg-yellow-400 border-yellow-600' : ''}
                ${isFound && currentIndex === index ? 'bg-green-400 border-green-600' : ''}
                ${isFound && currentIndex !== index ? 'bg-gray-100 border-gray-300' : ''}`}
            >
              {num}
            </div>
          ))}
        </div>
        <button
          onClick={generateNewArray}
          className="w-full py-2 bg-gray-200 rounded-md hover:bg-gray-300"
        >
          Generate New Array
        </button>
      </div>

      <div className="border border-gray-200 rounded-md p-4">
        <h2 className="font-semibold mb-2">Search Log:</h2>
        <div className="max-h-40 overflow-y-auto">
          {log.length === 0 ? (
            <div className="text-gray-500 text-center py-4">Search log will appear here</div>
          ) : (
            log.map((entry, index) => (
              <div key={index} className="py-1 border-b border-gray-100 last:border-0 font-mono text-sm">
                {entry}
              </div>
            ))
          )}
        </div>
      </div>

      <div className="mt-4 p-4 bg-blue-50 rounded-md">
        <h2 className="font-semibold mb-2">How Linear Search Works:</h2>
        <ul className="list-disc pl-5 space-y-1 text-sm">
          <li>Checks each element one by one from left to right</li>
          <li>Time complexity: O(n) - linear time</li>
          <li>Works on both sorted and unsorted arrays</li>
          <li>Simple but inefficient for large datasets</li>
        </ul>
      </div>
    </div>
  );
};

export default Searching;
