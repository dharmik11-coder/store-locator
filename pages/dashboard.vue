<template>
  <div class="container mt-5">
    <h2 style="text-align: center">Branch Distribution Dashboard</h2>
    <div id="chart" class="my-4" style="width: 100%; height: 600px"></div>
  </div>
</template>

<script setup>
import * as echarts from "echarts";
import { onMounted, ref } from "vue";
import axios from "axios"; // Import axios to fetch data from API

const chart = ref(null); // Reference to the chart DOM element
const branchData = ref([]); // Ref to hold branch data fetched from the API

// Function to fetch branch data from API
const fetchBranchData = async () => {
  try {
    const response = await axios.get("/api/branches");
    branchData.value = response.data;

    // Process the data to get the number of branches per city
    const cityCount = branchData.value.reduce((acc, branch) => {
      const city = branch.CITY;
      if (!acc[city]) {
        acc[city] = 1;
      } else {
        acc[city]++;
      }
      return acc;
    }, {});

    const cities = Object.keys(cityCount);
    const counts = Object.values(cityCount);

    // Update the chart with the processed data
    chart.value.setOption({
      xAxis: {
        data: cities, // Set city names as the x-axis data
      },
      series: [
        {
          name: "Branches",
          data: counts, // Set branch counts as the y-axis data
        },
      ],
    });
  } catch (error) {
    console.error("Error fetching branch data:", error);
  }
};

// Function to initialize the chart
const initChart = () => {
  chart.value = echarts.init(document.getElementById("chart")); // Initialize the chart

  const option = {
    grid: {
      bottom: 110,
    },
    title: {
      text: "",
    },
    tooltip: {},
    xAxis: {
      type: "category",
      name: "Cities",
      nameTextStyle: {
        fontSize: 20, // Adjust the font size for the Y-axis label
      },
      data: [], // Will be updated dynamically with city names
      axisLabel: {
        interval: 0, // Display all labels
        rotate: 90, // Rotate labels to display vertically
        fontSize: 8, // Set a smaller font size for city labels
        align: "center", // Center align the text horizontally
        verticalAlign: "top", // Align text below the X-axis
        padding: [0, 80, 0, 0], // Add padding to position the labels below the X-axis
      },
    },
    yAxis: {
      type: "value",
      name: "Number of Branches",
      nameTextStyle: {
        fontSize: 20, // Adjust the font size for the Y-axis label
        align: "center",
        verticalAlign: "middle",
      },
      nameLocation: "middle",
      nameGap: 40,
      axisLabel: {
        fontSize: 10,
      },
    },
    series: [
      {
        name: "Branches",
        type: "bar",
        data: [], // Will be updated dynamically with branch counts
      },
    ],
  };

  chart.value.setOption(option); // Set the initial chart configuration
};

// Initialize chart and fetch data when the component mounts
onMounted(() => {
  initChart(); // Initialize the chart
  fetchBranchData(); // Fetch branch data and update the chart
});
</script>

<style scoped>
/* Add custom styles here if needed */
</style>
