export const containerSx = {
    p: 3,
};

export const loaderWrapperSx = {
    display: 'flex',
    justifyContent: 'center',
    mt: 8,
};

export const loaderSx = {
    color: '#e53935',
};

export const emptyTextSx = {
    color: 'rgba(255,255,255,0.35)',
    mb: 4,
};

export const categoryWrapperSx = {
    mb: 4,
};

export const categoryTitleSx = {
    color: '#fff',
    fontWeight: 500,
    mb: 2,
};

export const skillsGridSx = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: 2.5,
};

export const actionsWrapperSx = {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: 3,
    mt: 2,
};

export const addButtonSx = {
    color: 'rgba(255,255,255,0.45)',
    textTransform: 'uppercase',
    letterSpacing: 1,
    fontWeight: 500,
    '&:hover': { color: '#fff', bgcolor: 'transparent' },
};

export const deleteButtonSx = {
    color: '#e53935',
    textTransform: 'uppercase',
    letterSpacing: 1,
    fontWeight: 500,
    '&:hover': { color: '#c62828', bgcolor: 'transparent' },
    '&.Mui-disabled': {
        color: 'rgba(229,57,53,0.3)',
        '& svg': { color: 'rgba(229,57,53,0.3)' },
    },
};
