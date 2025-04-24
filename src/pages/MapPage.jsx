import React, { useState } from 'react';
import Map from '../components/Map';
import Button from '../components/Button';

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
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-4 h-[600px]">
              <Map 
                activeFilters={activeFilters}
                onLocationStatusChange={setLocationStatus}
              />
            </div>
          </div>

          {/* Controls Section */}
          <div className="lg:w-1/3">
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6">
              <h2 className="text-2xl font-bold mb-6">Filtros y Opciones</h2>
              
              {/* Transport Type Filter */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Tipo de Transporte</h3>
                <div className="space-y-2">
                  <Button 
                    variant={activeFilters.pumakatari ? "primary" : "secondary"} 
                    className="w-full"
                    onClick={() => toggleFilter('pumakatari')}
                  >
                    Pumakatari
                  </Button>
                  <Button 
                    variant={activeFilters.camionGarrafas ? "primary" : "secondary"} 
                    className="w-full"
                    onClick={() => toggleFilter('camionGarrafas')}
                  >
                    Camiones de Garrafas
                  </Button>
                </div>
              </div>

              {/* Location Options */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Ubicación</h3>
                <Button 
                  variant={activeFilters.miUbicacion ? "primary" : "secondary"} 
                  className="w-full"
                  onClick={() => toggleFilter('miUbicacion')}
                >
                  Mostrar Mi Ubicación
                </Button>
                {locationStatus && (
                  <p className="mt-2 text-sm text-gray-300">{locationStatus}</p>
                )}
              </div>

              {/* Instructions */}
              <div className="text-sm text-gray-300">
                <p className="mb-2">• Los marcadores azules son Pumakatari</p>
                <p className="mb-2">• Los marcadores verdes son Camiones de Garrafas</p>
                <p>• El marcador amarillo es tu ubicación</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapPage; 