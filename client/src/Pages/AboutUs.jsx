import React, { useState, useEffect } from 'react';

const AboutUs = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isVisible, setIsVisible] = useState({});

  useEffect(() => {
    const handleScroll = () => {
      const position = window.pageYOffset;
      setScrollPosition(position);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleVisibility = () => {
      const aboutSection = document.getElementById('about');
      const servicesSection = document.getElementById('services');
      const contactSection = document.getElementById('contact');

      if (aboutSection) setIsVisible(prev => ({ ...prev, about: isElementInViewport(aboutSection) }));
      if (servicesSection) setIsVisible(prev => ({ ...prev, services: isElementInViewport(servicesSection) }));
      if (contactSection) setIsVisible(prev => ({ ...prev, contact: isElementInViewport(contactSection) }));
    };

    window.addEventListener('scroll', handleVisibility);
    handleVisibility();
    return () => {
      window.removeEventListener('scroll', handleVisibility);
    };
  }, []);

  const isElementInViewport = (el) => {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  };

  const parallaxStyle = {
    backgroundImage: 'url("https://images.unsplash.com/photo-1505664194779-8beaceb93744?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80")',
    backgroundAttachment: 'fixed',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f0f4f8',
      overflowX: 'hidden',
    }}>
      <style>
        {`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .fade-in-up {
            animation: fadeInUp 0.6s ease-out;
          }
          .service-card {
            transition: all 0.3s ease;
          }
          .service-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
          }
        `}
      </style>
      <header style={{
        backgroundColor: 'rgba(26, 54, 93, 0.9)',
        color: 'white',
        padding: '1rem 0',
        position: 'fixed',
        width: '100%',
        zIndex: 1000,
        transition: 'background-color 0.3s ease',
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>JurisVision</h1>
          <nav>
            <ul style={{ display: 'flex', gap: '2rem', listStyle: 'none' }}>
              {['PatentAnalysis', 'ChatBot', 'Login' , 'LawyerSearch'].map((item) => (
                <li key={item}>
                  <a 
                    href={`${item.toLowerCase()}`} 
                    style={{ 
                      color: 'white', 
                      textDecoration: 'none',
                      position: 'relative',
                      transition: 'color 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.color = '#4299e1';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.color = 'white';
                    }}
                  >
                    {item}
                    <span style={{
                      position: 'absolute',
                      bottom: '-5px',
                      left: '0',
                      width: '0',
                      height: '2px',
                      backgroundColor: '#4299e1',
                      transition: 'width 0.3s ease',
                    }}></span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      <main style={{ flex: 1 }}>
        <section id="hero" style={{
          ...parallaxStyle,
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          textAlign: 'center',
        }}>
          <div style={{
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            padding: '2rem',
            borderRadius: '10px',
            maxWidth: '800px',
          }}>
            <h2 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Revolutionizing Legal Analysis with AI</h2>
            <p style={{ fontSize: '1.25rem', lineHeight: '1.6' }}>
              JurisVision is at the forefront of legal technology, combining artificial intelligence with expert legal knowledge to transform the way legal professionals work.
            </p>
          </div>
        </section>

        <section id="about" className={isVisible.about ? 'fade-in-up' : ''} style={{
          maxWidth: '1000px',
          margin: '4rem auto',
          padding: '0 2rem',
        }}>
          <h2 style={{ fontSize: '2.5rem', color: '#2c5282', marginBottom: '2rem', textAlign: 'center' }}>About Us</h2>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
            Founded in 2022, JurisVision is a pioneering legal tech company dedicated to enhancing the efficiency and accuracy of legal work through advanced AI technologies. Our team of legal experts, data scientists, and software engineers work together to create cutting-edge solutions for law firms, corporate legal departments, and individual practitioners.
          </p>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
            We believe in the power of technology to augment human expertise, not replace it. Our AI-driven tools are designed to handle time-consuming tasks, allowing legal professionals to focus on high-value, strategic work that truly benefits their clients.
          </p>
        </section>

        <section id="services" className={isVisible.services ? 'fade-in-up' : ''} style={{
          backgroundColor: 'white',
          padding: '4rem 2rem',
        }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '2.5rem', color: '#2c5282', marginBottom: '2rem', textAlign: 'center' }}>Our Services</h2>
            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              {[
                { title: 'AI-Powered Patent Analysis', description: 'Quickly analyze patents for novelty, infringement risks, and market potential.' },
                { title: 'Legal Research Assistant', description: 'Efficient case law research and summary generation using natural language processing.' },
                { title: 'Contract Review & Analysis', description: 'Automated contract review to identify risks, obligations, and opportunities.' },
                { title: 'Predictive Analytics', description: 'Data-driven insights to predict case outcomes and optimize legal strategies.' }
              ].map((service, index) => (
                <div key={index} className="service-card" style={{
                  backgroundColor: '#e2e8f0',
                  borderRadius: '8px',
                  padding: '1.5rem',
                  width: 'calc(50% - 1rem)',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                }}>
                  <h3 style={{ fontSize: '1.5rem', color: '#2c5282', marginBottom: '1rem' }}>{service.title}</h3>
                  <p style={{ fontSize: '1rem', lineHeight: '1.5' }}>{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className={isVisible.contact ? 'fade-in-up' : ''} style={{
          maxWidth: '1000px',
          margin: '4rem auto',
          padding: '0 2rem',
          textAlign: 'center',
        }}>
          <h2 style={{ fontSize: '2.5rem', color: '#2c5282', marginBottom: '2rem' }}>Contact Us</h2>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '2rem' }}>
            Reach out to us for any inquiries or to learn more about how we can help your legal practice.
          </p>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
            Email: contact@jurisvision.com
          </p>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
            Phone: +1 123 456 7890
          </p>
        </section>
      </main>
    </div>
  );
};

export default AboutUs;
