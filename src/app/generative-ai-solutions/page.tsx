'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface Feature {
  name: string;
  description: string;
  features: string[];
}

interface RichTextBlock {
  type: string;
  children: Array<{
    type: string;
    text: string;
  }>;
}

interface GenerativeAISolutionData {
  id: number;
  title: string;
  shortDescription: string | null;
  description: RichTextBlock[];
  subtitle: string;
  features: Feature[];
  keyBenefits: RichTextBlock[];
  industryUseCases: RichTextBlock[];
  whyChooseSection: RichTextBlock[];
  provenResultsDescription: string;
  ctaTitle: string;
  ctaDescription: string;
  ctaButtonText: string;
}

const extractTextFromBlock = (block: RichTextBlock): string => {
  return block.children?.map(child => child.text).join('') || '';
};

export default function GenerativeAISolutionsPage() {
  const [data, setData] = useState<GenerativeAISolutionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';
        
        const response = await fetch(
          `${apiUrl}/api/generative-ai-solutions?populate=*`,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.status}`);
        }

        const result = await response.json();
        
        if (result.data && result.data.length > 0) {
          setData(result.data[0]);
        } else if (result.data && !Array.isArray(result.data)) {
          setData(result.data);
        } else {
          throw new Error('No data found');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #050508 0%, #0a0a0f 50%, #0f0f18 100%)',
        color: 'white'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            display: 'inline-block',
            animation: 'spin 1s linear infinite',
            width: '48px',
            height: '48px',
            borderTop: '3px solid #00d4ff',
            borderRadius: '50%'
          }}></div>
          <p style={{ marginTop: '16px', color: '#9ca3af' }}>Loading...</p>
        </div>
        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #050508 0%, #0a0a0f 50%, #0f0f18 100%)',
        color: 'white'
      }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ color: '#ef4444', marginBottom: '8px' }}>Error loading content: {error}</p>
          <p style={{ color: '#9ca3af' }}>Please try again later</p>
        </div>
      </div>
    );
  }

  const parsedFeatures = Array.isArray(data.features) ? data.features : [];

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #050508 0%, #0a0a0f 50%, #0f0f18 100%)',
      color: '#e5e5e5',
      position: 'relative'
    }}>
      <div style={{ position: 'relative', zIndex: 50 }}>
        <Header />
      </div>
      
      {/* Ensure dark theme continues */}
      <style>{`
        body {
          background: linear-gradient(135deg, #050508 0%, #0a0a0f 50%, #0f0f18 100%);
          color: #e5e5e5;
        }
      `}</style>
      
      <div style={{ position: 'relative', zIndex: 10 }}>
      {/* Hero Section */}
      <section style={{
        padding: '120px 24px 80px',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h1 style={{
            fontSize: '48px',
            fontWeight: 'bold',
            marginBottom: '32px',
            background: 'linear-gradient(135deg, #00d4ff 0%, #7c3aed 50%, #06b6d4 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            color: 'transparent'
          }}>
            {data.title}
          </h1>
          <p style={{
            fontSize: '16px',
            color: '#9ca3af',
            maxWidth: '800px',
            margin: '0 auto 32px',
            lineHeight: 1.6
          }}>
            {extractTextFromBlock(data.description[0])}
          </p>
          <p style={{
            fontSize: '16px',
            color: '#9ca3af'
          }}>
            {data.subtitle}
          </p>
        </div>
      </section>

      {/* Solutions Section */}
      <section style={{
        padding: '80px 24px'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
            gap: '32px'
          }}>
            {parsedFeatures.map((feature: Feature, index: number) => (
              <div 
                key={index} 
                style={{
                  background: 'rgba(18, 18, 26, 0.8)',
                  padding: '32px',
                  borderRadius: '12px',
                  border: '1px solid rgba(255,255,255,0.1)',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  const element = e.currentTarget as HTMLElement;
                  element.style.boxShadow = '0 20px 40px rgba(0, 212, 255, 0.15)';
                  element.style.borderColor = 'rgba(0, 212, 255, 0.3)';
                }}
                onMouseLeave={(e) => {
                  const element = e.currentTarget as HTMLElement;
                  element.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
                  element.style.borderColor = 'rgba(255,255,255,0.1)';
                }}
              >
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: 'bold',
                  marginBottom: '16px',
                  color: 'white'
                }}>
                  {feature.name}
                </h3>
                <p style={{
                  fontSize: '14px',
                  color: '#9ca3af',
                  marginBottom: '16px',
                  lineHeight: 1.6
                }}>
                  {feature.description}
                </p>
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0
                }}>
                  {feature.features.map((item: string, idx: number) => (
                    <li key={idx} style={{
                      marginBottom: '12px',
                      display: 'flex',
                      alignItems: 'start',
                      fontSize: '14px'
                    }}>
                      <span style={{
                        color: '#00d4ff',
                        marginRight: '12px',
                        fontSize: '16px'
                      }}>✓</span>
                      <span style={{ color: '#9ca3af' }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Benefits Section */}
      <section style={{
        padding: '80px 24px'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '32px',
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: '16px',
            color: 'white'
          }}>
            Key Benefits
          </h2>
          <p style={{
            textAlign: 'center',
            color: '#9ca3af',
            marginBottom: '48px',
            fontSize: '16px'
          }}>
            Transform your business operations with measurable outcomes and competitive advantages
          </p>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '32px'
          }}>
            {data.keyBenefits.map((block: RichTextBlock, idx: number) => {
              const text = extractTextFromBlock(block);
              const [title, ...descParts] = text.split(' - ');
              const description = descParts.join(' - ');
              
              return (
                <div key={idx} style={{
                  background: 'rgba(18, 18, 26, 0.8)',
                  padding: '32px',
                  borderRadius: '12px',
                  border: '1px solid rgba(255,255,255,0.1)',
                  textAlign: 'center'
                }}>
                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: 'bold',
                    marginBottom: '12px',
                    color: 'white'
                  }}>
                    {title}
                  </h3>
                  <p style={{
                    color: '#9ca3af',
                    fontSize: '14px',
                    lineHeight: 1.6
                  }}>
                    {description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Industry Use Cases Section */}
      <section style={{
        padding: '80px 24px',
        background: 'rgba(18, 18, 26, 0.5)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '32px',
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: '16px',
            color: 'white'
          }}>
            Industry Use Cases
          </h2>
          <p style={{
            textAlign: 'center',
            color: '#9ca3af',
            marginBottom: '48px',
            fontSize: '16px'
          }}>
            Real-world applications across industries delivering transformational business outcomes
          </p>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '32px'
          }}>
            {data.industryUseCases.map((block: RichTextBlock, idx: number) => {
              const text = extractTextFromBlock(block);
              const [title, ...rest] = text.split(' - ');
              const content = rest.join(' - ');
              
              return (
                <div key={idx} style={{
                  background: 'rgba(18, 18, 26, 0.8)',
                  padding: '32px',
                  borderRadius: '12px',
                  border: '1px solid rgba(255,255,255,0.1)'
                }}>
                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: 'bold',
                    marginBottom: '12px',
                    color: 'white'
                  }}>
                    {title}
                  </h3>
                  <p style={{
                    color: '#9ca3af',
                    fontSize: '14px',
                    lineHeight: 1.6
                  }}>
                    {content}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section style={{
        padding: '80px 24px',
        background: 'rgba(18, 18, 26, 0.8)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '32px',
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: '16px',
            color: 'white'
          }}>
            Why Choose Our Generative AI Solutions
          </h2>
          <p style={{
            textAlign: 'center',
            color: '#9ca3af',
            marginBottom: '48px',
            fontSize: '16px'
          }}>
            Enterprise-grade capabilities designed for scale, security, and seamless integration
          </p>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '32px'
          }}>
            {data.whyChooseSection.map((block: RichTextBlock, idx: number) => {
              const text = extractTextFromBlock(block);
              const [title, ...descParts] = text.split(' - ');
              const description = descParts.join(' - ');
              
              return (
                <div key={idx} style={{
                  background: 'rgba(30, 30, 40, 0.9)',
                  padding: '32px',
                  borderRadius: '12px',
                  border: '1px solid rgba(255,255,255,0.1)'
                }}>
                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: 'bold',
                    marginBottom: '12px',
                    color: 'white'
                  }}>
                    {title}
                  </h3>
                  <p style={{
                    color: '#9ca3af',
                    fontSize: '14px',
                    lineHeight: 1.6
                  }}>
                    {description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Proven Results Section */}
      <section style={{
        padding: '80px 24px',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '32px',
            fontWeight: 'bold',
            marginBottom: '32px',
            color: 'white'
          }}>
            Proven Results
          </h2>
          <p style={{
            fontSize: '18px',
            color: '#9ca3af',
            lineHeight: 1.8
          }}>
            {data.provenResultsDescription}
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        padding: '80px 24px',
        background: 'linear-gradient(135deg, #050508 0%, #0a0a0f 50%, #0f0f18 100%)',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '32px',
            fontWeight: 'bold',
            marginBottom: '16px',
            color: 'white'
          }}>
            {data.ctaTitle}
          </h2>
          <p style={{
            fontSize: '18px',
            marginBottom: '32px',
            color: '#9ca3af'
          }}>
            {data.ctaDescription}
          </p>
          <button
            style={{
              background: 'linear-gradient(135deg, #00d4ff 0%, #7c3aed 100%)',
              color: 'white',
              padding: '16px 32px',
              borderRadius: '8px',
              fontWeight: 'bold',
              fontSize: '16px',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.9')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
          >
            {data.ctaButtonText}
          </button>
        </div>
      </section>

      {/* Back to Home Button */}
      <section style={{
        padding: '60px 24px',
        textAlign: 'center'
      }}>
        <a href="/homescreen" style={{ textDecoration: 'none' }}>
          <button
            style={{
              background: 'linear-gradient(135deg, #00d4ff 0%, #7c3aed 100%)',
              color: 'white',
              padding: '16px 32px',
              borderRadius: '8px',
              fontWeight: 'bold',
              fontSize: '16px',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.9')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
          >
            Back to Home
          </button>
        </a>
      </section>

      </div>

      <div style={{ position: 'relative', zIndex: 10 }}>
        <Footer />
      </div>
    </div>
  );
}