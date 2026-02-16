export function useCanEditCvSkills(cvUserId: string | undefined, currentUser: any): boolean {
    if (!currentUser) return false;

    if (currentUser.role === 'Admin') {
        return true;
    }

    return cvUserId ? currentUser.id === cvUserId : false;
}
