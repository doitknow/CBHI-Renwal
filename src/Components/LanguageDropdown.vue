<template>
  <div class="relative inline-block text-left">
    <button 
      @click="lang.toggleDropdown"
      class="bg-yellow-400 text-black px-4 py-1 shadow font-semibold hover:bg-lime-500 transition"
    >
      {{ lang.selectedLang }}
    </button>
    <div 
      v-if="lang.isDropdownOpen" 
      class="absolute right-0 mt-2 w-32 bg-white border rounded shadow-lg z-20"
    >
      <button 
        @click="lang.setLang('ENG')" 
        class="block w-full text-left px-4 py-2 text-green-500 hover:bg-gray-100"
      >
        ENG
      </button>
      <button 
        @click="lang.setLang('AMH')" 
        class="block w-full text-left px-4 py-2 text-green-600 hover:bg-gray-100"
      >
        AMH
      </button>
    </div>
  </div>
</template>

<script setup>
import { useLanguageStore } from "@/stores/languageStore";

const lang = useLanguageStore();
</script>
