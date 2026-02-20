'use client';

import { useEffect, useState } from 'react';
import { fetchContact } from '@/services/api';

interface ContactData {
  id: number;
  attributes: {
    title: string;
    subtitle: string;
    buttonText: string;
  };
}

export default function ContactSection() {
  const [contact, setContact] = useState<ContactData | null>(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const loadContact = async () => {
      try {
        const data = await fetchContact();
        if (Array.isArray(data) && data.length > 0) {
          setContact(data[0]);
        }
      } catch (error) {
        console.error('Error loading contact:', error);
      } finally {
        setLoading(false);
      }
    };

    loadContact();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail('');
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  if (loading) return <div className="py-20 text-center">Loading...</div>;
  if (!contact) return <div className="py-20 text-center">No contact data</div>;

  const attrs = contact.attributes || contact;

  return (
    <section className="py-20 bg-gray-50">
      <div className="mx-auto max-w-2xl px-4 text-center">
        <h2 className="mb-4 text-4xl font-bold">{attrs.title}</h2>
        <p className="mb-8 text-xl text-gray-600">{attrs.subtitle}</p>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:flex-row sm:gap-2">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1 rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <button
            type="submit"
            className="rounded-lg bg-blue-600 px-6 py-3 font-bold text-white hover:bg-blue-700 transition"
          >
            {attrs.buttonText}
          </button>
        </form>

        {submitted && (
          <p className="mt-4 text-green-600 font-semibold">
            Thank you! We'll get in touch with you soon.
          </p>
        )}
      </div>
    </section>
  );
}