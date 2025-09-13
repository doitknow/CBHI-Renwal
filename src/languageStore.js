// /src/stores/languageStore.js
import { defineStore } from "pinia";
import { ref } from "vue";

export const useLanguageStore = defineStore("language", () => {
  const selectedLang = ref("🌐 Language");
  const isDropdownOpen = ref(false);

  const toggleDropdown = () => {
    isDropdownOpen.value = !isDropdownOpen.value;
  };

  const setLang = (lang) => {
    selectedLang.value = lang;
    isDropdownOpen.value = false;
  };

  return {
    selectedLang,
    isDropdownOpen,
    toggleDropdown,
    setLang,
  };
});
