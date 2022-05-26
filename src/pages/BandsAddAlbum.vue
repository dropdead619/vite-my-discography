<script setup lang="ts">
import { useField, useForm } from 'vee-validate';
import type { StorageError } from 'firebase/storage';
import { getDownloadURL } from 'firebase/storage';
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

const { addAlbum, addImages } = useBandStore();

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
const fileProgress = ref(0);
const isFormSubmitted = ref(false);

const onFileSelected = (event: any) => {
  image.value = event.target.files[0];
};
const onSubmit = handleSubmit((values: unknown) => {
  const content: BandContent = values as BandContent;
  content.id = generateID();
  content.bandId = route.params.id as string;
  if (image.value) {
    const uploadTask = addImages(image.value);
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
          addAlbum(content).then(() => {
            isFormSubmitted.value = true;
          });
        });
      },
    );
  }
});

const isModalVisible = ref(false);

const toggleModalVisibility = () => {
  isModalVisible.value = !isModalVisible.value;
};

const selectedTracks = ref<Array<any>>([]);
const selectedTrack = ref<File>();
const trackName = ref('');

const onTrackUploadChange = (e: any) => {
  selectedTrack.value = e.target.files[0];
};

const onTrackAddSubmit = () => {
  if (trackName.value) {
    selectedTracks.value?.push({
      number: selectedTracks.value.length + 1,
      name: trackName.value,
      selectedTrack: selectedTrack.value,
    });
    toggleModalVisibility();
    trackName.value = '';
  }
};
</script>

<template>
  <BaseCard>
    <form class=" w-full p-5 border-2 rounded border-slate-100" @submit="onSubmit">
      <h2 class="font-bold text-2xl mb-5">
        Add new content:
      </h2>
      <div class="grid grid-cols-2 gap-4 ">
        <BaseInput
          v-model="name"
          :disabled="isFormSubmitted"
          :error="errors.name"
          label="Content name: "
        />
        <BaseInput
          v-model="year"
          :disabled="isFormSubmitted"
          :error="errors.year"
          label="Content year: "
        />
        <BaseSelect
          v-model="type"
          :disabled="isFormSubmitted"
          label="Content type: "
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
          :disabled="isFormSubmitted"
          label="Genres"
          :data="[{ value: 'Bebra tigra', label: 'bebra Tigra' }]"
        />

        <div class="flex items-center">
          <InputFile
            :file-progress="fileProgress"
            :error="imageError?.message"
            accept=".jpg, .jpeg, .png"
            @change="onFileSelected"
          />
        </div>
      </div>
      <BaseButton
        v-if="!isFormSubmitted"
        class="w-24 mt-10"
      >
        Submit
      </BaseButton>
      <div v-else class="text-green-600 mt-4">
        Succesfully added
      </div>
    </form>
    <form v-if="isFormSubmitted" @submit.prevent="onTrackAddSubmit">
      <h2 class="font-bold text-2xl my-5">
        Add new track:
      </h2>
      <div>
        <span
          v-for="track in selectedTracks"
          :key="track.number"
          class="block mb-2 rounded p-2 max-w-xs bg-gray-200"
        >
          {{ track.number }}. {{ track.name }}
        </span>
      </div>
      <BaseButton
        class="block mt-6"
        type="button"
        @click="toggleModalVisibility"
      >
        +
      </BaseButton>
      <BaseModal v-if="isModalVisible" @toggle="toggleModalVisibility">
        <template #header>
          <span class="font-bold text-2xl">Add new track</span>
        </template>
        <BaseInput v-model="trackName" label="Track name: " />
        <InputFile
          accept="audio/mp3"
          @change="onTrackUploadChange"
        />
        <template #footer>
          <div class="mx-auto">
            <BaseButton class="bg-green-700 mr-4">
              Add
            </BaseButton>
            <BaseButton class="bg-red-700" @click="toggleModalVisibility">
              Cancel
            </BaseButton>
          </div>
        </template>
      </BaseModal>
    </form>
  </BaseCard>
</template>
