import Link from 'next/link';

import { ROUTES } from '@/shared/constants/routes';
import { HeaderLinkText } from './EmployeesHeader.styles';

export const EmployeesHeader = () => {
  return (
    <Link href={ROUTES.USERS} style={{ textDecoration: 'none' }}>
      <HeaderLinkText variant="h5">
        Employees
      </HeaderLinkText>
    </Link>
  );
};