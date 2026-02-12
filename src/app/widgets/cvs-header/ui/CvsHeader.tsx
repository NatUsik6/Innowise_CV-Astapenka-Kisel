import Link from 'next/link';
import { HeaderLinkText } from './CvsHeader.styles';
import { ROUTES } from '@/shared/constants/routes';

export const CvsHeader = () => {
  return (
    <Link href={ROUTES.CVS} style={{ textDecoration: 'none' }}>
      <HeaderLinkText variant="h5">
        CVs
      </HeaderLinkText>
    </Link>
  );
};