import { Avatar } from '@mui/material';
import { User } from '../model/types';

export const UserAvatar = ({ user }: { user: User }) => {
  if (user.profile.avatar) {
    return <Avatar src={user.profile.avatar} />;
  }
  const letter = user.profile.firstName?.[0]?.toUpperCase() || 'U';

  return (
    <Avatar sx={{ bgcolor: '#4b4b4b' }}>
      {letter}
    </Avatar>
  );
};