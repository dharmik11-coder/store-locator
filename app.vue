<template>
  <div>
    <!-- Custom Header with Increased Size -->
    <header class="bg-light py-5">
      <div class="container">
        <div class="row align-items-center">
          <!-- Left: Open 365 Info -->
          <div class="col-md-4 text-center text-md-start">
            <h4 class="fw-bold text-primary">OPEN 365!</h4>
            <p class="mb-0 fs-5 text-primary">1-800-801-4444</p>
            <small class="text-muted">Toll Free Customer Care Number</small>
          </div>

          <!-- Center: Logo -->
          <div class="col-md-4 text-center">
            <img
              src="/public/images/amscotimage.jpg"
              alt="Amscot Logo"
              class="img-fluid"
              style="max-width: 500px"
            />
            <p class="text-muted fs-5">The Money Superstore<sup>®</sup></p>
          </div>

          <!-- Right: Tagline -->
          <div class="col-md-4 text-center text-md-end">
            <h4 class="fw-bold text-primary">
              You're OK <br />With Us!<sup>®</sup>
            </h4>
          </div>
        </div>
      </div>
    </header>

    <!-- Home Button -->
    <div class="container my-2 text-start">
      <button class="btn btn-primary" @click="goHome">Home</button>
    </div>

    <!-- Main Content -->
    <div class="container my-4">
      <NuxtPage />
    </div>

    <!-- Footer -->
    <footer class="bg-light text-center text-lg-start">
      <div class="container p-4">
        <p class="text-center mb-0">&copy; 2024 Amscot. All Rights Reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router"; // Use Vue Router

const router = useRouter(); // Get the router instance

// Function to navigate to the landing page
const goHome = () => {
  router.push("/"); // Navigate to the home/landing page
};
</script>

<style scoped>
/* Custom styles for the header */
header {
  border-bottom: 1px solid #e0e0e0;
  padding-top: 50px; /* Increased padding at the top */
  padding-bottom: 50px; /* Increased padding at the bottom */
}

h4,
h5 {
  color: #003087; /* Amscot primary blue color */
}

img {
  max-height: 80px; /* Increased height for the logo */
}

button {
  margin-bottom: 20px; /* Add some space below the button */
}
</style>
