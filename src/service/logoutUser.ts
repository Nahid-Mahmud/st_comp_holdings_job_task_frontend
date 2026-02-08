import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { deleteCookies } from './DeleteCookies';

export const logoutUser = (router: AppRouterInstance) => {
  deleteCookies(['accessToken', 'refreshToken']);
  router.push('/auth');
  router.refresh();
  // hello
};
