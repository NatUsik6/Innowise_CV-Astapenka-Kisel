'use client';

import { AuthForm } from "@/features/auth/AuthForm";
import { AuthWrapper } from "@/features/auth/ui/AuthStyles";

export default function LoginPage() {
  return (
    <AuthWrapper>
      <AuthForm mode="signup" />
    </AuthWrapper>
  );
}