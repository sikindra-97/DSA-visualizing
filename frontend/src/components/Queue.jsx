import { useState } from 'react';

export default function Queue() {
  const [queue, setQueue] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [maxSize, setMaxSize] = useState(10);
  const [operationLog, setOperationLog] = useState([]);

  const enqueue = () => {
    if (queue.length < maxSize) {
      setQueue((prevQueue) => [...prevQueue, inputValue]);
      setOperationLog((prevLog) => [...prevLog, `Enqueued: ${inputValue}`]);
      setInputValue(''); // Clear input after enqueue
    } else {
      setOperationLog((prevLog) => [...prevLog, `Queue is full, cannot enqueue: ${inputValue}`]);
    }
  };

  const dequeue = () => {
    if (queue.length > 0) {
      const dequeuedItem = queue[0];
      setQueue((prevQueue) => prevQueue.slice(1));
      setOperationLog((prevLog) => [...prevLog, `Dequeued: ${dequeuedItem}`]);
    }
  };

  const front = () => {
    if (queue.length > 0) {
      setOperationLog((prevLog) => [...prevLog, `Front: ${queue[0]}`]);
    }
  };

  const rear = () => {
    if (queue.length > 0) {
      setOperationLog((prevLog) => [...prevLog, `Rear: ${queue[queue.length - 1]}`]);
    }
  };

  const clearQueue = () => {
    setQueue([]);
    setOperationLog((prevLog) => [...prevLog, 'Queue cleared']);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-green-600">Queue Visualizer</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Controls */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Controls</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Max Queue Size</label>
                <input
                  type="number"
                  value={maxSize}
                  onChange={(e) => setMaxSize(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Value to Enqueue</label>
                <div className="flex">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md"
                    placeholder="Enter value"
                  />
                  <button
                    onClick={enqueue}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-r-md"
                  >
                    Enqueue
                  </button>
                </div>
              </div>
              
              {/* Updated buttons layout */}
              <div className="space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={dequeue}
                    className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md"
                  >
                    Dequeue
                  </button>
                  <button
                    onClick={front}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-md"
                  >
                    Front
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={rear}
                    className="bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded-md"
                  >
                    Rear
                  </button>
                  <button
                    onClick={clearQueue}
                    className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-md"
                  >
                    Clear
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Queue and operation log sections remain the same */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Queue</h2>
            <div className="flex flex-col items-center">
              <div className="w-full h-48 border-2 border-gray-300 rounded-lg flex items-end overflow-hidden bg-gray-50 p-2 gap-1">
                {queue.length === 0 ? (
                  <div className="flex items-center justify-center w-full h-full text-gray-400">
                    Queue is empty
                  </div>
                ) : (
                  queue.map((item, index) => (
                    <div
                      key={index}
                      className={`flex-1 flex items-center justify-center border border-gray-200 min-h-10
                        ${index === 0 ? 'bg-green-100 font-bold border-green-300' : ''}
                        ${index === queue.length - 1 ? 'bg-purple-100 font-bold border-purple-300' : 'bg-white'}`}
                      style={{ height: `${100 / maxSize * 8}%` }}
                    >
                      {item}
                    </div>
                  ))
                )}
              </div>
              
              <div className="w-full flex justify-between mt-2 text-sm">
                <span className="text-green-600 font-medium">Front</span>
                <span className="text-purple-600 font-medium">Rear</span>
              </div>
            </div>
            
            <div className="mt-4 text-center">
              <p>Size: {queue.length}/{maxSize}</p>
              <p className={`font-semibold ${queue.length >= maxSize ? 'text-red-500' : 'text-green-500'}`}>
                {queue.length >= maxSize ? 'Queue is FULL' : 'Queue has space'}
              </p>
            </div>
          </div>
          
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
