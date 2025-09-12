<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Navbar -->
    <header class="bg-primary text-white shadow-md">
      <div class="container mx-auto flex justify-between items-center py-4 px-6">
        <h1><img src="/cbhirenew.png" alt="Arrow" class="mx-auto h-8" /></h1>
   
      </div>
    </header>

    <!-- Content -->
    <main class="container mx-auto px-9 py-15">
      <h2 class="text-2xl font-bold text-primary mb-6">Complete Your Payment</h2>
          <!-- Dropdown Lang Button -->
      <div class="absolute top-4 right-4">
        <div class="relative inline-block text-left">
          <button @click="toggleDropdown" class=" text-black px-4 py-1 shadow font-semibold hover:bg-lime-500 transition">
            {{ selectedLang }}
          </button>
          <div v-if="isDropdownOpen" class="absolute right-0 mt-2 w-32 bg-white border rounded shadow-lg z-20">
            <button @click="setLang('ENG')" class="block w-full text-left px-4 py-2 text-green-500 hover:bg-gray-100">ENG</button>
            <button @click="setLang('AMH')" class="block w-full text-left px-4 py-2 text-green-600 hover:bg-gray-100">AMH</button>
          </div>
        </div>
      </div>

      <!-- Payment Card -->
      <div class="bg-green rounded-2xl shadow-lg p-8 md:p-10 mb-10">
        <!-- Bank Option -->
        <div class="flex items-center gap-3 mb-6">
          <img
            src="/Green-Logo.png"
            alt="Bank Icon"
            class="w-20 h-10 mb-2"
          />
          <div>
            <p class="font-bold text-lg text-primary">Pay with Siinqee Bank</p>
            <p class="text-gray-500 text-sm">Secure payment through your account</p>
          </div>
        </div>
        

        <!-- Account Number Input -->
        <div class="mb-6">
          <label class="block text-gray-700 font-medium mb-2">Account Number</label>
          <div class="flex items-center rounded-full shadow-sm border border-gray-300 focus-within:ring-2 focus-within:ring-primary overflow-hidden">
            <input
              v-model="accountNumber"
              type="text"
              placeholder="Enter your account number"
              class="flex-1 px-4 py-3 outline-none text-gray-700"
            />
            <!-- <button
              @click="searchAccount"
              class="bg-primary text-white px-6 py-3 font-bold hover:opacity-90 transition"
            >
              Search
            </button> -->
          </div>
          <p v-if="accountName" class="mt-2 text-green-600 font-semibold">
            ✅ Account found: {{ accountName }}
          </p>
        </div>

        <!-- Pay Button -->
        <div class="mt-8">
          <button
            @click="makePayment"
            class="w-full py-3 text-lg font-bold text-white rounded-full bg-primary hover:opacity-90 transition"
            :disabled="!accountName"
          >
            Pay Now
          </button>
        </div>
      </div>

      <!-- Select Payment Method Title -->
<h3 class="text-lg font-semibold text-yellow-700 mb-4 text-center">
  Select Your Payment Method
</h3>

<!-- Centered 2 Payment Option Buttons with border color and animation -->
<div class="flex justify-center mb-10">
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <button
      class="bg-white rounded-xl shadow p-3 flex flex-col items-center hover:bg-lime-100 transition border-2 border-green-400 animate-card w-72 md:w-96"
      @click="goToChapa"
    >
      <img src="/Chapa.png" alt="M-Pesa" class="w-20 h-20 mb-2" />
      <p class="text-gray-500 text-xs mt-1">Pay with chapa</p>
    </button>
    <button
      class="bg-white rounded-xl shadow p-3 flex flex-col items-center hover:bg-blue-100 transition border-2 border-blue-400 animate-card w-72 md:w-96"
      @click="alert('Pay with Telebirr')"
    >
      <img src="/Green-Logo.png" alt="Telebirr" class="w-30 h-20 mb-2" />
      <p class="text-gray-500 text-xs mt-1">Pay with siinqee</p>
    </button>
  </div>
</div>
    </main>
  </div>
  
</template>

<script setup>
import { ref } from "vue";

const accountNumber = ref("");
const accountName = ref("");

// Fake search function
const searchAccount = () => {
  if (accountNumber.value === "123456") {
    accountName.value = "John Doe - Sinqque Bank";
  } else {
    accountName.value = "";
    alert("Account not found! Please check the number.");
  }
};
const selectedLang = ref("🌐 Language");
const setLang = (lang) => {
  selectedLang.value = lang;
  isDropdownOpen.value = false;
};
const isDropdownOpen = ref(false);

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};


// Fake payment
const makePayment = () => {
  alert(`Processing payment for ${accountName.value}...`);
};

const goToChapa = () => {
  // Add your navigation logic here
  alert('Navigating to Chapa payment...');
};
</script>

<style>
.bg-primary {
  background-color: #6C9448;
}
.text-primary {
  color: #f79120;
  
}

/* Card entrance animation */
@keyframes cardIn {
  0% {
    opacity: 0;
    transform: translateY(40px) scale(0.95);
  }
  60% {
    opacity: 1;
    transform: translateY(-8px) scale(1.03);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
.animate-card {
  animation: cardIn 0.8s cubic-bezier(0.23, 1, 0.32, 1);
  /* Optional: stagger effect for grid children */
}
.animate-card:nth-child(1) { animation-delay: 0.1s; }
.animate-card:nth-child(2) { animation-delay: 0.2s; }
.animate-card:nth-child(3) { animation-delay: 0.3s; }
.animate-card:nth-child(4) { animation-delay: 0.4s; }
</style>
