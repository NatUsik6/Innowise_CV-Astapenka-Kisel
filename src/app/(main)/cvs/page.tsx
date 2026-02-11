'use client';

import { useQuery } from '@apollo/client/react';
import { Typography, CircularProgress, Box } from '@mui/material';
import { CVS_QUERY } from '@/entities/cv/api/cvs.quries';
import { CvsApiResponse } from '@/entities/cv/model/cvs.types';

export default function CvsPage() {
  const { data, loading, error } = useQuery<CvsApiResponse>(CVS_QUERY);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">Error: {error.message}</Typography>;

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>CVs List</Typography>
      
      {data?.cvs.map((cv) => (
        <Box key={cv.id} sx={{ mb: 2, p: 2, border: '1px solid #ccc', borderRadius: 2 }}>
          <Typography variant="h6">{cv.name}</Typography>
          <Typography variant="body2" color="text.secondary">
            Education: {cv.education}
          </Typography>
          <Typography variant="body1" sx={{ mt: 1 }}>
            {cv.description}
          </Typography>
          <Typography variant="caption" display="block" sx={{ mt: 1, fontWeight: 'bold' }}>
            Author: {cv.user.profile?.full_name || cv.user.email}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}