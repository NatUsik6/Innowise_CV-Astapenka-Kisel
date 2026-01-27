'use client';

import { Box, Typography, Tab, Tabs, TextField, Button, Link, Container } from '@mui/material';
import { useState } from 'react';

export default function LoginPage() {
  const [tabValue, setTabValue] = useState(0);

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Tabs
          value={tabValue}
          onChange={(_, newValue) => setTabValue(newValue)}
          centered
          sx={{
            mb: 6,
            '& .MuiTabs-indicator': { backgroundColor: '#c62828', height: 3 },
            '& .MuiTab-root': { color: '#ffffff', fontSize: '0.9rem', fontWeight: 600 },
            '& .Mui-selected': { color: '#c62828 !important' },
          }}
        >
          <Tab label="ВОЙТИ" />
          <Tab label="СОЗДАТЬ" />
        </Tabs>

        {/* 2. Welcome Text */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 500, mb: 1 }}>
            С возвращением
          </Typography>
          <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.6)' }}>
            Рады вас видеть! Войдите, чтобы продолжить
          </Typography>
        </Box>

        {/* 3. Form Fields */}
        <Box component="form" sx={{ width: '100%' }}>
          <TextField
            fullWidth
            placeholder="Почта"
            variant="outlined"
            margin="normal"
            sx={inputStyles}
          />
          <TextField
            fullWidth
            placeholder="Пароль"
            type="password"
            variant="outlined"
            margin="normal"
            sx={inputStyles}
          />

          {/* 4. Login Button */}
          <Button
            fullWidth
            variant="contained"
            sx={{
              bgcolor: '#c62828',
              color: 'white',
              borderRadius: '25px',
              py: 1.5,
              mt: 4,
              mb: 2,
              fontWeight: 'bold',
              '&:hover': { bgcolor: '#a52121' },
            }}
          >
            ВОЙТИ
          </Button>

          {/* 5. Forgot Password */}
          <Box sx={{ textAlign: 'center' }}>
            <Link
              href="#"
              sx={{
                color: 'rgba(255, 255, 255, 0.5)',
                fontSize: '0.75rem',
                textDecoration: 'none',
                letterSpacing: '1px',
                '&:hover': { color: '#ffffff' },
              }}
            >
              ЗАБЫЛИ ПАРОЛЬ?
            </Link>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

// Вынес стили инпутов отдельно, чтобы не загромождать код
const inputStyles = {
  '& .MuiOutlinedInput-root': {
    color: 'white',
    '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.2)' },
    '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.4)' },
    '&.Mui-focused fieldset': { borderColor: 'rgba(255, 255, 255, 0.5)' },
  },
  '& .MuiInputBase-input': {
    padding: '12px 16px',
  },
};