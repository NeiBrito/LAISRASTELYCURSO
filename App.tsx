import React from 'react';
import './index.css';

function App() {
  return (
    <div className="landing-page">
      <header className="navbar">
        <div className="logo-area">
          <span className="logo-icon">L</span>
          <span className="logo-text">Lais Rastely</span>
        </div>
        <nav className="menu-links">
          <a href="#beneficios">Benefícios</a>
          <a href="#depoimentos">Depoimentos</a>
          <a href="#precos">Preços</a>
        </nav>
        <button className="btn-enroll">Matricular Agora</button>
      </header>

      <section className="hero-container">
        <div className="hero-text">
          <span className="badge">✨ MÉTODO EXCLUSIVO 2024</span>
          <h1>Transforme sua <em className="pink-text">autoridade</em> em lucro real.</h1>
          <p>O método completo para mulheres que desejam construir um posicionamento de alto valor e vender todos os dias no digital.</p>
          <button className="cta-button">Quero me inscrever agora →</button>
        </div>
        <div className="hero-image">
          <img src="https://raw.githubusercontent.com/NeiBrito/LAISRASTELYCURSO/main/public/100.jpg" alt="Lais Rastely" />
        </div>
      </section>

      <section id="beneficios" className="section-padding">
        <h2 className="section-title">O que você vai dominar</h2>
        <div className="cards-grid">
          <div className="card"><h3>Personal Branding</h3><p>Crie um perfil magnético.</p></div>
          <div className="card"><h3>Vendas High-Ticket</h3><p>Aprenda a cobrar o quanto vale.</p></div>
          <div className="card"><h3>Comunidade VIP</h3><p>Network com mulheres de sucesso.</p></div>
        </div>
      </section>

      <section id="precos" className="section-padding dark-bg">
        <div className="pricing-card">
          <h3>Treinamento Completo</h3>
          <p className="price-value">R$ 97,90</p>
          <button className="cta-button">Garantir minha Vaga</button>
        </div>
      </section>
    </div>
  );
}

export default App;
