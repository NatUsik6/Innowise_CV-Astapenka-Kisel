import { UsersPageClient } from "@/app/users/UsersPageClient";
import { EmployeesHeader } from "@/app/widgets/users-header/ui/EmployeesHeader";

export default function UsersPage() {
  return (
    <>
      <EmployeesHeader />
      <UsersPageClient />
    </>
  );
}
