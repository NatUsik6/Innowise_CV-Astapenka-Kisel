'use client';

import { usePathname } from 'next/navigation';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

import {
    BreadcrumbRoot,
    BreadcrumbLink,
    BreadcrumbLinkText,
    CrumbText,
    ChevronIcon,
    ProfileLink,
} from './UserBreadcrumb.styles';

interface Props {
    firstName: string;
    lastName: string;
    userId: string;
}

const PAGE_LABELS: Record<string, string> = {
    profile: 'Profile',
    skills: 'Skills',
    languages: 'Languages',
};

export const UserBreadcrumb = ({
    firstName,
    lastName,
    userId,
}: Props) => {
    const pathname = usePathname();
    const lastSegment = pathname.split('/').pop();

    const pageLabel =
        lastSegment && PAGE_LABELS[lastSegment];

    return (
        <BreadcrumbRoot>
            <BreadcrumbLink href="/users">
                <BreadcrumbLinkText variant="h5">
                    Employees
                </BreadcrumbLinkText>
            </BreadcrumbLink>

            <ChevronIcon />

            <ProfileLink href={`/users/${userId}/profile`}>
                <CrumbText>
                    <PersonOutlineIcon fontSize="small" />
                    {firstName} {lastName}
                </CrumbText>
            </ProfileLink>

            {pageLabel && pageLabel !== 'Profile' && (
                <>
                    <ChevronIcon />
                    <CrumbText>{pageLabel}</CrumbText>
                </>
            )}
        </BreadcrumbRoot>
    );
};
