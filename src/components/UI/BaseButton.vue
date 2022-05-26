<template>
  <button
    :class="{ 'bg-gray-500': $attrs.disabled }"
    class="py-2 px-3 transition delay-25 bg-indigo-500 text-white text-sm font-semibold rounded-md shadow focus:outline-none hover:scale-105"
  >
    <slot />
  </button>
</template>
