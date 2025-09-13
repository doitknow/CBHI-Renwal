<template>
  <div class="min-h-screen flex flex-col items-center justify-start bg-white">
    <!-- Top Bar -->
    <div class="w-full bg-gradient-to-r from-lime-400 to-lime-400 text-black flex justify-between items-center px-8 py-3 text-base font-bold shadow-md">
      <div class="flex items-center space-x-3 text-sm md:text-base">
        <span>{{ t("hours") }}</span>
      </div>
      <div class="flex items-center space-x-3 text-sm md:text-base">
        <span>{{ t("phone") }}</span>
        <span class="hidden md:inline-block">| {{ t("country") }}</span>
      </div>
    </div>

    <!-- Background with image overlay -->
    <div class="relative w-full h-[80vh] flex flex-col items-center justify-center text-center text-white bg-slide">
      <!-- Dropdown Lang Button -->
      <div class="absolute top-4 right-4">
        <div class="relative inline-block text-left">
          <button @click="toggleDropdown" class="bg-yellow-400 text-black px-4 py-1 shadow font-semibold hover:bg-lime-500 transition">
            {{ selectedLang }}
          </button>
          <div v-if="isDropdownOpen" class="absolute right-0 mt-2 w-32 bg-white border rounded shadow-lg z-20">
            <button @click="setLangHandler('en')" class="block w-full text-left px-4 py-2 text-green-500 hover:bg-gray-100">ENG</button>
            <button @click="setLangHandler('am')" class="block w-full text-left px-4 py-2 text-green-600 hover:bg-gray-100">AMH</button>
          </div>
        </div>
      </div>

      <!-- Content -->
      <div class="relative z-10 flex flex-col items-center space-y-6">
        <!-- <h1 class="text-5xl font-extrabold text-blue-500">CBHI</h1> -->
        <h1><img src="/cbhirenew.png" alt="Arrow" class="mx-auto h-20" /></h1>
        <h2 class="text-2xl font-bold">COMMUNITY BASED HEALTH INSURANCE</h2>
        <p class="text-lg max-w-2xl text-lime-300">
          {{ t("cbhiDesc") }}
        </p>

        <!-- Search Box -->
        <div class="flex items-center bg-white rounded-full shadow px-4 py-2 w-150">
          <input 
            type="text" 
            :placeholder="t('searchPlaceholder')" 
            v-model="searchId"
            class="flex-1 outline-none text-black placeholder-gray-500"
          />
          <button @click="searchUser" class="ml-2 bg-lime-400 px-4 py-1 rounded-full text-black font-semibold hover:bg-lime-500 transition">
            {{ t("searchBtn") }}
          </button>
        </div>

        <!-- App Store Buttons -->
        <div class="flex space-x-6 my-12">
          <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" class="h-10" />
          <img src="/appstore.png" alt="App Store" class="h-15" />
        </div>
      </div>
    </div>

    <!-- Bottom Marquee -->
    <div class="w-full bg-yellow-100 py-7 mt-auto overflow-hidden">
      <div class="marquee flex space-x-20">
        <img v-for="logo in logos" :key="logo.src" :src="logo.src" :alt="logo.alt" class="h-16 object-contain" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { SearchApi } from "../api/searchIdBy";
import { useRouter } from "vue-router";
import { translations, lang, setLang } from "../i18n.js";

const router = useRouter();
const searchId = ref("");
const isDropdownOpen = ref(false);
const selectedLang = ref("🌐 Language");

const logos = [
  { src: "/ehis.png", alt: "partner logo" },
  { src: "/Green-Logo.png", alt: "partner logo" },
  
  { src: "/mpesas.png", alt: "partner logo" },
  { src: "/telebirr.png", alt: "partner logo" },
  { src: "/BankofAbyssinia.png", alt: "partner logo" },
  { src: "/anbessabank.png", alt: "partner logo" },
  { src: "/Chapa.png", alt: "partner logo" },
];

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const setLangHandler = (l) => {
  setLang(l);
  selectedLang.value = l.toUpperCase();
  isDropdownOpen.value = false;
};

const searchUser = async () => {
  if (!searchId.value) {
    alert("Please enter CBHI ID");
    return;
  }

  try {
    const result = await SearchApi.searchUserById(searchId.value);
    const user = result.user;
    const name = encodeURIComponent(user.firstName + " " + user.fathersName + " " + user.grandFathersName);

    router.push(`/renewal/${user.id}/${name}`);
  } catch (err) {
    alert(err.message || "Something went wrong");
  }
};

const t = (key) => {
  if (translations[lang.value] && translations[lang.value][key]) {
    return translations[lang.value][key];
  } else if (translations.en && translations.en[key]) {
    return translations.en[key];
  } else {
    return key;
  }
};
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

@keyframes bgMove {
  0% { background-position: 0% 50%; }
  100% { background-position: 100% 50%; }
}
</style>
