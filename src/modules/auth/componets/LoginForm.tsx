'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { 
  Box, Button, TextField, Typography, Tabs, Tab, 
  InputAdornment, IconButton, Link 
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export const LoginForm = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data: any) => {
    console.log('Form Data:', data);
    // Здесь будет ваша мутация Apollo: useMutation(LOGIN_MUTATION)
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', textAlign: 'center', mt: 10 }}>
      {/* Вкладки сверху */}
      <Tabs value={0} centered sx={{ mb: 4, '& .MuiTabs-indicator': { backgroundColor: 'rgba(198, 48, 49, 1)' } }}>
        <Tab label="Войти" sx={{ color: 'rgba(198, 48, 49, 1)!important' }} />
        <Tab label="Создать" />
      </Tabs>

      <Typography variant="h4" component="h1" gutterBottom fontWeight="500">
        С возвращением
      </Typography>
      <Typography variant="body2" sx={{ mb: 4, color: 'text.secondary' }}>
        Рады вас видеть! Войдите, чтобы продолжить
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          fullWidth
          placeholder="Почта"
          variant="outlined"
          margin="normal"
          {...register('email', { required: 'Введите email' })}
          error={!!errors.email}
          sx={{ '& .MuiOutlinedInput-root': { borderRadius: 1 } }}
        />

        <TextField
          fullWidth
          placeholder="Пароль"
          type={showPassword ? 'text' : 'password'}
          variant="outlined"
          margin="normal"
          {...register('password', { required: 'Введите пароль' })}
          error={!!errors.password}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{ '& .MuiOutlinedInput-root': { borderRadius: 1 } }}
        />

        <Button
          fullWidth
          variant="contained"
          type="submit"
          sx={{ 
            mt: 4, 
            mb: 2, 
            py: 1.5, 
            borderRadius: 10, 
            bgcolor: '#cc3333',
            '&:hover': { bgcolor: '#b22c2c' }
          }}
        >
          Войти
        </Button>

        <Link href="#" underline="none" sx={{ fontSize: '0.75rem', color: 'text.secondary', letterSpacing: 1 }}>
          ЗАБЫЛИ ПАРОЛЬ?
        </Link>
      </form>
    </Box>
  );
};