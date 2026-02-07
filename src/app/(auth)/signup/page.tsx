'use client';

import { AuthForm } from "@/features/auth/ui/AuthForm";
import { AuthWrapper } from "./SignupPage.styles";

export default function LoginPage() {
  return (
    <AuthWrapper>
      <AuthForm mode="signup" />
    </AuthWrapper>
  );
}
