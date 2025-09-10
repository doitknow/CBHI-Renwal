<!-- <script setup>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import FeeRow from "./FeeRow.vue";

const route = useRoute();

const user = ref({
  id: route.query.userId,
  fullName: route.query.fullName
});

const fees = ref(
  route.query.fees ? JSON.parse(decodeURIComponent(route.query.fees)) : {}
);

const installmentsTotal = computed(() => {
  const f = fees.value;
  return (
    (Number(f.registrationFee)  0) +
    (Number(f.insuredFee)  0) +
    (Number(f.dependantsFee)  0) +
    (Number(f.penaltyFee)  0) +
    (Number(f.otherFee)  0)
  );
});

const goToPayment = () => {
  alert("Redirecting to Payment Page... (integration later)");
};
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
            <p class="text-xl font-bold text-primary">{{ user.fullName  "N/A" }}</p>
          </div>
          <span class="bg-orange-500 text-white text-sm font-semibold px-4 py-1.5 rounded-full">
            Waiting
          </span>
        </div>

        <div class="space-y-4">
          <FeeRow label="Renewal Fee" :value="'ETB ' + (Number(fees.registrationFee)  0).toFixed(2)" />
          <FeeRow label="Insured Fee" :value="'ETB ' + (Number(fees.insuredFee)  0).toFixed(2)" />
          <FeeRow label="Dependants Fee" :value="'ETB ' + (Number(fees.dependantsFee)  0).toFixed(2)" />
          <FeeRow label="Penalty Fee" :value="'ETB ' + (Number(fees.penaltyFee)  0).toFixed(2)" />
          <FeeRow label="Other Fee" :value="'ETB ' + (Number(fees.otherFee) || 0).toFixed(2)" />

          <hr class="my-4 border-gray-200" />

          <FeeRow
            label="Total Payment"
            :value="'ETB ' + installmentsTotal.value.toFixed(2)"
            :is-bold="true"
          />
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
</style> -->