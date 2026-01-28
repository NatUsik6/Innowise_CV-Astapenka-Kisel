'use client';
import TextField from '@mui/material/TextField';

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export const UserSearch = ({ value, onChange }: Props) => {
  return (
    <TextField
      size="small"
      variant="outlined"
      placeholder="Search by full name"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};
