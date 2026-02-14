
import React, { useState } from 'react';
import { CheckCircle2, Star, ShieldCheck, PlayCircle, Users, ArrowRight, Sparkles, X, FileText, Lock } from 'lucide-react';

interface LandingPageProps {
  onLoginClick: () => void;
  onBuyClick: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onLoginClick, onBuyClick }) => {
  const [activeModal, setActiveModal] = useState<'terms' | 'privacy' | null>(null);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      // Compensação para o header fixo (h-20 = 80px) + um pouco de respiro
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-brand-dark scroll-smooth">
      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-brand-accent/30">
        <div className="max-w-7xl mx-auto px-4 h-20 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-brand-primary rounded-full flex items-center justify-center text-white font-bold text-xl">L</div>
            <span className="font-serif text-xl font-bold tracking-tight">Lais Rastely</span>
          </div>
          <div className="hidden md:flex gap-8 font-medium">
            <a 
              href="#beneficios" 
              onClick={(e) => scrollToSection(e, 'beneficios')}
              className="text-gray-600 hover:text-brand-primary transition-colors cursor-pointer"
            >
              Benefícios
            </a>
            <a 
              href="#depoimentos" 
              onClick={(e) => scrollToSection(e, 'depoimentos')}
              className="text-gray-600 hover:text-brand-primary transition-colors cursor-pointer"
            >
              Depoimentos
            </a>
            <a 
              href="#precos" 
              onClick={(e) => scrollToSection(e, 'precos')}
              className="text-gray-600 hover:text-brand-primary transition-colors cursor-pointer"
            >
              Preços
            </a>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={onLoginClick}
              className="px-6 py-2 text-brand-primary font-semibold hover:bg-brand-accent rounded-full transition-all text-sm"
            >
              Área do Aluno
            </button>
            <button 
              onClick={onBuyClick}
              className="hidden sm:block px-6 py-2 bg-brand-primary text-white font-semibold rounded-full hover:shadow-lg hover:shadow-brand-primary/30 transition-all text-sm"
            >
              Matricular Agora
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 text-center lg:text-left animate-in fade-in slide-in-from-left duration-700">
            <div className="inline-flex items-center gap-2 bg-brand-accent/50 text-brand-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
              <Sparkles size={14} /> Método Exclusivo 2024
            </div>
            <h1 className="font-serif text-5xl md:text-7xl font-bold leading-tight mb-6">
              Transforme sua <span className="text-brand-primary italic">autoridade</span> em lucro real.
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium italic">
              O método completo para mulheres que desejam construir um posicionamento de alto valor e vender todos os dias no digital.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button 
                onClick={onBuyClick}
                className="w-full sm:w-auto px-8 py-4 bg-brand-primary text-white text-lg font-bold rounded-2xl hover:bg-brand-secondary transition-all flex items-center justify-center gap-2 shadow-xl shadow-brand-primary/20 hover:scale-105"
              >
                Quero me inscrever agora <ArrowRight size={20} />
              </button>
              <div className="flex items-center gap-2 text-gray-400 text-sm font-medium">
                <ShieldCheck size={18} className="text-green-500" />
                Compra 100% segura e garantida
              </div>
            </div>
          </div>
          <div className="flex-1 relative animate-in fade-in slide-in-from-right duration-700">
            <div className="absolute -inset-4 bg-brand-accent rounded-full blur-3xl opacity-50 animate-pulse"></div>
            <img 
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=688&auto=format&fit=crop" 
              alt="Lais Rastely" 
              className="relative w-full max-w-md mx-auto rounded-[40px] shadow-2xl border-8 border-white object-cover aspect-[4/5]"
            />
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section id="beneficios" className="py-32 bg-brand-light">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4 italic">O que você vai dominar</h2>
            <div className="w-20 h-1 bg-brand-primary mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Personal Branding", desc: "Crie um perfil magnético que atrai os clientes certos sem esforço.", icon: <Star className="text-brand-primary" /> },
              { title: "Vendas High-Ticket", desc: "Aprenda a cobrar o quanto você realmente vale e pare de dar descontos.", icon: <PlayCircle className="text-brand-primary" /> },
              { title: "Comunidade VIP", desc: "Network com outras mulheres de sucesso que buscam o topo.", icon: <Users className="text-brand-primary" /> }
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-10 rounded-[40px] shadow-sm border border-brand-accent/20 hover:shadow-2xl transition-all group">
                <div className="w-16 h-16 bg-brand-accent/30 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-serif font-bold mb-4">{item.title}</h3>
                <p className="text-gray-500 leading-relaxed italic">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="depoimentos" className="py-32">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4 italic">Alunas que faturam</h2>
            <p className="text-gray-400 italic">Mais de 5.000 vidas transformadas em todo o mundo.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm hover:shadow-xl transition-all">
                <div className="flex gap-1 mb-6">
                  {[1, 2, 3, 4, 5].map(s => <Star key={s} size={16} fill="#E91E63" className="text-brand-primary" />)}
                </div>
                <p className="text-gray-600 italic mb-8 leading-relaxed">"O curso da Lais mudou completamente meu jogo no digital. No primeiro mês já recuperei 3x o valor do investimento."</p>
                <div className="flex items-center gap-4">
                  <img src={`https://picsum.photos/seed/student${i}/100`} alt="Aluna" className="w-12 h-12 rounded-full ring-2 ring-brand-accent" />
                  <div>
                    <span className="block font-bold text-sm">Aluna {i}</span>
                    <span className="block text-[10px] text-gray-400 font-bold uppercase tracking-widest">Empreendedora</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section (New) */}
      <section id="precos" className="py-32 bg-brand-dark text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4 italic">Escolha o seu Futuro</h2>
            <p className="text-gray-400 italic">Investimento único para acesso vitalício à plataforma premium.</p>
          </div>
          
          <div className="max-w-lg mx-auto">
            <div className="bg-white text-brand-dark p-12 rounded-[50px] shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 bg-brand-primary text-white text-[10px] font-bold px-8 py-2 rotate-45 translate-x-1/4 -translate-y-1/4 shadow-lg">OFFER</div>
              
              <h3 className="text-3xl font-serif font-bold italic mb-2">Treinamento Completo</h3>
              <p className="text-gray-400 text-sm font-bold uppercase tracking-widest mb-10">Método Lais Rastely</p>
              
              <div className="mb-10">
                <span className="text-gray-400 line-through text-lg">R$ 1.997</span>
                <div className="flex items-center justify-center gap-2 mt-2">
                  <span className="text-sm font-bold">12x de</span>
                  <span className="text-6xl font-serif font-bold text-brand-primary italic">R$ 97,90</span>
                </div>
                <p className="text-sm text-gray-500 mt-4 italic font-medium">Ou R$ 997,00 à vista</p>
              </div>

              <ul className="text-left space-y-4 mb-12">
                {[
                  "Acesso vitalício à plataforma",
                  "Módulos do básico ao avançado",
                  "Certificado de conclusão",
                  "Material didático em PDF",
                  "Suporte exclusivo na área de membros",
                  "Comunidade de alunas no Telegram"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-sm font-medium italic">
                    <CheckCircle2 size={18} className="text-brand-primary shrink-0" /> {item}
                  </li>
                ))}
              </ul>

              <button 
                onClick={onBuyClick}
                className="w-full bg-brand-primary text-white py-5 rounded-[24px] font-bold text-lg hover:bg-brand-secondary transition-all shadow-xl shadow-brand-primary/20 flex items-center justify-center gap-2"
              >
                Garantir minha Vaga <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-brand-accent/30 py-20 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-brand-primary rounded-full flex items-center justify-center text-white font-bold text-xl">L</div>
              <span className="font-serif text-2xl font-bold italic">Lais Rastely</span>
            </div>
            <p className="text-gray-400 text-xs font-medium tracking-widest uppercase">Transformando autoridade em lucro real © 2024</p>
          </div>
          <div className="flex gap-10 text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400">
            <button 
              onClick={() => setActiveModal('terms')}
              className="hover:text-brand-primary transition-colors uppercase"
            >
              Termos de Uso
            </button>
            <button 
              onClick={() => setActiveModal('privacy')}
              className="hover:text-brand-primary transition-colors uppercase"
            >
              Privacidade
            </button>
          </div>
        </div>
      </footer>

      {/* Modals */}
      {activeModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-brand-dark/50 backdrop-blur-sm" onClick={() => setActiveModal(null)}></div>
          <div className="relative w-full max-w-2xl bg-white rounded-[32px] p-8 md:p-12 shadow-2xl animate-in zoom-in duration-300 max-h-[80vh] flex flex-col">
            <button 
              onClick={() => setActiveModal(null)}
              className="absolute top-6 right-6 p-2 bg-gray-50 hover:bg-red-50 hover:text-red-500 rounded-full transition-all text-gray-400"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-3 mb-8 text-brand-primary">
              {activeModal === 'terms' ? <FileText size={32} /> : <Lock size={32} />}
              <h2 className="font-serif text-2xl font-bold italic">
                {activeModal === 'terms' ? 'Termos de Uso' : 'Política de Privacidade'}
              </h2>
            </div>

            <div className="overflow-y-auto pr-4 text-gray-600 leading-relaxed text-sm space-y-4 font-medium">
              {activeModal === 'terms' ? (
                <>
                  <p>1. <strong>Aceitação dos Termos:</strong> Ao acessar a plataforma Lais Rastely Curso, você concorda com estes termos de serviço, todas as leis e regulamentos aplicáveis.</p>
                  <p>2. <strong>Uso da Licença:</strong> É concedida permissão para baixar temporariamente uma cópia dos materiais (informações ou software) no site apenas para visualização transitória pessoal e não comercial.</p>
                  <p>3. <strong>Propriedade Intelectual:</strong> Todo o conteúdo, incluindo vídeos, textos e materiais de apoio, é de propriedade exclusiva de Lais Rastely. É estritamente proibida a distribuição, compartilhamento de acesso ou reprodução não autorizada.</p>
                  <p>4. <strong>Cancelamento e Reembolso:</strong> O prazo para solicitação de reembolso é de 7 dias corridos após a confirmação da compra, conforme previsto no Código de Defesa do Consumidor.</p>
                  <p>5. <strong>Modificações:</strong> Lais Rastely pode revisar estes termos de serviço a qualquer momento, sem aviso prévio.</p>
                </>
              ) : (
                <>
                  <p>1. <strong>Coleta de Dados:</strong> Coletamos informações pessoais apenas quando realmente precisamos delas para lhe fornecer um serviço. Fazemo-lo por meios justos e legais, com o seu conhecimento e consentimento.</p>
                  <p>2. <strong>Uso das Informações:</strong> Apenas retemos as informações coletadas pelo tempo necessário para fornecer o serviço solicitado. Quando armazenamos dados, protegemos dentro de meios comercialmente aceitáveis ​​para evitar perdas e roubos.</p>
                  <p>3. <strong>Compartilhamento:</strong> Não compartilhamos informações de identificação pessoal publicamente ou com terceiros, exceto quando exigido por lei.</p>
                  <p>4. <strong>Cookies:</strong> Utilizamos cookies para melhorar a experiência do usuário e analisar o tráfego da plataforma.</p>
                  <p>5. <strong>Compromisso do Usuário:</strong> O usuário se compromete a fazer uso adequado dos conteúdos e informações que o Lais Rastely Curso oferece no site.</p>
                </>
              )}
            </div>

            <div className="mt-8 pt-8 border-t border-gray-100 flex justify-end">
              <button 
                onClick={() => setActiveModal(null)}
                className="px-8 py-3 bg-brand-primary text-white rounded-xl font-bold hover:bg-brand-secondary transition-all text-sm shadow-lg shadow-brand-primary/20"
              >
                Entendi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
