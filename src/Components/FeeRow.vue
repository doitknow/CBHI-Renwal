<!-- FeeRow.vue -->
<template>
  <div class="flex justify-between">
    <span :class="isBold ? 'font-bold text-gray-700' : 'text-gray-600'">{{ label }}</span>
    <span :class="isBold ? 'font-bold text-primary' : 'text-gray-700'">{{ value }}</span>
  </div>
</template>

<script setup>
defineProps({
  label: String,
  value: String,
  isBold: { type: Boolean, default: false },
});
</script>
