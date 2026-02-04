import Link from 'next/link';

import { HeaderLink, HeaderLinkText } from './EmployeesHeader.styles';
import { ROUTES } from '@/shared/constants/routes';

export const EmployeesHeader = () => {
  return (
    <HeaderLink href={ROUTES.USERS}>
      <HeaderLinkText variant="h5">
        Employees
      </HeaderLinkText>
    </HeaderLink>
  );
};
