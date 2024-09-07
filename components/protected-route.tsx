"use client"

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getToken } from '@/lib/helper';

const ProtectedRoute = ({ children }: { children: React.ReactNode}) => {
  const router = useRouter();

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.push('/login');
    }
  }, [router]);

  return <>{children}</>;
};

export default ProtectedRoute;