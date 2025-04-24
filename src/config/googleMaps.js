// Para obtener una API Key:
// 1. Ve a https://console.cloud.google.com/
// 2. Crea un nuevo proyecto
// 3. Habilita las APIs: Maps JavaScript API, Places API, Geocoding API
// 4. Crea credenciales > API Key
// 5. Restringe la API Key a tu dominio
export const GOOGLE_MAPS_API_KEY = 'AIzaSyAYBaOwXYC5qN3yD7bYXDjOBcfTiS7A1rE'; // Reemplaza con tu API key

export const MAP_DEFAULT_CENTER = {
  lat: -16.5000, // Latitud de La Paz
  lng: -68.1500  // Longitud de La Paz
};

export const MAP_DEFAULT_ZOOM = 12;

export const MAP_OPTIONS = {
  disableDefaultUI: true,
  zoomControl: true,
  mapTypeControl: false,
  streetViewControl: false,
  fullscreenControl: true,
  styles: [
    {
      featureType: "poi",
      elementType: "labels",
      stylers: [{ visibility: "off" }]
    }
  ]
}; 