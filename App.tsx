
import React, { useState, useEffect } from 'react';
import { AuthState, User, UserRole, UserStatus } from './types';
import { firebase } from './services/mockFirebase';
import LandingPage from './pages/LandingPage';
import StudentDashboard from './pages/StudentDashboard';
import AdminDashboard from './pages/AdminDashboard';
import { Lock, Mail, ArrowRight, AlertCircle, X, User as UserIcon, ShieldAlert, Clock } from 'lucide-react';

const MASTER_EMAIL = 'neinorby24@gmail.com';

const App: React.FC = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true
  });

  const [view, setView] = useState<'landing' | 'login' | 'signup' | 'app'>('landing');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const user = firebase.getCurrentUser();
      if (user) {
        setAuthState({ user, isAuthenticated: true, isLoading: false });
        setView('app');
      } else {
        setAuthState({ user: null, isAuthenticated: false, isLoading: false });
      }
    };
    checkAuth();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsProcessing(true);
    try {
      const user = await firebase.login(email);
      setAuthState({ user, isAuthenticated: true, isLoading: false });
      setView('app');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsProcessing(true);
    try {
      const user = await firebase.signup(name, email);
      setAuthState({ user, isAuthenticated: true, isLoading: false });
      setView('app');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleLogout = () => {
    firebase.logout();
    setAuthState({ user: null, isAuthenticated: false, isLoading: false });
    setView('landing');
  };

  if (authState.isLoading) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-brand-light font-sans">
        <div className="w-16 h-16 border-4 border-brand-primary border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-brand-primary font-bold animate-pulse font-serif italic">Carregando Lais Rastely Course...</p>
      </div>
    );
  }

  if (view === 'app' && authState.user) {
    const isMaster = authState.user.email.toLowerCase() === MASTER_EMAIL.toLowerCase();

    // Verification: Authenticated, Role = student, Status = active
    if (!isMaster && authState.user.status !== UserStatus.ACTIVE) {
      return (
        <div className="min-h-screen bg-brand-light flex items-center justify-center p-6 text-center font-sans">
          <div className="max-w-md w-full bg-white p-12 rounded-[50px] shadow-2xl border border-brand-accent animate-in fade-in zoom-in duration-500">
            <div className="w-24 h-24 bg-brand-accent/50 rounded-full flex items-center justify-center mx-auto mb-8 text-brand-primary">
              <Clock size={48} />
            </div>
            <h1 className="font-serif text-3xl font-bold mb-4">Acesso Pendente</h1>
            <p className="text-gray-500 mb-10 leading-relaxed italic text-lg">
              Olá, <span className="font-bold text-brand-primary">{authState.user.name.split(' ')[0]}</span>. <br/>
              Seu acesso ainda não foi liberado pelo administrador.
            </p>
            <div className="space-y-4">
              <div className="p-4 bg-brand-accent/30 rounded-2xl text-brand-primary text-sm font-bold flex items-center gap-3 justify-center mb-6">
                <ShieldAlert size={18} /> Verificando Matrícula...
              </div>
              <button onClick={handleLogout} className="w-full py-4 text-gray-400 font-bold hover:text-brand-primary transition-all uppercase tracking-widest text-xs">
                Sair da Conta
              </button>
            </div>
          </div>
        </div>
      );
    }

    return isMaster ? (
      <AdminDashboard onLogout={handleLogout} user={authState.user} />
    ) : (
      <StudentDashboard onLogout={handleLogout} user={authState.user} />
    );
  }

  if (view === 'login' || view === 'signup') {
    return (
      <div className="min-h-screen bg-brand-accent/30 flex items-center justify-center p-4 font-sans">
        <div className="max-w-md w-full bg-white rounded-[50px] shadow-2xl p-12 relative overflow-hidden border border-white">
          <button 
            onClick={() => setView('landing')}
            className="absolute top-8 right-8 p-2 hover:bg-brand-accent/50 rounded-full transition-all text-gray-400"
          >
            <X size={24} />
          </button>
          
          <div className="text-center mb-10">
            <div className="w-20 h-20 bg-brand-primary rounded-[28px] mx-auto flex items-center justify-center text-white font-bold text-4xl mb-6 shadow-2xl shadow-brand-primary/30">L</div>
            <h2 className="text-3xl font-serif font-bold italic tracking-tight">
              {view === 'login' ? 'Bem-vinda de volta' : 'Crie sua Conta'}
            </h2>
            <p className="text-gray-400 mt-2 font-medium italic">Plataforma Premium Lais Rastely</p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-5 rounded-2xl mb-8 flex items-center gap-3 border border-red-100 text-sm font-medium animate-in slide-in-from-top-2">
              <AlertCircle size={20} className="shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={view === 'login' ? handleLogin : handleSignup} className="space-y-5">
            {view === 'signup' && (
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Nome de Aluna</label>
                <div className="relative">
                  <UserIcon className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300" size={20} />
                  <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Seu nome completo" 
                    className="w-full pl-14 pr-6 py-5 bg-gray-50 border border-gray-100 rounded-[24px] outline-none focus:ring-4 focus:ring-brand-primary/10 transition-all font-medium"
                    required
                  />
                </div>
              </div>
            )}
            
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">E-mail de Acesso</label>
              <div className="relative">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300" size={20} />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="exemplo@email.com" 
                  className="w-full pl-14 pr-6 py-5 bg-gray-50 border border-gray-100 rounded-[24px] outline-none focus:ring-4 focus:ring-brand-primary/10 transition-all font-medium"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Sua Senha</label>
              <div className="relative">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300" size={20} />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••" 
                  className="w-full pl-14 pr-6 py-5 bg-gray-50 border border-gray-100 rounded-[24px] outline-none focus:ring-4 focus:ring-brand-primary/10 transition-all font-medium"
                  required
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isProcessing}
              className="w-full bg-brand-primary text-white py-6 rounded-[28px] font-bold text-xl hover:bg-brand-secondary transition-all shadow-2xl shadow-brand-primary/30 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isProcessing ? 'Autenticando...' : view === 'login' ? 'Entrar na Plataforma' : 'Criar minha Conta'}
              {!isProcessing && <ArrowRight size={24} />}
            </button>
          </form>

          <div className="mt-10 pt-10 border-t border-gray-50 text-center">
            <button 
              onClick={() => { setView(view === 'login' ? 'signup' : 'login'); setError(''); }}
              className="text-xs text-gray-400 hover:text-brand-primary font-bold uppercase tracking-widest transition-colors"
            >
              {view === 'login' ? 'Não tem conta? Cadastre-se' : 'Já é aluna? Faça Login'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return <LandingPage onLoginClick={() => setView('login')} onBuyClick={() => setView('signup')} />;
};

export default App;