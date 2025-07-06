import React, { useState, useEffect } from 'react';

class Node {
  constructor(value, next = null) {
    this.value = value;
    this.next = next;
  }
}

export default function LinkedList() {
  const [list, setList] = useState(null);
  const [value, setValue] = useState('');
  const [index, setIndex] = useState(0);
  const [operation, setOperation] = useState('append');
  const [animation, setAnimation] = useState({ type: null, node: null });
  const [log, setLog] = useState([]);

  useEffect(() => {
    // Initialize with sample data
    if (!list) {
      const node3 = new Node(30);
      const node2 = new Node(20, node3);
      const node1 = new Node(10, node2);
      setList(node1);
    }
  }, []);

  const addLog = (message) => {
    setLog(prev => [`[${new Date().toLocaleTimeString()}] ${message}`, ...prev.slice(0, 9)]);
  };

  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const animate = async (type, node) => {
    setAnimation({ type, node });
    await delay(800);
    setAnimation({ type: null, node: null });
  };

  const append = async () => {
    if (!value) return;
    const newNode = new Node(Number(value));
    
    if (!list) {
      await animate('insert', newNode);
      setList(newNode);
      addLog(`Appended ${value} as head`);
      return;
    }

    let current = list;
    while (current.next) {
      await animate('traverse', current);
      current = current.next;
    }

    await animate('insert', newNode);
    current.next = newNode;
    setList({...list});
    addLog(`Appended ${value} at end`);
    setValue('');
  };

  const prepend = async () => {
    if (!value) return;
    const newNode = new Node(Number(value), list);
    
    await animate('insert', newNode);
    setList(newNode);
    addLog(`Prepended ${value} at head`);
    setValue('');
  };

  const insertAt = async () => {
    if (!value || index < 0) return;
    
    if (index === 0) {
      prepend();
      return;
    }

    const newNode = new Node(Number(value));
    let current = list;
    let count = 0;

    while (current && count < index - 1) {
      await animate('traverse', current);
      current = current.next;
      count++;
    }

    if (!current) {
      addLog(`Index ${index} out of bounds`);
      return;
    }

    await animate('insert', newNode);
    newNode.next = current.next;
    current.next = newNode;
    setList({...list});
    addLog(`Inserted ${value} at index ${index}`);
    setValue('');
  };

  const deleteNode = async (val) => {
    if (!list) return;

    if (list.value === val) {
      await animate('delete', list);
      setList(list.next);
      addLog(`Deleted head node with value ${val}`);
      return;
    }

    let current = list;
    while (current.next && current.next.value !== val) {
      await animate('traverse', current);
      current = current.next;
    }

    if (current.next) {
      await animate('delete', current.next);
      current.next = current.next.next;
      setList({...list});
      addLog(`Deleted node with value ${val}`);
    } else {
      addLog(`Value ${val} not found`);
    }
  };

  const renderList = () => {
    const nodes = [];
    let current = list;
    let position = 0;

    while (current) {
      nodes.push(
        <div 
          key={`${current.value}-${position}`}
          className={`flex items-center transition-all duration-300 ${animation.node === current ? 
            (animation.type === 'insert' ? 'scale-110 bg-green-200' : 
             animation.type === 'delete' ? 'bg-red-200' : 'bg-blue-200') : ''}`}
        >
          <div className="relative">
            <div className="w-12 h-12 flex items-center justify-center bg-blue-500 text-white font-bold rounded-full">
              {current.value}
            </div>
            {position === 0 && (
              <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 text-xs font-semibold">Head</div>
            )}
          </div>
          
          {current.next && (
            <div className="w-10 h-1 bg-gray-400 relative">
              <div className="absolute right-0 top-1/2 w-2 h-2 border-r-2 border-b-2 border-gray-600 transform -translate-y-1/2 rotate-45"></div>
            </div>
          )}
          {!current.next && position !== 0 && (
            <div className="text-xs ml-2 text-gray-500">null</div>
          )}
        </div>
      );
      current = current.next;
      position++;
    }

    return (
      <div className="flex flex-wrap items-center gap-2 p-4 bg-gray-50 rounded-lg min-h-20">
        {nodes.length > 0 ? nodes : <div className="text-gray-500">Empty List</div>}
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Linked List Visualizer</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Controls Panel */}
        <div className="space-y-4">
          <div className="flex flex-wrap gap-4">
            <select
              value={operation}
              onChange={(e) => setOperation(e.target.value)}
              className="flex-1 border border-gray-300 rounded-md px-3 py-2"
            >
              <option value="append">Append</option>
              <option value="prepend">Prepend</option>
              <option value="insertAt">Insert At Index</option>
              <option value="delete">Delete Value</option>
            </select>
            
            <button
              onClick={() => {
                if (operation === 'append') append();
                else if (operation === 'prepend') prepend();
                else if (operation === 'insertAt') insertAt();
                else if (operation === 'delete') deleteNode(Number(value));
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              {operation === 'append' && 'Append'}
              {operation === 'prepend' && 'Prepend'}
              {operation === 'insertAt' && 'Insert'}
              {operation === 'delete' && 'Delete'}
            </button>
          </div>

          <div className="flex flex-wrap gap-4">
            <input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder={operation === 'delete' ? 'Value to delete' : 'Node value'}
              className="flex-1 border border-gray-300 rounded-md px-3 py-2"
            />
            
            {operation === 'insertAt' && (
              <input
                type="number"
                value={index}
                onChange={(e) => setIndex(Number(e.target.value))}
                placeholder="Index"
                min="0"
                className="w-20 border border-gray-300 rounded-md px-3 py-2"
              />
            )}
          </div>

          <div className="p-4 bg-yellow-50 rounded-md">
            <h2 className="font-semibold mb-2">Operations:</h2>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li><strong>Append</strong>: Add node at end</li>
              <li><strong>Prepend</strong>: Add node at head</li>
              <li><strong>Insert At</strong>: Add node at specific index</li>
              <li><strong>Delete</strong>: Remove node with value</li>
            </ul>
          </div>

          <div className="border border-gray-200 rounded-md p-4 h-48 overflow-y-auto">
            <h2 className="font-semibold mb-2">Operation Log:</h2>
            {log.length === 0 ? (
              <div className="text-gray-500 text-center py-4">Operations will appear here</div>
            ) : (
              log.map((entry, i) => (
                <div key={i} className="py-1 border-b border-gray-100 last:border-0 font-mono text-sm">
                  {entry}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Visualization Area */}
        <div className="space-y-4">
          <div className="p-4 border border-gray-200 rounded-md">
            <h2 className="font-semibold mb-2">Linked List Visualization:</h2>
            {renderList()}
          </div>

          <div className="p-4 bg-blue-50 rounded-md">
            <h2 className="font-semibold mb-2">Linked List Properties:</h2>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li><strong>Dynamic Size</strong>: Grows/shrinks as needed</li>
              <li><strong>O(1) Insert/Delete</strong> at head</li>
              <li><strong>O(n) Access</strong>: Must traverse sequentially</li>
              <li><strong>Memory Efficient</strong>: Allocates memory as needed</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}