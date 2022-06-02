import router from './index';
import { DEFAULT_TITLE } from '@/config/constants';

router.beforeEach((to) => {
  document.title = to.meta.title as string || DEFAULT_TITLE;
});
