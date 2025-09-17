<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-red-100 px-6">
    <div class="bg-white shadow rounded-lg p-6 text-center">
      <h1 class="text-3xl font-bold text-red-600 mb-2">Payment Failed</h1>
      <p class="text-gray-600 mb-6">
        Oops! Your payment could not be processed.
      </p>
      <button
        @click="$router.push('/')"
        class="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg shadow transition"
      >
        Go Home
      </button>
    </div>
  </div>
</template>
