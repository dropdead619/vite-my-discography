<script setup lang="ts">
import { useField, useForm } from 'vee-validate';
import type { StorageError } from 'firebase/storage';
import { getDownloadURL } from 'firebase/storage';
import { useBandStore } from '../../stores/band.store';
import type { BandContent, ReleaseType, Track } from '@/config/types';
import { generateID } from '@/config/utilities';
import { anything, required } from '@/config/validations';

const validationSchema = {
  name: required,
  year: required,
  type: anything,
  genres: anything,
};

const { addAlbum, addImages, addTrackFile, addTrack } = useBandStore();

const { handleSubmit, errors } = useForm({
  validationSchema,
});

const route = useRoute();

const { value: name } = useField<string>('name');
const { value: type } = useField<ReleaseType>('type', undefined, { initialValue: 'single' as ReleaseType });
const { value: year } = useField<number>('year');
const { value: genres } = useField<string>('genres', undefined, { initialValue: '' });
const content = ref<BandContent>();

const image = ref<File | null>(null);
const imageError = ref<StorageError | null>(null);
const fileProgress = ref(0);
const isFormSubmitted = ref(false);

const onFileSelected = (event: any) => {
  image.value = event.target.files[0];
};
const onSubmit = handleSubmit((values: unknown) => {
  content.value = values as BandContent;
  content.value.id = generateID();
  content.value.bandId = route.params.id as string;
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
          if (content.value) {
            content.value.coverUrl = downloadURL;
            addAlbum(content.value).then(() => {
              isFormSubmitted.value = true;
            });
          }
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
  if (trackName.value && selectedTrack.value) {
    const uploadTrack = addTrackFile(selectedTrack.value);
    uploadTrack.on('state_changed',
      (snapshot) => {
        fileProgress.value = +((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(0);
      },
      (error) => {
        imageError.value = error;
      },
      () => {
        getDownloadURL(uploadTrack.snapshot.ref).then((downloadURL) => {
          if (content.value) {
            const track: Track = {
              id: generateID(),
              albumId: content.value.id,
              name: trackName.value,
              trackUrl: downloadURL,
              number: selectedTracks.value.length + 1,
              duration: 0,
            };
            const audioElement = document.createElement('audio');
            audioElement.src = downloadURL;

            audioElement.addEventListener('loadedmetadata', () => {
              track.duration = audioElement.duration;
              addTrack(track);
              toggleModalVisibility();
              selectedTracks.value?.push({
                number: track.number,
                name: trackName.value,
                selectedTrack: selectedTrack.value,
              });
              trackName.value = '';
            }, false);
          }
        });
      });
  }
};
</script>

<template>
  <BaseCard>
    <form class="w-full p-5 border-2 rounded border-slate-100" @submit="onSubmit">
      <h2 class="mb-5 text-2xl font-bold">
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
      <div v-else class="mt-4 text-green-600">
        Succesfully added
      </div>
    </form>
    <form v-if="isFormSubmitted" @submit.prevent="onTrackAddSubmit">
      <h2 class="my-5 text-2xl font-bold">
        Add new track:
      </h2>
      <div>
        <span
          v-for="track in selectedTracks"
          :key="track.number"
          class="block max-w-xs p-2 mb-2 text-black bg-gray-200 rounded"
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
          <span class="text-2xl font-bold">Add new track</span>
        </template>
        <BaseInput v-model="trackName" label="Track name: " />
        <InputFile
          :file-progress="fileProgress"
          accept="audio/mp3"
          @change="onTrackUploadChange"
        />
        <template #footer>
          <div class="mx-auto">
            <BaseButton class="mr-4 bg-green-700">
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
