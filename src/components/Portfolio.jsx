import React from 'react';

const Portfolio = () => {
  const projects = [
    { id: 1, title: 'E-Commerce Platform', category: 'Development', img: 'https://images.unsplash.com/photo-1661956602116-aa6865609028?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { id: 2, title: 'Brand Identity', category: 'Design', img: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { id: 3, title: 'Corporate Website', category: 'Web App', img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' }
  ];

  return (
    <section id="portfolio" className="section">
      <div className="container">
        <h2>Featured Work</h2>
        <div className="portfolio-grid">
          {projects.map(project => (
            <div key={project.id} className="portfolio-item">
              <img src={project.img} alt={project.title} loading="lazy" />
              <div className="portfolio-overlay">
                <h3>{project.title}</h3>
                <p>{project.category}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
