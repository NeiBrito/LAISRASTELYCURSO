import React from 'react';
import './index.css';

function App() {
  return (
    <div className="App">
      <header>
        <div className="logo"><img src="/logo-pink.png" alt="L" style={{height: '40px'}} /> <strong>Lais Rastely</strong></div>
        <nav>
          <a href="#beneficios">Benefícios</a>
          <a href="#depoimentos">Depoimentos</a>
          <a href="#precos">Preços</a>
          <a href="#aluno" style={{color: 'var(--primary-pink)'}}>Área do Aluno</a>
          <a href="#checkout" className="btn-pink">Matricular Agora</a>
        </nav>
      </header>

      <section className="hero">
        <div className="hero-content">
          <span style={{color: 'var(--primary-pink)', fontWeight: 'bold'}}>✨ MÉTODO EXCLUSIVO 2024</span>
          <h1>Transforme sua <em>autoridade</em> em lucro real.</h1>
          <p>O método completo para mulheres que desejam construir um posicionamento de alto valor e vender todos os dias no digital.</p>
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
