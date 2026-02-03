'use client';

import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { searchInputSx, searchIconSx } from './SearchInput.styles';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export const SearchInput = ({ value, onChange }: Props) => {
  return (
    <TextField
      placeholder="Search"
      value={value}
      onChange={e => onChange(e.target.value)}
      variant="outlined"
      sx={searchInputSx}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon sx={searchIconSx} />
          </InputAdornment>
        ),
      }}
    />
  );
};
