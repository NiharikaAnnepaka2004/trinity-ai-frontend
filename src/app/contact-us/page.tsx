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
import BlackThemePage from '@/components/BlackThemePage';

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContactData = async () => {
      try {
        const res = await fetch(`${API_URL}/contact-pages`);
        const data = await res.json();
        if (data.data && data.data.length > 0) {
          setContactData(data.data[0]);
        }
      } catch (error) {
        console.error('Error fetching contact data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchContactData();
  }, []);

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '100px', color: '#9ca3af' }}>Loading...</div>;
  }

  const attrs = contactData?.attributes || contactData;

  const contactInfo = attrs ? [
    {
      title: 'Email',
      content: attrs.email || 'contact@thetrinityai.com'
    },
    {
      title: 'Address',
      content: attrs.address || 'Delaware: 2140 South DuPont Hwy, Camden, 19934'
    },
    {
      title: 'Business Hours',
      content: 'Monday - Friday: 9:00 AM - 6:00 PM CST\nWeekend: By appointment'
    }
  ] : [];

  return (
    <BlackThemePage
      pageTitle={attrs?.title || 'Get In Touch'}
      pageDescription={extractText(attrs?.description) || "We're here to help you navigate your AI transformation journey. Reach out to our team of experts for personalized consultation and support."}
      contentSections={contactInfo}
      showContactForm={true}
    />
  );
}