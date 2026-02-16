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
import { Box, IconButton, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { CvsTable } from '@/widgets/cvs-table/ui/CvsTable';
import { useDebounce } from '@/shared/lib/hooks/useDebounce';
import { CreateCvModal } from '@/features/cv-create/ui/CreateCvModal';
import { actionButtonSx } from '@/widgets/cvs-table/ui/CvsTable.styles';
import { UpdateCvModal } from '@/features/cv-update/ui/UpdateCvModal';
import { DeleteCvModal } from '@/features/cv-delete/ui/DeleteCvModal';

enum ModalType {
  NONE = 'NONE',
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
}

export const CvsPageClient = () => {
  const router = useRouter();
  const { user, loading: sessionLoading } = useSession();
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 400);
  const [mounted, setMounted] = useState(false);
  const { data, loading: cvsLoading } = useQuery<CvsApiResponse>(CVS_QUERY);
  const [activeModal, setActiveModal] = useState<ModalType>(ModalType.NONE);
  const [selectedCv, setSelectedCv] = useState<CV | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!sessionLoading && !user && mounted) {
      router.push('/login');
    }
  }, [user, sessionLoading, mounted, router]);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>, cv: CV) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setSelectedCv(cv);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const openModal = (type: ModalType) => {
    setActiveModal(type);
    handleCloseMenu();
  };

  const closeModal = () => {
    setActiveModal(ModalType.NONE);
    setSelectedCv(null);
  };

  const renderCvActions = useCallback((cv: CV) => {
    const isAdmin = user?.role === 'Admin';
    const isOwner = user?.id === cv.user.id;

    if (!isAdmin && !isOwner) return null;

    return (
      <IconButton size="small" sx={actionButtonSx} onClick={(e) => handleOpenMenu(e, cv)}>
        <MoreVertIcon fontSize="small" />
      </IconButton>
    );
  }, [user]);

  if (!mounted) return null;

  const cvs = data ? mapCvsFromAPI(data.cvs) : [];

  return (
    <>
      <Toolbar>
        <SearchInput value={search} onChange={setSearch} />
        <CreateCvButton onClick={() => openModal(ModalType.CREATE)} />
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

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        onClick={(e) => e.stopPropagation()}
      >
        <MenuItem onClick={() => openModal(ModalType.UPDATE)}>Edit</MenuItem>
        <MenuItem 
          onClick={() => openModal(ModalType.DELETE)} 
          sx={{ color: '#e53935' }}
        >
          Delete
        </MenuItem>
      </Menu>

      <CreateCvModal 
        open={activeModal === ModalType.CREATE} 
        onClose={closeModal} 
        userId={user?.id || ''} 
      />

      {selectedCv && (
        <>
          <UpdateCvModal 
            open={activeModal === ModalType.UPDATE} 
            onClose={closeModal} 
            cv={selectedCv} 
          />
          <DeleteCvModal 
            open={activeModal === ModalType.DELETE} 
            onClose={closeModal} 
            cvId={selectedCv.id} 
            cvName={selectedCv.name} 
          />
        </>
      )}
    </>
  );
};