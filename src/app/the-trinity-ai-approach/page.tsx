import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface ApproachData {
  id: number;
  attributes: {
    title: string;
    description: any;
    content: any;
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

async function getApproach() {
  const res = await fetch('http://localhost:1337/api/approaches', {
    cache: 'no-store'
  });
  const data = await res.json();
  return data.data[0];
}

export default async function ApproachPage() {
  const approach: ApproachData = await getApproach();
  const attrs = approach.attributes || approach;

  return (
    <>
      <Header />
      <main className="min-h-screen py-20">
        <div className="mx-auto max-w-4xl px-4">
          <h1 className="text-5xl font-bold mb-8 text-center">{attrs.title}</h1>
          <p className="text-xl text-gray-600 text-center mb-12">{extractText(attrs.description)}</p>
          
          <div className="prose prose-lg max-w-none text-gray-700 whitespace-pre-wrap leading-relaxed">
            {extractText(attrs.content)}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}