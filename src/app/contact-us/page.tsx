// import Header from '@/components/Header';
// import Footer from '@/components/Footer';

// interface ContactPageData {
//   id: number;
//   attributes?: {
//     title: string;
//     description: any;
//     email: string;
//     phone: string;
//     address: string;
//   };
//   title: string;
//   description: any;
//   email: string;
//   phone: string;
//   address: string;
// }

// function extractText(richText: any): string {
//   if (typeof richText === 'string') return richText;
//   if (Array.isArray(richText)) {
//     return richText
//       .map((block: any) => {
//         if (block.children) {
//           return block.children
//             .map((child: any) => child.text || '')
//             .join('');
//         }
//         return '';
//       })
//       .join('\n\n');
//   }
//   return '';
// }

// async function getContactPage() {
//   const res = await fetch('http://localhost:1337/api/contact-pages', {
//     cache: 'no-store'
//   });
//   const data = await res.json();
//   return data.data[0];
// }

// export default async function ContactUsPage() {
//   const contactPage: ContactPageData = await getContactPage();
//   const attrs = contactPage.attributes || contactPage;

//   return (
//     <>
//       <Header />
//       <main className="min-h-screen py-20 bg-white">
//         <div className="mx-auto max-w-6xl px-4">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
//             {/* Left Side - Get In Touch */}
//             <div className="bg-gray-50 p-8 rounded-lg">
//               <h2 className="text-4xl font-bold mb-6">{attrs.title}</h2>
//               <p className="text-gray-700 mb-8 text-lg">{extractText(attrs.description)}</p>
              
//               <div className="space-y-6">
//                 <div>
//                   <h3 className="font-bold text-lg flex items-center gap-2 mb-2">
//                     ✉️ Email
//                   </h3>
//                   <p className="text-gray-600">{attrs.email}</p>
//                 </div>
                
//                 <div>
//                   <h3 className="font-bold text-lg flex items-center gap-2 mb-2">
//                     📍 {attrs.address.split(':')[0]}
//                   </h3>
//                   <p className="text-gray-600">{attrs.address.split(':')[1]?.trim()}</p>
//                 </div>
                
//                 <div>
//                   <h3 className="font-bold text-lg flex items-center gap-2 mb-2">
//                     🕐 Business Hours
//                   </h3>
//                   <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM CST</p>
//                   <p className="text-gray-600">Weekend: {attrs.phone}</p>
//                 </div>
//               </div>
//             </div>

//             {/* Right Side - Send us a Message Form */}
//             <div className="bg-gray-50 p-8 rounded-lg">
//               <h2 className="text-4xl font-bold mb-6">Send us a Message</h2>
              
//               <form className="space-y-4">
//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-bold mb-2">First Name *</label>
//                     <input type="text" className="w-full border border-gray-300 rounded-lg p-3" required />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-bold mb-2">Last Name *</label>
//                     <input type="text" className="w-full border border-gray-300 rounded-lg p-3" required />
//                   </div>
//                 </div>
                
//                 <div>
//                   <label className="block text-sm font-bold mb-2">Mobile Number *</label>
//                   <input type="tel" className="w-full border border-gray-300 rounded-lg p-3" required />
//                 </div>
                
//                 <div>
//                   <label className="block text-sm font-bold mb-2">Corporate Email ID *</label>
//                   <input type="email" className="w-full border border-gray-300 rounded-lg p-3" required />
//                 </div>
                
//                 <div>
//                   <label className="block text-sm font-bold mb-2">Purpose *</label>
//                   <select className="w-full border border-gray-300 rounded-lg p-3" required>
//                     <option>Please select...</option>
//                     <option>General Inquiry</option>
//                     <option>Sales</option>
//                     <option>Support</option>
//                     <option>Partnership</option>
//                   </select>
//                 </div>
                
//                 <button type="submit" className="w-full bg-blue-900 text-white font-bold py-3 rounded-lg hover:bg-blue-800 transition">
//                   Send Message
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </main>
//       <Footer />
//     </>
//   );
// }





'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

