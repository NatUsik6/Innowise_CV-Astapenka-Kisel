import { AppLayout } from "@/widgets/app-layout/ui/AppLayout";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppLayout>{children}</AppLayout>;
}
