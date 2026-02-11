'use client';

import { Box, Typography } from '@mui/material';
import { CV } from '@/entities/cv/model/cvs.types';
import { CvRowItem } from './CvRowItem';
import { tableContainerSx, combinedHeadCellSx, sortableHeaderCellSx, arrowSx } from './CvsTable.styles';

interface Props {
  cvs: CV[];
  search: string;
}

export const CvsTable = ({ cvs, search, renderActions }: Props & { renderActions?: (cv: CV) => React.ReactNode }) => {
  const sortOrder = 'asc'; 
  const sortField = 'name';
  const filteredCvs = cvs.filter(cv => 
    cv.name.toLowerCase().includes(search.toLowerCase()) ||
    cv.user.email.toLowerCase().includes(search.toLowerCase())
  );

  const renderArrow = (field: string) => {
    const isSelected = sortField === field;
    return (
      <Box component="span" sx={arrowSx}>
        {isSelected ? (sortOrder === 'asc' ? '↑' : '↓') : '↑↓'}
      </Box>
    );
  };

  return (
    <Box sx={tableContainerSx}>
      <Box sx={combinedHeadCellSx}>
        <Box sx={sortableHeaderCellSx} onClick={() => console.log('sort by name')}>
          <Typography>Name</Typography>
          {renderArrow('name')}
        </Box>
        <Box><Typography>Education</Typography></Box>
        <Box><Typography>Employee</Typography></Box>
        <Box /> 
      </Box>

      {filteredCvs.map((cv) => (
        <CvRowItem key={cv.id} cv={cv} renderActions={renderActions} />
      ))}
    </Box>
  );
};