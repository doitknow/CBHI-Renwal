<template>
  <div class="min-h-screen flex flex-col items-center justify-start bg-white">
    <!-- Top Bar -->
    <div class="w-full bg-gradient-to-r from-lime-400  to-lime-400 text-black flex justify-between items-center px-8 py-3 text-base font-bold shadow-md">
      <div class="flex items-center space-x-3 text-sm md:text-base ">
        <span>🕒 | Monday - Sunday, 24/7</span>
      </div>
      <div class="flex items-center space-x-3 text-sm md:text-base ">
        <span>📞 (+251 965 914 422)</span>
        <span class="hidden md:inline-block">|Ethiopia</span>
      </div>
    </div>

    <!-- Background with image overlay -->
    <div 
      class="relative w-full h-[74vh] flex flex-col items-center justify-center text-center text-white bg-cover bg-center bg-slide"
    >
      <!-- Dropdown Lang Button -->
      <div class="absolute top-4 right-4">
        <div class="relative inline-block text-left">
          <button 
            @click="toggleDropdown" 
            class="bg-yellow-400 text-black px-4 py-1  shadow font-semibold hover:bg-lime-500 transition"
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
        <img src="/arrow.png" alt="Arrow" class="mx-auto  h-9" />
        <h2 class="text-2xl font-bold">COMMUNITY BASED HEALTH INSURANCE</h2>
        <p class="text-lg max-w-2xl text-lime-300">
          Your gateway to secure, simplified, and inclusive health insurance services in Addis Ababa
        </p>

        <!-- Search Box -->
        <div class="flex items-center bg-white rounded-full shadow px-4 py-2 w-150">
          <input 
            type="text" 
            placeholder="search by CBHI ID to renew your membership" 
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
      <div class="flex space-x-6 my-10">
      
    </div>
 <div class="h-10 object-contain ml-4 mr-auto" >
     <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" class="h-10"
  />
      <img src="/appstore.png" alt="App Store" class="h-15" />
 </div>
    </div>

    <!-- Bottom Marquee with Logo Cards -->
    <div class="w-full bg-yellow-100 py-6 mt-auto overflow-hidden">
      <div class="marquee flex space-x-30">
        <div v-for="n in 1" :key="n" class=" flex p-10  items-center justify-center">
          <img :src="`/Green-Logo.png`" alt="partner logo" class="h-16 w-35 object-contain" />
        </div>
        <div v-for="n in 1" :key="n + 1" class=" flex items-center justify-center">
          <img :src="`/cbe.png`" alt="partner logo" class="h-16 object-contain" />
        </div>
        <div v-for="n in 1" :key="n + 2" class=" flex items-center justify-center">
          <img :src="`/mpesas.png`" alt="partner logo" class="h-16 object-contain" />
        </div>
        <div v-for="n in 1" :key="n + 3" class=" flex items-center justify-center">
          <img :src="`/telebirr.png`" alt="partner logo" class="h-16 object-contain" />      </div>
          <div v-for="n in 1" :key="n + 4" class=" flex items-center justify-center">
          <img :src="`/BankofAbyssinia.png`" alt="partner logo" class="h-18 object-contain" />
        </div>
        <div v-for="n in 1" :key="n + 5" class=" flex items-center justify-center">
          <img :src="`/anbessabank.png`" alt="partner logo" class="h-16 object-contain" />
        </div>
        <div v-for="n in 1" :key="n + 6" class=" flex items-center justify-center">
          <img :src="`/Chapa.png`" alt="partner logo" class="h-16 object-contain" />
        </div>

          
       
      
      </div>
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
body {
  font-family: 'Inter', sans-serif;
}

/* Marquee Animation */
.marquee {
  display: inline-flex;
  animation: scroll 20s linear infinite;
}

@keyframes scroll {
  0% { transform: translateX(100%); }
  100% { transform: translateX(-100%); }
}

.bg-slide {
  position: relative;
  background-image: url('/family.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 0% 50%;
  animation: bgMove 20s linear infinite;
  overflow: hidden;
}

/* .bg-slide::after {
  content: "";
  position: absolute;
  inset: 0;
  background-image: url('/people.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 100% 50%;
  opacity: 0;
  animation: fadePeople 20s linear infinite;
  transition: opacity 1s;
  z-index: 1;
} */

@keyframes bgMove {
  0% { background-position: 0% 50%; }
  100% { background-position: 100% 50%; }
}

@keyframes fadePeople {
  0%, 40% { opacity: 0; }
  50%, 90% { opacity: 1; }
  100% { opacity: 0; }
}
</style>
