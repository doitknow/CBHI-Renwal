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

    <!-- Background with image overlay -->
    <div 
      class="relative w-full h-[70vh] flex flex-col items-center justify-center text-center text-white bg-cover bg-center"
      style="background-image: url('/family.png');"
    >
      <!-- Dropdown Lang Button -->
      <div class="absolute top-4 right-4">
        <div class="relative inline-block text-left">
          <button 
            @click="toggleDropdown" 
            class="bg-lime-400 text-black px-4 py-1  shadow font-semibold hover:bg-lime-500 transition"

          >
            {{ selectedLang }}
          </button>

          <div 
            v-if="isDropdownOpen" 
            class="absolute right-0 mt-2 w-32 bg-white border rounded shadow-lg z-20"
          >
            <button 
              @click="setLang('ENG')" 
              class="block w-full text-left px-4 py-2 text-green-500 hover:bg-gray-100"
            >
              ENG
            </button>
            <button 
              @click="setLang('AMH')" 
              class="block w-full text-left px-4 text-green-600 py-2 hover:bg-gray-100"
            >
              AMH
            </button>
          </div>
        </div>
      </div>

      <!-- Content -->
      <div class="relative z-10 flex flex-col items-center space-y-6">
        <!-- Logo/Title -->
        <h1 class="text-5xl font-extrabold text-lime-400">CBHI</h1>
        <h2 class="text-2xl font-bold">COMMUNITY BASED HEALTH INSURANCE</h2>
        <p class="text-lg max-w-2xl text-lime-300">
          Your gateway to secure, simplified, and inclusive health insurance services in Addis Ababa
        </p>

        <!-- Search Box -->
        <div class="flex items-center bg-white rounded-full shadow px-4 py-2 w-96">
          <input 
            type="text" 
            placeholder="search by CBHI ID" 
            v-model="searchId"
            class="flex-1 outline-none text-black placeholder-gray-500"
          />
          <button 
            @click="search" 
            class="ml-2 bg-lime-400 px-4 py-1 rounded-full text-black font-semibold hover:bg-lime-500 transition"
          >
            search
          </button>
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
import { ref } from 'vue'

const searchId = ref("")
const isDropdownOpen = ref(false)
const selectedLang = ref("Lang")

const search = () => {
  if (!searchId.value) {
    alert("Please enter CBHI ID")
    return
  }
  alert(`Searching for CBHI ID: ${searchId.value}`)
}

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
}

const setLang = (lang) => {
  selectedLang.value = lang
  isDropdownOpen.value = false
}
</script>

<style>
/* Optional: smooth fonts */
body {
  font-family: 'Inter', sans-serif;
}
</style>
