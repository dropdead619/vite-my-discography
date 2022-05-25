<script setup lang="ts">
import { useField, useForm } from 'vee-validate';
import { useBandStore } from '../stores/band.store';
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
const fileInput = ref<HTMLInputElement | null>(null);

const onPickFile = () => {
  fileInput.value?.click();
};

const onFileSelected = (event: any) => {
  image.value = event.target.files[0];
};
const onSubmit = handleSubmit((values) => {
  const content: BandContent = values as BandContent;
  content.id = generateID();
  content.bandId = route.params.id as string;
  if (image.value)
    addFiles(image.value);

  // addAlbum(content);
});
</script>

<template>
  <BaseCard>
    <form class="p-5 w-full rounded border-slate-100 border-2 grid grid-cols-2 gap-4" @submit="onSubmit">
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
      <BaseButton
        type="button"
        class="w-24 px-0 bg-blue-600"
        @click="onPickFile"
      >
        Input image
      </BaseButton>
      <BaseButton class="w-24">
        Submit
      </BaseButton>
    </form>
  </BaseCard>
</template>
