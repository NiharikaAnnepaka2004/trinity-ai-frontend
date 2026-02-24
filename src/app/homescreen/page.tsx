// 'use client';

// import { useState, useEffect, useCallback } from 'react';

// const API_URL = process.env.NEXT_PUBLIC_API_URL;

// const isValidEmail = (email: string): boolean => {
//   if (!email || typeof email !== 'string') return false;
//   const cleanEmail = email.trim().toLowerCase();
//   if (cleanEmail.length < 5 || cleanEmail.length > 254) return false;
//   const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
//   return emailRegex.test(cleanEmail);
// };

// const sanitizeInput = (input: string): string => {
//   if (!input || typeof input !== 'string') return '';
//   return input.replace(/[<>'"&]/g, (char) => {
//     const map: Record<string, string> = {
//       '<': '&lt;',
//       '>': '&gt;',
//       "'": '&#x27;',
//       '"': '&quot;',
//       '&': '&amp;'
//     };
//     return map[char] || char;
//   });
// };

// const extractTextFromRichText = (richText: any): string => {
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
//       .join(' ');
//   }
//   return '';
// };

// const rateLimitMap = new Map();
// const checkRateLimit = (key: string, maxAttempts = 3, windowMs = 60000) => {
//   const now = Date.now();
//   const record = rateLimitMap.get(key);
//   if (!record || now > record.resetTime) {
//     rateLimitMap.set(key, { count: 1, resetTime: now + windowMs });
//     return { allowed: true, remaining: maxAttempts - 1, resetInMs: 0 };
//   }
//   if (record.count >= maxAttempts) {
//     return { allowed: false, remaining: 0, resetInMs: record.resetTime - now };
//   }
//   record.count++;
//   return { allowed: true, remaining: maxAttempts - record.count, resetInMs: 0 };
// };

