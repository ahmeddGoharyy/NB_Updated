import React, { useState } from 'react';
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import About from './components/About';
import Footer from './components/Footer';
import ScrollMoon from './components/ScrollMoon';

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      <div className={`app-container ${loading ? 'app-container--loading' : ''}`}>
        <ScrollMoon />
        <Navbar />
        <main>
          <Hero loading={loading} />
          <About />
          <Services />
          <Portfolio />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
