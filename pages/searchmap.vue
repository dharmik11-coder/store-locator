<template>
  <div>
    <div class="container mt-5">
      <h2>Search in Map</h2>
      <input
        v-model="query"
        @input="performSearch"
        placeholder="Search by branch name or city"
        class="form-control mb-3"
      />
      <div id="map" ref="mapContainer" style="width: 100%; height: 500px"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import axios from "axios";

const mapContainer = ref(null);
const query = ref("");
const markers = ref([]);
let L;
let map; // Declare map instance globally within the setup

// Custom icon as base64 SVG
const customIconUrl = "/images/location.png";
// Create the custom icon
const createCustomIcon = () => {
  return L.icon({
    iconUrl: customIconUrl,
    iconSize: [15, 15], // Size of the icon
    iconAnchor: [15, 30], // Anchor point of the icon
    popupAnchor: [0, -30], // Popup position
  });
};

// Load Leaflet library and CSS
const loadLeaflet = async () => {
  if (typeof window !== "undefined") {
    const leafletModule = await import("leaflet");
    L = leafletModule.default;
    console.log("Leaflet loaded");

    // Add Leaflet CSS dynamically
    const leafletCss = document.createElement("link");
    leafletCss.rel = "stylesheet";
    leafletCss.href = "https://unpkg.com/leaflet/dist/leaflet.css";
    document.head.appendChild(leafletCss);

    return L;
  }
};

const initMap = () => {
  if (mapContainer.value && L) {
    console.log("Initializing map");
    map = L.map(mapContainer.value).setView([27.9953525, -82.5081398], 12); // Center and zoom level

    // Add tile layer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(map);

    // Update map with search results
    performSearch();
  } else {
    console.error("Map container or Leaflet not available");
  }
};

const performSearch = async () => {
  if (!map) {
    console.error("Map instance is not available");
    return;
  }

  try {
    const response = await axios.get("/api/branches");
    const branches = response.data;

    // Filter branches based on search query
    const filteredBranches = branches.filter(
      (branch) =>
        branch.BRANCHNAME.toLowerCase().includes(query.value.toLowerCase()) ||
        branch.CITY.toLowerCase().includes(query.value.toLowerCase())
    );

    console.log("Filtered branches:", filteredBranches);

    // Clear previous markers
    markers.value.forEach((marker) => marker.remove());
    markers.value = [];

    // Add markers to map
    filteredBranches.forEach((branch) => {
      if (branch.LATITUDE && branch.LONGITUDE) {
        const marker = L.marker([branch.LATITUDE, branch.LONGITUDE], {
          icon: createCustomIcon(),
        }).addTo(map);

        marker.bindPopup(`
          <b>${branch.BRANCHNAME}</b><br>
          ${branch.ADDRESS}<br>
          ${branch.CITY}, ${branch.STATE} ${branch.ZIP}<br>
          ${branch.PHONE}
        `);

        markers.value.push(marker);
      }
    });

    // Fit map bounds to include all markers
    if (filteredBranches.length > 0) {
      const bounds = L.latLngBounds(
        filteredBranches.map((branch) => [branch.LATITUDE, branch.LONGITUDE])
      );
      map.fitBounds(bounds);
    }
  } catch (error) {
    console.error("Error fetching branches:", error);
  }
};

onMounted(async () => {
  if (process.client) {
    try {
      await loadLeaflet(); // Ensure Leaflet is loaded
      initMap();
    } catch (error) {
      console.error("Error initializing map:", error);
    }
  }
});

// Watch for query changes to perform search
watch(query, (newQuery) => {
  if (map) {
    performSearch();
  }
});
</script>

<style scoped>
#map {
  width: 100%;
  height: 500px;
}
</style>
