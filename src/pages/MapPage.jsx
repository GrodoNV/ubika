import React, { useState, useEffect } from 'react';
import Button from '../components/Button';
import Map from '../components/Map';

const MapPage = () => {
  const [activeFilters, setActiveFilters] = useState({
    pumakatari: false,
    camionGarrafas: false,
    miUbicacion: false
  });
  const [locationStatus, setLocationStatus] = useState('');

  const toggleFilter = (filter) => {
    setActiveFilters(prev => ({
      ...prev,
      [filter]: !prev[filter]
    }));

    // Si es el filtro de ubicación, actualizar el estado
    if (filter === 'miUbicacion') {
      if (!activeFilters.miUbicacion) {
        setLocationStatus('Obteniendo ubicación...');
      } else {
        setLocationStatus('');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-blue-900 to-gray-900 text-white">
      {/* Navbar */}
      <nav className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="text-2xl font-bold">Ubika</div>
        <Button variant="outline">Registrar Negocio</Button>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Map Section */}
          <div className="lg:w-2/3">
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-4">
              <Map activeFilters={activeFilters} onLocationStatusChange={setLocationStatus} />
            </div>
          </div>

          {/* Filters Section */}
          <div className="lg:w-1/3">
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6">
              <h2 className="text-2xl font-bold mb-6">Filtros</h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  <button
                    onClick={() => toggleFilter('pumakatari')}
                    className={`w-full p-4 rounded-lg transition-colors flex items-center justify-between ${
                      activeFilters.pumakatari
                        ? 'bg-blue-600 hover:bg-blue-700'
                        : 'bg-gray-800 hover:bg-gray-700'
                    }`}
                  >
                    <span>Pumakatari</span>
                    {activeFilters.pumakatari && (
                      <span className="text-sm bg-white/20 px-2 py-1 rounded">Activo</span>
                    )}
                  </button>
                  <p className="text-sm text-gray-400">Muestra las rutas de Pumakatari en tiempo real</p>
                </div>

                <div className="space-y-2">
                  <button
                    onClick={() => toggleFilter('camionGarrafas')}
                    className={`w-full p-4 rounded-lg transition-colors flex items-center justify-between ${
                      activeFilters.camionGarrafas
                        ? 'bg-blue-600 hover:bg-blue-700'
                        : 'bg-gray-800 hover:bg-gray-700'
                    }`}
                  >
                    <span>Camiones de Garrafas</span>
                    {activeFilters.camionGarrafas && (
                      <span className="text-sm bg-white/20 px-2 py-1 rounded">Activo</span>
                    )}
                  </button>
                  <p className="text-sm text-gray-400">Muestra los camiones de garrafas disponibles</p>
                </div>

                <div className="space-y-2">
                  <button
                    onClick={() => toggleFilter('miUbicacion')}
                    className={`w-full p-4 rounded-lg transition-colors flex items-center justify-between ${
                      activeFilters.miUbicacion
                        ? 'bg-blue-600 hover:bg-blue-700'
                        : 'bg-gray-800 hover:bg-gray-700'
                    }`}
                  >
                    <span>Mi Ubicación</span>
                    {activeFilters.miUbicacion && (
                      <span className="text-sm bg-white/20 px-2 py-1 rounded">Activo</span>
                    )}
                  </button>
                  <p className="text-sm text-gray-400">
                    {locationStatus || 'Muestra tu ubicación actual en el mapa'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapPage; 