
import React from 'react';

const LocalityItem = ({ locality, onEdit, onDelete }) => {
  return (
    <li className="bg-white shadow-lg rounded-lg p-6 mb-4 border border-gray-200 flex flex-col space-y-2">
      <h3 className="text-lg font-semibold text-gray-800">
        Name: <span className="font-normal">{locality.name}</span>
      </h3>
      <p className="text-gray-600">
        City: <span className="font-normal">{locality.city}</span>
      </p>
      <p className="text-gray-600">
        State: <span className="font-normal">{locality.state}</span>
      </p>
      <p className="text-gray-600">
        ZipCode: <span className="font-normal">{locality.zipCode}</span>
      </p>

      <div className="mt-4 flex space-x-3">
        <button
          onClick={onEdit}
          className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-4 rounded focus:outline-none transition duration-200 ease-in-out"
        >
          Edit
        </button>
        <button
          onClick={onDelete}
          className="bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded focus:outline-none transition duration-200 ease-in-out"
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default LocalityItem;
