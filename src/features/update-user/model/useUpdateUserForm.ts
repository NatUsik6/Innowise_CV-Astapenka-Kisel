import { useEffect, useMemo, useState } from 'react';
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

  const isDirty = useMemo(() => {
    if (!user || !form) return false;

    return (
      user.email !== form.email ||
      user.firstName !== form.firstName ||
      user.lastName !== form.lastName ||
      user.department_name !== form.department_name ||
      user.position_name !== form.position_name ||
      user.role !== form.role
    );
  }, [user, form]);

  return {
    form,
    setForm,
    handleInputChange,
    handleSelectChange,
    isDirty,
  };
};
