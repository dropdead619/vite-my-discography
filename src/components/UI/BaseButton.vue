<template>
  <button
    :class="{ 'bg-gray-500': $attrs.disabled }"
    class="py-2 px-3 transition dark:text-white delay-25 bg-transparent border text-black text-sm font-semibold rounded-md shadow focus:outline-none hover:scale-105"
  >
    <slot />
  </button>
</template>
