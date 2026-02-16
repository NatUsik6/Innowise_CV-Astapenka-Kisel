'use client';

import { useParams } from 'next/navigation';
import { useSession } from '@/entities/session/model/useSession';
import { useCv } from './hooks/useCv';
import { CvDetailsWidget } from '@/features/cv-details/CvDetailsWidget';
import { useCanEdit } from '@/shared/hooks/useCanEdit';

export default function CvDetailsPage() {
  const { id: cvId } = useParams<{ id: string }>();
  const { user } = useSession();
  const { cv } = useCv({ cvId });
  const canEdit = useCanEdit(cv?.user?.id, user);

  return <CvDetailsWidget cvId={cvId} canEdit={canEdit} />;
}
