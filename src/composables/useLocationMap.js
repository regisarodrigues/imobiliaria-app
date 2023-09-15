import { ref } from 'vue';

export default function useLocationMap() {
  const zoom = ref(17);
  const center = ref([-20.5619288, -47.3749858]);

  function pin(e) {
    const marker = e.target.getLatLng();
    center.value = [marker.lat, marker.lng];
  }

  return {
    zoom,
    center,
    pin
  };
}
