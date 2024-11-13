import React, { useEffect, useState } from 'react';
import { deleteLocality, getLocalities } from '../services/api';
import LocalityItem from './LocalityItem';
import LocalityForm from './LocalityForm';

const LocalityList = ({ refresh }) => {
  const [localities, setLocalities] = useState([]);
  const [editingLocality, setEditingLocality] = useState(null); // State to track editing mode
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredLocalities, setFilteredLocalities] = useState([]);

  useEffect(() => {
    fetchLocalities();
  }, [refresh]); // Refetch when `refresh` changes

  const fetchLocalities = async () => {
    try {
      const data = await getLocalities();
      setLocalities(data);
      setFilteredLocalities(data); // Initialize filtered list with fetched data
    } catch (error) {
      console.error('Failed to fetch localities:', error);
    }
  };

  const handleDelete = async (id) => {
    await deleteLocality(id);
    fetchLocalities(); // Refresh list after deletion
  };

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    // Filter localities based on search term
    const filtered = localities.filter(locality =>
      locality.name.toLowerCase().includes(term.toLowerCase()) ||
      locality.city.toLowerCase().includes(term.toLowerCase()) ||
      locality.state.toLowerCase().includes(term.toLowerCase()) ||
      locality.zipCode.toString().includes(term)
    );
    setFilteredLocalities(filtered);
  };

  const handleEdit = (locality) => {
    setEditingLocality(locality); // Set selected locality for editing
  };

  const clearEditingLocality = () => {
    setEditingLocality(null); // Clear editing mode
  };

  return (
    <div className="p-4">
      {/* Search bar */}
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search localities by name, city, state, or zip code"
        className="w-full border border-gray-300 rounded px-3 py-2 mb-6"
      />

      {/* Locality form for add and edit */}
      <LocalityForm
        onSuccess={fetchLocalities}
        localityData={editingLocality}
        clearEditingLocality={clearEditingLocality}
      />

      {/* Localities list */}
      <ul className="space-y-4">
        {filteredLocalities.length > 0 ? (
          filteredLocalities.map((locality) => (
            <LocalityItem
              key={locality._id}
              locality={locality}
              onEdit={() => handleEdit(locality)}
              onDelete={() => handleDelete(locality._id)}
            />
          ))
        ) : (
          <p className="text-gray-600">No localities found.</p>
        )}
      </ul>
    </div>
  );
};

export default LocalityList;
