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
      registrationFee: Number(result.registrationFee) || 0,
      insuredFee: Number(result.insuredFee) || 0,
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
          <FeeRow label="renewalFee" :value="'ETB ' + ((fees.registrationFee || 0).toFixed(2))" />
          <FeeRow label="insuredFee" :value="'ETB ' + ((fees.insuredFee || 0).toFixed(2))" />
          <FeeRow label="dependantsFee" :value="'ETB ' + ((fees.dependantsFee || 0).toFixed(2))" />
          <FeeRow label="penaltyFee" :value="'ETB ' + ((fees.penaltyFee || 0).toFixed(2))" />
          <FeeRow label="otherFee" :value="'ETB ' + ((fees.otherFee || 0).toFixed(2))" />

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
.colororange{
  color: #f79120

}
</style>