function extractText(richText: any): string {
  if (typeof richText === 'string') return richText;
  if (Array.isArray(richText)) {
    return richText
      .map((block: any) => {
        if (block.children) {
          return block.children
            .map((child: any) => child.text || '')
            .join('');
        }
        return '';
      })
      .join('\n\n');
  }
  return '';
}

export default function ContactUsPage() {
  const [contactData, setContactData] = useState<any>(null);
  const [branding, setBranding] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [navigationItems, setNavigationItems] = useState<any[]>([]);
  const [navSubItems, setNavSubItems] = useState<any[]>([]);
  const [footer, setFooter] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Contact data
        const res = await fetch(`${API_URL}/contact-pages`);
        const data = await res.json();
        if (data.data && data.data.length > 0) {
          setContactData(data.data[0]);
        }

        // Fetch Branding with logo
        const brandRes = await fetch(`${API_URL}/branding?populate=*`);
        const brandData = await brandRes.json();
        if (brandData.data) {
          const brandingData = Array.isArray(brandData.data) ? brandData.data[0] : brandData.data;
          const attrs = brandingData?.attributes || brandingData;
          setBranding(attrs);
        }

        // Fetch Navigation
        const mainNavRes = await fetch(`${API_URL}/navigations`);
        const mainNavData = await mainNavRes.json();
        const mainNavArray = Array.isArray(mainNavData.data) ? mainNavData.data : [];
        setNavigationItems(mainNavArray);

        // Fetch Navigation Sub-items
        const navItemRes = await fetch(`${API_URL}/navigation-items`);
        const navItemData = await navItemRes.json();
        const navItemArray = Array.isArray(navItemData.data) ? navItemData.data : [];
        setNavSubItems(navItemArray);

        // Fetch Footer with links
        const footRes = await fetch(`${API_URL}/footers?populate=links`);
        const footData = await footRes.json();
        const footArray = Array.isArray(footData.data) ? footData.data : [];
        if (footArray.length > 0) {
          setFooter(footArray[0]);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '100px', color: '#9ca3af' }}>Loading...</div>;
  }

  const attrs = contactData?.attributes || contactData;

  const getLogo = () => {
    if (branding?.logo?.url) return branding.logo.url;
    if (branding?.logo?.data?.attributes?.url) return branding.logo.data.attributes.url;
    if (Array.isArray(branding?.logo) && branding.logo[0]?.url) return branding.logo[0].url;
    if (Array.isArray(branding?.logo) && branding.logo[0]?.attributes?.url) return branding.logo[0].attributes.url;
    return null;
  };

  const getFullLogoUrl = () => {
    const url = getLogo();
    return url ? (url.startsWith('http') ? url : `http://localhost:1337${url}`) : null;
  };

  return (
    <div
      style={{
        fontFamily: "'DM Sans', system-ui, sans-serif",
        background: 'linear-gradient(135deg, #050508 0%, #0a0a0f 50%, #0f0f18 100%)',
        color: '#e5e5e5',
        minHeight: '100vh'
      }}
    >
      {/* Navigation */}
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          padding: '0 24px',
          background: isScrolled ? 'rgba(10, 10, 15, 0.9)' : 'transparent',
          backdropFilter: isScrolled ? 'blur(20px)' : 'none',
          borderBottom: isScrolled ? '1px solid rgba(255,255,255,0.05)' : 'none',
          transition: 'all 0.3s ease'
        }}
      >
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '80px'
          }}
        >
          {/* Logo */}
          <Link href="/homescreen" style={{ textDecoration: 'none' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                cursor: 'pointer'
              }}
            >
              {(() => {
                const logoUrl = getFullLogoUrl();
                if (logoUrl) {
                  return (
                    <img
                      src={logoUrl}
                      alt={branding?.companyName || 'Logo'}
                      style={{ height: '50px', width: 'auto', objectFit: 'contain' }}
                    />
                  );
                }
                return (
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      background: 'linear-gradient(135deg, #00d4ff, #7c3aed)',
                      borderRadius: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: '18px'
                    }}
                  >
                    T
                  </div>
                );
              })()}
              <div>
                <div style={{ fontWeight: 700, fontSize: '18px', color: 'white' }}>
                  {branding?.companyName || 'Trinity AI'}
                </div>
                <div
                  style={{
                    fontSize: '10px',
                    color: '#00d4ff',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase'
                  }}
                >
                  Software
                </div>
              </div>
            </div>
          </Link>

          {/* Navigation Links */}
          <div style={{ display: 'flex', gap: '32px' }}>
            {navigationItems.map((navItem, idx) => {
              const children = navSubItems.filter((item) => item.parentMenu === navItem.label);
              return (
                <div key={idx} style={{ position: 'relative', display: 'inline-block' }}>
                  <div
                    style={{
                      color: '#d1d5db',
                      fontSize: '14px',
                      fontWeight: 500,
                      cursor: 'pointer',
                      transition: 'color 0.3s',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '8px 0'
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.color = 'white';
                      const dropdown = (e.currentTarget as HTMLElement).nextElementSibling as HTMLElement;
                      if (dropdown) {
                        dropdown.style.display = 'block';
                        dropdown.style.opacity = '1';
                      }
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.color = '#d1d5db';
                    }}
                  >
                    {navItem.label}
                    {navItem.isDropdown && <span style={{ fontSize: '10px' }}>▼</span>}
                  </div>

                  {navItem.isDropdown && children.length > 0 && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        background: 'rgba(10, 10, 15, 0.95)',
                        borderRadius: '8px',
                        border: '1px solid rgba(255,255,255,0.1)',
                        minWidth: '220px',
                        marginTop: '8px',
                        backdropFilter: 'blur(10px)',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                        display: 'none',
                        opacity: 0,
                        transition: 'opacity 0.3s ease',
                        zIndex: 100,
                        padding: '4px 0'
                      }}
                      onMouseEnter={e => {
                        (e.currentTarget as HTMLElement).style.display = 'block';
                        (e.currentTarget as HTMLElement).style.opacity = '1';
                      }}
                      onMouseLeave={e => {
                        (e.currentTarget as HTMLElement).style.display = 'none';
                        (e.currentTarget as HTMLElement).style.opacity = '0';
                      }}
                    >
                      {children.map((child, cIdx) => (
                        <a
                          key={cIdx}
                          href={child.url || '#'}
                          style={{
                            display: 'block',
                            padding: '12px 20px',
                            color: '#d1d5db',
                            textDecoration: 'none',
                            fontSize: '14px',
                            transition: 'all 0.3s',
                            borderRadius: cIdx === 0 ? '8px 8px 0 0' : cIdx === children.length - 1 ? '0 0 8px 8px' : '0'
                          }}
                          onMouseEnter={e => {
                            (e.currentTarget as HTMLElement).style.background = 'rgba(0,212,255,0.1)';
                            (e.currentTarget as HTMLElement).style.color = '#00d4ff';
                          }}
                          onMouseLeave={e => {
                            (e.currentTarget as HTMLElement).style.background = 'transparent';
                            (e.currentTarget as HTMLElement).style.color = '#d1d5db';
                          }}
                        >
                          {child.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <Link href="/homescreen" style={{ textDecoration: 'none' }}>
            <button
              style={{
                background: 'linear-gradient(135deg, #00d4ff 0%, #7c3aed 100%)',
                padding: '14px 28px',
                borderRadius: '8px',
                color: 'white',
                fontWeight: '600',
                fontSize: '15px',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              Get Started
            </button>
          </Link>
        </div>
      </nav>

      {/* Main Content - Side by Side Layout */}
      <section
        style={{
          minHeight: '100vh',
          paddingTop: '120px',
          paddingBottom: '80px',
          paddingLeft: '24px',
          paddingRight: '24px'
        }}
      >
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px' }}>
            {/* Left Side - Contact Info */}
            <div>
              <h1 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 700, color: 'white', marginBottom: '32px' }}>
                {attrs?.title || 'Get In Touch'}
              </h1>
              <p style={{ fontSize: '16px', color: '#9ca3af', lineHeight: 1.8, marginBottom: '32px' }}>
                {extractText(attrs?.description)}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div
                  style={{
                    background: 'rgba(18, 18, 26, 0.8)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    padding: '24px',
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.boxShadow = '0 20px 40px rgba(0, 212, 255, 0.15)';
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0, 212, 255, 0.3)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)';
                  }}
                >
                  <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'white', marginBottom: '8px' }}>Email</h3>
                  <p style={{ fontSize: '14px', color: '#9ca3af' }}>{attrs?.email}</p>
                </div>

                <div
                  style={{
                    background: 'rgba(18, 18, 26, 0.8)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    padding: '24px',
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.boxShadow = '0 20px 40px rgba(0, 212, 255, 0.15)';
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0, 212, 255, 0.3)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)';
                  }}
                >
                  <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'white', marginBottom: '8px' }}>Address</h3>
                  <p style={{ fontSize: '14px', color: '#9ca3af' }}>{attrs?.address}</p>
                </div>

                <div
                  style={{
                    background: 'rgba(18, 18, 26, 0.8)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    padding: '24px',
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.boxShadow = '0 20px 40px rgba(0, 212, 255, 0.15)';
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0, 212, 255, 0.3)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)';
                  }}
                >
                  <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'white', marginBottom: '8px' }}>Business Hours</h3>
                  <p style={{ fontSize: '14px', color: '#9ca3af' }}>Monday - Friday: 9:00 AM - 6:00 PM CST</p>
                  <p style={{ fontSize: '14px', color: '#9ca3af' }}>Weekend: By appointment</p>
                </div>
              </div>
            </div>

            {/* Right Side - Form */}
            <div>
              <h2 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 700, color: 'white', marginBottom: '32px' }}>
                Send us a Message
              </h2>
              <form
                style={{
                  background: 'rgba(18, 18, 26, 0.8)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  padding: '32px',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px'
                }}
              >
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <input type="text" placeholder="First Name *" style={{ padding: '16px', background: 'rgba(18, 18, 26, 0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white' }} />
                  <input type="text" placeholder="Last Name *" style={{ padding: '16px', background: 'rgba(18, 18, 26, 0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white' }} />
                </div>
                <input type="tel" placeholder="Mobile Number *" style={{ padding: '16px', background: 'rgba(18, 18, 26, 0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white' }} />
                <input type="email" placeholder="Corporate Email ID *" style={{ padding: '16px', background: 'rgba(18, 18, 26, 0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white' }} />
                <select style={{ padding: '16px', background: 'rgba(18, 18, 26, 0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white' }}>
                  <option>Purpose *</option>
                  <option>General Inquiry</option>
                  <option>Sales</option>
                  <option>Support</option>
                </select>
                <button
                  type="submit"
                  style={{
                    padding: '16px',
                    background: 'linear-gradient(135deg, #00d4ff 0%, #7c3aed 100%)',
                    border: 'none',
                    borderRadius: '8px',
                    color: 'white',
                    fontWeight: '600',
                    cursor: 'pointer',
                    marginTop: '8px'
                  }}
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: '#050508', borderTop: '1px solid rgba(255,255,255,0.05)', padding: '64px 24px 32px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '48px', marginBottom: '48px' }}>
            {footer && (
              <>
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'white', marginBottom: '16px' }}>
                    {footer.companyName || 'The Trinity AI Software Inc'}
                  </h3>
                  <p style={{ fontSize: '14px', color: '#9ca3af' }}>{footer.location}</p>
                </div>
                {footer?.links && footer.links.length > 0 && (
                  <div>
                    <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'white', marginBottom: '16px' }}>Quick Links</h3>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                      {footer.links.map((link: any, idx: number) => (
                        <li key={idx} style={{ marginBottom: '12px' }}>
                          <a href={link.url} style={{ fontSize: '14px', color: '#9ca3af', textDecoration: 'none' }}>
                            {link.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            )}
          </div>
          <div style={{ textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '24px' }}>
            <p style={{ fontSize: '14px', color: '#6b7280' }}>{footer?.copyright}</p>
          </div>
        </div>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
      `}</style>
    </div>
  );
}