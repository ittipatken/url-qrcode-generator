import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export default async function SetupLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect('sign-in');
  }

  redirect('admin');

  return <>{children}</>;
}
