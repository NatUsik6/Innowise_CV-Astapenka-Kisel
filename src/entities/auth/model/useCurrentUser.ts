import Cookies from 'js-cookie';
import { useUser } from '@/entities/user/api/useUser';

export function useCurrentUser() {
  const userId = Cookies.get('user_id') ?? '';
  return useUser(userId);
}
