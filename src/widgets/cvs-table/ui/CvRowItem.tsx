'use client';

import { Box, Typography, IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { CV } from '@/entities/cv/model/cvs.types';
import { 
  rowWrapperSx, 
  dataTextSx, 
  descriptionTextSx, 
  actionButtonSx,
  rowDataGridSx
} from './CvsTable.styles';

interface CvRowItemProps {
  cv: CV;
  renderActions?: (cv: CV) => React.ReactNode;
}

export const CvRowItem = ({ cv, renderActions }: CvRowItemProps) => {
  return (
    <Box sx={rowWrapperSx}>
      <Box sx={rowDataGridSx}>
        <Typography sx={dataTextSx}>{cv.name}</Typography>
        <Typography sx={dataTextSx}>{cv.education}</Typography>
        <Typography sx={dataTextSx}>
          {cv.user.profile.firstName 
            ? `${cv.user.profile.firstName} ${cv.user.profile.lastName}` 
            : cv.user.email}
        </Typography>
        <Box onClick={(e) => e.stopPropagation()}>
          {renderActions ? renderActions(cv) : (
            <IconButton size="small" sx={actionButtonSx}>
              <MoreVertIcon fontSize="small" />
            </IconButton>
          )}
        </Box>
      </Box>
      <Typography sx={descriptionTextSx}>
        {cv.description}
      </Typography>
    </Box>
  );
};