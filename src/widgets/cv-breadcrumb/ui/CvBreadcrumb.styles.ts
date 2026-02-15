'use client';

import { styled } from '@mui/material/styles';
import { Link } from '@mui/material';

export const CvLink = styled(Link)({
    textDecoration: 'none',
    cursor: 'pointer',

    '&:hover': {
        opacity: 0.85,
    },
});
