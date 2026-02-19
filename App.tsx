import React from 'react';
import './index.css';

function App() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="landing-page">
      {/* Navbar */}
      <header className="navbar">
        <div className="logo-area">
          <span className="logo-icon">L</span>
          <span className="logo-text">Lais Rastely</span>
        </div>
        <nav className="menu-links">
          <button onClick={() => scrollToSection('beneficios')}>Benefícios</button>
          <button onClick={() => scrollToSection('depoimentos')}>Depoimentos</button>
          <button onClick={() => scrollToSection('precos')}>Preços</button>
        </nav>
        <button className="btn-enroll" onClick={() => scrollToSection('precos')}>Matricular Agora</button>
      </header>

      {/* Hero Section */}
      <section className="hero-container">
        <div className="hero-text">
          <span className="badge">✨ MÉTODO EXCLUSIVO 2024</span>
          <h1>Transforme sua <em className="pink-text">autoridade</em> em lucro real.</h1>
          <p>O método completo para mulheres que desejam construir um posicionamento de alto valor e vender todos os dias no digital.</p>
          <button className="cta-button" onClick={() => scrollToSection('precos')}>Quero me inscrever agora →</button>
        </div>
        <div className="hero-image">
          <img src="https://raw.githubusercontent.com/NeiBrito/LAISRASTELYCURSO/main/public/100.jpg" alt="Lais Rastely" />
        </div>
      </section>

      {/* Benefícios */}
      <section id="beneficios" className="section-padding grey-bg">
        <h2 className="section-title">O que você vai dominar</h2>
        <div className="cards-grid">
          <div className="card">
            <span className="icon">⭐</span>
            <h3>Personal Branding</h3>
            <p>Crie um perfil magnético que atrai os clientes certos sem esforço.</p>
          </div>
          <div className="card">
            <span className="icon">💰</span>
            <h3>Vendas High-Ticket</h3>
            <p>Aprenda a cobrar o quanto você realmente vale e pare de dar descontos.</p>
          </div>
          <div className="card">
            <span className="icon">🤝</span>
            <h3>Comunidade VIP</h3>
            <p>Network com outras mulheres de sucesso que buscam o topo.</p>
          </div>
        </div>
      </section>

      {/* Depoimentos */}
      <section id="depoimentos" className="section-padding">
        <h2 className="section-title">Alunas que faturam</h2>
        <div className="cards-grid">
          {[1, 2, 3].map((i) => (
            <div key={i} className="card testimonial">
              <div className="stars">⭐⭐⭐⭐⭐</div>
              <p>"O curso da Lais mudou completamente meu jogo no digital. No primeiro mês já recuperei 3x o valor do investimento."</p>
              <div className="user">
                <div className="avatar"></div>
                <span>Aluna {i}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Preços */}
      <section id="precos" className="section-padding dark-bg">
        <div className="pricing-card">
          <h3>Treinamento Completo</h3>
          <p className="old-price">R$ 1.997</p>
          <div className="current-price">
            <span>12x de</span>
            <span className="price-value">R$ 97,90</span>
          </div>
          <button className="cta-button large" onClick={() => window.location.href = '#'}>Garantir minha Vaga</button>
        </div>
      </section>
    </div>
  );
}

export default App;
