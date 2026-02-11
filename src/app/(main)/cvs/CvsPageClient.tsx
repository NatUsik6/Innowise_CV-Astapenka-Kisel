'use client';

import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@apollo/client/react';
import { SearchInput } from '@/features/search-users/ui/SearchInput';
import { CreateCvButton } from '@/features/cv-create/ui/CreateCvButton';
import { useSession } from '@/entities/session/model/useSession';
import { CVS_QUERY } from '@/entities/cv/api/cvs.quries';
import { CvsApiResponse } from '@/entities/cv/model/cvs.types';
import { mapCvsFromAPI } from '@/entities/cv/model/mapper';
import { Toolbar } from '@/app/users/UsersPageClient.styles';
import { StatusText } from '@/shared/ui/users/StatusText/StatusText.styles';
import { Box } from '@mui/material';
import { CvsTable } from '@/widgets/cvs-table/ui/CvsTable';

export const CvsPageClient = () => {
  const router = useRouter();
  const { user, loading: sessionLoading } = useSession();
  const [search, setSearch] = useState('');
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
          <CvsTable cvs={cvs} search={search} />
        )}
      </Box>
    </>
  );
};