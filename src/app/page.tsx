// import Header from '@/components/Header';
// import HeroSection from '@/components/HeroSection';
// import Mission from '@/components/Mission';
// import Solutions from '@/components/Solutions';
// import Services from '@/components/Services';
// import Industries from '@/components/Industries';
// import ContactSection from '@/components/ContactSection';
// import Footer from '@/components/Footer';

// export default function Home() {
//   return (
//     <>
//       <Header />
//       <main className="min-h-screen">
//         <HeroSection />
//         <Mission />
//         <Solutions />
//         <Services />
//         <Industries />
//         <ContactSection />
//         <Footer />
//       </main>
//     </>
//   );
// }




'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push('/homescreen');
  }, [router]);

  return null;
}