'use client';

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { InputAdornment } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import {
  ActionsWrapper,
  AuthSubtitle,
  AuthTitle,
  ForgotPasswordLink,
  FormCard,
  LoginButton,
  LoginInput,
  StyledForm,
  StyledTab,
  StyledTabs,
  VisibilityIconButton,
} from "./AuthForm.styles";
import {
  LOGIN_QUERY,
  SIGNUP_MUTATION,
} from "../../../entities/auth/api/auth.queries";
import { useLazyQuery, useMutation } from "@apollo/client/react";
import { CombinedGraphQLErrors, CombinedProtocolErrors } from "@apollo/client";
import {
  LoginResponse,
  SignupResponse,
} from "../../../entities/auth/model/auth.types";

interface AuthInputs {
  email?: string;
  password?: string;
}

export const AuthForm = ({ mode }: { mode: "login" | "signup" }) => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<AuthInputs>();

  const tabValue = mode === "login" ? 0 : 1;

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    if (newValue === 0) router.push("/login");
    else router.push("/signup");
  };

  const handleAuthSuccess = (
    access_token: string,
    refresh_token: string,
    userId: string,
  ) => {
    Cookies.set("access_token", access_token);
    Cookies.set("refresh_token", refresh_token);
    Cookies.set("user_id", userId);
    router.push("/users");
  };

  const handleAuthError = (error: unknown) => {
    let message = "An error occurred";
    if (CombinedGraphQLErrors.is(error)) {
      message = error.errors[0]?.message || message;
    } else if (CombinedProtocolErrors.is(error)) {
      message = error.errors[0]?.message || message;
    } else if (error instanceof Error) {
      message = error.message;
    }
    if (message.toLowerCase().includes("email") || mode === "signup") {
      setError("email", { type: "manual", message });
    } else {
      setError("password", { type: "manual", message });
    }
  };

  const [executeLogin, { loading: loginLoading }] =
    useLazyQuery<LoginResponse>(LOGIN_QUERY);

  const [executeSignup, { loading: signupLoading }] =
    useMutation<SignupResponse>(SIGNUP_MUTATION, {
      onCompleted: (data) =>
        handleAuthSuccess(
          data.signup.access_token,
          data.signup.refresh_token,
          data.signup.user.id,
        ),
      onError: (error) => handleAuthError(error),
    });

  const onSubmit: SubmitHandler<AuthInputs> = async (data) => {
    const variables = {
      variables: { auth: { email: data.email, password: data.password } },
    };

    if (mode === "login") {
      try {
        const result = await executeLogin(variables);
        if (result.data) {
          handleAuthSuccess(
            result.data.login.access_token,
            result.data.login.refresh_token,
            result.data.login.user.id,
          );
        }
      } catch (error) {
        handleAuthError(error);
      }
    } else {
      executeSignup(variables);
    }
  };

  const isLoading = loginLoading || signupLoading;

  return (
    <FormCard>
      <StyledTabs value={tabValue} onChange={handleTabChange} centered>
        <StyledTab label="Log in" />
        <StyledTab label="Sign up" />
      </StyledTabs>

      <AuthTitle variant="h4">
        {mode === "login" ? "Welcome back" : "Register now"}
      </AuthTitle>

      <AuthSubtitle variant="body2">
        {mode === "login"
          ? "Hello again! Log in to continue"
          : "Welcome! Sign up to continue"}
      </AuthSubtitle>

      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <LoginInput
          fullWidth
          placeholder="email"
          {...register("email", {
            required: "Enter your email",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          })}
          error={!!errors.email}
          helperText={errors.email?.message}
          slotProps={{ htmlInput: { autoComplete: "email" } }}
        />

        <LoginInput
          fullWidth
          placeholder="Password"
          type={showPassword ? "text" : "password"}
          {...register("password", {
            required: "Enter your password",
            minLength: { value: 8, message: "Minimum 8 characters" },
          })}
          error={!!errors.password}
          helperText={errors.password?.message}
          slotProps={{
            htmlInput: {
              autoComplete:
                mode === "login" ? "current-password" : "new-password",
            },
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <VisibilityIconButton
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </VisibilityIconButton>
                </InputAdornment>
              ),
            },
          }}
        />

        <ActionsWrapper>
          <LoginButton type="submit" variant="contained" disabled={isLoading}>
            {isLoading
              ? "Loading..."
              : mode === "login"
                ? "Log in"
                : "Create account"}
          </LoginButton>

          <ForgotPasswordLink
            underline="none"
            type="button"
            onClick={() =>
              router.push(mode === "login" ? "/auth/signup" : "/auth/login")
            }
          >
            {mode === "login" ? "Forgot password" : "I have an account"}
          </ForgotPasswordLink>
        </ActionsWrapper>
      </StyledForm>
    </FormCard>
  );
};
