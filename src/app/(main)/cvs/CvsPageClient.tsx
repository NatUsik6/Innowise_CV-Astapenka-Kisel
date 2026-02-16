'use client';

import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@apollo/client/react';
import { SearchInput } from '@/features/search-users/ui/SearchInput';
import { CreateCvButton } from '@/features/cv-create/ui/CreateCvButton';
import { useSession } from '@/entities/session/model/useSession';
import { CVS_QUERY } from '@/entities/cv/api/cvs.quries';
import { CV, CvsApiResponse } from '@/entities/cv/model/cvs.types';
import { mapCvsFromAPI } from '@/entities/cv/model/mapper';
import { Toolbar } from '@/app/users/UsersPageClient.styles';
import { StatusText } from '@/shared/ui/users/StatusText/StatusText.styles';
import { Box, IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { CvsTable } from '@/widgets/cvs-table/ui/CvsTable';
import { useDebounce } from '@/shared/lib/hooks/useDebounce';
import { actionButtonSx } from '@/app/widgets/users-table/user/UserUsersTable.styles';

export const CvsPageClient = () => {
  const router = useRouter();
  const { user, loading: sessionLoading } = useSession();
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 400);
  const [mounted, setMounted] = useState(false);
  const { data, loading: cvsLoading } = useQuery<CvsApiResponse>(CVS_QUERY);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setMounted(true);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!sessionLoading && !user && mounted) {
      router.push('/login');
    }
  }, [user, sessionLoading, mounted, router]);

  const renderCvActions = useCallback((cv: CV) => {
    const isAdmin = user?.role === 'Admin';
    const isOwner = user?.id === cv.user.id;

    if (!isAdmin && !isOwner) return null;

    return (
      <IconButton 
        size="small" 
        sx={actionButtonSx} 
        onClick={(e) => {
          e.stopPropagation();
          console.log('Open menu for CV:', cv.id);
        }}
      >
        <MoreVertIcon fontSize="small" />
      </IconButton>
    );
  }, [user]);

  const handleOpenCreate = useCallback(() => {
    console.log('Open Create CV Modal');
  }, []);

  if (!mounted) {
    return null; 
  }

  const cvs = data ? mapCvsFromAPI(data.cvs) : [];

  return (
    <>
      <Toolbar>
        <SearchInput value={search} onChange={setSearch} />
        <CreateCvButton onClick={handleOpenCreate} />
      </Toolbar>

      <Box sx={{ mt: 2 }}>
        {cvsLoading ? (
          <StatusText>Loading CVs...</StatusText>
        ) : (
          <CvsTable 
            cvs={cvs} 
            search={debouncedSearch} 
            renderActions={renderCvActions} 
          />
        )}
      </Box>
    </>
  );
};