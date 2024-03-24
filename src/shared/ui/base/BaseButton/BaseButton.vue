<template>
  <button
    class="px-3 py-2 text-sm font-semibold transition bg-transparent rounded-md shadow delay-25 dark:text-white hover:scale-105 focus:outline-none"
    :class="{ 'bg-gray-500': $attrs.disabled }"
  >
    <slot />
  </button>
</template>
