// 'use client';

// import { useState, useEffect } from 'react';
// import Link from 'next/link';

// const API_URL = process.env.NEXT_PUBLIC_API_URL;

// interface BlackThemePageProps {
//   pageTitle: string;
//   pageDescription?: string;
//   contentSections?: any[];
//   showContactForm?: boolean;
// }

// export default function BlackThemePage({ pageTitle, pageDescription, contentSections, showContactForm }: BlackThemePageProps) {
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [navigationItems, setNavigationItems] = useState<any[]>([]);
//   const [navSubItems, setNavSubItems] = useState<any[]>([]);
//   const [footer, setFooter] = useState<any>(null);
//   const [loading, setLoading] = useState(true);

//   // Fetch navigation and footer data
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Fetch Main Navigation
//         const mainNavRes = await fetch(`${API_URL}/navigations`);
//         const mainNavData = await mainNavRes.json();
//         const mainNavArray = Array.isArray(mainNavData.data) ? mainNavData.data : [];
//         setNavigationItems(mainNavArray);

//         // Fetch Navigation Sub-items
//         const navItemRes = await fetch(`${API_URL}/navigation-items`);
//         const navItemData = await navItemRes.json();
//         const navItemArray = Array.isArray(navItemData.data) ? navItemData.data : [];
//         setNavSubItems(navItemArray);

