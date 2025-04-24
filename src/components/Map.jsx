import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Bus } from 'lucide-react';
import { GOOGLE_MAPS_API_KEY, MAP_DEFAULT_CENTER, MAP_DEFAULT_ZOOM, MAP_OPTIONS } from '../config/googleMaps';

// Iconos personalizados para los marcadores
const BUS_ICON = {
  url: '/images/bus-marker.svg',
  scaledSize: { width: 30, height: 30 }
};

// Nuevo ícono de bus usando Lucide Icons
const BUS_ICON_LUCIDE = {
  path: Bus.toString(),
  fillColor: '#FF0000',
  fillOpacity: 1,
  strokeWeight: 1,
  strokeColor: '#000000',
  scale: 1
};

const GAS_STATION_ICON = {
  url: '/images/gas-station-marker.svg',
  scaledSize: { width: 25, height: 25 }
};

const USER_ICON = {
  url: '/images/user-marker.svg',
  scaledSize: { width: 25, height: 25 }
};

const BUS_STOP_ICON = {
  path: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z',
  fillColor: '#FF0000',
  fillOpacity: 1,
  strokeWeight: 1,
  strokeColor: '#000000',
  scale: 1.5,
  anchor: { x: 12, y: 24 }
};

// Paradas del Pumakatari (coordenadas más cercanas al centro)
const PUMAKATARI_STOPS = [
  { id: 'p1', position: [-16.4897, -68.1193], name: 'Parada Central' },
  { id: 'p2', position: [-16.4900, -68.1200], name: 'Parada Sur' },
  { id: 'p3', position: [-16.4890, -68.1180], name: 'Parada Norte' },
  { id: 'p4', position: [-16.4895, -68.1205], name: 'Parada Este' },
  { id: 'p5', position: [-16.4905, -68.1185], name: 'Parada Oeste' }
];

// Función para guardar en caché
const saveToCache = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Error al guardar en caché:', error);
  }
};

// Función para obtener de caché
const getFromCache = (key) => {
  try {
    const cached = localStorage.getItem(key);
    return cached ? JSON.parse(cached) : null;
  } catch (error) {
    console.error('Error al obtener de caché:', error);
    return null;
  }
};

