<script setup>
import { ref, computed, watch } from "vue";
import { useRoute } from "vue-router";
import FeeRow from "../Components/FeeRow.vue";
import { InstallmentSummary } from "../api/installmentSummary";

const route = useRoute();

const fees = ref({
  registrationFee: 0,
  insuredFee: 0,
  dependantsFee: 0,
  penaltyFee: 0,
  otherFee: 0,
});

const user = ref({ id: null, fullName: null });

const installmentsTotal = computed(() => {
  const f = fees.value;
  
  return (
    (Number(f.registrationFee) || 0) +
    (Number(f.insuredFee) || 0) +
    (Number(f.dependantsFee) || 0) +
    (Number(f.penaltyFee) || 0) +
    (Number(f.otherFee) || 0)
  );
});

const fetchUserData = async (userId) => {
  if (!userId) return;

  try {
    user.value.id = userId;

    const result = await InstallmentSummary.getInstallments(userId);

    console.log(Number(result.registrationFee))
    console.log(Number(result.insuredFee))
    console.log(Number(result.dependantsFee))
    console.log(Number(result.penaltyFee))
    fees.value = {
      registrationFee: Number(result.registrationFee),
      insuredFee: Number(result.insuredFee),
      dependantsFee: Number(result.dependantsFee) || 0,
      penaltyFee: Number(result.penaltyFee) || 0,
      otherFee: Number(result.otherFee) || 0,
    };
  } catch (err) {
    console.error("Error fetching installments:", err);
  }
};

// Watch route params
watch(
  () => route.params.id,
  (newUserId) => {
    fetchUserData(newUserId);
    // Decode name from URL
    const name = route.params.name ? decodeURIComponent(route.params.name) : "N/A";
    user.value.fullName = name;
  },
  { immediate: true }
);


</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <header class="bg-primary text-white shadow-md">
      <div class="container mx-auto flex justify-between items-center py-4 px-6">
        <h1 class="text-xl font-bold">Renewal</h1>
        <button class="text-gray-200 hover:text-white">🌐 Language</button>
      </div>
    </header>

    <main class="container mx-auto px-6 py-10">
      <h2 class="text-2xl font-bold text-primary mb-6">Renewal Details</h2>

      <div class="bg-white rounded-2xl shadow-lg p-6 md:p-10">
        <div class="flex justify-between items-center mb-6">
          <div>
            <p class="text-gray-500 text-sm font-medium">Household Head</p>
            <p class="text-xl font-bold text-primary">{{ user.fullName || "N/A" }}</p>
          </div>
          <span class="bg-orange-500 text-white text-sm font-semibold px-4 py-1.5 rounded-full">
            Waiting
          </span>
        </div>

        <div class="space-y-4">
          <FeeRow label="Renewal Fee" :value="'ETB ' + (fees.registrationFee || 0).toFixed(2)" />
          <FeeRow label="Insured Fee" :value="'ETB ' + (fees.insuredFee || 0).toFixed(2)" />
          <FeeRow label="Dependants Fee" :value="'ETB ' + (fees.dependantsFee || 0).toFixed(2)" />
          <FeeRow label="Penalty Fee" :value="'ETB ' + (fees.penaltyFee || 0).toFixed(2)" />
          <FeeRow label="Other Fee" :value="'ETB ' + (fees.otherFee || 0).toFixed(2)" />

          <hr class="my-4 border-gray-200" />

          <!-- Use computed total -->
          <FeeRow label="Total Payment" :value="'ETB ' + installmentsTotal.toFixed(2)" :is-bold="true" />
        </div>

        <div class="mt-8">
          <button
            @click="goToPayment"
            class="w-full py-3 text-lg font-bold text-white rounded-full bg-primary hover:opacity-90 transition"
          >
            Renew
          </button>
        </div>
      </div>
    </main>
  </div>
</template>

<style>
.bg-primary {
  background-color: #2563eb;
}
.text-primary {
  color: #2563eb;
}
</style>
