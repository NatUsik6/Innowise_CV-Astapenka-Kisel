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
} from "../../../entities/session/api/queries";
import { useLazyQuery, useMutation } from "@apollo/client/react";
import { CombinedGraphQLErrors, CombinedProtocolErrors } from "@apollo/client";
import {
  LoginResponse,
  SignupResponse,
} from "../../../entities/session/model/types";

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

  const handleAuthSuccess = (access_token: string, refresh_token: string) => {
    Cookies.set("access_token", access_token);
    Cookies.set("refresh_token", refresh_token);
    router.push("/");
  };

  const handleAuthError = (error: unknown) => {
    let message = "Произошла ошибка";
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
        handleAuthSuccess(data.signup.access_token, data.signup.refresh_token),
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
        <StyledTab label="Войти" />
        <StyledTab label="Создать" />
      </StyledTabs>

      <AuthTitle variant="h4">
        {mode === "login" ? "С возвращением" : "Зарегистрируйтесь"}
      </AuthTitle>

      <AuthSubtitle variant="body2">
        {mode === "login"
          ? "Рады вас видеть! Войдите, чтобы продолжить"
          : "Добро пожаловать! Создайте аккаунт, чтобы продолжить"}
      </AuthSubtitle>

      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <LoginInput
          fullWidth
          placeholder="Почта"
          {...register("email", {
            required: "Введите почту",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Некорректный email",
            },
          })}
          error={!!errors.email}
          helperText={errors.email?.message}
          slotProps={{ htmlInput: { autoComplete: "email" } }}
        />

        <LoginInput
          fullWidth
          placeholder="Пароль"
          type={showPassword ? "text" : "password"}
          {...register("password", {
            required: "Введите пароль",
            minLength: { value: 8, message: "Минимум 8 символов" },
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
              ? "Загрузка..."
              : mode === "login"
                ? "Войти"
                : "Создать аккаунт"}
          </LoginButton>

          <ForgotPasswordLink
            underline="none"
            type="button"
            onClick={() =>
              router.push(mode === "login" ? "/auth/signup" : "/auth/login")
            }
          >
            {mode === "login" ? "Забыли пароль" : "У меня есть аккаунт"}
          </ForgotPasswordLink>
        </ActionsWrapper>
      </StyledForm>
    </FormCard>
  );
};
