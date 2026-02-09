import { Avatar } from '@mui/material';
import { User } from '../model/types';

export const UserAvatar = ({ user }: { user: User }) => {
  if (user.avatar) {
    return <Avatar src={user.avatar} />;
  }

  const letter = user.firstName?.[0]?.toUpperCase() || 'U';

  return (
    <Avatar sx={{ bgcolor: '#4b4b4b' }}>
      {letter}
    </Avatar>
  );
};
