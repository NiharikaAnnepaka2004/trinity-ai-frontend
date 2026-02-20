'use client';

import { useEffect, useState } from 'react';
import { fetchServices } from '@/services/api';

interface Service {
  id: number;
  documentId?: string;
  attributes: {
    title: string;
    description: any;
    order: number;
    icon?: {
      data?: {
        attributes?: {
          url: string;
        };
      };
    };
  };
}

const serviceImages: Record<string, string> = {
  'Data Ecosystems for AI': 'http://localhost:1337/uploads/Gemini_Generated_Image_datapipelinesicon_2bb4dcd779.png',
  'Custom Process Automation through Agentic AI': 'http://localhost:1337/uploads/Gemini_Generated_Image_automationicon_60319aa2a7.png',
  'Customized Gen AI Applications': 'http://localhost:1337/uploads/Gemini_Generated_Image_genaiappsicon_ed6bb65dbd.png',
  'AI Advisory': 'http://localhost:1337/uploads/Gemini_Generated_Image_aiadvisory_e0a18d8322.png',
  'Model Engineering & Lifecycle Management': 'http://localhost:1337/uploads/Gemini_Generated_Image_modelengineering_cbaa8c6f93.png',
  'Applied AI & Decision Intelligence': 'http://localhost:1337/uploads/Gemini_Generated_Image_decisionintelligence_7732cb4e52.png'
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

export default function Services() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const loadData = async () => {
      try {
        const data = await fetchServices();
        if (mounted && Array.isArray(data)) {
          const sorted = data.sort((a, b) => (a.attributes?.order || 0) - (b.attributes?.order || 0));
          setServices(sorted);
        }
      } catch (err) {
        console.error('Error fetching services:', err);
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
  if (!services || services.length === 0) return <div className="py-20 text-center">No services found</div>;

  return (
    <section className="py-20 bg-white">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="mb-12 text-center text-4xl font-bold">Our Services</h2>
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const attrs = service.attributes || service;
            const imageUrl = serviceImages[attrs.title];
            
            return (
              <div key={service.id} className="rounded-lg bg-gray-50 p-6 shadow-md transition hover:shadow-lg overflow-hidden">
                {imageUrl && (
                  <div className="mb-4 h-32 overflow-hidden rounded-lg">
                    <img 
                      src={imageUrl} 
                      alt={attrs.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <h3 className="mb-4 text-2xl font-bold">{attrs.title}</h3>
                <p className="text-gray-700">{extractText(attrs.description)}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}