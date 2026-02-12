'use client';

import { Box, Typography } from '@mui/material';
import { CV } from '@/entities/cv/model/cvs.types';
import { CvRowItem } from './CvRowItem';
import { tableContainerSx, combinedHeadCellSx, sortableHeaderCellSx, arrowSx } from './CvsTable.styles';
import { useMemo, useState } from 'react';

interface Props {
  cvs: CV[];
  search: string;
}

export const CvsTable = ({ cvs, search, renderActions }: Props & { renderActions?: (cv: CV) => React.ReactNode }) => {
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const sortField = 'name';

  const filteredAndSortedCvs = useMemo(() => {
    const filtered = cvs.filter((cv) => 
      cv.name.toLowerCase().includes(search.toLowerCase()) ||
      cv.user.email.toLowerCase().includes(search.toLowerCase())
    );

    return [...filtered].sort((a, b) => {
      const result = a.name.localeCompare(b.name);
      return sortOrder === 'asc' ? result : -result;
    });
  }, [cvs, search, sortOrder]);

  const handleSortToggle = () => {
    setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
  };

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
        <Box sx={sortableHeaderCellSx} onClick={handleSortToggle}>
          <Typography>Name</Typography>
          {renderArrow('name')}
        </Box>
        <Box><Typography>Education</Typography></Box>
        <Box><Typography>Employee</Typography></Box>
        <Box /> 
      </Box>

      {filteredAndSortedCvs.map((cv) => (
        <CvRowItem key={cv.id} cv={cv} renderActions={renderActions} />
      ))}
    </Box>
  );
};