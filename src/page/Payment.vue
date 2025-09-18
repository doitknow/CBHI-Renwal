<template>

  <div class="min-h-screen bg-gray-100 relative">
    <!-- Navbar -->
    <header class="bg-primary text-white shadow-md">
      <div class="container mx-auto flex justify-between items-center py-4 px-6">
        <h1>
          <img src="/cbhirenew.png" alt="Arrow" class="mx-auto h-8" />
        </h1>
      </div>
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
    </header>

    <!-- Content -->
    <main class="container mx-auto px-9 py-15">
      <h2 class="text-2xl font-bold text-primary mb-6">{{ t("completePayment") }}</h2>

      <!-- Payment Card -->
      <div class="bg-green rounded-2xl shadow-lg p-8 md:p-10 mb-10">
        <!-- Bank Option -->
        <div class="flex items-center gap-3 mb-6">
          <img src="/Green-Logo.png" alt="Bank Icon" class="w-20 h-10 mb-2" />
          <div>
            <p class="font-bold text-lg text-primary">{{ t("payWithSiinqee") }}</p>
            <p class="text-gray-500 text-sm">{{ t("securePayment") }}</p>
          </div>
        </div>

        <!-- Account Number Input -->
        <div class="mb-6">
          <label class="block text-gray-700 font-medium mb-2">{{ t("accountNumber") }}</label>
          <div class="flex items-center rounded-full shadow-sm border border-gray-300 focus-within:ring-2 focus-within:ring-primary overflow-hidden">
            <input
              v-model="accountNumber"
              type="text"
              :placeholder="t('enterAccountNumber')"
              class="flex-1 px-4 py-3 outline-none text-gray-700"
            />
          </div>
          <p v-if="accountError" class="text-red-500 text-sm mt-2">{{ accountError }}</p>
        </div>

        <!-- Pay Button -->
        <div class="mt-8">
          <button
            @click="handlePayNow"
            class="w-full py-3 text-lg font-bold text-white rounded-full bg-primary hover:opacity-90 transition"
          >
            {{ t("payNow") }}
          </button>
        </div>
      </div>
      
<!-- after get the backend access uncomment this line 
      <Verification :accountNumber="accountNumber" @close="showVerification = false" /> -->

      <!-- Select Payment Method Title -->
      <h3 class="text-lg font-semibold text-yellow-700 mb-4 text-center">
        {{ t("selectPaymentMethod") }}
      </h3>

      <!-- Payment Options -->
      <div class="flex justify-center mb-10">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            class="bg-white rounded-xl shadow p-3 flex flex-col items-center hover:bg-lime-100 transition border-2 border-green-400 animate-card w-72 md:w-96"
            @click="goToChapa"
            
          >
            <img src="/Chapa.png" alt="Chapa" class="w-35 h-20 mb-2" />
            <p class="text-gray-500 text-xs mt-1">{{ t("payWithChapa") }}</p>
          </button>
          <button
            class="bg-white rounded-xl shadow p-3 flex flex-col items-center hover:bg-blue-100 transition border-2 border-blue-400 animate-card w-72 md:w-96"
            @click="alert(t('payWithSiinqee'))"
          >
            <img src="/Green-Logo.png" alt="Siinqee" class="w-30 h-20 mb-2" />
            <p class="text-gray-500 text-xs mt-1">{{ t("payWithSiinqee") }}</p>
          </button>
        </div>
      </div>
    </main>

    <!-- ✅ Popup Verification -->
    <div v-if="showVerification" class="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
      <Verification @close="showVerification = false" :phone= phone />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { lang, setLang, t } from "../i18n.js";
import Verification from "./verification.vue";
import { useUserStore } from "../store/userStore.js";
import { LoginApi } from "../api/sendOtp.js";

const userStore = useUserStore();

const accountNumber = ref("");
const accountError = ref("");
const showVerification = ref(false);
<<<<<<< HEAD
userStore.setAccountNumber(accountNumber); 
const phone = userStore.phoneNumber ?? '976304775';

console.log(phone);

const handlePayNow = async () => {
  if (!/^\d{13}$/.test(accountNumber.value)) {
    accountError.value = "Account number must be 13 digits and numeric.";
    return;
  }

  accountError.value = "";

  // 🔑 Trigger OTP request here
  const success = await LoginApi.requestOtp({ phoneNumber: phone });
  if (success) {
    showVerification.value = true;
  } else {
    accountError.value = "Failed to send OTP. Try again.";
  }
};

// uncomment this scrip after get the backend get
// import axios from "axios";

=======
userStore.setAccountNumber(accountNumber);
const isDropdownOpen = ref(false); 
const phone = userStore.phoneNumber; // 📌 stored in Pinia
console.log(phone)
>>>>>>> d9d4d1a ( all)
// const handlePayNow = async () => {
//   if (!/^\d{13}$/.test(accountNumber.value)) {
//     accountError.value = "Account number must be 13 digits and numeric.";
//     return;
//   }
//   // const res = await LoginApi.sendOtp(phone);
//   accountError.value = "";
//   showVerification.value = true;
// };


import axios from "axios";

const handlePayNow = async () => {
  if (!/^\d{13}$/.test(accountNumber.value)) {
    accountError.value = "Account number must be 13 digits and numeric.";
    return;
  }
  if (!phone) {
    accountError.value = "Failed to send OTP: phone number not Found.";
    return;
  }
  try {
    const res = await LoginApi.sendOtp(phone);
    accountError.value = "";
    showVerification.value = true;
  } catch (err) {
    accountError.value = "Failed to send OTP.";
  }
};
// language dropdown
const selectedLang = ref(lang.value.toUpperCase());
const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};
const setLangHandler = (l) => {
  setLang(l);
  selectedLang.value = l.toUpperCase();
  isDropdownOpen.value = false;
};
</script>

<style>
.bg-primary {
  background-color: #6C9448;
}
.text-primary {
  color: #f79120;
}
.colororange {
  color: #f79120;
}
</style>