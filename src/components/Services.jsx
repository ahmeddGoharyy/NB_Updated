import React from 'react';

const Services = () => {
  const services = [
    {
      title: 'Web3 Architecture',
      description: 'Robust, decentralized applications built with cutting-edge blockchain technologies and smart contracts.',
      icon: '⛓️'
    },
    {
      title: 'Cybersecurity',
      description: 'Military-grade encryption and security auditing to ensure your digital assets remain untouchable.',
      icon: '🛡️'
    },
    {
      title: 'Digital Innovation',
      description: 'Transformative digital experiences that push the boundaries of what is possible on the modern web.',
      icon: '⚡'
    }
  ];

  return (
    <section id="services" className="section">
      <div className="container">
        <h2>Our Expertise</h2>
        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <div className="service-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p style={{ marginTop: '1rem', opacity: 0.8 }}>{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
