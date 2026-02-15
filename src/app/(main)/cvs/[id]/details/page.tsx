'use client';

import { useParams } from 'next/navigation';
import { useSession } from '@/entities/session/model/useSession';
import { useCv } from './hooks/useCv';
import { useCanEditCv } from './hooks/useCanEditCv';
import { CvDetailsWidget } from '@/features/cv-details/CvDetailsWidget';

export default function CvDetailsPage() {
  const { id: cvId } = useParams<{ id: string }>();
  const { user } = useSession();
  const { cv } = useCv({ cvId });
  const canEdit = useCanEditCv(cv?.user?.id, user);

  return <CvDetailsWidget cvId={cvId} canEdit={canEdit} />;
}
