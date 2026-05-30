'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated } from '@/lib/auth';

export default function Home() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (isAuthenticated()) {
      router.push('/products');
    } else {
      router.push('/login');
    }
  }, [router]);

  if (!mounted) return null;

  return (
    <div className="container">
      <h1>Loading...</h1>
    </div>
  );
}