//         // Fetch Footer with links
//         const footRes = await fetch(`${API_URL}/footers?populate=links`);
//         const footData = await footRes.json();
//         const footArray = Array.isArray(footData.data) ? footData.data : [];
//         if (footArray.length > 0) {
//           setFooter(footArray[0]);
//         }
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   useEffect(() => {
//     const handleScroll = () => setIsScrolled(window.scrollY > 50);
//     window.addEventListener('scroll', handleScroll, { passive: true });
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const scrollTo = (id: string) => {
//     const element = document.getElementById(id);
//     if (element) {
//       element.scrollIntoView({ behavior: 'smooth' });
//     }
//   };

//   return (
//     <div
//       style={{
//         fontFamily: "'DM Sans', system-ui, sans-serif",
//         background: 'linear-gradient(135deg, #050508 0%, #0a0a0f 50%, #0f0f18 100%)',
//         color: '#e5e5e5',
//         minHeight: '100vh'
//       }}
//     >
//       {/* Navigation */}
//       <nav
//         style={{
//           position: 'fixed',
//           top: 0,
//           left: 0,
//           right: 0,
//           zIndex: 50,
//           padding: '0 24px',
//           background: isScrolled ? 'rgba(10, 10, 15, 0.9)' : 'transparent',
//           backdropFilter: isScrolled ? 'blur(20px)' : 'none',
//           borderBottom: isScrolled ? '1px solid rgba(255,255,255,0.05)' : 'none',
//           transition: 'all 0.3s ease'
//         }}
//       >
//         <div
//           style={{
//             maxWidth: '1280px',
//             margin: '0 auto',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'space-between',
//             height: '80px'
//           }}
//         >
//           {/* Logo */}
//           <Link href="/homescreen" style={{ textDecoration: 'none' }}>
//             <div
//               style={{
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: '12px',
//                 cursor: 'pointer'
//               }}
//             >
//               <div
//                 style={{
//                   width: '40px',
//                   height: '40px',
//                   background: 'linear-gradient(135deg, #00d4ff, #7c3aed)',
//                   borderRadius: '10px',
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   color: 'white',
//                   fontWeight: 'bold',
//                   fontSize: '18px'
//                 }}
//               >
//                 T
//               </div>
//               <div>
//                 <div style={{ fontWeight: 700, fontSize: '18px', color: 'white' }}>Trinity AI</div>
//                 <div
//                   style={{
//                     fontSize: '10px',
//                     color: '#00d4ff',
//                     letterSpacing: '0.2em',
//                     textTransform: 'uppercase'
//                   }}
//                 >
//                   Software
//                 </div>
//               </div>
//             </div>
//           </Link>

//           {/* Navigation Links with Dropdowns */}
//           <div style={{ display: 'flex', gap: '32px', position: 'relative' }}>
//             {navigationItems.length > 0 &&
//               navigationItems.map((navItem, idx) => {
//                 const children = navSubItems.filter((item) => item.parentMenu === navItem.label);

//                 return (
//                   <div key={idx} style={{ position: 'relative', display: 'inline-block' }}>
//                     <div
//                       style={{
//                         color: '#d1d5db',
//                         fontSize: '14px',
//                         fontWeight: 500,
//                         cursor: 'pointer',
//                         transition: 'color 0.3s',
//                         display: 'flex',
//                         alignItems: 'center',
//                         gap: '6px',
//                         padding: '8px 0'
//                       }}
//                       onMouseEnter={e => {
//                         (e.currentTarget as HTMLElement).style.color = 'white';
//                         const dropdown = (e.currentTarget as HTMLElement).nextElementSibling as HTMLElement;
//                         if (dropdown) {
//                           dropdown.style.display = 'block';
//                           dropdown.style.opacity = '1';
//                         }
//                       }}
//                       onMouseLeave={e => {
//                         (e.currentTarget as HTMLElement).style.color = '#d1d5db';
//                       }}
//                     >
//                       {navItem.label}
//                       {navItem.isDropdown && <span style={{ fontSize: '10px' }}>▼</span>}
//                     </div>

//                     {/* Dropdown Menu */}
//                     {navItem.isDropdown && children.length > 0 && (
//                       <div
//                         style={{
//                           position: 'absolute',
//                           top: '100%',
//                           left: 0,
//                           background: 'rgba(10, 10, 15, 0.95)',
//                           borderRadius: '8px',
//                           border: '1px solid rgba(255,255,255,0.1)',
//                           minWidth: '220px',
//                           marginTop: '8px',
//                           backdropFilter: 'blur(10px)',
//                           boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
//                           display: 'none',
//                           opacity: 0,
//                           transition: 'opacity 0.3s ease',
//                           zIndex: 100,
//                           padding: '4px 0'
//                         }}
//                         onMouseEnter={e => {
//                           (e.currentTarget as HTMLElement).style.display = 'block';
//                           (e.currentTarget as HTMLElement).style.opacity = '1';
//                         }}
//                         onMouseLeave={e => {
//                           (e.currentTarget as HTMLElement).style.display = 'none';
//                           (e.currentTarget as HTMLElement).style.opacity = '0';
//                         }}
//                       >
//                         {children.map((child, cIdx) => (
//                           <Link
//                             key={cIdx}
//                             href={child.url || '#'}
//                             style={{
//                               display: 'block',
//                               padding: '12px 20px',
//                               color: '#d1d5db',
//                               textDecoration: 'none',
//                               fontSize: '14px',
//                               transition: 'all 0.3s',
//                               borderRadius:
//                                 cIdx === 0
//                                   ? '8px 8px 0 0'
//                                   : cIdx === children.length - 1
//                                   ? '0 0 8px 8px'
//                                   : '0'
//                             }}
//                             onMouseEnter={e => {
//                               (e.currentTarget as HTMLElement).style.background = 'rgba(0,212,255,0.1)';
//                               (e.currentTarget as HTMLElement).style.color = '#00d4ff';
//                             }}
//                             onMouseLeave={e => {
//                               (e.currentTarget as HTMLElement).style.background = 'transparent';
//                               (e.currentTarget as HTMLElement).style.color = '#d1d5db';
//                             }}
//                           >
//                             {child.label}
//                           </Link>
//                         ))}
//                       </div>
//                     )}
//                   </div>
//                 );
//               })}
//           </div>

//           <Link href="/homescreen" style={{ textDecoration: 'none' }}>
//             <button
//               style={{
//                 background: 'linear-gradient(135deg, #00d4ff 0%, #7c3aed 100%)',
//                 padding: '14px 28px',
//                 borderRadius: '8px',
//                 color: 'white',
//                 fontWeight: '600',
//                 fontSize: '15px',
//                 border: 'none',
//                 cursor: 'pointer'
//               }}
//             >
//               Get Started
//             </button>
//           </Link>
//         </div>
//       </nav>

//       {/* Main Content */}
//       <section
//         id="content"
//         style={{
//           minHeight: '100vh',
//           paddingTop: '120px',
//           paddingBottom: '80px',
//           paddingLeft: '24px',
//           paddingRight: '24px'
//         }}
//       >
//         <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
//           <div style={{ textAlign: 'center', marginBottom: '64px' }}>
//             <h1
//               style={{
//                 fontSize: 'clamp(40px, 8vw, 72px)',
//                 fontWeight: 700,
//                 lineHeight: 1.1,
//                 marginBottom: '24px',
//                 background: 'linear-gradient(135deg, #00d4ff 0%, #7c3aed 50%, #06b6d4 100%)',
//                 WebkitBackgroundClip: 'text',
//                 WebkitTextFillColor: 'transparent'
//               }}
//             >
//               {pageTitle}
//             </h1>
//             {pageDescription && (
//               <p
//                 style={{
//                   fontSize: '20px',
//                   color: '#9ca3af',
//                   maxWidth: '700px',
//                   margin: '0 auto',
//                   lineHeight: 1.6
//                 }}
//               >
//                 {pageDescription}
//               </p>
//             )}
//           </div>

//           {/* Content Sections */}
//           {contentSections && contentSections.length > 0 && (
//             <div style={{ marginBottom: '80px' }}>
//               {contentSections.map((section, idx) => (
//                 <div
//                   key={idx}
//                   style={{
//                     background: 'rgba(18, 18, 26, 0.8)',
//                     borderRadius: '16px',
//                     padding: '48px',
//                     border: '1px solid rgba(255,255,255,0.05)',
//                     marginBottom: '32px'
//                   }}
//                 >
//                   {section.title && (
//                     <h2 style={{ fontSize: '32px', fontWeight: 700, color: 'white', marginBottom: '16px' }}>
//                       {section.title}
//                     </h2>
//                   )}
//                   {section.content && (
//                     <p style={{ fontSize: '16px', color: '#9ca3af', lineHeight: 1.8 }}>
//                       {section.content}
//                     </p>
//                   )}
//                 </div>
//               ))}
//             </div>
//           )}

//           {/* Back to Home Button */}
//           <div style={{ textAlign: 'center', marginTop: '64px' }}>
//             <Link href="/homescreen" style={{ textDecoration: 'none' }}>
//               <button
//                 style={{
//                   background: 'linear-gradient(135deg, #00d4ff 0%, #7c3aed 100%)',
//                   padding: '16px 32px',
//                   borderRadius: '8px',
//                   color: 'white',
//                   fontWeight: '600',
//                   fontSize: '16px',
//                   border: 'none',
//                   cursor: 'pointer',
//                   transition: 'all 0.3s'
//                 }}
//               >
//                 Back to Home
//               </button>
//             </Link>
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer
//         style={{
//           background: '#050508',
//           borderTop: '1px solid rgba(255,255,255,0.05)',
//           padding: '64px 24px 32px'
//         }}
//       >
//         <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
//           <div
//             style={{
//               display: 'grid',
//               gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
//               gap: '48px',
//               marginBottom: '48px'
//             }}
//           >
//             {footer && (
//               <>
//                 <div>
//                   <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'white', marginBottom: '16px' }}>
//                     {footer.companyName || 'The Trinity AI Software Inc'}
//                   </h3>
//                   {footer.location && (
//                     <p style={{ fontSize: '14px', color: '#9ca3af', lineHeight: 1.6 }}>
//                       {footer.location}
//                     </p>
//                   )}
//                 </div>

//                 {footer?.links && Array.isArray(footer.links) && footer.links.length > 0 ? (
//                   <div>
//                     <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'white', marginBottom: '16px' }}>
//                       Quick Links
//                     </h3>
//                     <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
//                       {footer.links.map((link: any, idx: number) => (
//                         <li key={`link-${idx}`} style={{ marginBottom: '12px' }}>
//                           <a
//                             href={link.url || '#'}
//                             style={{
//                               fontSize: '14px',
//                               color: '#9ca3af',
//                               textDecoration: 'none',
//                               transition: 'color 0.3s',
//                               display: 'block'
//                             }}
//                             onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#00d4ff')}
//                             onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = '#9ca3af')}
//                           >
//                             {link.label}
//                           </a>
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 ) : null}
//               </>
//             )}
//           </div>

//           <div style={{ textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '24px' }}>
//             <p style={{ fontSize: '14px', color: '#6b7280' }}>
//               {footer?.copyright || `© ${new Date().getFullYear()} The Trinity AI Software Inc. All rights reserved.`}
//             </p>
//           </div>
//         </div>
//       </footer>

//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');
//         * { box-sizing: border-box; margin: 0; padding: 0; }
//         html { scroll-behavior: smooth; }
//         ::selection { background: rgba(0,212,255,0.3); }
//         :focus-visible { outline: 2px solid #00d4ff; outline-offset: 2px; }
//       `}</style>
//     </div>
//   );
// }



'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface BlackThemePageProps {
  pageTitle: string;
  pageDescription?: string;
  contentSections?: any[];
  showContactForm?: boolean;
}

