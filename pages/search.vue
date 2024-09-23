<template>
  <div class="container">
    <h1 class="text-center my-4">Branch Search</h1>
    <form @submit.prevent="searchBranches">
      <div class="mb-3">
        <input
          v-model="query"
          type="text"
          class="form-control"
          placeholder="Enter branch number (LID), phone, or name"
        />
      </div>
      <button type="submit" class="btn btn-primary">Search</button>
    </form>

    <div v-if="filteredBranches.length > 0" class="mt-4">
      <h2>Search Results:</h2>
      <ul class="list-group">
        <li
          v-for="branch in filteredBranches"
          :key="branch.LID"
          class="list-group-item"
        >
          <h5>{{ branch.BRANCHNAME }}</h5>
          <p>
            {{ branch.ADDRESS }}, {{ branch.CITY }}, {{ branch.STATE }}
            {{ branch.ZIP }}
          </p>
          <p>Phone: {{ branch.PHONE }}</p>
          <p>Hours: {{ branch.HOURS }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import axios from "axios";

const query = ref("");
const branches = ref([]);

const searchBranches = async () => {
  try {
    const response = await axios.get("/api/branches", {
      params: {
        query: query.value,
      },
    });
    if (response.data.error) {
      console.error("Error retrieving data:", response.data.error);
    } else {
      branches.value = response.data;
    }
  } catch (error) {
    console.error("Error fetching data:", error.message);
    alert("Error retrieving branch data. Please try again.");
  }
};

const filteredBranches = computed(() => {
  if (!query.value) return branches.value;
  const lowerCaseQuery = query.value.toLowerCase();
  return branches.value.filter(
    (branch) =>
      branch.BRANCHNAME.toLowerCase().includes(lowerCaseQuery) ||
      branch.PHONE.includes(lowerCaseQuery) ||
      branch.LID.toString().includes(lowerCaseQuery)
  );
});
</script>
