<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Navbar -->
    <header class="bg-primary text-white shadow-md">
      <div class="container mx-auto flex justify-between items-center py-4 px-6">
        <h1 class="text-xl font-bold">Payment</h1>
        <button class="text-gray-200 hover:text-white">← Back</button>
      </div>
    </header>

    <!-- Content -->
    <main class="container mx-auto px-6 py-10">
      <h2 class="text-2xl font-bold text-primary mb-6">Complete Your Payment</h2>

      <!-- Payment Card -->
      <div class="bg-white rounded-2xl shadow-lg p-6 md:p-10">
        <!-- Bank Option -->
        <div class="flex items-center gap-3 mb-6">
          <img
            src="data:image/png;base64,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"
            alt="Bank Icon"
            class="w-10 h-10"
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
            <button
              @click="searchAccount"
              class="bg-primary text-white px-6 py-3 font-bold hover:opacity-90 transition"
            >
              Search
            </button>
          </div>
          <p v-if="accountName" class="mt-2 text-green-600 font-semibold">
            ✅ Account found: {{ accountName }}
          </p>
        </div>

        <!-- Pay Button -->
        <div class="mt-8">
          <button
            @click="makePayment"
            class="w-full py-3 text-lg font-bold text-white rounded-full bg-gradient-to-r from-primary to-blue-500 hover:opacity-90 transition"
            :disabled="!accountName"
          >
            Pay Now
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

// Fake payment
const makePayment = () => {
  alert(`Processing payment for ${accountName.value}...`);
};
</script>

<style>
.bg-primary {
  background-color: #2563eb;
}
.text-primary {
  color: #2563eb;
}
</style>
