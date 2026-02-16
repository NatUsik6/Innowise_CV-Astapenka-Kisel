import type { UserRole } from '@/entities/session/model/useSession';

interface SessionUser {
    id: string;
    role: UserRole;
}

export const useCanEdit = (
    ownerId: string | undefined,
    user: SessionUser | null,
): boolean => {
    if (!user) return false;
    if (user.role === 'Admin') return true;
    return ownerId ? user.id === ownerId : false;
};