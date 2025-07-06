import { useState, useEffect, useRef } from 'react';

const Sorting = () => {
  // State management
  const [array, setArray] = useState([]);
  const [arraySize, setArraySize] = useState(20);
  const [algorithm, setAlgorithm] = useState('bubbleSort');
  const [isSorting, setIsSorting] = useState(false);
  const [speed, setSpeed] = useState(300);
  const [highlighted, setHighlighted] = useState([]);
  const [stats, setStats] = useState({ 
    comparisons: 0, 
    swaps: 0, 
    steps: 0,
    time: '0ms' 
  });
  const animationRef = useRef();

  // Generate random array
  const generateArray = () => {
    const newArray = Array.from({ length: arraySize }, () => 
      Math.floor(Math.random() * 100) + 5
    );
    setArray(newArray);
    resetStats();
  };

  // Reset visualization
  const resetStats = () => {
    setHighlighted([]);
    setStats({ comparisons: 0, swaps: 0, steps: 0, time: '0ms' });
  };

  // Initialize array
  useEffect(() => {
    generateArray();
  }, [arraySize]);

  // Animation frame cleanup
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // Main visualization controller
  const startSorting = async () => {
    setIsSorting(true);
    resetStats();
    const startTime = performance.now();

    // Clone array to avoid direct state mutation
    const arr = [...array];
    
    switch (algorithm) {
      case 'bubbleSort':
        await bubbleSort(arr);
        break;
      case 'selectionSort':
        await selectionSort(arr);
        break;
      case 'insertionSort':
        await insertionSort(arr);
        break;
        default:
        break;
    }

    const endTime = performance.now();
    setStats(prev => ({
      ...prev,
      time: `${Math.round(endTime - startTime)}ms`
    }));
    setIsSorting(false);
  };

  // Delay helper for animations
  const delay = () => new Promise(resolve => {
    animationRef.current = setTimeout(resolve, speed);
  });

  // --- Sorting Algorithms --- //

  // Bubble Sort
  const bubbleSort = async (arr) => {
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        setHighlighted([j, j + 1]);
        setStats(prev => ({ ...prev, comparisons: prev.comparisons + 1 }));
        await delay();

        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          setArray([...arr]);
          setStats(prev => ({ ...prev, swaps: prev.swaps + 1 }));
          await delay();
        }
      }
    }
  };

  // Selection Sort
  const selectionSort = async (arr) => {
    for (let i = 0; i < arr.length; i++) {
      let min = i;
      for (let j = i + 1; j < arr.length; j++) {
        setHighlighted([min, j]);
        setStats(prev => ({ ...prev, comparisons: prev.comparisons + 1 }));
        await delay();

        if (arr[j] < arr[min]) min = j;
      }

      if (min !== i) {
        [arr[i], arr[min]] = [arr[min], arr[i]];
        setArray([...arr]);
        setStats(prev => ({ ...prev, swaps: prev.swaps + 1 }));
        await delay();
      }
    }
  };

  // Insertion Sort
  const insertionSort = async (arr) => {
    for (let i = 1; i < arr.length; i++) {
      let j = i;
      while (j > 0 && arr[j] < arr[j - 1]) {
        setHighlighted([j, j - 1]);
        setStats(prev => ({ ...prev, comparisons: prev.comparisons + 1 }));
        await delay();

        [arr[j], arr[j - 1]] = [arr[j - 1], arr[j]];
        setArray([...arr]);
        setStats(prev => ({ ...prev, swaps: prev.swaps + 1 }));
        await delay();
        j--;
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Sorting Algorithm Visualizer
        </h1>

        {/* Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Array Size Control */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Array Size: {arraySize}
            </label>
            <input
              type="range"
              min="5"
              max="50"
              value={arraySize}
              onChange={(e) => setArraySize(parseInt(e.target.value))}
              disabled={isSorting}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          {/* Algorithm Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Algorithm
            </label>
            <select
              value={algorithm}
              onChange={(e) => setAlgorithm(e.target.value)}
              disabled={isSorting}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="bubbleSort">Bubble Sort</option>
              <option value="selectionSort">Selection Sort</option>
              <option value="insertionSort">Insertion Sort</option>
            </select>
          </div>

          {/* Speed Control */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Speed: {speed}ms
            </label>
            <input
              type="range"
              min="10"
              max="1000"
              step="10"
              value={speed}
              onChange={(e) => setSpeed(parseInt(e.target.value))}
              disabled={isSorting}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <button
            onClick={generateArray}
            disabled={isSorting}
            className={`px-6 py-3 rounded-lg font-medium ${
              isSorting ? 'bg-gray-300' : 'bg-green-600 hover:bg-green-700'
            } text-white shadow-md`}
          >
            Generate New Array
          </button>

          <button
            onClick={startSorting}
            disabled={isSorting}
            className={`px-6 py-3 rounded-lg font-medium ${
              isSorting ? 'bg-gray-300' : 'bg-blue-600 hover:bg-blue-700'
            } text-white shadow-md`}
          >
            Start Sorting
          </button>
        </div>

        {/* Array Visualization */}
        <div className="flex justify-center items-end h-64 mb-8 bg-gray-50 rounded-lg p-4">
          {array.map((value, index) => (
            <div
              key={index}
              className={`mx-1 w-8 rounded-t-md transition-all duration-300 ease-in-out ${
                highlighted.includes(index)
                  ? 'bg-yellow-400'
                  : 'bg-blue-500'
              }`}
              style={{ height: `${value * 3}px` }}
            >
              <span className="text-xs block text-center mt-1">{value}</span>
            </div>
          ))}
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-gray-50 p-4 rounded-lg">
          <div className="bg-white p-3 rounded-md shadow-sm">
            <h3 className="text-sm font-medium text-gray-500">Comparisons</h3>
            <p className="text-2xl font-bold">{stats.comparisons}</p>
          </div>
          <div className="bg-white p-3 rounded-md shadow-sm">
            <h3 className="text-sm font-medium text-gray-500">Swaps</h3>
            <p className="text-2xl font-bold">{stats.swaps}</p>
          </div>
          <div className="bg-white p-3 rounded-md shadow-sm">
            <h3 className="text-sm font-medium text-gray-500">Steps</h3>
            <p className="text-2xl font-bold">{stats.steps}</p>
          </div>
          <div className="bg-white p-3 rounded-md shadow-sm">
            <h3 className="text-sm font-medium text-gray-500">Time</h3>
            <p className="text-2xl font-bold">{stats.time}</p>
          </div>
        </div>

        {/* Algorithm Info */}
        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <h2 className="text-xl font-semibold mb-2 text-blue-800">
            {algorithm.replace(/([A-Z])/g, ' $1')} Algorithm
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium text-gray-700">Time Complexity:</h3>
              <ul className="list-disc pl-5 text-gray-600">
                <li>Best Case: {getTimeComplexity(algorithm).best}</li>
                <li>Average Case: {getTimeComplexity(algorithm).average}</li>
                <li>Worst Case: {getTimeComplexity(algorithm).worst}</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-gray-700">Space Complexity:</h3>
              <p className="text-gray-600">{getSpaceComplexity(algorithm)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const getTimeComplexity = (algorithm) => {
  const complexities = {
    bubbleSort: { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)' },
    selectionSort: { best: 'O(n²)', average: 'O(n²)', worst: 'O(n²)' },
    insertionSort: { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)' }
  };
  return complexities[algorithm] || { best: '', average: '', worst: '' };
};

const getSpaceComplexity = (algorithm) => {
  const complexities = {
    bubbleSort: 'O(1)',
    selectionSort: 'O(1)',
    insertionSort: 'O(1)',
  };
  return complexities[algorithm] || '';
};

export default Sorting;