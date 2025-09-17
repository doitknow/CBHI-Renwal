<template>
  <div class="min-h-screen bg-gray-100 relative">
    <!-- Navbar -->
    <header class="bg-primary text-white shadow-md">
      <div class="container mx-auto flex justify-between items-center py-4 px-6">
        <h1>
          <img src="/cbhirenew.png" alt="Arrow" class="mx-auto h-8" />
        </h1>
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
    </main>

    <!-- ✅ Popup Verification -->
    <div v-if="showVerification" class="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
      <Verification @close="showVerification = false" :phone="phone" />
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
userStore.setAccountNumber(accountNumber); 
const phone = userStore.phoneNumber; // 📌 stored in Pinia
console.log(phone)
const handlePayNow = async () => {
  if (!/^\d{13}$/.test(accountNumber.value)) {
    accountError.value = "Account number must be 13 digits and numeric.";
    return;
  }
  accountError.value = "";

  // ✅ Request OTP from backend
  const success = await LoginApi.requestOtp({ phoneNumber: phone });
  if (success) {
    showVerification.value = true;
  } else {
    alert("Failed to send OTP. Try again.");
  }
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
