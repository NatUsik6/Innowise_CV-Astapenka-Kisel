import { useEffect, useState } from 'react';
import { SelectChangeEvent } from '@mui/material';
import { User } from '@/entities/user/model/types';

export const useUpdateUserForm = (user: User | null) => {
  const [form, setForm] = useState<User | null>(null);

  useEffect(() => {
    if (user) {
      setForm(user);
    }
  }, [user]);

  const handleInputChange =
    (field: keyof User) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm(prev =>
        prev ? { ...prev, [field]: e.target.value } : prev
      );
    };

  const handleSelectChange =
    (field: keyof User) =>
    (e: SelectChangeEvent<string>) => {
      setForm(prev =>
        prev ? { ...prev, [field]: e.target.value } : prev
      );
    };

  return {
    form,
    setForm,
    handleInputChange,
    handleSelectChange,
  };
};
