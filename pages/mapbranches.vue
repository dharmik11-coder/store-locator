<template>
  <div id="map" ref="mapContainer" style="height: 100vh"></div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const mapContainer = ref(null);

let L;

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

// Load Leaflet library
const loadLeaflet = async () => {
  if (typeof window !== "undefined") {
    const leafletModule = await import("leaflet");
    L = leafletModule.default;
    // Add Leaflet CSS dynamically
    const leafletCss = document.createElement("link");
    leafletCss.rel = "stylesheet";
    leafletCss.href = "https://unpkg.com/leaflet/dist/leaflet.css";
    document.head.appendChild(leafletCss);
    return L;
  }
};

const initMap = (branches) => {
  if (mapContainer.value && L) {
    const map = L.map(mapContainer.value).setView([27.997037, -82.5743328], 10); // Default center

    // Add tile layer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(map);

    // Create the custom icon
    const icon = createCustomIcon();

    // Add markers from API data
    branches.forEach((branch) => {
      if (branch.LATITUDE && branch.LONGITUDE) {
        L.marker([branch.LATITUDE, branch.LONGITUDE], { icon })
          .bindPopup(`<strong>${branch.BRANCHNAME}</strong>`)
          .addTo(map);
      }
    });

    // Fit map bounds to include all markers
    if (branches.length > 0) {
      const bounds = L.latLngBounds(
        branches.map((branch) => [branch.LATITUDE, branch.LONGITUDE])
      );
      map.fitBounds(bounds);
    }
  }
};

onMounted(async () => {
  if (process.client) {
    try {
      await loadLeaflet(); // Ensure Leaflet is loaded
      const response = await axios.get("/api/branches");
      const branches = response.data;

      // Log the fetched branches to verify data
      console.log("Fetched branches:", branches);

      // Check for valid LatLngs
      const validBranches = branches.filter((branch) => {
        return (
          typeof branch.LATITUDE === "number" &&
          typeof branch.LONGITUDE === "number" &&
          !isNaN(branch.LATITUDE) &&
          !isNaN(branch.LONGITUDE)
        );
      });

      if (validBranches.length > 0) {
        initMap(validBranches);
      } else {
        console.log("No valid branch locations to display.");
      }
    } catch (error) {
      console.error("Error fetching branches:", error);
    }
  }
});
</script>

<style scoped>
#map {
  width: 100%;
  height: 100vh;
}
</style>
