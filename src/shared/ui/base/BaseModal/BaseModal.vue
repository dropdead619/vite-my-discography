<script setup lang="ts">
const emit = defineEmits<{
  (e: 'toggle'): void;
}>();

function toggleModal() {
  emit('toggle');
}
</script>

<template>
  <div class="flex bg-gray-900 bg-opacity-50 pb-60 inset-0 z-40 items-center justify-center fixed dark:bg-opacity-80" @click.self="toggleModal">
    <div class="w-full  max-w-2xl p-4 relative">
      <!-- Modal content -->
      <div class="bg-white rounded-lg shadow relative dark:bg-theme-dark-2">
        <!-- Modal header -->
        <div class="border-b rounded-t flex p-4 justify-between items-start dark:border-gray-600">
          <slot name="header" />
          <button
            class="bg-transparent rounded-lg ml-auto text-sm p-1.5 text-gray-400 inline-flex items-center hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
            type="button"
            @click="toggleModal"
          >
            <svg
              class="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            ><path
              clip-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              fill-rule="evenodd"
            /></svg>
          </button>
        </div>
        <!-- Modal body -->
        <div class="space-y-6 p-6">
          <slot />
        </div>
        <!-- Modal footer -->
        <div class="border-t rounded-b flex space-x-2 border-gray-200 p-6 items-center dark:border-gray-600">
          <slot name="footer" />
        </div>
      </div>
    </div>
  </div>
</template>
