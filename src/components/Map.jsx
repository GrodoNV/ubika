import React, { useCallback, useEffect, useRef, useState } from 'react';
import { GoogleMap, useLoadScript, Marker, MarkerClusterer } from '@react-google-maps/api';
import { GOOGLE_MAPS_API_KEY, MAP_DEFAULT_CENTER, MAP_DEFAULT_ZOOM, MAP_OPTIONS } from '../config/googleMaps';

// Iconos personalizados para los marcadores
const BUS_ICON = {
  url: '/images/bus-marker.svg',
  scaledSize: { width: 30, height: 30 }
};

const GAS_STATION_ICON = {
  url: '/images/gas-station-marker.svg',
  scaledSize: { width: 25, height: 25 }
};

const USER_ICON = {
  url: '/images/user-marker.svg',
  scaledSize: { width: 25, height: 25 }
};

const Map = ({ activeFilters, onLocationStatusChange }) => {
  const [markers, setMarkers] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const mapRef = useRef();
  const updateIntervalRef = useRef();
  const lastUpdateTimeRef = useRef(Date.now());

  // Cargar el script de Google Maps
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries: ['places']
  });

  // Obtener la ubicación del usuario
  useEffect(() => {
    if (activeFilters.miUbicacion) {
      onLocationStatusChange('Obteniendo ubicación...');
      
      if (!navigator.geolocation) {
        onLocationStatusChange('Tu navegador no soporta geolocalización');
        return;
      }

      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const newLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setUserLocation(newLocation);
          onLocationStatusChange('Ubicación actualizada');
          
          // Centrar el mapa en la ubicación del usuario
          if (mapRef.current) {
            mapRef.current.panTo(newLocation);
          }
        },
        (error) => {
          console.error('Error al obtener la ubicación:', error);
          let errorMessage = 'Error al obtener la ubicación';
          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = 'Permiso denegado para acceder a la ubicación';
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage = 'Información de ubicación no disponible';
              break;
            case error.TIMEOUT:
              errorMessage = 'Tiempo de espera agotado al obtener la ubicación';
              break;
          }
          onLocationStatusChange(errorMessage);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        }
      );

      return () => {
        navigator.geolocation.clearWatch(watchId);
      };
    } else {
      setUserLocation(null);
      onLocationStatusChange('');
    }
  }, [activeFilters.miUbicacion, onLocationStatusChange]);

  // Función para actualizar las posiciones de los marcadores
  const updateMarkers = useCallback(() => {
    const now = Date.now();
    const timeSinceLastUpdate = now - lastUpdateTimeRef.current;

    if (timeSinceLastUpdate >= 5000) {
      const newMarkers = [];

      // Agregar marcadores de Pumakatari si el filtro está activo
      if (activeFilters.pumakatari) {
        newMarkers.push(
          ...Array(5).fill().map((_, i) => ({
            id: `bus-${i}`,
            type: 'bus',
            position: {
              lat: MAP_DEFAULT_CENTER.lat + (Math.random() - 0.5) * 0.1,
              lng: MAP_DEFAULT_CENTER.lng + (Math.random() - 0.5) * 0.1
            }
          }))
        );
      }

      // Agregar marcadores de camiones de garrafas si el filtro está activo
      if (activeFilters.camionGarrafas) {
        newMarkers.push(
          ...Array(3).fill().map((_, i) => ({
            id: `gas-${i}`,
            type: 'gas',
            position: {
              lat: MAP_DEFAULT_CENTER.lat + (Math.random() - 0.5) * 0.1,
              lng: MAP_DEFAULT_CENTER.lng + (Math.random() - 0.5) * 0.1
            }
          }))
        );
      }

      setMarkers(newMarkers);
      lastUpdateTimeRef.current = now;
    }
  }, [activeFilters]);

  // Configurar el intervalo de actualización
  useEffect(() => {
    if (activeFilters.pumakatari || activeFilters.camionGarrafas) {
      updateIntervalRef.current = setInterval(updateMarkers, 1000);
    } else {
      setMarkers([]);
    }
    return () => {
      if (updateIntervalRef.current) {
        clearInterval(updateIntervalRef.current);
      }
    };
  }, [activeFilters, updateMarkers]);

  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  if (loadError) return <div>Error al cargar el mapa</div>;
  if (!isLoaded) return <div>Cargando mapa...</div>;

  return (
    <div className="w-full h-[600px] rounded-lg overflow-hidden shadow-lg">
      <GoogleMap
        mapContainerClassName="w-full h-full"
        center={userLocation || MAP_DEFAULT_CENTER}
        zoom={MAP_DEFAULT_ZOOM}
        options={MAP_OPTIONS}
        onLoad={onMapLoad}
      >
        <MarkerClusterer>
          {(clusterer) => (
            <>
              {markers.map((marker) => (
                <Marker
                  key={marker.id}
                  position={marker.position}
                  icon={marker.type === 'bus' ? BUS_ICON : GAS_STATION_ICON}
                  clusterer={clusterer}
                  animation={google.maps.Animation.DROP}
                />
              ))}
              {userLocation && (
                <Marker
                  position={userLocation}
                  icon={USER_ICON}
                  animation={google.maps.Animation.DROP}
                />
              )}
            </>
          )}
        </MarkerClusterer>
      </GoogleMap>
    </div>
  );
};

export default Map; 