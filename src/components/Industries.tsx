'use client';

import { useEffect, useState } from 'react';
import { fetchIndustries } from '@/services/api';

interface Industry {
  id: number;
  documentId?: string;
  attributes: {
    name: string;
    description: any;
    keyBenefits: any;
    order: number;
    image?: {
      data?: {
        attributes?: {
          url: string;
        };
      };
    };
  };
}

const industryImages: Record<string, string> = {
  'Managed Service Provider': 'http://localhost:1337/uploads/Gemini_Generated_Image_mspindustry_9b0435a7cb.png',
  'Banking & Financial Services': 'http://localhost:1337/uploads/Gemini_Generated_Image_banking_industry_11fdeed86b.png',
  'Discrete & Process Manufacturing': 'http://localhost:1337/uploads/Gemini_Generated_Image_manufacturingindustry_e882eb6ca5.png',
  'Retail': 'http://localhost:1337/uploads/Gemini_Generated_Image_industry_9441afc929.png',
  'Healthcare & Lifesciences': 'http://localhost:1337/uploads/Gemini_Generated_Image_healthcareindustry_4e94193d5b.png',
  'Telecom and Hi-tech': 'http://localhost:1337/uploads/Gemini_Generated_Image_telecomindustry_9777b0dddf.png'
};

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
      .join(' ');
  }
  return '';
}

export default function Industries() {
  const [industries, setIndustries] = useState<Industry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const loadData = async () => {
      try {
        const data = await fetchIndustries();
        if (mounted && Array.isArray(data)) {
          const sorted = data.sort((a, b) => (a.attributes?.order || 0) - (b.attributes?.order || 0));
          setIndustries(sorted);
        }
      } catch (err) {
        console.error('Error fetching industries:', err);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadData();
    return () => {
      mounted = false;
    };
  }, []);

  if (loading) return <div className="py-20 text-center">Loading...</div>;
  if (!industries || industries.length === 0) return <div className="py-20 text-center">No industries found</div>;

  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="mb-12 text-center text-4xl font-bold">Industries we Serve</h2>
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {industries.map((industry) => {
            const attrs = industry.attributes || industry;
            const imageUrl = industryImages[attrs.name];
            
            return (
              <div key={industry.id} className="rounded-lg bg-white p-6 shadow-md transition hover:shadow-lg overflow-hidden">
                {imageUrl && (
                  <div className="mb-4 h-48 overflow-hidden rounded-lg">
                    <img 
                      src={imageUrl} 
                      alt={attrs.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <h3 className="mb-4 text-2xl font-bold">{attrs.name}</h3>
                <p className="mb-4 text-gray-600">{extractText(attrs.description)}</p>
                <div className="text-sm text-gray-700">
                  <strong>Key Benefits:</strong>
                  <p className="mt-2 text-gray-600">{extractText(attrs.keyBenefits)}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}