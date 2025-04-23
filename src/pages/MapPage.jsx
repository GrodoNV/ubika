import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Button from '../components/Button';
import L from 'leaflet';

// Fix para los iconos de Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Componente para manejar la ubicación del usuario
const LocationMarker = ({ onLocationFound }) => {
  const map = useMapEvents({
    click() {
      map.locate();
    },
    locationfound(e) {
      onLocationFound(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  return null;
};

const MapPage = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [activeFilters, setActiveFilters] = useState({
    pumakatari: false,
    camionGarrafas: false,
    miUbicacion: false
  });
  const [markers, setMarkers] = useState([]);

  // Coordenadas de La Paz
  const center = [-16.4897, -68.1193];
  const zoom = 13;

  const handleLocationFound = (location) => {
    setUserLocation(location);
    if (activeFilters.miUbicacion) {
      setMarkers(prev => [...prev, {
        position: location,
        type: 'user',
        title: 'Mi Ubicación'
      }]);
    }
  };

  const toggleFilter = (filter) => {
    setActiveFilters(prev => ({
      ...prev,
      [filter]: !prev[filter]
    }));
  };

  // Simulación de datos de transporte (en una aplicación real, esto vendría de una API)
  useEffect(() => {
    if (activeFilters.pumakatari) {
      // Simular rutas de Pumakatari
      const pumakatariMarkers = [
        { position: [-16.4897, -68.1193], type: 'pumakatari', title: 'Pumakatari Ruta 1' },
        { position: [-16.4950, -68.1250], type: 'pumakatari', title: 'Pumakatari Ruta 2' },
      ];
      setMarkers(prev => [...prev.filter(m => m.type !== 'pumakatari'), ...pumakatariMarkers]);
    } else {
      setMarkers(prev => prev.filter(m => m.type !== 'pumakatari'));
    }

    if (activeFilters.camionGarrafas) {
      // Simular camiones de garrafas
      const garrafaMarkers = [
        { position: [-16.4850, -68.1150], type: 'garrafa', title: 'Camión de Garrafas 1' },
        { position: [-16.4900, -68.1200], type: 'garrafa', title: 'Camión de Garrafas 2' },
      ];
      setMarkers(prev => [...prev.filter(m => m.type !== 'garrafa'), ...garrafaMarkers]);
    } else {
      setMarkers(prev => prev.filter(m => m.type !== 'garrafa'));
    }
  }, [activeFilters]);

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
              <MapContainer
                center={center}
                zoom={zoom}
                style={{ height: '100%', width: '100%', borderRadius: '0.5rem' }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <LocationMarker onLocationFound={handleLocationFound} />
                {markers.map((marker, index) => (
                  <Marker key={index} position={marker.position}>
                    <Popup>
                      <div className="text-black">
                        <h3 className="font-bold">{marker.title}</h3>
                        {marker.type === 'pumakatari' && <p>Ruta Pumakatari</p>}
                        {marker.type === 'garrafa' && <p>Camión de Garrafas</p>}
                        {marker.type === 'user' && <p>Tu ubicación actual</p>}
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
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
              </div>

              {/* Instructions */}
              <div className="text-sm text-gray-300">
                <p className="mb-2">• Haz clic en el mapa para activar tu ubicación</p>
                <p className="mb-2">• Los marcadores verdes son Pumakatari</p>
                <p className="mb-2">• Los marcadores azules son Camiones de Garrafas</p>
                <p>• El marcador rojo es tu ubicación</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapPage; 