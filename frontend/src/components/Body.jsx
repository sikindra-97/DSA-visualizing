import React from 'react';
import { Link } from 'react-router-dom';

const dataStructures = [
  {
    name: 'Array',
    logo: '/Array.png',
    description: 'A collection of items stored at contiguous memory locations.',
    path: '/array',
  },
  {
    name: 'Linked List',
    logo: '/LinkedList.png',
    description: 'A linear collection of data elements, with each element pointing to the next.',
    path: '/linkedlist',
  },
  {
    name: 'Queue',
    logo: '/Queue.png',
    description: 'A queue is a linear data structure that follows the First-In, First-Out.',
    path: '/queue',
  },
  {
    name: 'Stack',
    logo: '/Stack.png',
    description: 'A stack is a linear data structure that holds a linear, ordered sequence of elements.',
    path: '/stack',
  },
  {
    name: 'Sorting',
    logo: '/Sorting.png',
    description: 'Rearranging data into a particular order.',
    path: '/sorting',
  },
  {
    name: 'Searching',
    logo: '/Searching.png',
    description: 'Finding a specific element from a collection of data.',
    path: '/searching',
  },
];

export default function Body() {
  return (
    <div className="flex flex-wrap gap-6 justify-center p-8 bg-blue-300 flex-grow">
      {dataStructures.map((item) => (
        <div
          key={item.name}
          className="w-[300px] bg-white rounded-lg shadow-lg hover:shadow-xl hover:scale-105 hover:bg-blue-100 transition-all duration-300 flex flex-col items-center p-6"
        >
          <div className="mb-4 flex justify-center">
            <img
              src={item.logo}
              alt={item.name}
              className="w-16 h-16 object-contain rounded-[5px] bg-transparent"
            />
          </div>
          <h3 className="text-xl font-semibold text-center mb-2">{item.name}</h3>
          <p className="text-gray-700 text-center text-sm mb-4">{item.description}</p>
          <Link to={item.path} className="w-full">
            <button className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 text-lg font-semibold">
              Explore
            </button>
          </Link>
        </div>
      ))}
    </div>
  );
}
