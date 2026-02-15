import { BreadcrumbLink, BreadcrumbLinkText, BreadcrumbRoot, ChevronIcon, CrumbText } from '@/widgets/user-breadcrumb/ui/UserBreadcrumb.styles';
import {
    CvLink,
} from './CvBreadcrumb.styles';


interface Props {
    cvId: string;
    cvName: string;
    currentPage?: string;
}

const PAGE_LABELS: Record<string, string> = {
    details: 'Details',
    skills: 'Skills',
    projects: 'Projects',
    preview: 'Preview',
};

export const CvBreadcrumb = ({ cvId, cvName, currentPage }: Props) => {
    const pageLabel = currentPage && PAGE_LABELS[currentPage];

    return (
        <BreadcrumbRoot>
            <BreadcrumbLink href="/cvs">
                <BreadcrumbLinkText variant="h5">CVs</BreadcrumbLinkText>
            </BreadcrumbLink>

            <ChevronIcon />

            <CvLink href={`/cvs/${cvId}/details`}>
                <CrumbText>{cvName}</CrumbText>
            </CvLink>

            {pageLabel && pageLabel !== 'Details' && (
                <>
                    <ChevronIcon />
                    <CrumbText>{pageLabel}</CrumbText>
                </>
            )}
        </BreadcrumbRoot>
    );
};
