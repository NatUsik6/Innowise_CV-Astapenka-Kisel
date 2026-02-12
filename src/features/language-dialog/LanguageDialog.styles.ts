export const dialogPaperSx = {
    backgroundColor: 'rgba(53,53,53,1)',
    color: '#fff',
    borderRadius: 2,
    width: 480,
};

export const dialogTitleSx = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    pr: 2,
    fontSize: '1.2rem',
    fontWeight: 500,
};

export const closeIconSx = {
    color: '#bdbdbd',
};

export const dialogContentSx = {
    display: 'flex',
    flexDirection: 'column',
    gap: 3,
    pt: '16px !important',
    pb: 2,
};

export const dialogActionsSx = {
    p: 3,
    gap: 1,
    justifyContent: 'flex-end',
};

export const cancelButtonSx = {
    color: '#bdbdbd',
    borderColor: '#bdbdbd',
    borderRadius: '30px',
    width: 150,
    '&:hover': {
        borderColor: '#fff',
    },
};

export const confirmButtonSx = (active: boolean) => ({
    backgroundColor: active ? '#e53935' : '#5b5b5b',
    color: active ? '#fff' : '#c6c6c6',
    borderRadius: '30px',
    width: 150,
    '&:hover': {
        backgroundColor: active ? '#d32f2f' : '#5b5b5b',
    },
    '&.Mui-disabled': {
        backgroundColor: '#5b5b5b',
        color: '#c6c6c6',
    },
});