export default function BlackThemePage({ pageTitle, pageDescription, contentSections, showContactForm }: BlackThemePageProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [navigationItems, setNavigationItems] = useState<any[]>([]);
  const [navSubItems, setNavSubItems] = useState<any[]>([]);
  const [footer, setFooter] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Fetch navigation and footer data
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Main Navigation
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

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
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

                    {/* Dropdown Menu */}
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
                          <Link
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
                          </Link>
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
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          {/* For Contact Form Layout - Side by Side */}
          {showContactForm && contentSections && contentSections.length > 0 ? (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '48px',
                marginBottom: '80px'
              }}
            >
              {/* Left Side - Contact Info */}
              <div>
                <h1
                  style={{
                    fontSize: 'clamp(32px, 5vw, 48px)',
                    fontWeight: 700,
                    lineHeight: 1.1,
                    marginBottom: '32px',
                    color: 'white'
                  }}
                >
                  {pageTitle}
                </h1>
                {pageDescription && (
                  <p
                    style={{
                      fontSize: '16px',
                      color: '#9ca3af',
                      lineHeight: 1.8,
                      marginBottom: '32px'
                    }}
                  >
                    {pageDescription}
                  </p>
                )}
                {/* Contact Sections */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {contentSections.map((section, idx) => (
                    <div
                      key={idx}
                      style={{
                        background: 'rgba(18, 18, 26, 0.8)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '12px',
                        padding: '24px',
                        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
                        transition: 'all 0.3s ease',
                        cursor: 'pointer'
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
                      {section.title && (
                        <h3
                          style={{
                            fontSize: '16px',
                            fontWeight: 700,
                            color: 'white',
                            marginBottom: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                          }}
                        >
                          {section.icon && <span style={{ fontSize: '20px' }}>{section.icon}</span>}
                          {section.title}
                        </h3>
                      )}
                      {section.content && (
                        <p style={{ fontSize: '14px', color: '#9ca3af', lineHeight: 1.6 }}>
                          {section.content}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Side - Form */}
              <div>
                <h2
                  style={{
                    fontSize: 'clamp(32px, 5vw, 48px)',
                    fontWeight: 700,
                    lineHeight: 1.1,
                    marginBottom: '32px',
                    color: 'white'
                  }}
                >
                  {pageTitle === 'Get In Touch' ? 'Send us a Message' : 'Contact Form'}
                </h2>
                <form
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                    background: 'rgba(18, 18, 26, 0.8)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    padding: '32px',
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)'
                  }}
                >
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <input
                      type="text"
                      placeholder="First Name *"
                      style={{
                        padding: '16px',
                        background: 'rgba(18, 18, 26, 0.8)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '8px',
                        color: 'white',
                        fontSize: '14px'
                      }}
                      required
                    />
                    <input
                      type="text"
                      placeholder="Last Name *"
                      style={{
                        padding: '16px',
                        background: 'rgba(18, 18, 26, 0.8)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '8px',
                        color: 'white',
                        fontSize: '14px'
                      }}
                      required
                    />
                  </div>
                  <input
                    type="tel"
                    placeholder="Mobile Number *"
                    style={{
                      padding: '16px',
                      background: 'rgba(18, 18, 26, 0.8)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '8px',
                      color: 'white',
                      fontSize: '14px'
                    }}
                    required
                  />
                  <input
                    type="email"
                    placeholder="Corporate Email ID *"
                    style={{
                      padding: '16px',
                      background: 'rgba(18, 18, 26, 0.8)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '8px',
                      color: 'white',
                      fontSize: '14px'
                    }}
                    required
                  />
                  <select
                    style={{
                      padding: '16px',
                      background: 'rgba(18, 18, 26, 0.8)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '8px',
                      color: 'white',
                      fontSize: '14px'
                    }}
                    required
                  >
                    <option style={{ color: '#6b7280' }}>Purpose *</option>
                    <option style={{ color: 'black' }}>General Inquiry</option>
                    <option style={{ color: 'black' }}>Sales</option>
                    <option style={{ color: 'black' }}>Support</option>
                    <option style={{ color: 'black' }}>Partnership</option>
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
                      fontSize: '16px',
                      cursor: 'pointer',
                      transition: 'all 0.3s',
                      marginTop: '8px'
                    }}
                    onMouseEnter={e => ((e.currentTarget as HTMLElement).style.opacity = '0.9')}
                    onMouseLeave={e => ((e.currentTarget as HTMLElement).style.opacity = '1')}
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          ) : (
            // Normal centered layout for other pages
            <>
              <div style={{ textAlign: 'center', marginBottom: '64px' }}>
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
                  {pageTitle}
                </h1>
                {pageDescription && (
                  <p
                    style={{
                      fontSize: '20px',
                      color: '#9ca3af',
                      maxWidth: '700px',
                      margin: '0 auto',
                      lineHeight: 1.6
                    }}
                  >
                    {pageDescription}
                  </p>
                )}
              </div>

              {/* Content Sections */}
              {contentSections && contentSections.length > 0 && (
                <div style={{ marginBottom: '80px' }}>
                  {contentSections.map((section, idx) => (
                    <div
                      key={idx}
                      style={{
                        background: 'rgba(18, 18, 26, 0.8)',
                        borderRadius: '16px',
                        padding: '48px',
                        border: '1px solid rgba(255,255,255,0.05)',
                        marginBottom: '32px'
                      }}
                    >
                      {section.title && (
                        <h2 style={{ fontSize: '32px', fontWeight: 700, color: 'white', marginBottom: '16px' }}>
                          {section.title}
                        </h2>
                      )}
                      {section.content && (
                        <p style={{ fontSize: '16px', color: '#9ca3af', lineHeight: 1.8 }}>
                          {section.content}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </>
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