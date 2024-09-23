<template>
  <div class="d-flex background-image">
    <!-- Sidebar Menu -->
    <nav
      class="menu-bar d-flex flex-column p-3"
      style="width: 250px; background-color: #f5f5f5"
    >
      <h2 class="text-center" style="color: #003087">Menu</h2>
      <hr />
      <button
        @click="navigateTo('search')"
        class="btn btn-primary mb-3 text-start"
      >
        Search
      </button>
      <button
        @click="navigateTo('dashboard')"
        class="btn btn-primary mb-3 text-start"
      >
        Dashboard
      </button>

      <button
        @click="navigateTo('searchmap')"
        class="btn btn-primary mb-3 text-start"
      >
        Search in Map
      </button>
    </nav>

    <!-- Main Content Area -->
    <div class="main-content p-4 flex-grow-1">
      <h2 style="text-align: center">Search Locations and Branches</h2>
      <!-- Include MapBranches component here -->
      <homemap />
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import homemap from "@/components/homemap.vue"; // Import the component

const router = useRouter();

function navigateTo(page) {
  router.push(`/${page}`);
}
</script>

<style scoped>
/* Custom menu bar styles */
.menu-bar {
  background-color: #f5f5f5; /* Light gray background for the menu */
}

.menu-bar .btn-primary {
  background-color: #003087; /* Dark Blue for buttons */
  border-color: #003087; /* Border matching the background */
}

.menu-bar .btn-primary:hover {
  background-color: #001f5b; /* Slightly darker blue on hover */
  border-color: #001f5b;
}

/* Main content area */
.main-content {
  background-color: #ffffff; /* White background */
}
</style>
