export const searchInputSx = {
  width: 280,
  mb: 2,
  pl: '20px',

  '& .MuiOutlinedInput-root': {
    height: 40,
    backgroundColor: 'rgba(53, 53, 53, 1)',
    borderRadius: '30px',
    color: '#fff',

    '& fieldset': {
      borderColor: '#9e9e9e',
    },
    '&:hover fieldset': {
      borderColor: 'rgba(77, 75, 75, 1)',
    },
  },

  '& input::placeholder': {
    color: '#9e9e9e',
    opacity: 1,
  },
};

export const searchIconSx = {
  color: '#fff',
  fontSize: 20,
};
