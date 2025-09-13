<template>
  <!-- Fullscreen overlay with blur -->
  <div class="fixed inset-0 flex items-center justify-center bg-black/10 backdrop-blur-sm z-50">
    <!-- Modal -->
    <div class="bg-white/5 backdrop-blur-xl text-white p-8 rounded-2xl w-full max-w-sm text-center shadow-2xl border border-white/20">
      <!-- Icon -->
      <div class="mb-4">
       <img src="/cbhirenew.png" alt="Verification Icon" class="mx-auto w-20 h-16" />
      </div>

      <!-- Title -->
      <h2 class="text-xl font-bold mb-2">Verification Code</h2>
      <p class="text-gray-200 mb-6">Enter the 6-digit code we've sent to ******1958</p>

      <!-- Code Inputs -->
      <div class="flex justify-between mb-6 space-x-2">
        <input v-for="(digit, index) in code" 
               :key="index"
               v-model="code[index]" 
               @input="focusNext(index, $event)" 
               type="text" 
               maxlength="1"
               class="w-12 h-12 text-2xl text-center rounded-lg border border-white/30 bg-white/20 text-white focus:outline-none focus:border-blue-400" />
      </div>

      <!-- Resend link -->
      <p class="text-gray-300 mb-6">
        Didn’t get the code? 
        <button @click="resendCode" class="underline text-primary">Click to resend</button>
      </p>

      <!-- Buttons -->
      <div class="flex space-x-4">
        <button @click="cancel" 
                class="flex-1 py-2 bg-white/20 border border-white/30 text-white rounded-lg font-semibold hover:bg-white/30 transition">
          Cancel
        </button>
        <button @click="verifyCode" 
                class="flex-1 py-2 bg-blue-500 text-white rounded-lg font-semibold bg-primary transition">
          Verify
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const emit = defineEmits(["close"]);

const code = ref(["", "", "", "", "", ""]); // 6 slots

const focusNext = (index, event) => {
  const value = event.target.value;
  if (value.length === 1 && index < code.value.length - 1) {
    event.target.nextElementSibling?.focus();
  }
};

const resendCode = () => {
  alert("Verification code resent!");
};

const cancel = () => {
  emit("close"); // closes popup
};

const verifyCode = () => {
  const enteredCode = code.value.join("");
  alert(`Code entered: ${enteredCode}`);
  emit("close"); // close after verification
};
</script>
<style scoped>  
.bg-primary {
  background-color: #6C9448;
}
.text-primary {
  color: #f79120;
  
}
.colororange{
  color: #f79120

}
</style>
