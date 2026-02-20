import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface Logo {
  id: number;
  name: string;
  url: string;
}

interface PartnershipData {
  id: number;
  documentId: string;
  title: string;
  description: any;
  logos: Logo[];
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

async function getPartnership() {
  const res = await fetch('http://localhost:1337/api/partnerships?populate=*', {
    cache: 'no-store'
  });
  const data = await res.json();
  return data.data[0];
}

export default async function PartnershipPage() {
  const partnership: PartnershipData = await getPartnership();
  const logos = Array.isArray(partnership.logos) ? partnership.logos : [];

  return (
    <>
      <Header />
      <main className="min-h-screen py-20 bg-gray-900">
        <div className="mx-auto max-w-6xl px-4">
          <h1 className="text-5xl font-bold mb-12 text-center text-white">{partnership.title}</h1>
          
          <div className="grid gap-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-6 items-center justify-center">
            {logos.map((logo: Logo) => (
              <div key={logo.id} className="flex items-center justify-center bg-black rounded-lg p-6 h-32">
                <img
                  src={`http://localhost:1337${logo.url}`}
                  alt={logo.name}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}