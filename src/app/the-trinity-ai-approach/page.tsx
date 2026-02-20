// import Header from '@/components/Header';
// import Footer from '@/components/Footer';

// interface ApproachData {
//   id: number;
//   attributes: {
//     title: string;
//     description: any;
//     content: any;
//   };
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

// async function getApproach() {
//   const res = await fetch('http://localhost:1337/api/approaches', {
//     cache: 'no-store'
//   });
//   const data = await res.json();
//   return data.data[0];
// }

// export default async function ApproachPage() {
//   const approach: ApproachData = await getApproach();
//   const attrs = approach.attributes || approach;

//   return (
//     <>
//       <Header />
//       <main className="min-h-screen py-20">
//         <div className="mx-auto max-w-4xl px-4">
//           <h1 className="text-5xl font-bold mb-8 text-center">{attrs.title}</h1>
//           <p className="text-xl text-gray-600 text-center mb-12">{extractText(attrs.description)}</p>
          
//           <div className="prose prose-lg max-w-none text-gray-700 whitespace-pre-wrap leading-relaxed">
//             {extractText(attrs.content)}
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

export default function ApproachPage() {
  const [approachData, setApproachData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [navigationItems, setNavigationItems] = useState<any[]>([]);
  const [navSubItems, setNavSubItems] = useState<any[]>([]);
  const [footer, setFooter] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Approach data
        const res = await fetch(`${API_URL}/approaches`);
        const data = await res.json();
        if (data.data && data.data.length > 0) {
          setApproachData(data.data[0]);
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

  const attrs = approachData?.attributes || approachData;

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
              <div>
                <div style={{ fontWeight: 700, fontSize: '18px', color: 'white' }}>Trinity AI</div>
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

          {/* Navigation Links with Dropdowns */}
          <div style={{ display: 'flex', gap: '32px', position: 'relative' }}>
            {navigationItems.length > 0 &&
              navigationItems.map((navItem, idx) => {
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
                              borderRadius:
                                cIdx === 0
                                  ? '8px 8px 0 0'
                                  : cIdx === children.length - 1
                                  ? '0 0 8px 8px'
                                  : '0'
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

      {/* Main Content */}
      <section
        id="content"
        style={{
          minHeight: '100vh',
          paddingTop: '120px',
          paddingBottom: '80px',
          paddingLeft: '24px',
          paddingRight: '24px'
        }}
      >
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          {/* Title */}
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h1
              style={{
                fontSize: 'clamp(40px, 8vw, 72px)',
                fontWeight: 700,
                lineHeight: 1.1,
                marginBottom: '24px',
                background: 'linear-gradient(135deg, #00d4ff 0%, #7c3aed 50%, #06b6d4 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              {attrs?.title || 'The Trinity AI Approach'}
            </h1>
            {attrs?.description && (
              <p
                style={{
                  fontSize: '18px',
                  color: '#9ca3af',
                  lineHeight: 1.8,
                  maxWidth: '700px',
                  margin: '0 auto'
                }}
              >
                {extractText(attrs.description)}
              </p>
            )}
          </div>

          {/* Content Box */}
          {attrs?.content && (
            <div
              style={{
                background: 'rgba(18, 18, 26, 0.8)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '12px',
                padding: '48px',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
                marginBottom: '64px'
              }}
            >
              <div
                style={{
                  fontSize: '16px',
                  color: '#9ca3af',
                  lineHeight: 1.8,
                  whiteSpace: 'pre-wrap',
                  wordWrap: 'break-word'
                }}
              >
                {extractText(attrs.content)}
              </div>
            </div>
          )}

          {/* Back to Home Button */}
          <div style={{ textAlign: 'center', marginTop: '64px' }}>
            <Link href="/homescreen" style={{ textDecoration: 'none' }}>
              <button
                style={{
                  background: 'linear-gradient(135deg, #00d4ff 0%, #7c3aed 100%)',
                  padding: '16px 32px',
                  borderRadius: '8px',
                  color: 'white',
                  fontWeight: '600',
                  fontSize: '16px',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
              >
                Back to Home
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          background: '#050508',
          borderTop: '1px solid rgba(255,255,255,0.05)',
          padding: '64px 24px 32px'
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '48px',
              marginBottom: '48px'
            }}
          >
            {footer && (
              <>
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'white', marginBottom: '16px' }}>
                    {footer.companyName || 'The Trinity AI Software Inc'}
                  </h3>
                  {footer.location && (
                    <p style={{ fontSize: '14px', color: '#9ca3af', lineHeight: 1.6 }}>
                      {footer.location}
                    </p>
                  )}
                </div>

                {footer?.links && Array.isArray(footer.links) && footer.links.length > 0 ? (
                  <div>
                    <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'white', marginBottom: '16px' }}>
                      Quick Links
                    </h3>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                      {footer.links.map((link: any, idx: number) => (
                        <li key={`link-${idx}`} style={{ marginBottom: '12px' }}>
                          <a
                            href={link.url || '#'}
                            style={{
                              fontSize: '14px',
                              color: '#9ca3af',
                              textDecoration: 'none',
                              transition: 'color 0.3s',
                              display: 'block'
                            }}
                            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#00d4ff')}
                            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = '#9ca3af')}
                          >
                            {link.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </>
            )}
          </div>

          <div style={{ textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '24px' }}>
            <p style={{ fontSize: '14px', color: '#6b7280' }}>
              {footer?.copyright || `© ${new Date().getFullYear()} The Trinity AI Software Inc. All rights reserved.`}
            </p>
          </div>
        </div>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ::selection { background: rgba(0,212,255,0.3); }
        :focus-visible { outline: 2px solid #00d4ff; outline-offset: 2px; }
      `}</style>
    </div>
  );
}