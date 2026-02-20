'use client';

import { useEffect, useState } from 'react';
import { fetchHeroSection } from '@/services/api';

interface HeroData {
  id: number;
  attributes: {
    title: string;
    subtitle: string;
    description: any;
    buttonText: string;
    buttonLink: string;
    backgroundImage?: {
      data?: {
        attributes?: {
          url: string;
        };
      };
    };
  };
}

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

export default function HeroSection() {
  const [hero, setHero] = useState<HeroData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHero = async () => {
      try {
        const data = await fetchHeroSection();
        if (Array.isArray(data) && data.length > 0) {
          setHero(data[0]);
        }
      } catch (error) {
        console.error('Error loading hero:', error);
      } finally {
        setLoading(false);
      }
    };
    loadHero();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!hero) return <div>No hero data</div>;

  const attrs = hero.attributes || hero;
  const descriptionText = extractText(attrs.description);
  const backgroundImageUrl = attrs.backgroundImage?.data?.attributes?.url;
  const fullImageUrl = backgroundImageUrl ? `http://localhost:1337${backgroundImageUrl}` : null;

  return (
    <section 
      className="relative py-20 text-white overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage: fullImageUrl ? `url(${fullImageUrl})` : 'linear-gradient(135deg, #2563eb 0%, #9333ea 100%)',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="relative mx-auto max-w-6xl px-4 text-center z-10">
        <h1 className="mb-4 text-5xl font-bold">{attrs.title}</h1>
        <p className="mb-6 text-xl">{attrs.subtitle}</p>
        <p className="mb-8 text-lg">{descriptionText}</p>
        <button className="rounded-lg bg-white px-8 py-3 font-bold text-blue-600 hover:bg-gray-100">
          {attrs.buttonText}
        </button>
      </div>
    </section>
  );
}