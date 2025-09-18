<template>
  <div class="fixed inset-0 flex items-center justify-center bg-black/45  z-50">
    <div class="bg-black/25 backdrop-blur-sm text-white p-8 rounded-2xl w-full max-w-sm text-center shadow-2xl border border-white/20">
      <div class="mb-4">
        <img src="/cbhirenew.png" alt="Verification Icon" class="mx-auto w-20 h-16" />
      </div>

      <h2 class="text-xl font-bold mb-2">{{ t("verificationCode") }}</h2>
      <p class="text-gray-200 mb-6">{{ t("enterCodeMsg") }}</p>

      <!-- Code Inputs -->
      <div class="flex justify-between mb-6 space-x-2">
        <input
          v-for="(digit, index) in code"
          :key="index"
          v-model="code[index]"
          @input="focusNext(index, $event)"
          type="text"
          maxlength="1"
          class="w-12 h-12 text-2xl text-center rounded-lg border border-white/30 bg-white/20 text-white focus:outline-none focus:border-blue-400"
        />
      </div>

      <p class="text-gray-300 mb-6">
        {{ t("noCode") }}
        <button @click="resendCode" class="underline text-primary">{{ t("resendCode") }}</button>
      </p>

      <div class="flex space-x-4">
        <button @click="cancel" class="flex-1 py-2 bg-white/20 border border-white/30 text-white rounded-lg font-semibold hover:bg-white/30 transition">
          {{ t("cancel") }}
        </button>
        <button @click="verifyCode" class="flex-1 py-2 bg-primary text-white rounded-lg font-semibold transition">
          {{ t("verify") }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { t } from "../i18n.js";
import { LoginApi } from "../api/sendOtp.js";
import { useRouter } from "vue-router";

const router = useRouter();
const props = defineProps({
  phone: { type: String, required: true }
});
const emit = defineEmits(["close"]);

const code = ref(["", "", "", ""]); 

const focusNext = (index, event) => {
  if (event.target.value.length === 1 && index < code.value.length - 1) {
    event.target.nextElementSibling?.focus();
  }
};

const resendCode = async () => {
  const success = await LoginApi.requestOtp({ phoneNumber: props.phone });
  if (success) alert(t("resendCodeAlert"));
  else alert("Failed to resend OTP.");
};

const cancel = () => {
  emit("close");
};

const verifyCode = async () => {
  const enteredCode = code.value.join("");
  const success = await LoginApi.verifyOtp({
    countryCode: 251,
    phoneNumber: props.phone,
    otp: enteredCode
  });

 if (success) {
  router.push({ name: "paymentInitation" });
} else {
  alert("Invalid code. Try again.");
}
};
// this part is un comment after the backend access getted
// import { ref } from "vue";
// import axios from "axios";
// import { t } from "../i18n.js";

// const props = defineProps({
//   accountNumber: String,
// });

// const emit = defineEmits(["close"]);
// const code = ref(["", "", "", "", "", ""]);

// const verifyCode = async () => {
//   const enteredCode = code.value.join("");
//   try {
//     const res = await axios.post("http://localhost:8080/api/payment/verify", {
//       accountNumber: props.accountNumber,
//       code: enteredCode,
//     });
//     alert(res.data.message);
//     emit("close");
//   } catch (err) {
//     alert(err.response?.data?.message || "Verification failed");
//   }
// };


</script>

<style scoped>
.bg-primary {
  background-color: #6C9448;
}
.text-primary {
  color: #f79120;
}
</style>
