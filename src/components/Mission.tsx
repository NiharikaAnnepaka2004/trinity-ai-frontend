'use client';

import { useEffect, useState } from 'react';
import { fetchMission } from '@/services/api';

interface MissionData {
  id: number;
  attributes: {
    title: string;
    content: any;
    learnMoreLink: string;
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
      .join('\n\n');
  }
  return '';
}

export default function Mission() {
  const [mission, setMission] = useState<MissionData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMission = async () => {
      try {
        const data = await fetchMission();
        if (Array.isArray(data) && data.length > 0) {
          setMission(data[0]);
        }
      } catch (error) {
        console.error('Error loading mission:', error);
      } finally {
        setLoading(false);
      }
    };

    loadMission();
  }, []);

  if (loading) return <div className="py-20 text-center">Loading...</div>;
  if (!mission) return <div className="py-20 text-center">No mission data</div>;

  const attrs = mission.attributes || mission;

  return (
    <section className="py-20 bg-white">
      <div className="mx-auto max-w-4xl px-4">
        <h2 className="mb-8 text-4xl font-bold text-center">{attrs.title}</h2>
        <div className="text-gray-700 text-center whitespace-pre-wrap leading-relaxed">
          <p className="mb-6">{extractText(attrs.content)}</p>
          {attrs.learnMoreLink && (
            <a 
              href={attrs.learnMoreLink}
              className="inline-block mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Learn More
            </a>
          )}
        </div>
      </div>
    </section>
  );
}