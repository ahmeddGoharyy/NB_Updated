import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

const Portfolio = () => {
  const [currentIndex, setCurrentIndex] = useState(4); // Start with center project (index 4) selected
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1400
  );

  useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isModalOpen]);

  // Escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsModalOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // 9 curated portfolio projects with rich details for the modal
  const projects = [
    {
      id: 1,
      title: 'Intelligent Automation Hub',
      category: 'AI Automations',
      description: 'A cutting-edge pipeline orchestrator utilizing advanced LLMs and robotic workflows to reduce manual operation overhead by 85%. Integration of high-frequency data pipelines enables businesses to react to process anomalies in sub-seconds.',
      img: 'https://images.unsplash.com/photo-1546484396-fb3fc6f95f98?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      tech: ['React', 'Python', 'FastAPI', 'OpenAI API', 'Docker'],
      timeline: '4 Months',
      role: 'Core Architecture & AI Integration',
      impact: 'Reduced manual administrative overhead by 85% and automated 1.2M events daily.'
    },
    {
      id: 2,
      title: 'Nilebyte Brand Identity',
      category: 'Creative Engineering',
      description: 'A premium digital identity design expressing Nilebyte’s dual nature: deeply rooted in historical Nile heritage while built for high-tech futures. Crafted absolute geometric branding guidelines, design tokens, and modular components.',
      img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      tech: ['Figma', 'Adobe CC', 'CSS3 Variables', 'React Components'],
      timeline: '2 Months',
      role: 'Creative Design & Branding',
      impact: 'Established cohesive brand presence across all global marketing assets.'
    },
    {
      id: 3,
      title: 'Cosmic Analytics Dashboard',
      category: 'Data Intelligence',
      description: 'A real-time data visualization platform presenting billions of data points with elegant glassmorphism and 3D sub-second querying latency. Built with robust safety structures to guarantee zero leaks on highly confidential intelligence streams.',
      img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      tech: ['TypeScript', 'Next.js', 'Apache Druid', 'D3.js', 'WebSockets'],
      timeline: '5 Months',
      role: 'Lead Frontend Engineer',
      impact: 'Reduced dashboard rendering lag by 92% and supported 10k concurrent sessions.'
    },
    {
      id: 4,
      title: 'Decentralized Systems Interface',
      category: 'Web Apps',
      description: 'An ultra-secure decentralized interface linking multi-chain networks with near-zero latency and state-of-the-art cryptographic proofs. Fully audited system ensuring trust and visual transparency across high-volume transactions.',
      img: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      tech: ['Solidity', 'Ethers.js', 'React', 'TailwindCSS', 'Web3Auth'],
      timeline: '3 Months',
      role: 'Smart Contract & Interface Lead',
      impact: 'Secured zero-exploit transactional throughput exceeding $4.2M.'
    },
    {
      id: 5,
      title: 'Smart Workflow Pipeline',
      category: 'Enterprise Architectures',
      description: 'A high-throughput enterprise event stream designed for massive scales, processing asynchronous tasks across global clouds. Implemented zero-downtime containerized architectures running seamlessly across AWS and Google Cloud nodes.',
      img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      tech: ['Kubernetes', 'Go', 'gRPC', 'RabbitMQ', 'Prometheus'],
      timeline: '6 Months',
      role: 'DevOps & Systems Architect',
      impact: 'Maintained 99.999% uptime through auto-scaling cluster protocols.'
    },
    {
      id: 6,
      title: 'Global Supply Chain Optimizer',
      category: 'Operations Tech',
      description: 'An AI-powered logistics tracking system routing containers across international seas in optimal time-windows. Minimizes container dead-time in ports using real-time predictive satellite meteorological streams.',
      img: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      tech: ['Python', 'TensorFlow', 'PostgreSQL GIS', 'React Leaflet'],
      timeline: '5 Months',
      role: 'AI Operations & Geospatial Dev',
      impact: 'Trimmed shipping transit delays by 14% and port wait times by 22%.'
    },
    {
      id: 7,
      title: 'Synthetic Voice Assistant',
      category: 'Cognitive Computing',
      description: 'Human-like conversational voice bot responding within 200 milliseconds to complex customer service queries. Includes advanced sentiment detection to adjust synthesized tone dynamically during high-stakes dialogues.',
      img: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      tech: ['Go', 'WebRTC', 'Triton Inference', 'LLaMA-3 Fine-tune'],
      timeline: '3 Months',
      role: 'NLP & Audio Pipeline Lead',
      impact: 'Successfully handled 80% of support inbound without human hand-off.'
    },
    {
      id: 8,
      title: 'Predictive Medical Diagnostic',
      category: 'Healthcare AI',
      description: 'A deep-learning model highlighting early clinical symptoms using non-invasive imaging scans with 99.4% precision. Developed with absolute adherence to global medical HIPAA regulations and privacy architectures.',
      img: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      tech: ['PyTorch', 'C++ Inference', 'DICOM Pipelines', 'Next.js Interface'],
      timeline: '7 Months',
      role: 'Deep Learning Research Lead',
      impact: 'Assisted local clinics in making diagnoses 4x faster with near-zero false negatives.'
    },
    {
      id: 9,
      title: 'Autonomous Security Agent',
      category: 'Cybersecurity',
      description: 'Self-healing firewall monitoring system detecting anomalous server behaviors and isolating host penetrations in real time. Actively simulates sandbox vectors to continuously reinforce central encryption parameters.',
      img: 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      tech: ['Rust', 'eBPF Kernel Probes', 'React Dashboard', 'Grafana APIs'],
      timeline: '6 Months',
      role: 'Security Engineer & System Dev',
      impact: 'Deflected 1.4k automated penetration attacks daily on protected servers.'
    }
  ];

  const services = [
    { num: '#01', label: 'Strategy & Planning' },
    { num: '#02', label: 'Design & Development' },
    { num: '#03', label: 'Launch & Growth' },
    { num: '#04', label: 'Ongoing Support' },
  ];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
  };

  const handleCardClick = (idx) => {
    if (idx === currentIndex) {
      setIsModalOpen(true);
    } else {
      setCurrentIndex(idx);
    }
  };

  const getCardStyle = (index) => {
    const total = projects.length;
    let diff = index - currentIndex;

    // Symmetrical wrapping calculation for infinite circular carousel
    if (diff < -total / 2) diff += total;
    if (diff > total / 2) diff -= total;

    const absDiff = Math.abs(diff);

    // Responsive configuration: 3 visible on mobile (diff <= 1), 5 visible on PC (diff <= 2)
    const isMobile = viewportWidth <= 768;
    const maxVisibleDiff = isMobile ? 1 : 2;

    // Hide any cards that exceed the allowed visible bounds for the current device
    const opacity = absDiff > maxVisibleDiff ? 0 : 1;
    const pointerEvents = absDiff > maxVisibleDiff ? 'none' : 'auto';

    // Optimize card sizes dynamically for gorgeous fanning layouts
    const cardWidth = isMobile
      ? viewportWidth * 0.44  // Perfect display aspect ratio on mobile screens
      : Math.min(380, viewportWidth * 0.22); // High-impact premium width on PC screens

    // Overlapping spacing: perfectly contiguous (sticked) with no whitespace gaps
    const spacingRatio = isMobile ? 0.72 : 0.74;
    const spacing = cardWidth * spacingRatio;
    const x = diff * spacing;

    // Parabolic Y-axis drop-down: center cards are highest, side cards drop down perfectly
    const yShift = Math.pow(diff, 2) * 14;

    // Exponential scaling matching the reference design layout beautifully
    const scale = Math.pow(isMobile ? 0.81 : 0.84, absDiff);

    // Calculate card height dynamically using the premium 1.38 aspect ratio
    const cardHeight = cardWidth * 1.38;

    return {
      transform: `translateX(${x}px) translateY(${yShift}px) scale(${scale})`,
      zIndex: total - absDiff,
      width: `${cardWidth}px`,
      height: `${cardHeight}px`,
      opacity: opacity,
      pointerEvents: pointerEvents,
    };
  };

  return (
    <section
      id="portfolio"
      className="portfolio-section"
      data-theme="light"
    >
      {/* Header */}
      <div className="portfolio-header">
        <h2 className="portfolio-heading">
          Curious What We've<br />Created?
        </h2>
        <p className="portfolio-subtitle">
          Explore our brand identities, platforms, and digital solutions crafted <br /> for businesses with different visions and purposes.
        </p>

        {/* Action Row containing CTA black button flanked by blue navigation buttons */}
        <div className="portfolio-actions-row">
          <button
            className="portfolio-action-btn"
            onClick={handlePrev}
            aria-label="Previous Project"
          >
            <ChevronLeft size={28} />
          </button>

          <div className="portfolio-info-pill">
            Click on any project to find its story
          </div>

          <button
            className="portfolio-action-btn"
            onClick={handleNext}
            aria-label="Next Project"
          >
            <ChevronRight size={28} />
          </button>
        </div>
      </div>

      {/* Full-Width Flat Overlapping Card Wrapper */}
      <div className="portfolio-arc-wrapper">
        {/* The 3D Track showing the continuous flat sticked fanning arc */}
        <div className="portfolio-arc-track">
          {projects.map((project, idx) => {
            const isActive = idx === currentIndex;
            return (
              <div
                key={project.id}
                className={`portfolio-arc-card ${isActive ? 'is-active' : ''}`}
                style={getCardStyle(idx)}
                onClick={() => handleCardClick(idx)}
              >
                <img
                  src={project.img}
                  alt={project.title}
                  className="portfolio-arc-img"
                  loading="lazy"
                />

                {/* Semi-transparent layover overlay - ONLY active on active center card hover */}
                {isActive && (
                  <div className="portfolio-card-overlay">
                    <span className="portfolio-card-overlay-text">
                      Press to find the whole story!
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Curated Selected Project Details (Fade in/up animation) */}
      <div
        key={currentIndex}
        className="portfolio-project-details-container animate-fade-in-up"
      >
        <span className="portfolio-project-category">
          {projects[currentIndex].category}
        </span>
        <h3 className="portfolio-project-title">
          {projects[currentIndex].title}
        </h3>
        <p className="portfolio-project-description">
          {projects[currentIndex].description}
        </p>
      </div>

      {/* Service Labels Row */}
      <div className="portfolio-services-row">
        {services.map((service, idx) => (
          <div key={idx} className="portfolio-service-item">
            <span className="portfolio-service-num">{service.num}</span>
            <span className="portfolio-service-label">{service.label}</span>
          </div>
        ))}
      </div>

      {/* ── HIGH-END CINEMATIC DETAILS MODAL ── */}
      {isModalOpen && (
        <div
          className="portfolio-modal-overlay"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="portfolio-modal-container"
            onClick={(e) => e.stopPropagation()} // Prevent close on modal contents click
          >
            {/* Circular Absolute Close Button */}
            <button
              className="portfolio-modal-close-btn"
              onClick={() => setIsModalOpen(false)}
              aria-label="Close details"
            >
              <X size={24} />
            </button>

            {/* Left Media Pane */}
            <div className="portfolio-modal-media-pane">
              <img
                src={projects[currentIndex].img}
                alt={projects[currentIndex].title}
                className="portfolio-modal-img"
              />
              <div className="portfolio-modal-media-overlay" />
            </div>

            {/* Right Scrollable Content Pane */}
            <div className="portfolio-modal-content-pane">
              <span className="portfolio-modal-category">
                {projects[currentIndex].category}
              </span>
              <h3 className="portfolio-modal-title">
                {projects[currentIndex].title}
              </h3>

              <div className="portfolio-modal-divider" />

              <h4 className="portfolio-modal-section-heading">Project Overview</h4>
              <p className="portfolio-modal-description">
                {projects[currentIndex].description}
              </p>

              {/* Dynamic Metadata Attributes */}
              <div className="portfolio-modal-metadata-grid">
                <div className="portfolio-modal-meta-item">
                  <span className="portfolio-modal-meta-label">Role</span>
                  <span className="portfolio-modal-meta-value">{projects[currentIndex].role}</span>
                </div>
                <div className="portfolio-modal-meta-item">
                  <span className="portfolio-modal-meta-label">Timeline</span>
                  <span className="portfolio-modal-meta-value">{projects[currentIndex].timeline}</span>
                </div>
              </div>

              {/* Business Impact block */}
              <div className="portfolio-modal-impact-card">
                <h5 className="portfolio-modal-impact-title">Key Impact Delivered</h5>
                <p className="portfolio-modal-impact-text">{projects[currentIndex].impact}</p>
              </div>

              {/* Technologies Tag Group */}
              <h4 className="portfolio-modal-section-heading">Technologies Deployed</h4>
              <div className="portfolio-modal-tech-tags">
                {projects[currentIndex].tech.map((t, idx) => (
                  <span key={idx} className="portfolio-modal-tech-tag">{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Portfolio;
