<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-white to-green-50">
    <div class="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md border border-gray-200">
      
      <!-- Header -->
      <div class="text-center mb-6">
        <img src="/cbhirenew.png" alt="Logo" class="mx-auto w-16 h-16 mb-3" />
        <h2 class="text-2xl font-bold text-gray-800">Initiate Payment</h2>
        <p class="text-gray-500 text-sm mt-1">Review your details before proceeding</p>
      </div>

      <!-- Payment Details -->
      <div class="space-y-4 mb-6">
        <div class="p-4 bg-gray-50 rounded-lg shadow-inner flex justify-between">
          <span class="text-gray-600 font-medium">Account Number</span>
          <span class="text-gray-900 font-semibold">{{ userStore.accountNumber }}</span>
        </div>
        <div class="p-4 bg-gray-50 rounded-lg shadow-inner flex justify-between">
          <span class="text-gray-600 font-medium">Amount</span>
          <span class="text-green-600 font-bold text-lg">ETB {{ userStore.amount }}</span>
        </div>
      </div>

      <!-- Pay button -->
      <button 
        @click="confirmPayment"
        class="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl transition duration-200 shadow-lg"
      >
        Pay Now
      </button>
    </div>

    <!-- Confirmation Modal -->
    <div v-if="showConfirm" class="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
      <div class="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm text-center">
        <h3 class="text-lg font-bold text-gray-800 mb-2">Confirm Payment</h3>
        <p class="text-gray-600 mb-6">
          Are you sure you want to pay <span class="text-green-600 font-bold">ETB {{ userStore.amount }}</span><br/>
          from account <span class="font-semibold">{{ userStore.accountNumber }}</span>?
        </p>

        <div class="flex space-x-3">
          <button 
            @click="showConfirm = false"
            class="flex-1 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button 
            @click="initiate"
            class="flex-1 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { initiatePayment } from "../api/sendAmountWithAccnumber.js";
import { useRouter } from "vue-router";
import { useUserStore } from "../store/userStore.js";
import { toRaw } from "vue";

const router = useRouter(); 
const showConfirm = ref(false); 
const userStore = useUserStore();
 const userId = userStore.user.id; 
 console.log(userId);
 const confirmPayment = () =>
  { if (!userStore.amount || !userStore.accountNumber)
     return;
      showConfirm.value = true; };
const initiate = async () => {
  try {
     const payload = {
      amount: userStore.amount || 100,
      accountNumber: userStore.accountNumber?.value || "1000034567894",
    };

    const userId = toRaw(userStore.user?.id); // ensure raw value
    console.log("UserId:", userId, "Payload:", payload);

    const response = await initiatePayment(userId, payload);

    console.log("Payment response:", response);

    router.push({
      name: "paymentSuccess",
      query: {
        psr: response.psr,
        amount: payload.amount,
        accountNumber: payload.accountNumber,
      },
    });
  } catch (e) {
    if (e.response) {
      console.error("Payment initiation failed:", e.response.data);
    } else {
      console.error("Payment initiation failed:", e.message);
    }
    router.push({ name: "PaymentFailure" });
  }
};



</script>
