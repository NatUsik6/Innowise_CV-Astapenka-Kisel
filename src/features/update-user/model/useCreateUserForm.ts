import { useMemo, useState } from 'react';
import { SelectChangeEvent } from '@mui/material';
import { User } from '@/entities/user/model/types';

const EMPTY_USER: User = {
    id: '',
    email: '',
    firstName: '',
    lastName: '',
    department: '',
    department_name: '',
    position: '',
    position_name: '',
    role: 'USER',
};

export const useCreateUserForm = () => {
    const [form, setForm] = useState<User>(EMPTY_USER);

    const handleInputChange =
        (field: keyof User) =>
            (e: React.ChangeEvent<HTMLInputElement>) => {
                setForm(prev => ({ ...prev, [field]: e.target.value }));
            };

    const handleSelectChange =
        (field: keyof User) =>
            (e: SelectChangeEvent<string>) => {
                setForm(prev => ({ ...prev, [field]: e.target.value }));
            };

    const isDirty = useMemo(() => {
        return Object.values(form).some(Boolean);
    }, [form]);

    return {
        form,
        isDirty,
        handleInputChange,
        handleSelectChange,
    };
};
