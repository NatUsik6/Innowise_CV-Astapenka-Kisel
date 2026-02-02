import TextField from "@mui/material/TextField";

const activeColor = '#E53935';
const disabledColor = 'rgba(146,146,146,0.7)';

export const StyledTextField = (props: any) => (
  <TextField
    fullWidth
    {...props}
    sx={{
      '& .MuiOutlinedInput-root': {
        backgroundColor: 'rgba(53,53,53,1)',
        color: '#fff',

        '& fieldset': {
          borderColor: disabledColor,
        },
        '&.Mui-focused fieldset': {
          borderColor: activeColor,
        },
      },
      '& label.Mui-focused': {
        color: activeColor,
      },
    }}
  />
);
