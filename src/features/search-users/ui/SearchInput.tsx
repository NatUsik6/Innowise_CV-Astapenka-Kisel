'use client';

import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export const SearchInput = ({ value, onChange }: Props) => {
  return (
    <TextField
      placeholder="Search"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      variant="outlined"
      sx={{
        width: 280,                 
        mb: 2,
        paddingLeft:'20px',
        '& .MuiOutlinedInput-root': {
          height: 40,
          backgroundColor: 'rgba(53, 53, 53, 1)',
          borderRadius: '30px',
          color: '#fff',

          '& fieldset': {
            borderColor: '#9e9e9e',
          },
          '&:hover fieldset': {
            borderColor: 'rgba(77, 75, 75, 1)',
          },
        },

        '& input::placeholder': {
          color: '#9e9e9e',
          opacity: 1,
        },
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon
              sx={{
                color: '#fff',
                fontSize: 20,
              }}
            />
          </InputAdornment>
        ),
      }}
    />
  );
};
