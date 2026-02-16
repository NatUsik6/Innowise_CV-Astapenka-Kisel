'use client';

import { Box, Typography } from '@mui/material';
import { CV } from '@/entities/cv/model/cvs.types';
import { CvRowItem } from './CvRowItem';
import { tableContainerSx, combinedHeadCellSx, sortableHeaderCellSx, arrowSx } from './CvsTable.styles';
import { useMemo, useState } from 'react';

export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
}

interface Props {
  cvs: CV[];
  search: string;
  renderActions?: (cv: CV) => React.ReactNode;
}

export const CvsTable = ({ cvs, search, renderActions }: Props) => {
  const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.ASC);
  const sortField = 'name';

  const filteredAndSortedCvs = useMemo(() => {
    const filtered = cvs.filter((cv) => 
      cv.name.toLowerCase().includes(search.toLowerCase()) ||
      cv.user.email.toLowerCase().includes(search.toLowerCase())
    );

    return [...filtered].sort((a, b) => {
      const result = a.name.localeCompare(b.name);
      return sortOrder === SortOrder.ASC ? result : -result;
    });
  }, [cvs, search, sortOrder]);

  const handleSortToggle = () => {
    setSortOrder((prev) => (prev === SortOrder.ASC ? SortOrder.DESC : SortOrder.ASC));
  };

  const renderArrow = (field: string) => {
    const isSelected = sortField === field;
    return (
      <Box component="span" sx={arrowSx}>
        {isSelected ? (sortOrder === SortOrder.ASC ? '↑' : '↓') : '↑↓'}
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