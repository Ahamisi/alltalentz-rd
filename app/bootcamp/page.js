"use client"
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function BootCamp() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to professional development programme page
    router.push('/professional-development-programme');
  }, [router]);

  return null;
}
