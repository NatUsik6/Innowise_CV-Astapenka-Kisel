'use client';

import { AuthForm } from "@/features/auth/ui/AuthForm";
import { AuthWrapper } from "./LoginPage.styles";

export default function LoginPage() {
  return (
    <AuthWrapper>
      <AuthForm mode="login" />
    </AuthWrapper>
  );
}
