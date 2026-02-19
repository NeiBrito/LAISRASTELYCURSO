import React from 'react';
import './index.css';

function App() {
  return (
    <div className="landing-page">
      <header className="navbar">
        <div className="logo-area">
          <span className="logo-icon">L</span>
          <span style={{ fontWeight: 'bold', marginLeft: '10px' }}>Lais Rastely</span>
        </div>
        <nav className="menu-links">
          <a href="#beneficios">Benefícios</a>
          <a href="#depoimentos">Depoimentos</a>
          <a href="#precos">Preços</a>
        </nav>
        <div className="nav-buttons">
          <button className="btn-enroll">Matricular Agora</button>
        </div>
      </header>

      <section className="hero-container">
        <div className="hero-text">
          <span style={{ color: '#e91e63', fontWeight: 'bold' }}>✨ MÉTODO EXCLUSIVO 2024</span>
          <h1>Transforme sua <em className="pink-text">autoridade</em> em lucro real.</h1>
          <p style={{ fontSize: '1.2rem', color: '#444', marginBottom: '30px' }}>
            O método completo para mulheres que desejam construir um posicionamento de alto valor e vender todos os dias no digital.
          </p>
          <button className="cta-button">Quero me inscrever agora →</button>
        </div>
        <div className="hero-image">
          <img src="https://laisrastelycurso.vercel.app/100.jpg" alt="Lais Rastely" />
        </div>
      </section>
    </div>
  );
}

export default App;
