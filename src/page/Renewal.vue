<script setup>
import { ref, computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import FeeRow from "../components/FeeRow.vue";
import { InstallmentSummary } from "../api/installmentSummary";
import { lang, setLang, translations } from "../i18n.js";

const route = useRoute();
const router = useRouter();

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

// ✅ Language state
const selectedLang = ref(lang.value.toUpperCase());
const isDropdownOpen = ref(false);

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const setLangHandler = (l) => {
  setLang(l);
  selectedLang.value = l.toUpperCase();
  isDropdownOpen.value = false;
};

// ✅ Translation helper
const t = (key) => {
  return translations[lang.value]?.[key] || translations.en[key] || key;
};

// Fetch data
const fetchUserData = async (userId) => {
  if (!userId) return;
  try {
    user.value.id = userId;
    const result = await InstallmentSummary.getInstallments(userId);
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
    const name = route.params.name ? decodeURIComponent(route.params.name) : "N/A";
    user.value.fullName = name;
  },
  { immediate: true }
);

const goToPayment = () => {
  router.push({ name: "Payment" });
};
</script>


<template>
  <div class="min-h-screen bg-gray-100">
    <header class="gn-primary text-white shadow-md">
      <div class="container mx-auto flex justify-between items-center py-4 px-6">
        <h1><img src="/cbhirenew.png" alt="Arrow" class="mx-auto h-9" /></h1>
        <!-- Lang dropdown (unchanged) -->
      </div>
    </header>

    <main class="container mx-auto px-6 py-10">
      <h2 class="text-2xl font-bold text-primary mb-6">{{ t("renewalDetails") }}</h2>

      <div class="bg-white rounded-2xl shadow-lg p-6 md:p-10 justify-center">
        <div class="flex justify-between items-center mb-6">
          <div>
            <p class="text-gray-500 text-sm font-medium">{{ t("householdHead") }}</p>
            <p class="text-xl font-bold text-primary">{{ user.fullName || "N/A" }}</p>
          </div>
          <span class="bg-lime-400 text-white text-sm font-semibold px-4 py-1.5 rounded-full">
            {{ t("amount") }}
          </span>
        </div>

        <div class="space-y-4">
          <FeeRow label="renewalFee" :value="'ETB ' + (fees.registrationFee || 0).toFixed(2)" />
          <FeeRow label="insuredFee" :value="'ETB ' + (fees.insuredFee || 0).toFixed(2)" />
          <FeeRow label="dependantsFee" :value="'ETB ' + (fees.dependantsFee || 0).toFixed(2)" />
          <FeeRow label="penaltyFee" :value="'ETB ' + (fees.penaltyFee || 0).toFixed(2)" />
          <FeeRow label="otherFee" :value="'ETB ' + (fees.otherFee || 0).toFixed(2)" />

          <hr class="my-4 border-gray-200" />

          <FeeRow label="totalPayment" :value="'ETB ' + installmentsTotal.toFixed(2)" :is-bold="true" />
        </div>

        <div class="mt-8 flex justify-end">
          <button
            @click="goToPayment"
            class="w-30 py-3 text-lg font-bold text-white rounded-full gn-primary hover:opacity-90 transition"
          >
            {{ t("renewBtn") }}
          </button>
        </div>
      </div>
    </main>
  </div>
</template>


<style>
.gn-primary {
  background-color: #6C9448;
}
.text-primary {
  color: #00FF00;
}
</style>
