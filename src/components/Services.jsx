import React, { useState } from 'react';

const Services = () => {
  const [activeService, setActiveService] = useState(0);

  const servicesData = [
    {
      id: '01',
      title: 'Full-Stack Web Development',
      fileName: 'web-development.png',
      description: 'We architect high-performance, visually gorgeous web applications and digital platforms custom-tailored for your business scale. Built for speed, responsiveness, and premium user experience.',
      features: [
        'Responsive & High-Performance UI',
        'Robust API Architectures',
        'Scalable Cloud Hosting (AWS / Vercel)',
        'SEO & Core Web Vitals Optimized'
      ],
      tags: ['Next.js', 'Node.js', 'PostgreSQL', 'TailwindCSS'],
      visualType: 'web-dev'
    },
    {
      id: '02',
      title: 'Ai Automation Workflows',
      fileName: 'ai-automation.png',
      description: 'Infuse your daily business operations with custom artificial intelligence agents and machine learning pipelines designed to eliminate repetitive operational overhead and manual work.',
      features: [
        'Automated Email & Lead Sorting',
        'Document Parsing & Summarization',
        'Custom GPTs for Business Intel',
        'Multi-Agent Decision Pipelines'
      ],
      tags: ['OpenAI', 'LangChain', 'n8n', 'Make.com'],
      visualType: 'ai-automation'
    },
    {
      id: '03',
      title: 'Social Media Automations & Chabots',
      fileName: 'chatbot-interface.png',
      description: 'Keep your channels active 24/7 with human-like, high-conversion conversational chatbots and comment auto-responders that capture leads and sync to your CRM instantly.',
      features: [
        '24/7 Omnichannel AI Chatbots',
        'Automated Comment-to-DM Funnels',
        'Seamless Human Agent Handoff',
        'Lead Capture & CRM Syncing'
      ],
      tags: ['Instagram', 'WhatsApp', 'Messenger', 'HubSpot'],
      visualType: 'chatbots'
    },
    {
      id: '04',
      title: 'Internal Management Solutions',
      fileName: 'management-dashboard.png',
      description: 'Bespoke administrative tools, secure databases, and operational dashboards designed to centralize company data and streamline collaboration between all departments.',
      features: [
        'Custom Admin Dashboards',
        'Secure Role-Based Access Control',
        'Automated Reporting Pipelines',
        'Legacy Database Modernization'
      ],
      tags: ['React Admin', 'GraphQL', 'Firebase', 'Retool'],
      visualType: 'internal-tools'
    },
    {
      id: '05',
      title: 'Mini ERP System',
      fileName: 'mini-erp-tracker.png',
      description: 'A modular, high-speed Enterprise Resource Planning system to track assets, handle invoicing, and manage inventory without any of the bloated complex overhead.',
      features: [
        'Inventory & Asset Tracking',
        'Sales Funnel & Invoice Generator',
        'Expense & Financial Analytics',
        'Project & Milestone Management'
      ],
      tags: ['Inventory', 'Invoices', 'Analytics', 'SaaS Lite'],
      visualType: 'mini-erp'
    },
    {
      id: '06',
      title: 'Customize your Solution!',
      fileName: 'custom-blueprint.png',
      description: 'Got a unique business challenge that standard software can\'t solve? Partner with our senior technical architects to design, scope, and engineer custom systems designed for your exact vision.',
      features: [
        'Deep Technical Consultation',
        'Interactive Prototype Design',
        'Agile Development Cycles',
        'Zero-Downtime Deployment & Support'
      ],
      tags: ['Bespoke R&D', 'Consultation', 'Scalable Scale', 'Full-Support'],
      visualType: 'custom'
    }
  ];

  // Render a highly high-fidelity visual mock depending on active service
  const renderVisualMock = (type) => {
    switch (type) {
      case 'web-dev':
        return (
          <div className="visual-mockup browser-mock">
            <div className="browser-mock-header">
              <div className="browser-dots">
                <span className="b-dot"></span>
                <span className="b-dot"></span>
                <span className="b-dot"></span>
              </div>
              <div className="browser-address">https://nilebyte.com/dashboard</div>
            </div>
            <div className="browser-mock-body">
              <div className="mock-saas-header">
                <div className="mock-logo">NB.dev</div>
                <div className="mock-nav"></div>
              </div>
              <div className="mock-saas-chart-grid">
                <div className="mock-saas-card mini">
                  <span className="card-label">Active Users</span>
                  <span className="card-value">12.4k</span>
                </div>
                <div className="mock-saas-card mini">
                  <span className="card-label">Conversion</span>
                  <span className="card-value">+24%</span>
                </div>
              </div>
              <div className="mock-saas-card main-chart">
                <div className="chart-bar-container">
                  <div className="chart-bar" style={{ height: '40%' }}></div>
                  <div className="chart-bar" style={{ height: '60%' }}></div>
                  <div className="chart-bar" style={{ height: '80%' }}></div>
                  <div className="chart-bar" style={{ height: '55%' }}></div>
                  <div className="chart-bar" style={{ height: '95%' }}></div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'ai-automation':
        return (
          <div className="visual-mockup workflow-mock">
            <div className="workflow-nodes">
              <div className="w-node trigger">
                <span className="node-icon">⚡</span>
                <span className="node-label">New Lead</span>
              </div>
              <div className="w-line animated"></div>
              <div className="w-node brain-node">
                <span className="node-icon glowing">🧠</span>
                <span className="node-label">AI Agent</span>
              </div>
              <div className="w-line animated"></div>
              <div className="w-node action">
                <span className="node-icon">📧</span>
                <span className="node-label">Auto Reply</span>
              </div>
            </div>
          </div>
        );
      case 'chatbots':
        return (
          <div className="visual-mockup chat-mock">
            <div className="chat-mock-header">
              <span className="chat-avatar">🤖</span>
              <div className="chat-meta">
                <span className="chat-name">Nilebyte AI</span>
                <span className="chat-status">Online</span>
              </div>
            </div>
            <div className="chat-mock-body">
              <div className="chat-bubble user">How can I automate my sales?</div>
              <div className="chat-bubble bot">
                Hey there! We can set up automated comment-to-DM funnels that capture leads in under 2 seconds. ⚡
              </div>
              <div className="chat-typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        );
      case 'internal-tools':
        return (
          <div className="visual-mockup dashboard-mock">
            <div className="mock-grid">
              <div className="mock-sidebar">
                <div className="sidebar-line"></div>
                <div className="sidebar-line"></div>
                <div className="sidebar-line"></div>
              </div>
              <div className="mock-main">
                <div className="mock-header-row"></div>
                <div className="mock-stats-row">
                  <div className="circle-stat">
                    <svg viewBox="0 0 36 36" className="circular-chart">
                      <path className="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                      <path className="circle" strokeDasharray="75, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                    </svg>
                    <span className="circle-val">75%</span>
                  </div>
                  <div className="circle-stat-info">
                    <span className="info-title">Tasks Completed</span>
                    <span className="info-subtitle">Operations sync active</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'mini-erp':
        return (
          <div className="visual-mockup erp-mock">
            <div className="erp-table">
              <div className="erp-row header">
                <span>Item</span>
                <span>Stock</span>
                <span>Status</span>
              </div>
              <div className="erp-row">
                <span>Core Servers</span>
                <span>42 units</span>
                <span className="status-badge ok">Optimal</span>
              </div>
              <div className="erp-row">
                <span>API Hubs</span>
                <span>12 units</span>
                <span className="status-badge alert">Low Stock</span>
              </div>
              <div className="erp-row">
                <span>DB Clusters</span>
                <span>8 units</span>
                <span className="status-badge ok">Optimal</span>
              </div>
            </div>
          </div>
        );
      case 'custom':
      default:
        return (
          <div className="visual-mockup blueprint-mock">
            <div className="blueprint-grid">
              <div className="bp-circle main"></div>
              <div className="bp-line connection-1"></div>
              <div className="bp-line connection-2"></div>
              <div className="bp-node bp-1">API</div>
              <div className="bp-node bp-2">DB</div>
              <div className="bp-node bp-3">UI</div>
            </div>
          </div>
        );
    }
  };

  return (
    <section id="services" className="services-section">
      {/* Central Centered Split Header */}
      <div className="services-central-header">
        <h2 className="services-main-title">
          <span className="title-our">Our</span> <span className="title-services">Services</span>
        </h2>
      </div>

      {/* Left Column - Royal Blue Background (43% width) - Holds Choice Buttons numbered on the right */}
      <div className="services-left-pane">
        <div className="services-left-content">
          <div className="services-toggles-container blue-theme">
            {servicesData.map((service, index) => (
              <button
                key={service.id}
                className={`service-toggle-button blue-pane ${activeService === index ? 'active' : ''}`}
                onClick={() => setActiveService(index)}
                aria-label={`Select ${service.title}`}
              >
                <span className="toggle-button-text">{service.title}</span>
                <span className="toggle-button-number">{service.id}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Right Column - Slate Gray Background (57% width) - Holds the Big Container with Photo & Info */}
      <div className="services-right-pane">
        <div className="services-right-content">
          {/* macOS-style Info Window Container */}
          <div className="services-window-card preview-card">
            {/* Window Header Bar */}
            <div className="services-window-header">
              <div className="services-window-controls">
                <span className="window-control-dot red"></span>
                <span className="window-control-dot orange"></span>
                <span className="window-control-dot green"></span>
              </div>
              <span className="services-window-title">
                {servicesData[activeService].fileName}
              </span>
            </div>

            {/* Window Body - Displays Photo/Visual Mock and Rich Text Info */}
            <div className="services-window-body">
              {/* Top Visual Panel (Photo / Mockup showcase) */}
              <div className="service-visual-panel">
                {renderVisualMock(servicesData[activeService].visualType)}
              </div>

              {/* Bottom Information Panel */}
              <div className="service-info-panel">
                <h3 className="active-service-heading">
                  {servicesData[activeService].title}
                </h3>
                <p className="active-service-description">
                  {servicesData[activeService].description}
                </p>

                {/* Tech Stack / Tags */}
                <div className="active-service-tags">
                  {servicesData[activeService].tags.map((tag, idx) => (
                    <span key={idx} className="active-tag">{tag}</span>
                  ))}
                </div>

                <div className="active-service-bullets-divider"></div>

                {/* Key Benefits List */}
                <ul className="active-service-bullets">
                  {servicesData[activeService].features.map((feature, idx) => (
                    <li key={idx} className="active-bullet-item">
                      <span className="active-bullet-star">✦</span>
                      <span className="active-bullet-text">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
