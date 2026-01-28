import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { UserSearch } from '@/features/user-search/UserSearch';

type Props = {
  role: 'admin' | 'user';
  search: string;
  onSearchChange: (value: string) => void;
};

export const UsersHeader = ({
  role,
  search,
  onSearchChange,
}: Props) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        mb: 3,
      }}
    >
      <UserSearch value={search} onChange={onSearchChange} />

      {role === 'admin' && (
        <Button
          variant="contained"
          color="error"
          sx={{ marginLeft: 'auto' }}
        >
          + CREATE USER
        </Button>
      )}
    </Box>
  );
};
