<script setup lang="ts">
import { useField, useForm } from 'vee-validate';
import type { StorageError } from 'firebase/storage';
import { getDownloadURL } from 'firebase/storage';
import { useBandStore } from '../stores/band.store';
import IconCheck from '../components/Icons/IconCheck.vue';
import type { BandContent, ReleaseType } from '@/config/types';
import { generateID } from '@/config/utilities';
import { anything, required } from '@/config/validations';

const validationSchema = {
  name: required,
  year: required,
  type: anything,
  genres: anything,
};

const { addAlbum, addFiles } = useBandStore();

const { handleSubmit, errors } = useForm({
  validationSchema,
});

const route = useRoute();

const { value: name } = useField<string>('name');
const { value: type } = useField<ReleaseType>('type', undefined, { initialValue: 'single' as ReleaseType });
const { value: year } = useField<number>('year');
const { value: genres } = useField<string>('genres', undefined, { initialValue: '' });
const image = ref<File | null>(null);
const imageError = ref<StorageError | null>(null);
const fileInput = ref<HTMLInputElement | null>(null);
const fileProgress = ref(0);

const onPickFile = () => {
  fileInput.value?.click();
};

const onFileSelected = (event: any) => {
  image.value = event.target.files[0];
};
const onSubmit = handleSubmit((values: unknown) => {
  const content: BandContent = values as BandContent;
  content.id = generateID();
  content.bandId = route.params.id as string;
  if (image.value) {
    const uploadTask = addFiles(image.value);
    uploadTask.on('state_changed',
      (snapshot) => {
        fileProgress.value = +((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(0);
      },
      (error) => {
        imageError.value = error;
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          content.coverUrl = downloadURL;
          // addAlbum(content);
        });
      },
    );
  }
});
</script>

<template>
  <BaseCard>
    <form class="grid w-full grid-cols-2 gap-4 p-5 border-2 rounded border-slate-100" @submit="onSubmit">
      <BaseInput
        v-model="name"
        :error="errors.name"
        label="Album name: "
      />
      <BaseInput
        v-model="year"
        :error="errors.year"
        label="Album year: "
      />
      <BaseSelect
        v-model="type"
        label="Album type"
        :data="[
          {
            value: 'single',
            label: 'Single',
          },
          {
            value: 'ep',
            label: 'EP',
          },
          {
            value: 'album',
            label: 'Album',
          }]"
      />
      <BaseSelect
        v-model="genres"
        label="Genres"
        :data="[{ value: 'Bebra tigra', label: 'bebra Tigra' }]"
      />
      <input
        ref="fileInput"
        class="hidden"
        accept=".jpg, .jpeg, .png"
        type="file"
        @change="onFileSelected"
      >
      <div class="flex items-center">
        <BaseButton
          type="button"
          class="w-24 px-0 bg-blue-600"
          @click="onPickFile"
        >
          Input image
        </BaseButton>
        <div v-if="fileProgress" class="w-24 h-6 ml-4 bg-gray-300 rounded-lg">
          <div class="flex items-center justify-around h-full ease-in-out rounded-lg bg-cyan-500 text-gray-50 transition-width" :style="`width: ${fileProgress}%`">
            <div class="px-2 w-fit">
              {{ fileProgress }}%
            </div>
            <IconCheck v-if="fileProgress >= 100" />
          </div>
        </div>
      </div>
      <BaseButton class="w-24">
        Submit
      </BaseButton>
    </form>
  </BaseCard>
</template>
