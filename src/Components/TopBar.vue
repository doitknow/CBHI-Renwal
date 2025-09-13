<template>
  <header class="w-full bg-gradient-to-r from-lime-400 to-lime-400 text-black shadow-md relative">
    <div class="container mx-auto flex justify-between items-center py-3 px-6">
      <!-- Left side -->
      <div class="flex items-center space-x-3 text-sm md:text-base font-bold">
        <span>🕒 | Monday - Sunday, 24/7</span>
      </div>

      <!-- Right side -->
      <div class="flex items-center space-x-3 text-sm md:text-base font-bold">
        <span>📞 (+251 965 914 422)</span>
        <span class="hidden md:inline-block">| Ethiopia</span>
      </div>
    </div>

    <!-- Dropdown Lang Button -->
    <div class="absolute top-4 right-6">
      <div class="relative inline-block text-left">
        <button
          @click="toggleDropdown"
          class="bg-yellow-400 text-black px-4 py-1 shadow font-semibold hover:bg-lime-500 transition"
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
            class="block w-full text-left px-4 py-2 text-green-600 hover:bg-gray-100"
          >
            AMH
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from "vue";

const isDropdownOpen = ref(false);
const selectedLang = ref("🌐 Language");

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const setLang = (lang) => {
  selectedLang.value = lang;
  isDropdownOpen.value = false;
};
</script>
