import Select from "@mui/material/Select";

const activeColor = '#E53935';
const disabledColor = 'rgba(146,146,146,0.7)';

export const StyledSelect = (props: any) => (
  <Select
    fullWidth
    {...props}
    sx={{
      backgroundColor: 'rgba(53,53,53,1)',
      color: '#fff',

      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: disabledColor,
      },
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: activeColor,
      },

      '& .MuiSelect-icon': {
        color: '#fff',
      },
    }}
  />
);
