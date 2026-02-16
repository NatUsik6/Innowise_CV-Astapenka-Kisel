import { redirect } from 'next/navigation';

export default function CvPage({ params }: { params: { id: string } }) {
  redirect(`/cvs/${params.id}/details`);
}