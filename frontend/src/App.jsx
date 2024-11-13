import React, { useState } from 'react';
import LocalityList from './components/LocalityList';

function App() {
  const [refresh, setRefresh] = useState(false);

  const handleSuccess = () => {
    setRefresh(!refresh);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Locality Management
      </h1>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
            Locality List
          </h2>
          <LocalityList refresh={refresh} onEdit={handleSuccess} />
        </div>
      </div>
    </div>
  );
}

export default App;
