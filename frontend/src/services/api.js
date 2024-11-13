import axios from "axios";

const API_URL = "http://localhost:5000/api/v1/localities";

// Fetch all localities:
const getLocalities = async () => {
  const response = await axios.get(`${API_URL}/getLocalities`);
  return response.data.data;
};

// Create locality
const createLocality = async (localityData) => {
  const response = await axios.post(`${API_URL}/create`, localityData);
  return response.data.data;
};

// Update locality by id
const updateLocality = async (id, localityData) => {
  const response = await axios.put(`${API_URL}/${id}`, localityData);
  return response.data.data;
};

// Delete locality
const deleteLocality = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};


export { getLocalities, createLocality, updateLocality, deleteLocality }