// Función para calcular la distancia entre dos puntos
const calculateDistance = (point1, point2) => {
  const R = 6371; // Radio de la Tierra en km
  const dLat = (point2.lat - point1.lat) * Math.PI / 180;
  const dLon = (point2.lng - point1.lng) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(point1.lat * Math.PI / 180) * Math.cos(point2.lat * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};

// Iconos personalizados
const createCustomIcon = (iconUrl, size = [25, 25]) => {
  return new L.Icon({
    iconUrl,
    iconSize: size,
    iconAnchor: [size[0] / 2, size[1]],
    popupAnchor: [0, -size[1] / 2]
  });
};

// Componente para actualizar la vista del mapa
const MapUpdater = ({ center, zoom, bounds }) => {
  const map = useMap();
  
  useEffect(() => {
    if (bounds) {
      map.fitBounds(bounds);
    } else if (center) {
      map.setView(center, zoom);
    }
  }, [center, zoom, bounds, map]);

  return null;
};

const Map = ({ activeFilters, onLocationStatusChange, isLoggedIn = false }) => {
  const [userLocation, setUserLocation] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [bounds, setBounds] = useState(null);
  const [locationError, setLocationError] = useState(null);

  // Obtener ubicación del usuario
  useEffect(() => {
    if (activeFilters.miUbicacion) {
      onLocationStatusChange('Obteniendo ubicación...');
      setLocationError(null);
      
      if (!navigator.geolocation) {
        const error = 'Tu navegador no soporta geolocalización';
        onLocationStatusChange(error);
        setLocationError(error);
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLocation = [position.coords.latitude, position.coords.longitude];
          setUserLocation(newLocation);
          onLocationStatusChange('Ubicación actualizada');
          
          // Actualizar bounds para incluir la ubicación del usuario
          if (bounds) {
            const newBounds = L.latLngBounds(bounds);
            newBounds.extend(newLocation);
            setBounds(newBounds);
          }
        },
        (error) => {
          console.error('Error de geolocalización:', error);
          let errorMessage = 'Error al obtener la ubicación';
          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = 'Permiso denegado para acceder a la ubicación. Por favor, habilita los permisos de ubicación en tu navegador.';
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage = 'No se pudo obtener tu ubicación. Verifica que tu GPS esté activado y que tengas conexión a internet.';
              break;
            case error.TIMEOUT:
              errorMessage = 'Tiempo de espera agotado. Intenta nuevamente en unos momentos.';
              break;
            default:
              errorMessage = 'Error desconocido al obtener la ubicación. Por favor, verifica tu conexión y permisos.';
          }
          onLocationStatusChange(errorMessage);
          setLocationError(errorMessage);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      );
    } else {
      setUserLocation(null);
      setLocationError(null);
      onLocationStatusChange('');
    }
  }, [activeFilters.miUbicacion, onLocationStatusChange]);

  // Actualizar marcadores
  useEffect(() => {
    if (activeFilters.pumakatari || activeFilters.camionGarrafas) {
      const newMarkers = [];
      
      if (activeFilters.pumakatari) {
        // Agregar marcadores de Pumakatari
        newMarkers.push(
          ...Array(5).fill().map((_, i) => ({
            id: `bus-${i}`,
            type: 'bus',
            position: [
              MAP_DEFAULT_CENTER[0] + (Math.random() - 0.5) * 0.1,
              MAP_DEFAULT_CENTER[1] + (Math.random() - 0.5) * 0.1
            ]
          }))
        );
      }

      if (activeFilters.camionGarrafas) {
        // Agregar marcadores de camiones de garrafas
        newMarkers.push(
          ...Array(3).fill().map((_, i) => ({
            id: `gas-${i}`,
            type: 'gas',
            position: [
              MAP_DEFAULT_CENTER[0] + (Math.random() - 0.5) * 0.1,
              MAP_DEFAULT_CENTER[1] + (Math.random() - 0.5) * 0.1
            ]
          }))
        );
      }

      setMarkers(newMarkers);

      // Actualizar bounds para incluir todos los marcadores
      if (newMarkers.length > 0) {
        const newBounds = L.latLngBounds(newMarkers.map(m => m.position));
        if (userLocation) {
          newBounds.extend(userLocation);
        }
        setBounds(newBounds);
      }
    } else {
      setMarkers([]);
    }
  }, [activeFilters, userLocation]);

  return (
    <div className="w-full h-full">
      {locationError && (
        <div className="absolute top-4 left-4 z-10 bg-red-500 text-white p-2 rounded-md shadow-lg">
          {locationError}
        </div>
      )}
      <MapContainer
        center={MAP_DEFAULT_CENTER}
        zoom={MAP_DEFAULT_ZOOM}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* Marcadores de Pumakatari */}
        {activeFilters.pumakatari && PUMAKATARI_STOPS.map(stop => (
          <Marker
            key={stop.id}
            position={stop.position}
            icon={createCustomIcon('/images/bus-marker.svg')}
          >
            <Popup>{stop.name}</Popup>
          </Marker>
        ))}

        {/* Marcadores dinámicos */}
        {markers.map(marker => (
          <Marker
            key={marker.id}
            position={marker.position}
            icon={createCustomIcon(
              marker.type === 'bus' ? '/images/bus-marker.svg' : '/images/gas-station-marker.svg'
            )}
          >
            <Popup>
              {marker.type === 'bus' ? 'Pumakatari' : 'Camión de Garrafas'}
            </Popup>
          </Marker>
        ))}

        {/* Marcador de ubicación del usuario */}
        {userLocation && (
          <Marker
            position={userLocation}
            icon={createCustomIcon('/images/user-marker.svg')}
          >
            <Popup>Tu ubicación</Popup>
          </Marker>
        )}

        <MapUpdater
          center={userLocation || MAP_DEFAULT_CENTER}
          zoom={MAP_DEFAULT_ZOOM}
          bounds={bounds}
        />
      </MapContainer>
    </div>
  );
};

export default Map; 