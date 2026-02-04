'use client';

import { styled } from '@mui/material/styles';
import { Box, Typography, Link } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

export const BreadcrumbRoot = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    paddingLeft: 14,
    paddingTop: 5,
    paddingBottom: 0,
});

export const BreadcrumbLink = styled(Link)({
    textDecoration: 'none',
    cursor: 'pointer',
});

export const BreadcrumbLinkText = styled(Typography)({
    color: '#797878',
    fontWeight: 400,
    fontSize: 14,

    '&:hover': {
        opacity: 0.8,
    },
});

export const ChevronIcon = styled(ChevronRightIcon)({
    fontSize: 18,
    color: '#797878',
});

export const CrumbText = styled(Typography)({
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    color: '#E53935',
    fontWeight: 500,
    fontSize: 14,
});

export const ProfileLink = styled(Link)({
    textDecoration: 'none',
    cursor: 'pointer',

    '&:hover': {
        opacity: 0.85,
    },
});