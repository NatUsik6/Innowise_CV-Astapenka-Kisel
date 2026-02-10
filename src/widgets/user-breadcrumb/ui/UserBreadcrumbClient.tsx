'use client';

import { usePathname } from 'next/navigation';
import { UserBreadcrumb } from './UserBreadcrumb';

interface Props {
    firstName: string;
    lastName: string;
    userId: string;
}

export const UserBreadcrumbClient = ({ 
    firstName, 
    lastName, 
    userId 
}: Props) => {
    const pathname = usePathname();
    const currentPage = pathname.split('/').pop();

    return (
        <UserBreadcrumb
            firstName={firstName}
            lastName={lastName}
            userId={userId}
            currentPage={currentPage}
        />
    );
};