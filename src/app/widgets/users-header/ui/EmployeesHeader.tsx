import Link from 'next/link';

import { HeaderLinkText } from './EmployeesHeader.styles';

export const EmployeesHeader = () => {
  return (
    <Link href="/users" style={{ textDecoration: 'none' }}>
      <HeaderLinkText variant="h5">
        Employees
      </HeaderLinkText>
    </Link>
  );
};
