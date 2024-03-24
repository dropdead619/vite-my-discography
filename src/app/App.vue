<script setup lang="ts">
import './style/index.css';
import { AppRoutes, EAppProviders } from './providers';
import { AppPages } from './providers/router';
import { TheMusicPlayer } from '@/widgets/TheMusicPlayer';

import { TheSidebar } from '@/widgets/TheSidebar';
import { EmptyLayout, MainLayout } from '@/shared/ui/layouts';

provide(EAppProviders.AppRoutes, AppRoutes);
provide(EAppProviders.AppPages, AppPages);

const route = useRoute();
const isEmptyLayout = computed(() => route.meta.layout === 'empty');

// const auth = AuthModel.useAuth()

// const { showError } = useAlertsStore()

// onBeforeMount(() => {
//   if (!session.refreshToken) return
//   login()
// })

// async function login() {
//   try {
//     const { data } = await SessionApi.getToken(session.refreshToken)

//     session.setTokens({
//       idToken: data.id_token,
//       refreshToken: data.refresh_token
//     })

//     await auth.loadSessionUser(data.user_id)
//     await auth.loadStoresData()
//   } catch (e: any) {
//     showError(e.message)
//   }
// }
</script>

<template>
  <div class="h-screen">
    <EmptyLayout v-if="isEmptyLayout" />

    <MainLayout v-else>
      <template #navbar>
        <TheSidebar />
      </template>
      <template #music-player>
        <TheMusicPlayer />
      </template>
    </MainLayout>
  </div>
</template>