// export default function TrinityAIHomepage() {
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [formState, setFormState] = useState({
//     email: '',
//     isSubmitting: false,
//     isSubmitted: false,
//     error: null as string | null
//   });
//   const [hoveredCard, setHoveredCard] = useState<string | null>(null);
//   const [solutions, setSolutions] = useState<any[]>([]);
//   const [services, setServices] = useState<any[]>([]);
//   const [industries, setIndustries] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);

//   // Fetch data from Strapi with populate for images
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Fetch Solutions with images
//         const solRes = await fetch(`${API_URL}/solutions?populate=image`);
//         const solData = await solRes.json();
//         const solArray = Array.isArray(solData.data) ? solData.data : [];
//         setSolutions(solArray.slice(0, 4));

//         // Fetch Services with icons
//         const srvRes = await fetch(`${API_URL}/services?populate=icon`);
//         const srvData = await srvRes.json();
//         const srvArray = Array.isArray(srvData.data) ? srvData.data : [];
//         setServices(srvArray.slice(0, 4));

//         // Fetch Industries with images
//         const indRes = await fetch(`${API_URL}/industries?populate=image`);
//         const indData = await indRes.json();
//         const indArray = Array.isArray(indData.data) ? indData.data : [];
//         setIndustries(indArray);
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

//   const handleEmailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value.replace(/[<>'"]/g, '');
//     setFormState(prev => ({ ...prev, email: value, error: null }));
//   }, []);

//   const handleSubmit = useCallback((e: React.FormEvent) => {
//     e.preventDefault();

//     const rateLimit = checkRateLimit('contact', 3, 60000);
//     if (!rateLimit.allowed) {
//       setFormState(prev => ({
//         ...prev,
//         error: `Too many attempts. Try again in ${Math.ceil(rateLimit.resetInMs / 1000)}s`
//       }));
//       return;
//     }

//     if (!isValidEmail(formState.email)) {
//       setFormState(prev => ({ ...prev, error: 'Please enter a valid email address' }));
//       return;
//     }

//     setFormState(prev => ({ ...prev, isSubmitting: true }));

//     setTimeout(() => {
//       console.log('Submitted:', sanitizeInput(formState.email));
//       setFormState({ email: '', isSubmitting: false, isSubmitted: true, error: null });
//       setTimeout(() => setFormState(prev => ({ ...prev, isSubmitted: false })), 5000);
//     }, 1000);
//   }, [formState.email]);

//   const scrollTo = useCallback((id: string) => {
//     document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
//   }, []);

//   const stats = [
//     { value: '80%', label: 'Cost Reduction', sublabel: 'with Agentic AI' },
//     { value: '10×', label: 'Productivity Boost', sublabel: 'with Generative AI' },
//     { value: '60%', label: 'Faster Decisions', sublabel: 'with Generative BI' },
//     { value: '90%+', label: 'Accuracy', sublabel: 'with ML Models' }
//   ];

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
//           <div
//             style={{
//               display: 'flex',
//               alignItems: 'center',
//               gap: '12px',
//               textDecoration: 'none',
//               cursor: 'pointer'
//             }}
//             onClick={() => scrollTo('hero')}
//           >
//             <div
//               style={{
//                 width: '40px',
//                 height: '40px',
//                 background: 'linear-gradient(135deg, #00d4ff, #7c3aed)',
//                 borderRadius: '10px',
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 color: 'white',
//                 fontWeight: 'bold',
//                 fontSize: '18px'
//               }}
//             >
//               T
//             </div>
//             <div>
//               <div style={{ fontWeight: 700, fontSize: '18px', color: 'white' }}>Trinity AI</div>
//               <div
//                 style={{
//                   fontSize: '10px',
//                   color: '#00d4ff',
//                   letterSpacing: '0.2em',
//                   textTransform: 'uppercase'
//                 }}
//               >
//                 Software
//               </div>
//             </div>
//           </div>
//           <div style={{ display: 'flex', gap: '32px' }}>
//             {['Home', 'Solutions', 'Services', 'Industries', 'Contact'].map(name => (
//               <div
//                 key={name}
//                 style={{
//                   color: '#d1d5db',
//                   fontSize: '14px',
//                   fontWeight: 500,
//                   cursor: 'pointer',
//                   transition: 'color 0.3s'
//                 }}
//                 onClick={() => scrollTo(name.toLowerCase())}
//                 onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = 'white')}
//                 onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = '#d1d5db')}
//               >
//                 {name}
//               </div>
//             ))}
//           </div>
//           <button
//             style={{
//               background: 'linear-gradient(135deg, #00d4ff 0%, #7c3aed 100%)',
//               padding: '14px 28px',
//               borderRadius: '8px',
//               color: 'white',
//               fontWeight: '600',
//               fontSize: '15px',
//               border: 'none',
//               cursor: 'pointer'
//             }}
//             onClick={() => scrollTo('contact')}
//           >
//             Get Started
//           </button>
//         </div>
//       </nav>

//       {/* Hero Section */}
//       <section
//         id="hero"
//         style={{
//           position: 'relative',
//           minHeight: '100vh',
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//           padding: '120px 24px 80px',
//           overflow: 'hidden',
//           textAlign: 'center'
//         }}
//       >
//         <div
//           style={{
//             position: 'absolute',
//             width: '600px',
//             height: '600px',
//             background: 'radial-gradient(circle, rgba(0,212,255,0.15) 0%, transparent 70%)',
//             top: '-200px',
//             right: '-200px',
//             pointerEvents: 'none'
//           }}
//         />
//         <div style={{ position: 'relative', zIndex: 10, maxWidth: '1000px' }}>
//           <div
//             style={{
//               display: 'inline-flex',
//               alignItems: 'center',
//               gap: '8px',
//               padding: '8px 16px',
//               borderRadius: '50px',
//               background: 'rgba(255,255,255,0.05)',
//               border: '1px solid rgba(255,255,255,0.1)',
//               marginBottom: '32px'
//             }}
//           >
//             <span
//               style={{
//                 width: '8px',
//                 height: '8px',
//                 background: '#00d4ff',
//                 borderRadius: '50%',
//                 animation: 'pulse 2s infinite'
//               }}
//             />
//             <span style={{ fontSize: '14px', color: '#d1d5db' }}>
//               Pioneering Enterprise AI Solutions
//             </span>
//           </div>
//           <h1
//             style={{
//               fontSize: 'clamp(40px, 8vw, 72px)',
//               fontWeight: 700,
//               lineHeight: 1.1,
//               marginBottom: '24px'
//             }}
//           >
//             <span style={{ color: 'white' }}>Unlock </span>
//             <span
//               style={{
//                 background: 'linear-gradient(135deg, #00d4ff 0%, #7c3aed 50%, #06b6d4 100%)',
//                 WebkitBackgroundClip: 'text',
//                 WebkitTextFillColor: 'transparent'
//               }}
//             >
//               5×
//             </span>
//             <span style={{ color: 'white' }}> Enterprise Value</span>
//             <br />
//             <span style={{ fontSize: 'clamp(28px, 5vw, 48px)', color: '#9ca3af' }}>
//               Build Enduring Market Leadership
//             </span>
//           </h1>
//           <p
//             style={{
//               fontSize: '20px',
//               color: '#9ca3af',
//               maxWidth: '700px',
//               margin: '0 auto 40px',
//               lineHeight: 1.6
//             }}
//           >
//             Accelerate growth and optimize cost to build resilience, strengthen differentiation, and
//             secure lasting competitive advantage with AI.
//           </p>
//           <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginBottom: '64px', flexWrap: 'wrap' }}>
//             <button
//               style={{
//                 background: 'linear-gradient(135deg, #00d4ff 0%, #7c3aed 100%)',
//                 padding: '14px 28px',
//                 borderRadius: '8px',
//                 color: 'white',
//                 fontWeight: '600',
//                 border: 'none',
//                 cursor: 'pointer',
//                 transition: 'all 0.3s'
//               }}
//               onClick={() => scrollTo('solutions')}
//             >
//               Explore Solutions →
//             </button>
//             <button
//               style={{
//                 background: 'transparent',
//                 padding: '14px 28px',
//                 borderRadius: '8px',
//                 color: 'white',
//                 fontWeight: '600',
//                 border: '1px solid rgba(0, 212, 255, 0.5)',
//                 cursor: 'pointer',
//                 transition: 'all 0.3s'
//               }}
//               onClick={() => scrollTo('contact')}
//             >
//               Schedule Consultation
//             </button>
//           </div>
//           <div
//             style={{
//               display: 'grid',
//               gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
//               gap: '16px',
//               maxWidth: '800px',
//               margin: '0 auto'
//             }}
//           >
//             {stats.map((stat, i) => (
//               <div
//                 key={i}
//                 style={{
//                   background: 'rgba(255,255,255,0.03)',
//                   borderRadius: '16px',
//                   padding: '24px',
//                   border: '1px solid rgba(255,255,255,0.08)',
//                   position: 'relative',
//                   overflow: 'hidden'
//                 }}
//               >
//                 <div
//                   style={{
//                     position: 'absolute',
//                     top: 0,
//                     left: 0,
//                     right: 0,
//                     height: '2px',
//                     background: 'linear-gradient(90deg, transparent, #00d4ff, #7c3aed, transparent)'
//                   }}
//                 />
//                 <div
//                   style={{
//                     fontSize: '32px',
//                     fontWeight: 700,
//                     background: 'linear-gradient(135deg, #00d4ff, #7c3aed)',
//                     WebkitBackgroundClip: 'text',
//                     WebkitTextFillColor: 'transparent',
//                     marginBottom: '8px'
//                   }}
//                 >
//                   {stat.value}
//                 </div>
//                 <div style={{ fontSize: '14px', color: 'white', fontWeight: 500 }}>
//                   {stat.label}
//                 </div>
//                 <div style={{ fontSize: '12px', color: '#6b7280' }}>{stat.sublabel}</div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Solutions Section */}
//       <section
//         id="solutions"
//         style={{
//           position: 'relative',
//           padding: '100px 24px',
//           background: '#0a0a0f',
//           overflow: 'hidden'
//         }}
//       >
//         <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
//           <div style={{ textAlign: 'center', marginBottom: '64px' }}>
//             <span
//               style={{
//                 display: 'inline-block',
//                 padding: '6px 16px',
//                 borderRadius: '50px',
//                 fontSize: '14px',
//                 fontWeight: 500,
//                 marginBottom: '24px',
//                 background: 'rgba(0,212,255,0.1)',
//                 border: '1px solid rgba(0,212,255,0.3)',
//                 color: '#00d4ff'
//               }}
//             >
//               Our Solutions
//             </span>
//             <h2
//               style={{
//                 fontSize: 'clamp(32px, 5vw, 48px)',
//                 fontWeight: 700,
//                 color: 'white',
//                 marginBottom: '16px'
//               }}
//             >
//               Comprehensive AI Capabilities
//             </h2>
//           </div>
//           {loading ? (
//             <p style={{ textAlign: 'center', color: '#9ca3af' }}>Loading solutions...</p>
//           ) : (
//             <div
//               style={{
//                 display: 'grid',
//                 gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
//                 gap: '24px'
//               }}
//             >
//               {solutions.map((sol, i) => {
//                 const attrs = sol.attributes || sol;
//                 const description = extractTextFromRichText(attrs.description);
                
//                 // Fixed: Handle image as array (from Strapi)
//                 const imageUrl = attrs.image && Array.isArray(attrs.image) && attrs.image[0]?.url
//                   ? `http://localhost:1337${attrs.image[0].url}`
//                   : attrs.image?.data?.attributes?.url
//                   ? `http://localhost:1337${attrs.image.data.attributes.url}`
//                   : null;
                
//                 return (
//                   <div
//                     key={i}
//                     style={{
//                       background: 'rgba(18, 18, 26, 0.8)',
//                       borderRadius: '16px',
//                       padding: '32px',
//                       border: '1px solid rgba(255,255,255,0.05)',
//                       transition: 'all 0.4s ease',
//                       cursor: 'pointer',
//                       transform: hoveredCard === `sol-${i}` ? 'translateY(-8px)' : 'translateY(0)',
//                       boxShadow:
//                         hoveredCard === `sol-${i}`
//                           ? '0 20px 40px rgba(0,212,255,0.1)'
//                           : 'none',
//                       borderColor:
//                         hoveredCard === `sol-${i}` ? 'rgba(0,212,255,0.3)' : 'rgba(255,255,255,0.05)'
//                     }}
//                     onMouseEnter={() => setHoveredCard(`sol-${i}`)}
//                     onMouseLeave={() => setHoveredCard(null)}
//                   >
//                     {imageUrl ? (
//                       <img
//                         src={imageUrl}
//                         alt={attrs.title}
//                         style={{
//                           width: '100%',
//                           height: '160px',
//                           objectFit: 'cover',
//                           borderRadius: '8px',
//                           marginBottom: '20px'
//                         }}
//                       />
//                     ) : (
//                       <div style={{ fontSize: '40px', marginBottom: '20px' }}>✨</div>
//                     )}
//                     <h3 style={{ fontSize: '20px', fontWeight: 700, color: 'white', marginBottom: '12px' }}>
//                       {attrs.title}
//                     </h3>
//                     <p style={{ fontSize: '15px', color: '#9ca3af', lineHeight: 1.6 }}>
//                       {description}
//                     </p>
//                   </div>
//                 );
//               })}
//             </div>
//           )}
//         </div>
//       </section>

//       {/* Services Section */}
//       <section
//         id="services"
//         style={{
//           position: 'relative',
//           padding: '100px 24px',
//           overflow: 'hidden'
//         }}
//       >
//         <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
//           <div style={{ textAlign: 'center', marginBottom: '64px' }}>
//             <span
//               style={{
//                 display: 'inline-block',
//                 padding: '6px 16px',
//                 borderRadius: '50px',
//                 fontSize: '14px',
//                 fontWeight: 500,
//                 marginBottom: '24px',
//                 background: 'rgba(251,191,36,0.1)',
//                 border: '1px solid rgba(251,191,36,0.3)',
//                 color: '#fbbf24'
//               }}
//             >
//               Our Services
//             </span>
//             <h2
//               style={{
//                 fontSize: 'clamp(32px, 5vw, 48px)',
//                 fontWeight: 700,
//                 color: 'white',
//                 marginBottom: '16px'
//               }}
//             >
//               Expert AI Services & Advisory
//             </h2>
//           </div>
//           {loading ? (
//             <p style={{ textAlign: 'center', color: '#9ca3af' }}>Loading services...</p>
//           ) : (
//             <div
//               style={{
//                 display: 'grid',
//                 gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
//                 gap: '24px'
//               }}
//             >
//               {services.map((srv, i) => {
//                 const attrs = srv.attributes || srv;
//                 const description = extractTextFromRichText(attrs.description);
                
//                 // Handle icon - it's an object directly from Strapi
//                 const iconUrl = attrs.icon?.url
//                   ? `http://localhost:1337${attrs.icon.url}`
//                   : null;
                
//                 return (
//                   <div
//                     key={i}
//                     style={{
//                       background: 'rgba(18, 18, 26, 0.8)',
//                       borderRadius: '16px',
//                       padding: '32px',
//                       border: '1px solid rgba(255,255,255,0.05)',
//                       transition: 'all 0.4s ease',
//                       cursor: 'pointer',
//                       transform: hoveredCard === `srv-${i}` ? 'translateY(-8px)' : 'translateY(0)',
//                       borderColor:
//                         hoveredCard === `srv-${i}` ? 'rgba(251,191,36,0.3)' : 'rgba(255,255,255,0.05)'
//                     }}
//                     onMouseEnter={() => setHoveredCard(`srv-${i}`)}
//                     onMouseLeave={() => setHoveredCard(null)}
//                   >
//                     {iconUrl ? (
//                       <img
//                         src={iconUrl}
//                         alt={attrs.title}
//                         style={{
//                           width: '100%',
//                           height: '160px',
//                           objectFit: 'cover',
//                           borderRadius: '8px',
//                           marginBottom: '20px'
//                         }}
//                       />
//                     ) : (
//                       <div style={{ fontSize: '40px', marginBottom: '20px' }}>🧭</div>
//                     )}
//                     <h3 style={{ fontSize: '20px', fontWeight: 700, color: 'white', marginBottom: '12px' }}>
//                       {attrs.title}
//                     </h3>
//                     <p style={{ fontSize: '15px', color: '#9ca3af', lineHeight: 1.6 }}>
//                       {description}
//                     </p>
//                   </div>
//                 );
//               })}
//             </div>
//           )}
//         </div>
//       </section>

//       {/* Industries Section */}
//       <section
//         id="industries"
//         style={{
//           position: 'relative',
//           padding: '100px 24px',
//           background: '#0a0a0f',
//           overflow: 'hidden'
//         }}
//       >
//         <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
//           <div style={{ textAlign: 'center', marginBottom: '64px' }}>
//             <span
//               style={{
//                 display: 'inline-block',
//                 padding: '6px 16px',
//                 borderRadius: '50px',
//                 fontSize: '14px',
//                 fontWeight: 500,
//                 marginBottom: '24px',
//                 background: 'rgba(0,212,255,0.1)',
//                 border: '1px solid rgba(0,212,255,0.3)',
//                 color: '#00d4ff'
//               }}
//             >
//               Industries
//             </span>
//             <h2
//               style={{
//                 fontSize: 'clamp(32px, 5vw, 48px)',
//                 fontWeight: 700,
//                 color: 'white',
//                 marginBottom: '16px'
//               }}
//             >
//               Industries We Transform
//             </h2>
//           </div>
//           {loading ? (
//             <p style={{ textAlign: 'center', color: '#9ca3af' }}>Loading industries...</p>
//           ) : (
//             <div
//               style={{
//                 display: 'grid',
//                 gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
//                 gap: '24px'
//               }}
//             >
//               {industries.map((ind, i) => {
//                 const attrs = ind.attributes || ind;
                
//                 // Handle image - it's an object directly from Strapi
//                 const imageUrl = attrs.image?.url
//                   ? `http://localhost:1337${attrs.image.url}`
//                   : null;
                
//                 return (
//                   <div
//                     key={i}
//                     style={{
//                       background: 'rgba(18, 18, 26, 0.8)',
//                       borderRadius: '16px',
//                       overflow: 'hidden',
//                       border: '1px solid rgba(255,255,255,0.05)',
//                       transition: 'all 0.4s ease',
//                       cursor: 'pointer',
//                       transform: hoveredCard === `ind-${i}` ? 'translateY(-8px)' : 'translateY(0)',
//                       borderColor:
//                         hoveredCard === `ind-${i}` ? 'rgba(0,212,255,0.2)' : 'rgba(255,255,255,0.05)'
//                     }}
//                     onMouseEnter={() => setHoveredCard(`ind-${i}`)}
//                     onMouseLeave={() => setHoveredCard(null)}
//                   >
//                     {imageUrl ? (
//                       <>
//                         <img
//                           src={imageUrl}
//                           alt={attrs.name}
//                           style={{
//                             width: '100%',
//                             height: '200px',
//                             objectFit: 'cover'
//                           }}
//                         />
//                         <div style={{ padding: '32px' }}>
//                           <h3 style={{ fontSize: '20px', fontWeight: 700, color: 'white', marginBottom: '12px' }}>
//                             {attrs.name}
//                           </h3>
//                           <p style={{ fontSize: '14px', color: '#9ca3af' }}>
//                             {extractTextFromRichText(attrs.description)}
//                           </p>
//                         </div>
//                       </>
//                     ) : (
//                       <div style={{ padding: '32px' }}>
//                         <h3 style={{ fontSize: '20px', fontWeight: 700, color: 'white', marginBottom: '12px' }}>
//                           {attrs.name}
//                         </h3>
//                         <p style={{ fontSize: '14px', color: '#9ca3af' }}>
//                           Industry-specific AI solutions
//                         </p>
//                       </div>
//                     )}
//                   </div>
//                 );
//               })}
//             </div>
//           )}
//         </div>
//       </section>

//       {/* Contact Section */}
//       <section
//         id="contact"
//         style={{
//           position: 'relative',
//           padding: '100px 24px',
//           overflow: 'hidden'
//         }}
//       >
//         <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
//           <span
//             style={{
//               display: 'inline-block',
//               padding: '6px 16px',
//               borderRadius: '50px',
//               fontSize: '14px',
//               fontWeight: 500,
//               marginBottom: '24px',
//               background: 'rgba(0,212,255,0.1)',
//               border: '1px solid rgba(0,212,255,0.3)',
//               color: '#00d4ff'
//             }}
//           >
//             Get Started
//           </span>
//           <h2
//             style={{
//               fontSize: 'clamp(32px, 5vw, 48px)',
//               fontWeight: 700,
//               color: 'white',
//               marginBottom: '24px'
//             }}
//           >
//             Ready to Transform Your Enterprise?
//           </h2>
//           <p style={{ fontSize: '18px', color: '#9ca3af', marginBottom: '40px' }}>
//             Share your email and our AI experts will reach out to discuss your AI journey.
//           </p>
//           <form style={{ maxWidth: '500px', margin: '0 auto' }} onSubmit={handleSubmit}>
//             <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
//               <input
//                 type="email"
//                 value={formState.email}
//                 onChange={handleEmailChange}
//                 placeholder="Enter your email address"
//                 style={{
//                   flex: 1,
//                   minWidth: '250px',
//                   padding: '16px 24px',
//                   background: 'rgba(18, 18, 26, 0.8)',
//                   border: formState.error ? '1px solid #ef4444' : '1px solid rgba(255,255,255,0.1)',
//                   borderRadius: '12px',
//                   color: 'white',
//                   fontSize: '16px',
//                   outline: 'none',
//                   transition: 'border-color 0.3s'
//                 }}
//                 required
//                 disabled={formState.isSubmitting}
//               />
//               <button
//                 type="submit"
//                 style={{
//                   background: 'linear-gradient(135deg, #00d4ff 0%, #7c3aed 100%)',
//                   padding: '16px 28px',
//                   borderRadius: '12px',
//                   color: 'white',
//                   fontWeight: '600',
//                   border: 'none',
//                   cursor: 'pointer',
//                   opacity: formState.isSubmitting ? 0.7 : 1,
//                   transition: 'all 0.3s'
//                 }}
//                 disabled={formState.isSubmitting || !formState.email}
//               >
//                 {formState.isSubmitting ? 'Sending...' : formState.isSubmitted ? '✓ Sent!' : 'Get in Touch'}
//               </button>
//             </div>
//             {formState.error && (
//               <p style={{ color: '#ef4444', fontSize: '14px', marginTop: '8px', textAlign: 'left' }}>
//                 {formState.error}
//               </p>
//             )}
//             {formState.isSubmitted && (
//               <p style={{ color: '#10b981', fontSize: '14px', marginTop: '8px' }}>
//                 Thank you! We'll be in touch soon.
//               </p>
//             )}
//           </form>
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
//         <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
//           <p style={{ fontSize: '14px', color: '#6b7280' }}>
//             © {new Date().getFullYear()} The Trinity AI Software Inc. All rights reserved.
//           </p>
//         </div>
//       </footer>

//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');
//         @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
//         * { box-sizing: border-box; margin: 0; padding: 0; }
//         html { scroll-behavior: smooth; }
//         ::selection { background: rgba(0,212,255,0.3); }
//         :focus-visible { outline: 2px solid #00d4ff; outline-offset: 2px; }
//       `}</style>
//     </div>
//   );
// }

// 'use client';

// import { useState, useEffect, useCallback } from 'react';
// import Link from 'next/link';

// const API_URL = process.env.NEXT_PUBLIC_API_URL;

// // Helper to build Navigation with dropdowns from Strapi data
// const buildNavWithDropdowns = (mainNav: any[], allNavItems: any[]) => {
//   return mainNav.map((item) => {
//     const navObj: any = {
//       label: item.label,
//       url: item.url,
//       children: []
//     };

//     // If this nav has dropdown, find matching children from navigation-items
//     if (item.isDropdown) {
//       const children = allNavItems.filter((child) => child.parentMenu === item.label);
//       navObj.children = children.map((child) => ({
//         label: child.label,
//         url: child.url
//       }));
//     }

//     return navObj;
//   });
// };

// const isValidEmail = (email: string): boolean => {
//   if (!email || typeof email !== 'string') return false;
//   const cleanEmail = email.trim().toLowerCase();
//   if (cleanEmail.length < 5 || cleanEmail.length > 254) return false;
//   const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
//   return emailRegex.test(cleanEmail);
// };

// const sanitizeInput = (input: string): string => {
//   if (!input || typeof input !== 'string') return '';
//   return input.replace(/[<>'"&]/g, (char) => {
//     const map: Record<string, string> = {
//       '<': '&lt;',
//       '>': '&gt;',
//       "'": '&#x27;',
//       '"': '&quot;',
//       '&': '&amp;'
//     };
//     return map[char] || char;
//   });
// };

// const extractTextFromRichText = (richText: any): string => {
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
//       .join(' ');
//   }
//   return '';
// };

// const rateLimitMap = new Map();
// const checkRateLimit = (key: string, maxAttempts = 3, windowMs = 60000) => {
//   const now = Date.now();
//   const record = rateLimitMap.get(key);
//   if (!record || now > record.resetTime) {
//     rateLimitMap.set(key, { count: 1, resetTime: now + windowMs });
//     return { allowed: true, remaining: maxAttempts - 1, resetInMs: 0 };
//   }
//   if (record.count >= maxAttempts) {
//     return { allowed: false, remaining: 0, resetInMs: record.resetTime - now };
//   }
//   record.count++;
//   return { allowed: true, remaining: maxAttempts - record.count, resetInMs: 0 };
// };

// export default function TrinityAIHomepage() {
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [formState, setFormState] = useState({
//     email: '',
//     isSubmitting: false,
//     isSubmitted: false,
//     error: null as string | null
//   });
//   const [hoveredCard, setHoveredCard] = useState<string | null>(null);
//   const [solutions, setSolutions] = useState<any[]>([]);
//   const [services, setServices] = useState<any[]>([]);
//   const [industries, setIndustries] = useState<any[]>([]);
//   const [mission, setMission] = useState<any>(null);
//   const [partnerships, setPartnerships] = useState<any[]>([]);
//   const [footer, setFooter] = useState<any>(null);
//   const [branding, setBranding] = useState<any>(null); // NEW: Logo and branding
//   const [navigationItems, setNavigationItems] = useState<any[]>([]); // Main nav
//   const [navSubItems, setNavSubItems] = useState<any[]>([]); // Sub-menu items
//   const [loading, setLoading] = useState(true);

//   // Fetch all data from Strapi
//   useEffect(() => {
//     const fetchAllData = async () => {
//       try {
//         // Fetch Solutions with images
//         const solRes = await fetch(`${API_URL}/solutions?populate=image`);
//         const solData = await solRes.json();
//         const solArray = Array.isArray(solData.data) ? solData.data : [];
//         setSolutions(solArray.slice(0, 4));

//         // Fetch Services with icons
//         const srvRes = await fetch(`${API_URL}/services?populate=icon`);
//         const srvData = await srvRes.json();
//         const srvArray = Array.isArray(srvData.data) ? srvData.data : [];
//         setServices(srvArray.slice(0, 4));

//         // Fetch Industries with images
//         const indRes = await fetch(`${API_URL}/industries?populate=image`);
//         const indData = await indRes.json();
//         const indArray = Array.isArray(indData.data) ? indData.data : [];
//         setIndustries(indArray);

//         // Fetch Mission (assuming single entry) - uses 'content' field, not 'description'
//         const misRes = await fetch(`${API_URL}/missions`);
//         const misData = await misRes.json();
//         const misArray = Array.isArray(misData.data) ? misData.data : [];
//         if (misArray.length > 0) {
//           setMission(misArray[0]);
//         }

//         // Fetch Partnerships with logos
//         const partRes = await fetch(`${API_URL}/partnerships?populate=logo`);
//         const partData = await partRes.json();
//         const partArray = Array.isArray(partData.data) ? partData.data : [];
//         setPartnerships(partArray);

//         // Fetch Footer data with links populated - URL is /footers (plural)
//         const footRes = await fetch(`${API_URL}/footers?populate=links`);
//         const footData = await footRes.json();
//         const footArray = Array.isArray(footData.data) ? footData.data : [];
//         if (footArray.length > 0) {
//           console.log('Footer data:', footArray[0]);
//           console.log('Footer links:', footArray[0].links);
//           setFooter(footArray[0]);
//         }

//         // Fetch Main Navigation - URL is /navigations (plural)
//         const mainNavRes = await fetch(`${API_URL}/navigations`);
//         const mainNavData = await mainNavRes.json();
//         const mainNavArray = Array.isArray(mainNavData.data) ? mainNavData.data : [];
//         setNavigationItems(mainNavArray);
//         console.log('Main nav:', mainNavArray);

//         // Fetch Navigation Items (children/sub-items)
//         const navItemRes = await fetch(`${API_URL}/navigation-items`);
//         const navItemData = await navItemRes.json();
//         const navItemArray = Array.isArray(navItemData.data) ? navItemData.data : [];
//         setNavSubItems(navItemArray);
//         console.log('Nav sub-items:', navItemArray);

//         // FETCH BRANDING/SETTINGS (NEW) - Correct endpoint for your Strapi setup
//         const brandRes = await fetch(`${API_URL}/branding?populate=*`);
//         const brandData = await brandRes.json();
//         if (brandData.data) {
//           // Handle both Single Type and Collection Type responses
//           const brandingData = Array.isArray(brandData.data) ? brandData.data[0] : brandData.data;
//           const attrs = brandingData?.attributes || brandingData;
//           setBranding(attrs);
//           console.log('Branding data:', brandingData);
//           console.log('Logo:', attrs?.logo);
//         }

//       } catch (error) {
//         console.error('Error fetching data:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAllData();
//   }, []);

//   useEffect(() => {
//     const handleScroll = () => setIsScrolled(window.scrollY > 50);
//     window.addEventListener('scroll', handleScroll, { passive: true });
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const handleEmailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value.replace(/[<>'"]/g, '');
//     setFormState(prev => ({ ...prev, email: value, error: null }));
//   }, []);

//   const handleSubmit = useCallback((e: React.FormEvent) => {
//     e.preventDefault();

//     const rateLimit = checkRateLimit('contact', 3, 60000);
//     if (!rateLimit.allowed) {
//       setFormState(prev => ({
//         ...prev,
//         error: `Too many attempts. Try again in ${Math.ceil(rateLimit.resetInMs / 1000)}s`
//       }));
//       return;
//     }

//     if (!isValidEmail(formState.email)) {
//       setFormState(prev => ({ ...prev, error: 'Please enter a valid email address' }));
//       return;
//     }

//     setFormState(prev => ({ ...prev, isSubmitting: true }));

//     setTimeout(() => {
//       console.log('Submitted:', sanitizeInput(formState.email));
//       setFormState({ email: '', isSubmitting: false, isSubmitted: true, error: null });
//       setTimeout(() => setFormState(prev => ({ ...prev, isSubmitted: false })), 5000);
//     }, 1000);
//   }, [formState.email]);

//   const scrollTo = useCallback((id: string) => {
//     const element = document.getElementById(id);
//     if (element) {
//       element.scrollIntoView({ behavior: 'smooth' });
//     }
//   }, []);

//   const stats = [
//     { value: '80%', label: 'Cost Reduction', sublabel: 'with Agentic AI' },
//     { value: '10×', label: 'Productivity Boost', sublabel: 'with Generative AI' },
//     { value: '60%', label: 'Faster Decisions', sublabel: 'with Generative BI' },
//     { value: '90%+', label: 'Accuracy', sublabel: 'with ML Models' }
//   ];



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
//           <div
//             style={{
//               display: 'flex',
//               alignItems: 'center',
//               gap: '12px',
//               textDecoration: 'none',
//               cursor: 'pointer'
//             }}
//             onClick={() => scrollTo('hero')}
//           >
//             {/* Logo Image from Strapi */}
//             {(() => {
//               let logoUrl = null;
              
//               // Handle different Strapi response formats
//               if (branding?.logo?.url) {
//                 logoUrl = branding.logo.url;
//               } else if (branding?.logo?.data?.attributes?.url) {
//                 logoUrl = branding.logo.data.attributes.url;
//               } else if (Array.isArray(branding?.logo) && branding.logo[0]?.url) {
//                 logoUrl = branding.logo[0].url;
//               } else if (Array.isArray(branding?.logo) && branding.logo[0]?.attributes?.url) {
//                 logoUrl = branding.logo[0].attributes.url;
//               }

//               if (logoUrl) {
//                 const fullUrl = logoUrl.startsWith('http') 
//                   ? logoUrl 
//                   : `http://localhost:1337${logoUrl}`;
                
//                 return (
//                   <img
//                     src={fullUrl}
//                     alt={branding?.companyName || 'Logo'}
//                     style={{
//                       height: '50px',
//                       width: 'auto',
//                       objectFit: 'contain'
//                     }}
//                     onError={(e) => {
//                       console.error('Logo image failed to load:', fullUrl);
//                       (e.currentTarget as HTMLImageElement).style.display = 'none';
//                     }}
//                   />
//                 );
//               }

//               // Fallback to gradient logo
//               return (
//                 <div
//                   style={{
//                     width: '40px',
//                     height: '40px',
//                     background: 'linear-gradient(135deg, #00d4ff, #7c3aed)',
//                     borderRadius: '10px',
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     color: 'white',
//                     fontWeight: 'bold',
//                     fontSize: '18px'
//                   }}
//                 >
//                   T
//                 </div>
//               );
//             })()}
            
//             <div>
//               <div style={{ fontWeight: 700, fontSize: '18px', color: 'white' }}>
//                 {branding?.companyName || 'Trinity AI'}
//               </div>
//               <div
//                 style={{
//                   fontSize: '10px',
//                   color: '#00d4ff',
//                   letterSpacing: '0.2em',
//                   textTransform: 'uppercase'
//                 }}
//               >
//                 Software
//               </div>
//             </div>
//           </div>

//           {/* Navigation Links with Dropdowns */}
//           <div style={{ display: 'flex', gap: '32px', position: 'relative' }}>
//             {navigationItems.length > 0 &&
//               navigationItems.map((navItem, idx) => {
//                 // Get children for this nav item from navSubItems
//                 const children = navSubItems.filter((item) => item.parentMenu === navItem.label);

//                 return (
//                   <div key={idx} style={{ position: 'relative', display: 'inline-block' }}>
//                     {/* Main Nav Item */}
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
//                         // Show dropdown on parent hover
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

//           <button
//             style={{
//               background: 'linear-gradient(135deg, #00d4ff 0%, #7c3aed 100%)',
//               padding: '14px 28px',
//               borderRadius: '8px',
//               color: 'white',
//               fontWeight: '600',
//               fontSize: '15px',
//               border: 'none',
//               cursor: 'pointer'
//             }}
//             onClick={() => scrollTo('contact')}
//           >
//             Get Started
//           </button>
//         </div>
//       </nav>

//       {/* Hero Section */}
//       <section
//         id="hero"
//         style={{
//           position: 'relative',
//           minHeight: '100vh',
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//           padding: '120px 24px 80px',
//           overflow: 'hidden',
//           textAlign: 'center'
//         }}
//       >
//         <div
//           style={{
//             position: 'absolute',
//             width: '600px',
//             height: '600px',
//             background: 'radial-gradient(circle, rgba(0,212,255,0.15) 0%, transparent 70%)',
//             top: '-200px',
//             right: '-200px',
//             pointerEvents: 'none'
//           }}
//         />
//         <div style={{ position: 'relative', zIndex: 10, maxWidth: '1000px' }}>
//           <div
//             style={{
//               display: 'inline-flex',
//               alignItems: 'center',
//               gap: '8px',
//               padding: '8px 16px',
//               borderRadius: '50px',
//               background: 'rgba(255,255,255,0.05)',
//               border: '1px solid rgba(255,255,255,0.1)',
//               marginBottom: '32px'
//             }}
//           >
//             <span
//               style={{
//                 width: '8px',
//                 height: '8px',
//                 background: '#00d4ff',
//                 borderRadius: '50%',
//                 animation: 'pulse 2s infinite'
//               }}
//             />
//             <span style={{ fontSize: '14px', color: '#d1d5db' }}>
//               Pioneering Enterprise AI Solutions
//             </span>
//           </div>
//           <h1
//             style={{
//               fontSize: 'clamp(40px, 8vw, 72px)',
//               fontWeight: 700,
//               lineHeight: 1.1,
//               marginBottom: '24px'
//             }}
//           >
//             <span style={{ color: 'white' }}>Unlock </span>
//             <span
//               style={{
//                 background: 'linear-gradient(135deg, #00d4ff 0%, #7c3aed 50%, #06b6d4 100%)',
//                 WebkitBackgroundClip: 'text',
//                 WebkitTextFillColor: 'transparent'
//               }}
//             >
//               5×
//             </span>
//             <span style={{ color: 'white' }}> Enterprise Value</span>
//             <br />
//             <span style={{ fontSize: 'clamp(28px, 5vw, 48px)', color: '#9ca3af' }}>
//               Build Enduring Market Leadership
//             </span>
//           </h1>
//           <p
//             style={{
//               fontSize: '20px',
//               color: '#9ca3af',
//               maxWidth: '700px',
//               margin: '0 auto 40px',
//               lineHeight: 1.6
//             }}
//           >
//             Accelerate growth and optimize cost to build resilience, strengthen differentiation, and
//             secure lasting competitive advantage with AI.
//           </p>
//           <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginBottom: '64px', flexWrap: 'wrap' }}>
//             <button
//               style={{
//                 background: 'linear-gradient(135deg, #00d4ff 0%, #7c3aed 100%)',
//                 padding: '14px 28px',
//                 borderRadius: '8px',
//                 color: 'white',
//                 fontWeight: '600',
//                 border: 'none',
//                 cursor: 'pointer',
//                 transition: 'all 0.3s'
//               }}
//               onClick={() => scrollTo('solutions')}
//             >
//               Explore Solutions →
//             </button>
//             <button
//               style={{
//                 background: 'transparent',
//                 padding: '14px 28px',
//                 borderRadius: '8px',
//                 color: 'white',
//                 fontWeight: '600',
//                 border: '1px solid rgba(0, 212, 255, 0.5)',
//                 cursor: 'pointer',
//                 transition: 'all 0.3s'
//               }}
//               onClick={() => scrollTo('contact')}
//             >
//               Schedule Consultation
//             </button>
//           </div>
//           <div
//             style={{
//               display: 'grid',
//               gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
//               gap: '16px',
//               maxWidth: '800px',
//               margin: '0 auto'
//             }}
//           >
//             {stats.map((stat, i) => (
//               <div
//                 key={i}
//                 style={{
//                   background: 'rgba(255,255,255,0.03)',
//                   borderRadius: '16px',
//                   padding: '24px',
//                   border: '1px solid rgba(255,255,255,0.08)',
//                   position: 'relative',
//                   overflow: 'hidden'
//                 }}
//               >
//                 <div
//                   style={{
//                     position: 'absolute',
//                     top: 0,
//                     left: 0,
//                     right: 0,
//                     height: '2px',
//                     background: 'linear-gradient(90deg, transparent, #00d4ff, #7c3aed, transparent)'
//                   }}
//                 />
//                 <div
//                   style={{
//                     fontSize: '32px',
//                     fontWeight: 700,
//                     background: 'linear-gradient(135deg, #00d4ff, #7c3aed)',
//                     WebkitBackgroundClip: 'text',
//                     WebkitTextFillColor: 'transparent',
//                     marginBottom: '8px'
//                   }}
//                 >
//                   {stat.value}
//                 </div>
//                 <div style={{ fontSize: '14px', color: 'white', fontWeight: 500 }}>
//                   {stat.label}
//                 </div>
//                 <div style={{ fontSize: '12px', color: '#6b7280' }}>{stat.sublabel}</div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Mission Section - Fetched from Strapi */}
//       {mission && (
//         <section
//           id="mission"
//           style={{
//             position: 'relative',
//             padding: '100px 24px',
//             textAlign: 'center'
//           }}
//         >
//           <div style={{ maxWidth: '900px', margin: '0 auto' }}>
//             <h2
//               style={{
//                 fontSize: 'clamp(32px, 5vw, 48px)',
//                 fontWeight: 700,
//                 color: 'white',
//                 marginBottom: '32px'
//               }}
//             >
//               {mission.title || 'Our Mission'}
//             </h2>
//             <p
//               style={{
//                 fontSize: '18px',
//                 color: '#9ca3af',
//                 lineHeight: 1.8,
//                 maxWidth: '750px',
//                 margin: '0 auto'
//               }}
//             >
//               {extractTextFromRichText(mission.content)}
//             </p>
//           </div>
//         </section>
//       )}

//       {/* Solutions Section */}
//       <section
//         id="solutions"
//         style={{
//           position: 'relative',
//           padding: '100px 24px',
//           background: '#0a0a0f',
//           overflow: 'hidden'
//         }}
//       >
//         <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
//           <div style={{ textAlign: 'center', marginBottom: '64px' }}>
//             <span
//               style={{
//                 display: 'inline-block',
//                 padding: '6px 16px',
//                 borderRadius: '50px',
//                 fontSize: '14px',
//                 fontWeight: 500,
//                 marginBottom: '24px',
//                 background: 'rgba(0,212,255,0.1)',
//                 border: '1px solid rgba(0,212,255,0.3)',
//                 color: '#00d4ff'
//               }}
//             >
//               Our Solutions
//             </span>
//             <h2
//               style={{
//                 fontSize: 'clamp(32px, 5vw, 48px)',
//                 fontWeight: 700,
//                 color: 'white',
//                 marginBottom: '16px'
//               }}
//             >
//               Comprehensive AI Capabilities
//             </h2>
//           </div>
//           {loading ? (
//             <p style={{ textAlign: 'center', color: '#9ca3af' }}>Loading solutions...</p>
//           ) : (
//             <div
//               style={{
//                 display: 'grid',
//                 gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
//                 gap: '24px'
//               }}
//             >
//               {solutions.map((sol, i) => {
//                 const attrs = sol.attributes || sol;
//                 const description = extractTextFromRichText(attrs.description);
                
//                 const imageUrl = attrs.image && Array.isArray(attrs.image) && attrs.image[0]?.url
//                   ? `http://localhost:1337${attrs.image[0].url}`
//                   : attrs.image?.data?.attributes?.url
//                   ? `http://localhost:1337${attrs.image.data.attributes.url}`
//                   : null;
                
//                 return (
//                   <div
//                     key={i}
//                     style={{
//                       background: 'rgba(18, 18, 26, 0.8)',
//                       borderRadius: '16px',
//                       padding: '32px',
//                       border: '1px solid rgba(255,255,255,0.05)',
//                       transition: 'all 0.4s ease',
//                       cursor: 'pointer',
//                       transform: hoveredCard === `sol-${i}` ? 'translateY(-8px)' : 'translateY(0)',
//                       boxShadow:
//                         hoveredCard === `sol-${i}`
//                           ? '0 20px 40px rgba(0,212,255,0.1)'
//                           : 'none',
//                       borderColor:
//                         hoveredCard === `sol-${i}` ? 'rgba(0,212,255,0.3)' : 'rgba(255,255,255,0.05)'
//                     }}
//                     onMouseEnter={() => setHoveredCard(`sol-${i}`)}
//                     onMouseLeave={() => setHoveredCard(null)}
//                   >
//                     {imageUrl ? (
//                       <img
//                         src={imageUrl}
//                         alt={attrs.title}
//                         style={{
//                           width: '100%',
//                           height: '160px',
//                           objectFit: 'cover',
//                           borderRadius: '8px',
//                           marginBottom: '20px'
//                         }}
//                       />
//                     ) : (
//                       <div style={{ fontSize: '40px', marginBottom: '20px' }}>✨</div>
//                     )}
//                     <h3 style={{ fontSize: '20px', fontWeight: 700, color: 'white', marginBottom: '12px' }}>
//                       {attrs.title}
//                     </h3>
//                     <p style={{ fontSize: '15px', color: '#9ca3af', lineHeight: 1.6 }}>
//                       {description}
//                     </p>
//                   </div>
//                 );
//               })}
//             </div>
//           )}
//         </div>
//       </section>

//       {/* Services Section */}
//       <section
//         id="services"
//         style={{
//           position: 'relative',
//           padding: '100px 24px',
//           overflow: 'hidden'
//         }}
//       >
//         <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
//           <div style={{ textAlign: 'center', marginBottom: '64px' }}>
//             <span
//               style={{
//                 display: 'inline-block',
//                 padding: '6px 16px',
//                 borderRadius: '50px',
//                 fontSize: '14px',
//                 fontWeight: 500,
//                 marginBottom: '24px',
//                 background: 'rgba(251,191,36,0.1)',
//                 border: '1px solid rgba(251,191,36,0.3)',
//                 color: '#fbbf24'
//               }}
//             >
//               Our Services
//             </span>
//             <h2
//               style={{
//                 fontSize: 'clamp(32px, 5vw, 48px)',
//                 fontWeight: 700,
//                 color: 'white',
//                 marginBottom: '16px'
//               }}
//             >
//               Expert AI Services & Advisory
//             </h2>
//           </div>
//           {loading ? (
//             <p style={{ textAlign: 'center', color: '#9ca3af' }}>Loading services...</p>
//           ) : (
//             <div
//               style={{
//                 display: 'grid',
//                 gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
//                 gap: '24px'
//               }}
//             >
//               {services.map((srv, i) => {
//                 const attrs = srv.attributes || srv;
//                 const description = extractTextFromRichText(attrs.description);
                
//                 const iconUrl = attrs.icon?.url
//                   ? `http://localhost:1337${attrs.icon.url}`
//                   : null;
                
//                 return (
//                   <div
//                     key={i}
//                     style={{
//                       background: 'rgba(18, 18, 26, 0.8)',
//                       borderRadius: '16px',
//                       padding: '32px',
//                       border: '1px solid rgba(255,255,255,0.05)',
//                       transition: 'all 0.4s ease',
//                       cursor: 'pointer',
//                       transform: hoveredCard === `srv-${i}` ? 'translateY(-8px)' : 'translateY(0)',
//                       borderColor:
//                         hoveredCard === `srv-${i}` ? 'rgba(251,191,36,0.3)' : 'rgba(255,255,255,0.05)'
//                     }}
//                     onMouseEnter={() => setHoveredCard(`srv-${i}`)}
//                     onMouseLeave={() => setHoveredCard(null)}
//                   >
//                     {iconUrl ? (
//                       <img
//                         src={iconUrl}
//                         alt={attrs.title}
//                         style={{
//                           width: '100%',
//                           height: '160px',
//                           objectFit: 'cover',
//                           borderRadius: '8px',
//                           marginBottom: '20px'
//                         }}
//                       />
//                     ) : (
//                       <div style={{ fontSize: '40px', marginBottom: '20px' }}>🧭</div>
//                     )}
//                     <h3 style={{ fontSize: '20px', fontWeight: 700, color: 'white', marginBottom: '12px' }}>
//                       {attrs.title}
//                     </h3>
//                     <p style={{ fontSize: '15px', color: '#9ca3af', lineHeight: 1.6 }}>
//                       {description}
//                     </p>
//                   </div>
//                 );
//               })}
//             </div>
//           )}
//         </div>
//       </section>

//       {/* Industries Section */}
//       <section
//         id="industries"
//         style={{
//           position: 'relative',
//           padding: '100px 24px',
//           background: '#0a0a0f',
//           overflow: 'hidden'
//         }}
//       >
//         <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
//           <div style={{ textAlign: 'center', marginBottom: '64px' }}>
//             <span
//               style={{
//                 display: 'inline-block',
//                 padding: '6px 16px',
//                 borderRadius: '50px',
//                 fontSize: '14px',
//                 fontWeight: 500,
//                 marginBottom: '24px',
//                 background: 'rgba(0,212,255,0.1)',
//                 border: '1px solid rgba(0,212,255,0.3)',
//                 color: '#00d4ff'
//               }}
//             >
//               Industries
//             </span>
//             <h2
//               style={{
//                 fontSize: 'clamp(32px, 5vw, 48px)',
//                 fontWeight: 700,
//                 color: 'white',
//                 marginBottom: '16px'
//               }}
//             >
//               Industries We Transform
//             </h2>
//           </div>
//           {loading ? (
//             <p style={{ textAlign: 'center', color: '#9ca3af' }}>Loading industries...</p>
//           ) : (
//             <div
//               style={{
//                 display: 'grid',
//                 gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
//                 gap: '24px'
//               }}
//             >
//               {industries.map((ind, i) => {
//                 const attrs = ind.attributes || ind;
                
//                 const imageUrl = attrs.image?.url
//                   ? `http://localhost:1337${attrs.image.url}`
//                   : null;
                
//                 return (
//                   <div
//                     key={i}
//                     style={{
//                       background: 'rgba(18, 18, 26, 0.8)',
//                       borderRadius: '16px',
//                       overflow: 'hidden',
//                       border: '1px solid rgba(255,255,255,0.05)',
//                       transition: 'all 0.4s ease',
//                       cursor: 'pointer',
//                       transform: hoveredCard === `ind-${i}` ? 'translateY(-8px)' : 'translateY(0)',
//                       borderColor:
//                         hoveredCard === `ind-${i}` ? 'rgba(0,212,255,0.2)' : 'rgba(255,255,255,0.05)'
//                     }}
//                     onMouseEnter={() => setHoveredCard(`ind-${i}`)}
//                     onMouseLeave={() => setHoveredCard(null)}
//                   >
//                     {imageUrl ? (
//                       <>
//                         <img
//                           src={imageUrl}
//                           alt={attrs.name}
//                           style={{
//                             width: '100%',
//                             height: '200px',
//                             objectFit: 'cover'
//                           }}
//                         />
//                         <div style={{ padding: '32px' }}>
//                           <h3 style={{ fontSize: '20px', fontWeight: 700, color: 'white', marginBottom: '12px' }}>
//                             {attrs.name}
//                           </h3>
//                           <p style={{ fontSize: '14px', color: '#9ca3af' }}>
//                             {extractTextFromRichText(attrs.description)}
//                           </p>
//                         </div>
//                       </>
//                     ) : (
//                       <div style={{ padding: '32px' }}>
//                         <h3 style={{ fontSize: '20px', fontWeight: 700, color: 'white', marginBottom: '12px' }}>
//                           {attrs.name}
//                         </h3>
//                         <p style={{ fontSize: '14px', color: '#9ca3af' }}>
//                           {extractTextFromRichText(attrs.description)}
//                         </p>
//                       </div>
//                     )}
//                   </div>
//                 );
//               })}
//             </div>
//           )}
//         </div>
//       </section>

//       {/* Partnerships Section - Fetched from Strapi */}
//       <section
//         id="partnerships"
//         style={{
//           position: 'relative',
//           padding: '100px 24px',
//           overflow: 'hidden'
//         }}
//       >
//         <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
//           <div style={{ textAlign: 'center', marginBottom: '64px' }}>
//             <span
//               style={{
//                 display: 'inline-block',
//                 padding: '6px 16px',
//                 borderRadius: '50px',
//                 fontSize: '14px',
//                 fontWeight: 500,
//                 marginBottom: '24px',
//                 background: 'rgba(0,212,255,0.1)',
//                 border: '1px solid rgba(0,212,255,0.3)',
//                 color: '#00d4ff'
//               }}
//             >
//               Our Partnerships
//             </span>
//             <h2
//               style={{
//                 fontSize: 'clamp(32px, 5vw, 48px)',
//                 fontWeight: 700,
//                 color: 'white',
//                 marginBottom: '16px'
//               }}
//             >
//               Strategic Partners
//             </h2>
//             <p style={{ fontSize: '16px', color: '#9ca3af', marginTop: '16px' }}>
//               Collaborating with industry leaders to deliver comprehensive AI solutions
//             </p>
//           </div>
//           {loading ? (
//             <p style={{ textAlign: 'center', color: '#9ca3af' }}>Loading partnerships...</p>
//           ) : partnerships.length > 0 ? (
//             <div
//               style={{
//                 display: 'grid',
//                 gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
//                 gap: '24px'
//               }}
//             >
//               {partnerships.map((partner, i) => {
//                 const attrs = partner.attributes || partner;
                
//                 const logoUrl = attrs.logo?.url
//                   ? `http://localhost:1337${attrs.logo.url}`
//                   : null;
                
//                 return (
//                   <div
//                     key={i}
//                     style={{
//                       background: 'rgba(18, 18, 26, 0.8)',
//                       borderRadius: '16px',
//                       padding: '32px',
//                       border: '1px solid rgba(255,255,255,0.05)',
//                       textAlign: 'center',
//                       transition: 'all 0.4s ease',
//                       cursor: 'pointer',
//                       transform: hoveredCard === `partner-${i}` ? 'translateY(-8px)' : 'translateY(0)',
//                       borderColor:
//                         hoveredCard === `partner-${i}` ? 'rgba(0,212,255,0.3)' : 'rgba(255,255,255,0.05)'
//                     }}
//                     onMouseEnter={() => setHoveredCard(`partner-${i}`)}
//                     onMouseLeave={() => setHoveredCard(null)}
//                   >
//                     {logoUrl ? (
//                       <img
//                         src={logoUrl}
//                         alt={attrs.name}
//                         style={{
//                           width: '100%',
//                           height: '120px',
//                           objectFit: 'contain',
//                           marginBottom: '20px'
//                         }}
//                       />
//                     ) : (
//                       <div style={{ fontSize: '40px', marginBottom: '20px' }}>🤝</div>
//                     )}
//                     <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'white', marginBottom: '12px' }}>
//                       {attrs.name}
//                     </h3>
//                     {attrs.description && (
//                       <p style={{ fontSize: '14px', color: '#9ca3af' }}>
//                         {extractTextFromRichText(attrs.description)}
//                       </p>
//                     )}
//                   </div>
//                 );
//               })}
//             </div>
//           ) : (
//             <p style={{ textAlign: 'center', color: '#9ca3af' }}>No partnerships available</p>
//           )}
//         </div>
//       </section>

//       {/* Contact Section */}
//       <section
//         id="contact"
//         style={{
//           position: 'relative',
//           padding: '100px 24px',
//           background: '#0a0a0f',
//           overflow: 'hidden'
//         }}
//       >
//         <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
//           <span
//             style={{
//               display: 'inline-block',
//               padding: '6px 16px',
//               borderRadius: '50px',
//               fontSize: '14px',
//               fontWeight: 500,
//               marginBottom: '24px',
//               background: 'rgba(0,212,255,0.1)',
//               border: '1px solid rgba(0,212,255,0.3)',
//               color: '#00d4ff'
//             }}
//           >
//             Get Started
//           </span>
//           <h2
//             style={{
//               fontSize: 'clamp(32px, 5vw, 48px)',
//               fontWeight: 700,
//               color: 'white',
//               marginBottom: '24px'
//             }}
//           >
//             Ready to Transform Your Enterprise?
//           </h2>
//           <p style={{ fontSize: '18px', color: '#9ca3af', marginBottom: '40px' }}>
//             Share your email and our AI experts will reach out to discuss your AI journey.
//           </p>
//           <form style={{ maxWidth: '500px', margin: '0 auto' }} onSubmit={handleSubmit}>
//             <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
//               <input
//                 type="email"
//                 value={formState.email}
//                 onChange={handleEmailChange}
//                 placeholder="Enter your email address"
//                 style={{
//                   flex: 1,
//                   minWidth: '250px',
//                   padding: '16px 24px',
//                   background: 'rgba(18, 18, 26, 0.8)',
//                   border: formState.error ? '1px solid #ef4444' : '1px solid rgba(255,255,255,0.1)',
//                   borderRadius: '12px',
//                   color: 'white',
//                   fontSize: '16px',
//                   outline: 'none',
//                   transition: 'border-color 0.3s'
//                 }}
//                 required
//                 disabled={formState.isSubmitting}
//               />
//               <button
//                 type="submit"
//                 style={{
//                   background: 'linear-gradient(135deg, #00d4ff 0%, #7c3aed 100%)',
//                   padding: '16px 28px',
//                   borderRadius: '12px',
//                   color: 'white',
//                   fontWeight: '600',
//                   border: 'none',
//                   cursor: 'pointer',
//                   opacity: formState.isSubmitting ? 0.7 : 1,
//                   transition: 'all 0.3s'
//                 }}
//                 disabled={formState.isSubmitting || !formState.email}
//               >
//                 {formState.isSubmitting ? 'Sending...' : formState.isSubmitted ? '✓ Sent!' : 'Get in Touch'}
//               </button>
//             </div>
//             {formState.error && (
//               <p style={{ color: '#ef4444', fontSize: '14px', marginTop: '8px', textAlign: 'left' }}>
//                 {formState.error}
//               </p>
//             )}
//             {formState.isSubmitted && (
//               <p style={{ color: '#10b981', fontSize: '14px', marginTop: '8px' }}>
//                 Thank you! We'll be in touch soon.
//               </p>
//             )}
//           </form>
//         </div>
//       </section>

//       {/* Footer - Data from Strapi */}
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
//             {/* Company Info from Strapi Footer */}
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

//                 {/* Quick Links from Strapi Footer */}
//                 {footer?.links && Array.isArray(footer.links) && footer.links.length > 0 ? (
//                   <div>
//                     <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'white', marginBottom: '16px' }}>
//                       Quick Links
//                     </h3>
//                     <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
//                       {footer.links.map((link: any, idx: number) => {
//                         console.log('Rendering link:', link);
//                         return (
//                           <li key={`link-${idx}`} style={{ marginBottom: '12px' }}>
//                             <a
//                               href={link.url || '#'}
//                               style={{
//                                 fontSize: '14px',
//                                 color: '#9ca3af',
//                                 textDecoration: 'none',
//                                 transition: 'color 0.3s',
//                                 display: 'block'
//                               }}
//                               onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#00d4ff')}
//                               onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = '#9ca3af')}
//                             >
//                               {link.label}
//                             </a>
//                           </li>
//                         );
//                       })}
//                     </ul>
//                   </div>
//                 ) : (
//                   footer && (
//                     <div style={{ color: '#6b7280', fontSize: '12px' }}>
//                       No quick links available
//                     </div>
//                   )
//                 )}
//               </>
//             )}
//           </div>

//           {/* Copyright from Strapi */}
//           <div style={{ textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '24px' }}>
//             <p style={{ fontSize: '14px', color: '#6b7280' }}>
//               {footer?.copyright || `© ${new Date().getFullYear()} The Trinity AI Software Inc. All rights reserved.`}
//             </p>
//           </div>
//         </div>
//       </footer>

//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');
//         @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
//         * { box-sizing: border-box; margin: 0; padding: 0; }
//         html { scroll-behavior: smooth; }
//         ::selection { background: rgba(0,212,255,0.3); }
//         :focus-visible { outline: 2px solid #00d4ff; outline-offset: 2px; }
//       `}</style>
//     </div>
//   );
// }





'use client';

import { useState, useEffect, useCallback } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'https://trinity-ai-backend.onrender.com';

// Helper function to build complete image URL
const getImageUrl = (imageData: any): string | null => {
  if (!imageData) return null;
  
  let urlPath = null;
  
  // Handle array format (for multi-file relations)
  if (Array.isArray(imageData)) {
    if (imageData.length === 0) return null;
    const img = imageData[0];
    urlPath = img?.url;
  }
  // Handle direct object format
  else if (typeof imageData === 'object') {
    urlPath = imageData.url;
  }
  
  if (!urlPath) {
    return null;
  }
  
  // Build full URL
  return urlPath.startsWith('http') ? urlPath : `${STRAPI_URL}${urlPath}`;
};

const isValidEmail = (email: string): boolean => {
  if (!email || typeof email !== 'string') return false;
  const cleanEmail = email.trim().toLowerCase();
  if (cleanEmail.length < 5 || cleanEmail.length > 254) return false;
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return emailRegex.test(cleanEmail);
};

const sanitizeInput = (input: string): string => {
  if (!input || typeof input !== 'string') return '';
  return input.replace(/[<>'"&]/g, (char) => {
    const map: Record<string, string> = {
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#x27;',
      '"': '&quot;',
      '&': '&amp;'
    };
    return map[char] || char;
  });
};

const extractTextFromRichText = (richText: any): string => {
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
      .join(' ');
  }
  return '';
};

const rateLimitMap = new Map();
const checkRateLimit = (key: string, maxAttempts = 3, windowMs = 60000) => {
  const now = Date.now();
  const record = rateLimitMap.get(key);
  if (!record || now > record.resetTime) {
    rateLimitMap.set(key, { count: 1, resetTime: now + windowMs });
    return { allowed: true, remaining: maxAttempts - 1, resetInMs: 0 };
  }
  if (record.count >= maxAttempts) {
    return { allowed: false, remaining: 0, resetInMs: record.resetTime - now };
  }
  record.count++;
  return { allowed: true, remaining: maxAttempts - record.count, resetInMs: 0 };
};

export default function TrinityAIHomepage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [formState, setFormState] = useState({
    email: '',
    isSubmitting: false,
    isSubmitted: false,
    error: null as string | null
  });
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [solutions, setSolutions] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [industries, setIndustries] = useState<any[]>([]);
  const [mission, setMission] = useState<any>(null);
  const [partnerships, setPartnerships] = useState<any[]>([]);
  const [footer, setFooter] = useState<any>(null);
  const [branding, setBranding] = useState<any>(null);
  const [navSubItems, setNavSubItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  // Fetch all data from Strapi
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        // Fetch Solutions with all populated fields
        const solRes = await fetch(`${API_URL}/solutions?populate=*`);
        const solData = await solRes.json();
        const solArray = Array.isArray(solData.data) ? solData.data : [];
        setSolutions(solArray.slice(0, 4));

        // Fetch Services with all populated fields
        const srvRes = await fetch(`${API_URL}/services?populate=*`);
        const srvData = await srvRes.json();
        const srvArray = Array.isArray(srvData.data) ? srvData.data : [];
        setServices(srvArray.slice(0, 4));

        // Fetch Industries with all populated fields
        const indRes = await fetch(`${API_URL}/industries?populate=*`);
        const indData = await indRes.json();
        const indArray = Array.isArray(indData.data) ? indData.data : [];
        setIndustries(indArray);

        // Fetch Mission
        const misRes = await fetch(`${API_URL}/missions`);
        const misData = await misRes.json();
        const misArray = Array.isArray(misData.data) ? misData.data : [];
        if (misArray.length > 0) {
          setMission(misArray[0]);
        }

        // Fetch Partnerships with all populated fields
        const partRes = await fetch(`${API_URL}/partnerships?populate=*`);
        const partData = await partRes.json();
        const partArray = Array.isArray(partData.data) ? partData.data : [];
        setPartnerships(partArray);

        // Fetch Footer data
        const footRes = await fetch(`${API_URL}/footers?populate=*`);
        const footData = await footRes.json();
        const footArray = Array.isArray(footData.data) ? footData.data : [];
        if (footArray.length > 0) {
          setFooter(footArray[0]);
        }

        // Fetch Navigation Items (children/sub-items) - matches parent menu names
        const navItemRes = await fetch(`${API_URL}/navigation-items`);
        const navItemData = await navItemRes.json();
        const navItemArray = Array.isArray(navItemData.data) ? navItemData.data : [];
        setNavSubItems(navItemArray);

        // FETCH BRANDING/SETTINGS
        const brandRes = await fetch(`${API_URL}/branding?populate=*`);
        const brandData = await brandRes.json();
        if (brandData.data) {
          const brandingData = Array.isArray(brandData.data) ? brandData.data[0] : brandData.data;
          const attrs = brandingData?.attributes || brandingData;
          setBranding(attrs);
        }

      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleEmailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[<>'"]/g, '');
    setFormState(prev => ({ ...prev, email: value, error: null }));
  }, []);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();

    const rateLimit = checkRateLimit('contact', 3, 60000);
    if (!rateLimit.allowed) {
      setFormState(prev => ({
        ...prev,
        error: `Too many attempts. Try again in ${Math.ceil(rateLimit.resetInMs / 1000)}s`
      }));
      return;
    }

    if (!isValidEmail(formState.email)) {
      setFormState(prev => ({ ...prev, error: 'Please enter a valid email address' }));
      return;
    }

    setFormState(prev => ({ ...prev, isSubmitting: true }));

    setTimeout(() => {
      console.log('Submitted:', sanitizeInput(formState.email));
      setFormState({ email: '', isSubmitting: false, isSubmitted: true, error: null });
      setTimeout(() => setFormState(prev => ({ ...prev, isSubmitted: false })), 5000);
    }, 1000);
  }, [formState.email]);

  const scrollTo = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const stats = [
    { value: '80%', label: 'Cost Reduction', sublabel: 'with Agentic AI' },
    { value: '10×', label: 'Productivity Boost', sublabel: 'with Generative AI' },
    { value: '60%', label: 'Faster Decisions', sublabel: 'with Generative BI' },
    { value: '90%+', label: 'Accuracy', sublabel: 'with ML Models' }
  ];

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
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              textDecoration: 'none',
              cursor: 'pointer'
            }}
            onClick={() => scrollTo('hero')}
          >
            {(() => {
              const logoUrl = getImageUrl(branding?.logo);

              if (logoUrl) {
                return (
                  <img
                    src={logoUrl}
                    alt={branding?.companyName || 'Logo'}
                    style={{
                      height: '50px',
                      width: 'auto',
                      objectFit: 'contain'
                    }}
                    onError={(e) => {
                      console.error('Logo image failed to load:', logoUrl);
                      (e.currentTarget as HTMLImageElement).style.display = 'none';
                    }}
                  />
                );
              }

              // Fallback to gradient logo
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

          {/* Navigation Links with Dropdowns */}
          <div style={{ display: 'flex', gap: '32px', position: 'relative' }}>
            {['Home', 'AI Solutions', 'AI Services', 'The Trinity AI Platform'].map((navLabel, idx) => {
              // Get children for this nav item from navSubItems
              const children = navSubItems.filter((item) => {
                const attrs = item.attributes || item;
                return attrs.parentMenu === navLabel;
              });
              
              const isDropdown = children.length > 0;

              return (
                <div 
                  key={idx} 
                  style={{ position: 'relative', display: 'inline-block' }}
                  onMouseLeave={() => {
                    setOpenDropdown(null);
                  }}
                >
                  {/* Main Nav Item */}
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
                    onMouseEnter={() => {
                      if (isDropdown) setOpenDropdown(navLabel);
                    }}
                  >
                    <span
                      style={{
                        color: openDropdown === navLabel ? 'white' : '#d1d5db'
                      }}
                    >
                      {navLabel}
                    </span>
                    {isDropdown && (
                      <span style={{ fontSize: '10px' }}>▼</span>
                    )}
                  </div>

                  {/* Dropdown Menu - Only show if has children */}
                  {isDropdown && openDropdown === navLabel && (
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
                        zIndex: 100,
                        padding: '4px 0'
                      }}
                      onMouseEnter={() => {
                        setOpenDropdown(navLabel);
                      }}
                      onMouseLeave={() => {
                        setOpenDropdown(null);
                      }}
                    >
                      {children.map((child, cIdx) => {
                        const childAttrs = child.attributes || child;
                        return (
                          <a
                            key={cIdx}
                            href={childAttrs.url || '#'}
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
                            {childAttrs.label}
                          </a>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

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
            onClick={() => scrollTo('contact')}
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="hero"
        style={{
          position: 'relative',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '120px 24px 80px',
          overflow: 'hidden',
          textAlign: 'center'
        }}
      >
        <div
          style={{
            position: 'absolute',
            width: '600px',
            height: '600px',
            background: 'radial-gradient(circle, rgba(0,212,255,0.15) 0%, transparent 70%)',
            top: '-200px',
            right: '-200px',
            pointerEvents: 'none'
          }}
        />
        <div style={{ position: 'relative', zIndex: 10, maxWidth: '1000px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
              borderRadius: '50px',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              marginBottom: '32px'
            }}
          >
            <span
              style={{
                width: '8px',
                height: '8px',
                background: '#00d4ff',
                borderRadius: '50%',
                animation: 'pulse 2s infinite'
              }}
            />
            <span style={{ fontSize: '14px', color: '#d1d5db' }}>
              Pioneering Enterprise AI Solutions
            </span>
          </div>
          <h1
            style={{
              fontSize: 'clamp(40px, 8vw, 72px)',
              fontWeight: 700,
              lineHeight: 1.1,
              marginBottom: '24px'
            }}
          >
            <span style={{ color: 'white' }}>Unlock </span>
            <span
              style={{
                background: 'linear-gradient(135deg, #00d4ff 0%, #7c3aed 50%, #06b6d4 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              5×
            </span>
            <span style={{ color: 'white' }}> Enterprise Value</span>
            <br />
            <span style={{ fontSize: 'clamp(28px, 5vw, 48px)', color: '#9ca3af' }}>
              Build Enduring Market Leadership
            </span>
          </h1>
          <p
            style={{
              fontSize: '20px',
              color: '#9ca3af',
              maxWidth: '700px',
              margin: '0 auto 40px',
              lineHeight: 1.6
            }}
          >
            Accelerate growth and optimize cost to build resilience, strengthen differentiation, and
            secure lasting competitive advantage with AI.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginBottom: '64px', flexWrap: 'wrap' }}>
            <button
              style={{
                background: 'linear-gradient(135deg, #00d4ff 0%, #7c3aed 100%)',
                padding: '14px 28px',
                borderRadius: '8px',
                color: 'white',
                fontWeight: '600',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}
              onClick={() => scrollTo('solutions')}
            >
              Explore Solutions →
            </button>
            <button
              style={{
                background: 'transparent',
                padding: '14px 28px',
                borderRadius: '8px',
                color: 'white',
                fontWeight: '600',
                border: '1px solid rgba(0, 212, 255, 0.5)',
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}
              onClick={() => scrollTo('contact')}
            >
              Schedule Consultation
            </button>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
              gap: '16px',
              maxWidth: '800px',
              margin: '0 auto'
            }}
          >
            {stats.map((stat, i) => (
              <div
                key={i}
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  borderRadius: '16px',
                  padding: '24px',
                  border: '1px solid rgba(255,255,255,0.08)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '2px',
                    background: 'linear-gradient(90deg, transparent, #00d4ff, #7c3aed, transparent)'
                  }}
                />
                <div
                  style={{
                    fontSize: '32px',
                    fontWeight: 700,
                    background: 'linear-gradient(135deg, #00d4ff, #7c3aed)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    marginBottom: '8px'
                  }}
                >
                  {stat.value}
                </div>
                <div style={{ fontSize: '14px', color: 'white', fontWeight: 500 }}>
                  {stat.label}
                </div>
                <div style={{ fontSize: '12px', color: '#6b7280' }}>{stat.sublabel}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      {mission && (
        <section
          id="mission"
          style={{
            position: 'relative',
            padding: '100px 24px',
            textAlign: 'center'
          }}
        >
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <h2
              style={{
                fontSize: 'clamp(32px, 5vw, 48px)',
                fontWeight: 700,
                color: 'white',
                marginBottom: '32px'
              }}
            >
              {mission.title || 'Our Mission'}
            </h2>
            <p
              style={{
                fontSize: '18px',
                color: '#9ca3af',
                lineHeight: 1.8,
                maxWidth: '750px',
                margin: '0 auto'
              }}
            >
              {extractTextFromRichText(mission.content)}
            </p>
          </div>
        </section>
      )}

      {/* Solutions Section */}
      <section
        id="solutions"
        style={{
          position: 'relative',
          padding: '100px 24px',
          background: '#0a0a0f',
          overflow: 'hidden'
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <span
              style={{
                display: 'inline-block',
                padding: '6px 16px',
                borderRadius: '50px',
                fontSize: '14px',
                fontWeight: 500,
                marginBottom: '24px',
                background: 'rgba(0,212,255,0.1)',
                border: '1px solid rgba(0,212,255,0.3)',
                color: '#00d4ff'
              }}
            >
              Our Solutions
            </span>
            <h2
              style={{
                fontSize: 'clamp(32px, 5vw, 48px)',
                fontWeight: 700,
                color: 'white',
                marginBottom: '16px'
              }}
            >
              Comprehensive AI Capabilities
            </h2>
          </div>
          {loading ? (
            <p style={{ textAlign: 'center', color: '#9ca3af' }}>Loading solutions...</p>
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '24px'
              }}
            >
              {solutions.map((sol, i) => {
                const attrs = sol.attributes || sol;
                const description = extractTextFromRichText(attrs.description);
                const imageUrl = getImageUrl(attrs.image);
                
                return (
                  <div
                    key={i}
                    style={{
                      background: 'rgba(18, 18, 26, 0.8)',
                      borderRadius: '16px',
                      padding: '32px',
                      border: '1px solid rgba(255,255,255,0.05)',
                      transition: 'all 0.4s ease',
                      cursor: 'pointer',
                      transform: hoveredCard === `sol-${i}` ? 'translateY(-8px)' : 'translateY(0)',
                      boxShadow:
                        hoveredCard === `sol-${i}`
                          ? '0 20px 40px rgba(0,212,255,0.1)'
                          : 'none',
                      borderColor:
                        hoveredCard === `sol-${i}` ? 'rgba(0,212,255,0.3)' : 'rgba(255,255,255,0.05)'
                    }}
                    onMouseEnter={() => setHoveredCard(`sol-${i}`)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    {imageUrl && (
                      <img
                        src={imageUrl}
                        alt={attrs.title}
                        style={{
                          width: '100%',
                          height: '160px',
                          objectFit: 'cover',
                          borderRadius: '8px',
                          marginBottom: '20px'
                        }}
                      />
                    )}
                    <h3 style={{ fontSize: '20px', fontWeight: 700, color: 'white', marginBottom: '12px' }}>
                      {attrs.title}
                    </h3>
                    <p style={{ fontSize: '15px', color: '#9ca3af', lineHeight: 1.6 }}>
                      {description}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Services Section */}
      <section
        id="services"
        style={{
          position: 'relative',
          padding: '100px 24px',
          overflow: 'hidden'
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <span
              style={{
                display: 'inline-block',
                padding: '6px 16px',
                borderRadius: '50px',
                fontSize: '14px',
                fontWeight: 500,
                marginBottom: '24px',
                background: 'rgba(251,191,36,0.1)',
                border: '1px solid rgba(251,191,36,0.3)',
                color: '#fbbf24'
              }}
            >
              Our Services
            </span>
            <h2
              style={{
                fontSize: 'clamp(32px, 5vw, 48px)',
                fontWeight: 700,
                color: 'white',
                marginBottom: '16px'
              }}
            >
              Expert AI Services & Advisory
            </h2>
          </div>
          {loading ? (
            <p style={{ textAlign: 'center', color: '#9ca3af' }}>Loading services...</p>
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '24px'
              }}
            >
              {services.map((srv, i) => {
                const attrs = srv.attributes || srv;
                const description = extractTextFromRichText(attrs.description);
                const iconUrl = getImageUrl(attrs.icon);
                
                return (
                  <div
                    key={i}
                    style={{
                      background: 'rgba(18, 18, 26, 0.8)',
                      borderRadius: '16px',
                      padding: '32px',
                      border: '1px solid rgba(255,255,255,0.05)',
                      transition: 'all 0.4s ease',
                      cursor: 'pointer',
                      transform: hoveredCard === `srv-${i}` ? 'translateY(-8px)' : 'translateY(0)',
                      borderColor:
                        hoveredCard === `srv-${i}` ? 'rgba(251,191,36,0.3)' : 'rgba(255,255,255,0.05)'
                    }}
                    onMouseEnter={() => setHoveredCard(`srv-${i}`)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    {iconUrl && (
                      <img
                        src={iconUrl}
                        alt={attrs.title}
                        style={{
                          width: '100%',
                          height: '160px',
                          objectFit: 'cover',
                          borderRadius: '8px',
                          marginBottom: '20px'
                        }}
                      />
                    )}
                    <h3 style={{ fontSize: '20px', fontWeight: 700, color: 'white', marginBottom: '12px' }}>
                      {attrs.title}
                    </h3>
                    <p style={{ fontSize: '15px', color: '#9ca3af', lineHeight: 1.6 }}>
                      {description}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Industries Section */}
      <section
        id="industries"
        style={{
          position: 'relative',
          padding: '100px 24px',
          background: '#0a0a0f',
          overflow: 'hidden'
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <span
              style={{
                display: 'inline-block',
                padding: '6px 16px',
                borderRadius: '50px',
                fontSize: '14px',
                fontWeight: 500,
                marginBottom: '24px',
                background: 'rgba(0,212,255,0.1)',
                border: '1px solid rgba(0,212,255,0.3)',
                color: '#00d4ff'
              }}
            >
              Industries
            </span>
            <h2
              style={{
                fontSize: 'clamp(32px, 5vw, 48px)',
                fontWeight: 700,
                color: 'white',
                marginBottom: '16px'
              }}
            >
              Industries We Transform
            </h2>
          </div>
          {loading ? (
            <p style={{ textAlign: 'center', color: '#9ca3af' }}>Loading industries...</p>
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '24px'
              }}
            >
              {industries.map((ind, i) => {
                const attrs = ind.attributes || ind;
                const imageUrl = getImageUrl(attrs.image);
                
                return (
                  <div
                    key={i}
                    style={{
                      background: 'rgba(18, 18, 26, 0.8)',
                      borderRadius: '16px',
                      overflow: 'hidden',
                      border: '1px solid rgba(255,255,255,0.05)',
                      transition: 'all 0.4s ease',
                      cursor: 'pointer',
                      transform: hoveredCard === `ind-${i}` ? 'translateY(-8px)' : 'translateY(0)',
                      borderColor:
                        hoveredCard === `ind-${i}` ? 'rgba(0,212,255,0.2)' : 'rgba(255,255,255,0.05)'
                    }}
                    onMouseEnter={() => setHoveredCard(`ind-${i}`)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    {imageUrl ? (
                      <>
                        <img
                          src={imageUrl}
                          alt={attrs.name}
                          style={{
                            width: '100%',
                            height: '200px',
                            objectFit: 'cover'
                          }}
                        />
                        <div style={{ padding: '32px' }}>
                          <h3 style={{ fontSize: '20px', fontWeight: 700, color: 'white', marginBottom: '12px' }}>
                            {attrs.name}
                          </h3>
                          <p style={{ fontSize: '14px', color: '#9ca3af' }}>
                            {extractTextFromRichText(attrs.description)}
                          </p>
                        </div>
                      </>
                    ) : (
                      <div style={{ padding: '32px' }}>
                        <h3 style={{ fontSize: '20px', fontWeight: 700, color: 'white', marginBottom: '12px' }}>
                          {attrs.name}
                        </h3>
                        <p style={{ fontSize: '14px', color: '#9ca3af' }}>
                          {extractTextFromRichText(attrs.description)}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Partnerships Section */}
      <section
        id="partnerships"
        style={{
          position: 'relative',
          padding: '100px 24px',
          overflow: 'hidden'
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <span
              style={{
                display: 'inline-block',
                padding: '6px 16px',
                borderRadius: '50px',
                fontSize: '14px',
                fontWeight: 500,
                marginBottom: '24px',
                background: 'rgba(0,212,255,0.1)',
                border: '1px solid rgba(0,212,255,0.3)',
                color: '#00d4ff'
              }}
            >
              Our Partnerships
            </span>
            <h2
              style={{
                fontSize: 'clamp(32px, 5vw, 48px)',
                fontWeight: 700,
                color: 'white',
                marginBottom: '16px'
              }}
            >
              Strategic Partners
            </h2>
            <p style={{ fontSize: '16px', color: '#9ca3af', marginTop: '16px' }}>
              Collaborating with industry leaders to deliver comprehensive AI solutions
            </p>
          </div>
          {loading ? (
            <p style={{ textAlign: 'center', color: '#9ca3af' }}>Loading partnerships...</p>
          ) : partnerships.length > 0 ? (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '24px'
              }}
            >
              {partnerships.map((partner, i) => {
                const attrs = partner.attributes || partner;
                const logoUrl = getImageUrl(attrs.logos || attrs.logo);
                
                return (
                  <div
                    key={i}
                    style={{
                      background: 'rgba(18, 18, 26, 0.8)',
                      borderRadius: '16px',
                      padding: '32px',
                      border: '1px solid rgba(255,255,255,0.05)',
                      textAlign: 'center',
                      transition: 'all 0.4s ease',
                      cursor: 'pointer',
                      transform: hoveredCard === `partner-${i}` ? 'translateY(-8px)' : 'translateY(0)',
                      borderColor:
                        hoveredCard === `partner-${i}` ? 'rgba(0,212,255,0.3)' : 'rgba(255,255,255,0.05)'
                    }}
                    onMouseEnter={() => setHoveredCard(`partner-${i}`)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    {logoUrl && (
                      <img
                        src={logoUrl}
                        alt={attrs.name}
                        style={{
                          width: '100%',
                          height: '120px',
                          objectFit: 'contain',
                          marginBottom: '20px'
                        }}
                      />
                    )}
                    <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'white', marginBottom: '12px' }}>
                      {attrs.name}
                    </h3>
                    {attrs.description && (
                      <p style={{ fontSize: '14px', color: '#9ca3af' }}>
                        {extractTextFromRichText(attrs.description)}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <p style={{ textAlign: 'center', color: '#9ca3af' }}>No partnerships available</p>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        style={{
          position: 'relative',
          padding: '100px 24px',
          background: '#0a0a0f',
          overflow: 'hidden'
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <span
            style={{
              display: 'inline-block',
              padding: '6px 16px',
              borderRadius: '50px',
              fontSize: '14px',
              fontWeight: 500,
              marginBottom: '24px',
              background: 'rgba(0,212,255,0.1)',
              border: '1px solid rgba(0,212,255,0.3)',
              color: '#00d4ff'
            }}
          >
            Get Started
          </span>
          <h2
            style={{
              fontSize: 'clamp(32px, 5vw, 48px)',
              fontWeight: 700,
              color: 'white',
              marginBottom: '24px'
            }}
          >
            Ready to Transform Your Enterprise?
          </h2>
          <p style={{ fontSize: '18px', color: '#9ca3af', marginBottom: '40px' }}>
            Share your email and our AI experts will reach out to discuss your AI journey.
          </p>
          <form style={{ maxWidth: '500px', margin: '0 auto' }} onSubmit={handleSubmit}>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <input
                type="email"
                value={formState.email}
                onChange={handleEmailChange}
                placeholder="Enter your email address"
                style={{
                  flex: 1,
                  minWidth: '250px',
                  padding: '16px 24px',
                  background: 'rgba(18, 18, 26, 0.8)',
                  border: formState.error ? '1px solid #ef4444' : '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  color: 'white',
                  fontSize: '16px',
                  outline: 'none',
                  transition: 'border-color 0.3s'
                }}
                required
                disabled={formState.isSubmitting}
              />
              <button
                type="submit"
                style={{
                  background: 'linear-gradient(135deg, #00d4ff 0%, #7c3aed 100%)',
                  padding: '16px 28px',
                  borderRadius: '12px',
                  color: 'white',
                  fontWeight: '600',
                  border: 'none',
                  cursor: 'pointer',
                  opacity: formState.isSubmitting ? 0.7 : 1,
                  transition: 'all 0.3s'
                }}
                disabled={formState.isSubmitting || !formState.email}
              >
                {formState.isSubmitting ? 'Sending...' : formState.isSubmitted ? '✓ Sent!' : 'Get in Touch'}
              </button>
            </div>
            {formState.error && (
              <p style={{ color: '#ef4444', fontSize: '14px', marginTop: '8px', textAlign: 'left' }}>
                {formState.error}
              </p>
            )}
            {formState.isSubmitted && (
              <p style={{ color: '#10b981', fontSize: '14px', marginTop: '8px' }}>
                Thank you! We'll be in touch soon.
              </p>
            )}
          </form>
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
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ::selection { background: rgba(0,212,255,0.3); }
        :focus-visible { outline: 2px solid #00d4ff; outline-offset: 2px; }
      `}</style>
    </div>
  );
}