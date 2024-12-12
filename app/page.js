// For Next.js 13+ (app/page.js)
'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const HomePage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/dashboard'); // Redirect to /dashboard on initial load
  }, [router]);

  return null; // You can return a loading spinner if you'd like
};

export default HomePage;
