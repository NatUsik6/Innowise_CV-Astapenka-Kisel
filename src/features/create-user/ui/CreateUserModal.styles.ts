export const dialogPaperSx = {
  backgroundColor: 'rgba(53,53,53,1)',
  color: '#fff',
  borderRadius: 2,
};

export const dialogTitleSx = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  pr: 2,
};

export const closeIconSx = {
  color: '#bdbdbd',
};

export const formGridSx = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: 3,
  mt: 1,
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
};

export const createButtonSx = (active: boolean) => ({
  backgroundColor: active ? '#e53935' : '#5b5b5b',
  color: active ? '#fff' : '#c6c6c6',
  borderRadius: '30px',
  width: 150,

  '&:hover': {
    backgroundColor: active ? '#d32f2f' : '#5b5b5b',
  },
});
