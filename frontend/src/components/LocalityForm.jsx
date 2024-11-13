
import React, { useEffect, useState } from 'react';
import { createLocality, updateLocality } from '../services/api';

const LocalityForm = ({ onSuccess, localityData, clearEditingLocality }) => {
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    state: '',
    zipCode: ''
  });

  useEffect(() => {
    if (localityData) {
      setFormData(localityData); // Populate form with locality data
    }
  }, [localityData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (localityData) {
      await updateLocality(localityData._id, formData);
    } else {
      await createLocality(formData);
    }

    setFormData({ name: '', city: '', state: '', zipCode: '' }); // Clear form
    onSuccess();
    clearEditingLocality(); // Exit editing mode
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow p-4 rounded-lg mb-6">
      <h2 className="text-lg font-bold mb-4">
        {localityData ? 'Edit Locality' : 'Add New Locality'}
      </h2>
      <input
        type="text"
        name="name"
        value={formData.name}
        placeholder="Name"
        onChange={handleChange}
        className="w-full border border-gray-300 rounded px-3 py-2 mb-3"
      />
      <input
        type="text"
        name="city"
        value={formData.city}
        placeholder="City"
        onChange={handleChange}
        className="w-full border border-gray-300 rounded px-3 py-2 mb-3"
      />
      <input
        type="text"
        name="state"
        value={formData.state}
        placeholder="State"
        onChange={handleChange}
        className="w-full border border-gray-300 rounded px-3 py-2 mb-3"
      />
      <input
        type="text"
        name="zipCode"
        value={formData.zipCode}
        placeholder="Zip Code"
        onChange={handleChange}
        className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
      />
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
      >
        {localityData ? 'Update Locality' : 'Add Locality'}
      </button>
    </form>
  );
};

export default LocalityForm;
