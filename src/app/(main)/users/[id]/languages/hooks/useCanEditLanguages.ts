export function useCanEditLanguages(
    profileUserId: string,
    currentUser: any
): boolean {
    if (!currentUser) return false;

    if (currentUser.role === 'Admin') {
        return true;
    }
    return currentUser.id === profileUserId;
}