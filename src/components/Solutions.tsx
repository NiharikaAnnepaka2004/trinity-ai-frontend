'use client';

import { useEffect, useState } from 'react';
import { fetchSolutions } from '@/services/api';

interface Solution {
  id: number;
  documentId?: string;
  attributes: {
    title: string;
    description: any;
    shortDescription: string;
    benefits: any;
    image?: {
      data?: {
        attributes?: {
          url: string;
        };
      };
    };
  };
}

const solutionImages: Record<string, string> = {
  'Generative AI': 'http://localhost:1337/uploads/Gemini_Generated_Image_genai_brain_21ef878291.png',
  'Agentic AI': 'http://localhost:1337/uploads/Gemini_Generated_Image_robotautomation_8112aaa51f.png',
  'Machine Learning': 'http://localhost:1337/uploads/Gemini_Generated_Image_datachart_85174ac695.png'
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

export default function Solutions() {
  const [solutions, setSolutions] = useState<Solution[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const loadData = async () => {
      try {
        const data = await fetchSolutions();
        if (mounted && Array.isArray(data)) {
          setSolutions(data);
        }
      } catch (err) {
        console.error('Error fetching solutions:', err);
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
  if (!solutions || solutions.length === 0) return <div className="py-20 text-center">No solutions found</div>;

  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="mb-12 text-center text-4xl font-bold">Our Solutions</h2>
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {solutions.map((solution) => {
            const attrs = solution.attributes || solution;
            const imageUrl = solutionImages[attrs.title];
            
            return (
              <div key={solution.id} className="rounded-lg bg-white p-6 shadow-lg transition hover:shadow-xl overflow-hidden">
                {imageUrl && (
                  <div className="mb-4 h-48 overflow-hidden rounded-lg">
                    <img 
                      src={imageUrl} 
                      alt={attrs.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <h3 className="mb-3 text-2xl font-bold">{attrs.title}</h3>
                <p className="mb-4 text-gray-600">{attrs.shortDescription}</p>
                <p className="mb-4 text-gray-700">{extractText(attrs.description)}</p>
                <div className="text-sm text-blue-600 font-semibold">
                  {extractText(attrs.benefits)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}