'use client';

import { Typography } from '@mui/material';
import { useRouter } from 'next/navigation';

export const EmployeesHeader = () => {
    const router = useRouter();

    return (
        <Typography
            variant="h5"
            onClick={() => router.push('/users')}
            sx={{
                color: '#797878ff',
                fontWeight: 400,
                cursor: 'pointer',
                mb: 1,
                pl: '20px',
                paddingTop: '15px',
                paddingBottom:'5px',
                fontSize:'16px',

                '&:hover': {
                    opacity: 0.8,
                },
            }}
        >
            Employees
        </Typography>
    );
};
