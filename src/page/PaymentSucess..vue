<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6">
    <!-- Success Icon -->
    <div class="bg-green-100 rounded-full p-6 mb-6">
      <svg
        class="h-16 w-16 text-green-600"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    </div>

    <!-- Success Text -->
    <h1 class="text-3xl font-bold text-green-600 mb-2">Payment Successful</h1>
    <p class="text-gray-600 mb-8 text-center max-w-md">
      Thank you! Your payment has been successfully processed.
    </p>

    <!-- Transaction Details -->
    <div class="bg-white shadow rounded-lg p-6 w-full max-w-md mb-8">
      <p class="text-gray-700"><strong>Transaction ID:</strong> {{ txnId }}</p>
      <p class="text-gray-700"><strong>Amount Paid:</strong> {{ amount }} ETB</p>
      <p class="text-gray-700"><strong>Account Number:</strong> {{ accountNumber }}</p>
    </div>

    <!-- Back Home -->
    <button
      @click="goHome"
      class="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg shadow transition"
    >
      Go to Home
    </button>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

// Retrieve data sent via query from PaymentInitate.vue
const amount = route.query.amount || "0.00";
const txnId = route.query.psr || "N/A";  // Use 'psr' if that’s what your API returns
const accountNumber = route.query.accountNumber || "N/A";

const goHome = () => {
  router.push("/");
};
</script>

<style>
/* Small success pulse animation */
.bg-green-100 {
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.1); opacity: 0.8; }
}
</style>
