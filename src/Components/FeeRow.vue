<!-- FeeRow.vue -->
<template>
  <div class="flex justify-between">
    <span :class="isBold ? 'font-bold text-gray-700' : 'text-gray-600'">{{ t(label) }}</span>
    <span :class="isBold ? 'font-bold text-primary' : 'text-gray-700'">{{ value }}</span>
  </div>
</template>

<script setup>
import { t } from "../i18n.js";

defineProps({
  label: String, // 👈 now this is a translation key
  value: String,
  isBold: { type: Boolean, default: false },
});
</script>
