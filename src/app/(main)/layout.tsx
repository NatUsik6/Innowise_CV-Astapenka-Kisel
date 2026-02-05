import { AppLayout } from "@/widgets/app-layout/AppLayout";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return <AppLayout>{children}</AppLayout>;
}