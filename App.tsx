import React from 'react';
import './index.css';

function App() {
  return (
    <div className="landing-page">
      <header className="navbar">
        <div className="logo-area">
          <span className="logo-icon" style={{ background: '#e91e63', color: 'white', padding: '5px 12px', borderRadius: '50%', fontWeight: 'bold' }}>L</span>
          <span style={{ fontWeight: 'bold', marginLeft: '10px' }}>Lais Rastely</span>
        </div>
        <div className="nav-buttons">
          <button className="btn-enroll">Matricular Agora</button>
        </div>
      </header>

      <section className="hero-container" style={{ display: 'flex', padding: '50px 8%', alignItems: 'center', gap: '40px' }}>
        <div className="hero-text" style={{ flex: 1 }}>
          <span style={{ color: '#e91e63', fontWeight: 'bold' }}>✨ MÉTODO EXCLUSIVO 2024</span>
          <h1 style={{ fontSize: '3.5rem', lineHeight: '1.1' }}>Transforme sua <em style={{ color: '#e91e63', fontStyle: 'italic' }}>autoridade</em> em lucro real.</h1>
          <p style={{ fontSize: '1.2rem', color: '#444' }}>O método completo para mulheres que desejam construir um posicionamento de alto valor.</p>
          <button className="cta-button" style={{ background: '#e91e63', color: 'white', padding: '20px 40px', border: 'none', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer' }}>Quero me inscrever agora →</button>
        </div>
        <div className="hero-image" style={{ flex: 1 }}>
          <img src="https://laisrastelycurso.vercel.app/100.jpg" alt="Lais" style={{ width: '100%', borderRadius: '30px' }} />
        </div>
      </section>
    </div>
  );
}

export default App;
