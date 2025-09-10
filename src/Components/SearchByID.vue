<template>
  <div class="min-h-screen flex flex-col items-center justify-start bg-white">
    <!-- Top Bar -->
    <div class="w-full bg-lime-400 text-black flex justify-between items-center px-6 py-2 text-sm font-semibold">
      <div class="flex items-center space-x-2">
        <span>🕒 MONDAY - SUNDAY, 24/7</span>
      </div>
      <div class="flex items-center space-x-2">
        <span>☎️ (+251965914422)</span>
      </div>
    </div>

    <!-- Hero Section -->
    <div 
      class="relative w-full h-[70vh] flex flex-col items-center justify-center text-center text-white bg-cover bg-center"
      style="background-image: url('/family.png');"
    >
      <!-- Dropdown Lang Button -->
      <div class="absolute top-4 right-4">
        <div class="relative inline-block text-left">
          <button 
            @click="toggleDropdown" 
            class="bg-lime-400 text-black px-4 py-1 shadow font-semibold hover:bg-lime-500 transition"
          >
            {{ selectedLang }}
          </button>

          <div 
            v-if="isDropdownOpen" 
            class="absolute right-0 mt-2 w-32 bg-white border rounded shadow-lg z-20"
          >
            <button @click="setLang('ENG')" class="block w-full text-left px-4 py-2 text-green-500 hover:bg-gray-100">ENG</button>
            <button @click="setLang('AMH')" class="block w-full text-left px-4 text-green-600 py-2 hover:bg-gray-100">AMH</button>
          </div>
        </div>
      </div>

      <!-- Content -->
      <div class="relative z-10 flex flex-col items-center space-y-6 px-4">
        <h1 class="text-5xl font-extrabold text-lime-400">CBHI</h1>
        <h2 class="text-2xl font-bold">COMMUNITY BASED HEALTH INSURANCE</h2>
        <p class="text-lg max-w-2xl text-lime-300">
          Your gateway to secure, simplified, and inclusive health insurance services in Addis Ababa
        </p>

        <!-- Search Box -->
        <div class="flex items-center bg-white rounded-full shadow px-4 py-2 w-full max-w-md">
          <input 
            type="text" 
            placeholder="Search by CBHI ID" 
            v-model="searchId"
            class="flex-1 outline-none text-black placeholder-gray-500"
          />
          <button 
            @click="searchUser" 
            class="ml-2 bg-lime-400 px-4 py-1 rounded-full text-black font-semibold hover:bg-lime-500 transition"
          >
            Search
          </button>
        </div>

        <!-- Display Result -->
        <div v-if="user" class="mt-6 bg-white text-black p-6 rounded shadow w-full max-w-md text-left space-y-2">
          <h3 class="font-bold text-lg">User Info</h3>
          <p><strong>Name:</strong> {{ user.fullName }}</p>
          <p><strong>CBHI ID:</strong> {{ user.cbhiId }}</p>
          <p><strong>Enrollment Date:</strong> {{ user.enrollmentDate || 'N/A' }}</p>

          <h3 class="font-bold mt-4 text-lg">Installments</h3>
          <ul class="list-disc list-inside">
            <li v-for="inst in installments" :key="inst.id">
              {{ inst.month }} - {{ inst.amount }} ETB - {{ inst.status }}
            </li>
          </ul>

          <p class="mt-2 font-bold">Total Amount: 
            {{ installments.reduce((sum, inst) => sum + Number(inst.amount || 0), 0) }} ETB
          </p>
        </div>

        <div v-if="errorMessage" class="mt-6 text-red-500 font-semibold">
          {{ errorMessage }}
        </div>
      </div>
    </div>

    <!-- App Store Buttons -->
    <div class="flex space-x-6 my-10">
      <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" class="h-14" />
      <img src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" alt="App Store" class="h-14" />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { SearchApi } from "../api/searchIdBy";
import { useRouter } from "vue-router";

const router = useRouter();
const searchId = ref("");
const errorMessage = ref("");

const searchUser = async () => {
  if (!searchId.value) {
    alert("Please enter CBHI ID");
    return;
  }

  errorMessage.value = "";

  try {
    const { user, installments } = await SearchApi.searchUserById(searchId.value);

    // Redirect to RenewalAmount page and pass data via query params
   router.push({
  name: "RenewalAmount",
  query: {
    userId: user.id,
    fullName: user.fullName,
    fees: encodeURIComponent(JSON.stringify({
      registrationFee: installments.registrationFee,
      insuredFee: installments.insuredFee,
      dependantsFee: installments.dependentsFee,
      penaltyFee: installments.penaltyFee,
      otherFee: installments.otherFee
    }))
  }
});


  } catch (err) {
    errorMessage.value = err.message || "Something went wrong";
  }
};
</script>

<style>
body {
  font-family: 'Inter', sans-serif;
}
</style>
