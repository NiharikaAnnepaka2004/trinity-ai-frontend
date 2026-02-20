'use client';

import { useEffect, useState } from 'react';
import { fetchFooter } from '@/services/api';
import Link from 'next/link';

interface FooterLink {
  id?: string;
  label: string;
  url: string;
}

interface FooterData {
  id: number;
  attributes: {
    companyName: string;
    location: string;
    copyright: string;
    links?: FooterLink[];
  };
}

export default function Footer() {
  const [footer, setFooter] = useState<FooterData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFooter = async () => {
      try {
        const data = await fetchFooter();
        if (Array.isArray(data) && data.length > 0) {
          setFooter(data[0]);
        }
      } catch (error) {
        console.error('Error loading footer:', error);
      } finally {
        setLoading(false);
      }
    };

    loadFooter();
  }, []);

  if (loading) return null;
  if (!footer) return null;

  const attrs = footer.attributes || footer;
  const links = Array.isArray(attrs.links) ? attrs.links : [];

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <div>
            <h3 className="font-bold mb-4">{attrs.companyName}</h3>
            <p className="text-gray-400 text-sm">{attrs.location}</p>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {links.map((link: FooterLink, index: number) => (
                <li key={index}>
                  <Link 
                    href={link.url}
                    className="text-gray-400 hover:text-white text-sm transition"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 text-center text-gray-400 text-sm">
          <p>{attrs.copyright}</p>
        </div>
      </div>
    </footer>
  );
}