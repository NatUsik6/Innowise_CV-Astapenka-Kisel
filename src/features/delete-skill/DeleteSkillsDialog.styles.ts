export const dialogPaperSx = {
  backgroundColor: 'rgba(53,53,53,1)',
  color: '#fff',
  borderRadius: 2,
  maxWidth: '600px',
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
  pt: 3,
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

export const deleteButtonSx = (count: number) => ({
  backgroundColor: count > 0 ? '#e53935' : '#5b5b5b',
  color: count > 0 ? '#fff' : '#c6c6c6',
  borderRadius: '30px',
  minWidth: 150,
  display: 'flex',
  alignItems: 'center',
  gap: 1.5,
  '&:hover': {
    backgroundColor: count > 0 ? '#d32f2f' : '#5b5b5b',
  },
  '&.Mui-disabled': {
    backgroundColor: '#5b5b5b',
    color: '#c6c6c6',
  },
});

export const counterBadgeSx = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 22,
  height: 22,
  borderRadius: '50%',
  bgcolor: '#fff',
  color: '#e53935',
  fontSize: '0.72rem',
  fontWeight: 700,
  lineHeight: 1,
};