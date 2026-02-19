import React from 'react';
import './index.css';

function App() {
  return (
    <div className="landing-page">
      <header style={{ display: 'flex', justifyContent: 'space-between', padding: '20px 8%', alignItems: 'center' }}>
        <div style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
          <span style={{ background: '#e91e63', color: 'white', padding: '5px 12px', borderRadius: '50%', marginRight: '10px' }}>L</span>
          Lais Rastely
        </div>
        <button style={{ backgroundColor: '#e91e63', color: 'white', padding: '10px 25px', borderRadius: '50px', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>
          Matricular Agora
        </button>
      </header>

      <main style={{ display: 'flex', padding: '60px 8%', alignItems: 'center', gap: '40px' }}>
        <div style={{ flex: 1 }}>
          <span style={{ color: '#e91e63', fontWeight: 'bold' }}>✨ MÉTODO EXCLUSIVO 2024</span>
          <h1 style={{ fontSize: '3.5rem', margin: '20px 0', lineHeight: '1.1' }}>
            Transforme sua <em style={{ color: '#e91e63', fontStyle: 'italic' }}>autoridade</em> em lucro real.
          </h1>
          <p style={{ fontSize: '1.2rem', color: '#444', marginBottom: '30px' }}>
            O método completo para mulheres que desejam construir um posicionamento de alto valor e vender todos os dias no digital.
          </p>
          <button style={{ backgroundColor: '#e91e63', color: 'white', padding: '20px 40px', borderRadius: '12px', border: 'none', fontWeight: 'bold', fontSize: '1.1rem', cursor: 'pointer' }}>
            Quero me inscrever agora →
          </button>
        </div>
        <div style={{ flex: 1 }}>
          <img src="https://laisrastelycurso.vercel.app/100.jpg" alt="Lais" style={{ width: '100%', borderRadius: '30px', boxShadow: '20px 20px 0px #fce4ec' }} />
        </div>
      </main>
    </div>
  );
}

export default App;
