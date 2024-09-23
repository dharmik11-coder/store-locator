<template>
  <div ref="mapContainer" class="map-container"></div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import L from "leaflet";

const mapContainer = ref(null);
const branchData = ref([]);

// Initialize the map
const initMap = () => {
  if (mapContainer.value) {
    const map = L.map(mapContainer.value).setView([0, 0], 2); // Set initial view

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(map);

    // Add markers for each branch
    branchData.value.forEach((branch) => {
      if (branch.LATITUDE && branch.LONGITUDE) {
        L.marker([branch.LATITUDE, branch.LONGITUDE])
          .bindPopup(
            `<strong>${branch.BRANCHNAME}</strong><br>${branch.ADDRESS}<br>${branch.CITY}, ${branch.STATE} ${branch.ZIP}`
          )
          .addTo(map);
      }
    });

    // Adjust map view to fit all markers
    const bounds = L.latLngBounds(
      branchData.value.map((branch) => [branch.LATITUDE, branch.LONGITUDE])
    );
    map.fitBounds(bounds);
  }
};

// Initialize map when component mounts
onMounted(() => {
  initMap();
});
</script>

<style scoped>
.map-container {
  height: 100vh; /* Full viewport height */
  width: 100%; /* Full width */
}
</style>
