
<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { translations, lang, setLang } from "../i18n.js";
import {SearchApi} from "../api/searchIdBy.js"

import { useUserStore } from "../store/userStore.js";

const router = useRouter();
const userStore=useUserStore();
const searchId = ref("");
const isDropdownOpen = ref(false);

const selectedLang = ref(lang.value.toUpperCase());

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};
const logos = [
  { src: "/Green-Logo.png", alt: "partner logo" },
  { src: "/cbe.png", alt: "partner logo" },
  { src: "/mpesas.png", alt: "partner logo" },
  { src: "/telebirr.png", alt: "partner logo" },
  { src: "/BankofAbyssinia.png", alt: "partner logo" },
  { src: "/anbessabank.png", alt: "partner logo" },
  { src: "/Chapa.png", alt: "partner logo" },
];

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
    console.log(user)
    userStore.setUser(user)

      if (user.phoneNumber == "") {
  const phone = '976304775';
  userStore.setPhoneNumber(phone);
}
else{
  userStore.setPhoneNumber(user.phoneNumber)
}

    const name = encodeURIComponent(user.firstName + " " + user.fathersName + " " + user.grandFathersName);
    router.push(`/renewal/${user.id}/${name}`);
  } catch (err) {
    alert(err.message + " Something went wrong");
  }
};

const t = (key) => {
  return translations[lang.value]?.[key] || translations.en[key] || key;
};
</script>

<template>
  <div class="min-h-screen flex flex-col items-center justify-start bg-white">
    <!-- Top Bar -->
    <div class="w-full bg-gradient-to-r from-lime-400 to-lime-400 text-black flex justify-between items-center px-8 py-3 text-base font-bold shadow-md">
      <div class="flex items-center space-x-3 text-sm md:text-base">
        <span>{{ t("hours") }}</span>
      </div>
      <div class="flex items-center space-x-3 text-sm md:text-base">
        <span class="colors-blue-400">📞</span>
        <span class="color-blue-400">{{ t("phone") }}</span>
        <span class="hidden md:inline-block">| {{ t("Ethiopia") }}</span>
      </div>
    </div>

    <!-- Background with image overlay -->
    <div class="relative w-full h-[80vh] flex flex-col items-center justify-center text-center text-white bg-slide">
      <!-- Dropdown Lang Button -->
      <div class="absolute top-4 right-4">
  <div class="relative inline-block text-left">
    <button 
      @click="toggleDropdown" 
      class="colororange text-black px-4 py-1 shadow font-semibold hover:bg-lime-500 transition flex items-center space-x-2"
    >
      <!-- Language (Globe) Icon -->
      <svg xmlns="http://www.w3.org/2000/svg" 
           class="h-5 w-5 text-current"
           fill="none" 
           viewBox="0 0 24 24" 
           stroke="currentColor"
           stroke-width="2">
        <path stroke-linecap="round" 
              stroke-linejoin="round" 
              d="M12 21c4.97 0 9-4.03 9-9s-4.03-9-9-9-9 4.03-9 9 4.03 9 9 9z" />
        <path stroke-linecap="round" 
              stroke-linejoin="round" 
              d="M2.05 12h19.9M12 2.05a15.91 15.91 0 010 19.9M12 2.05a15.91 15.91 0 000 19.9" />
      </svg>

      <span>{{ selectedLang }}</span>

      <!-- Dropdown Icon -->
      <svg xmlns="http://www.w3.org/2000/svg" 
           class="h-4 w-4 text-current transition-transform duration-200"
           :class="{ 'rotate-180': isDropdownOpen }"
           fill="none" 
           viewBox="0 0 24 24" 
           stroke="currentColor">
        <path stroke-linecap="round" 
              stroke-linejoin="round" 
              stroke-width="2" 
              d="M19 9l-7 7-7-7" />
      </svg>
    </button>

    <!-- Dropdown Menu -->
    <div 
      v-if="isDropdownOpen" 
      class="absolute right-0 mt-2 w-32 bg-white border rounded shadow-lg z-20"
    >
      <button 
        @click="setLangHandler('en')" 
        class="block w-full text-left px-4 py-2 text-green-500 hover:bg-gray-100"
      >ENG</button>

      <button 
        @click="setLangHandler('አማ')" 
        class="block w-full text-left px-4 py-2 text-green-600 hover:bg-gray-100"
      >አማ</button>

      <button 
        @click="setLangHandler('oro')" 
        class="block w-full text-left px-4 py-2 text-green-500 hover:bg-gray-100"
      >ORO</button>
    </div>
  </div>
</div>



      <!-- Content -->
      <div class="relative z-10 flex flex-col items-center space-y-6">
        <!-- <h1 class="text-5xl font-extrabold text-blue-500">CBHI</h1> -->
        <h1><img src="/cbhirenew.png" alt="Arrow" class="mx-auto h-20" /></h1>
        <h2 class="text-2xl font-bold"> {{t("COMMUNITY_BASED_HEALTH_INSURANCE")}}</h2>
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
          <button
            class="focus:outline-none"
            @click="window.open('https://play.google.com/store', '_blank')"
            aria-label="Get it on Google Play"
            type="button"
          >
            <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" class="h-10" />
          </button>
          <button
            class="focus:outline-none"
            @click="window.open('https://www.apple.com/app-store/', '_blank')"
            aria-label="Download on the App Store"
            type="button"
          >
            <img src="/appstore.png" alt="App Store" class="h-15" />
          </button>
        </div>
      </div>
    </div>

    <!-- Bottom Marquee -->
    <div class="w-full bg-yellow-100 py-6 mt-auto overflow-hidden">
      <div class="marquee flex space-x-20">
        <img v-for="logo in logos" :key="logo.src" :src="logo.src" :alt="logo.alt" class="h-16 object-contain" />
      </div>
    </div>
  </div>
</template>


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
.colororange{
  color: #f79120
}
.color-blue-400{
  color: #3b82f6;
}

</style>