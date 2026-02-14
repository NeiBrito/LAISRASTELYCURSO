
import React, { useState, useEffect } from 'react';
import { Play, ChevronRight, CheckCircle, BookOpen, LogOut, MessageSquare, X, Lock } from 'lucide-react';
import { firebase } from '../services/mockFirebase';
import { Module, Lesson, User as UserType } from '../types';
import VideoPlayer from '../components/VideoPlayer';
import CommentsSection from '../components/CommentsSection';

interface StudentDashboardProps {
  onLogout: () => void;
  user: UserType;
}

const StudentDashboard: React.FC<StudentDashboardProps> = ({ onLogout, user }) => {
  const [modules, setModules] = useState<Module[]>([]);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [activeModuleId, setActiveModuleId] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const ms = await firebase.getModules();
      const ls = await firebase.getAllLessons();
      setModules(ms);
      setLessons(ls);
      if (ms.length > 0) setActiveModuleId(ms[0].id);
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-brand-light text-brand-dark flex flex-col font-sans">
      {/* Player Direto na Página (Modal Aluno) */}
      {selectedLesson && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
          <div className="absolute inset-0 bg-brand-dark/98 backdrop-blur-2xl" onClick={() => setSelectedLesson(null)}></div>
          <div className="relative w-full max-w-6xl bg-white rounded-[50px] overflow-hidden shadow-[0_35px_60px_-15px_rgba(0,0,0,0.5)] animate-in zoom-in duration-300 flex flex-col h-full max-h-[95vh]">
            <button 
              onClick={() => setSelectedLesson(null)}
              className="absolute top-8 right-8 z-50 p-4 bg-gray-50 text-gray-400 hover:text-brand-primary hover:bg-brand-accent/30 rounded-full transition-all shadow-sm"
            >
              <X size={28} />
            </button>
            
            <div className="overflow-y-auto no-scrollbar p-8 md:p-16">
              <div className="max-w-5xl mx-auto">
                <VideoPlayer url={selectedLesson.videoUrl} poster={selectedLesson.thumbnail} />
                <div className="mt-16">
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
                    <div className="flex-1">
                      <span className="text-xs font-bold text-brand-primary uppercase tracking-[0.4em] mb-3 block italic">
                        {modules.find(m => m.id === selectedLesson.moduleId)?.title}
                      </span>
                      <h2 className="text-4xl md:text-5xl font-serif font-bold italic leading-tight">{selectedLesson.title}</h2>
                    </div>
                    <button className="bg-green-500 text-white px-10 py-5 rounded-[24px] font-bold shadow-2xl shadow-green-500/30 hover:bg-green-600 transition-all flex items-center gap-3 whitespace-nowrap self-start">
                      <CheckCircle size={24} /> Marcar como Concluída
                    </button>
                  </div>
                  <div className="h-px bg-gray-100 w-full mb-12"></div>
                  <div className="max-w-3xl">
                    <p className="text-gray-400 leading-relaxed text-xl mb-16 italic font-medium">
                      {selectedLesson.description || 'Assista a esta aula para dominar o método e alcançar o faturamento desejado no digital.'}
                    </p>
                  </div>

                  <div className="pt-12 border-t border-gray-50">
                    <CommentsSection lessonId={selectedLesson.id} currentUser={user} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header Aluna */}
      <header className="h-28 bg-white border-b border-brand-accent/40 px-8 md:px-16 flex justify-between items-center sticky top-0 z-50 backdrop-blur-md bg-white/90">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-brand-primary rounded-[18px] flex items-center justify-center text-white font-bold text-3xl shadow-xl shadow-brand-primary/20">L</div>
          <div>
            <span className="font-serif text-2xl font-bold block leading-none italic">Lais Rastely</span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-brand-primary flex items-center gap-1 mt-1">
              <Lock size={10} /> Área Premium de Alunas
            </span>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden md:flex flex-col text-right">
            <p className="text-sm font-bold text-brand-dark leading-none">{user.name}</p>
            <p className="text-[10px] text-green-500 font-bold uppercase tracking-widest mt-1 italic">Acesso Vitalício</p>
          </div>
          <button 
            onClick={onLogout} 
            className="p-4 text-gray-400 hover:text-red-500 bg-gray-50 rounded-2xl transition-all shadow-sm group"
          >
            <LogOut size={22} className="group-hover:-translate-x-1 transition-transform" />
          </button>
        </div>
      </header>

      {/* Grade de Conteúdo Aluna */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-8 md:p-16">
        <div className="mb-16">
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 italic tracking-tight">Suas Aulas, <span className="text-brand-primary">{user.name.split(' ')[0]}</span>. ✨</h1>
          <p className="text-gray-400 text-xl font-medium italic">Onde a teoria encontra o faturamento real.</p>
        </div>

        {/* Seletor de Módulos Simplificado */}
        <div className="flex gap-4 overflow-x-auto no-scrollbar mb-16 pb-4">
          {modules.map(m => (
            <button
              key={m.id}
              onClick={() => setActiveModuleId(m.id)}
              className={`px-10 py-5 rounded-[22px] font-bold whitespace-nowrap transition-all border-2 text-sm uppercase tracking-widest ${
                activeModuleId === m.id 
                  ? 'bg-brand-primary border-brand-primary text-white shadow-2xl shadow-brand-primary/30 translate-y-[-4px]' 
                  : 'bg-white border-transparent text-gray-400 hover:text-brand-primary hover:border-brand-accent/50'
              }`}
            >
              {m.title}
            </button>
          ))}
        </div>

        {/* Grade Curricular (Apenas Leitura) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 animate-in fade-in slide-in-from-bottom duration-700">
          {lessons.filter(l => l.moduleId === activeModuleId).map(lesson => (
            <div 
              key={lesson.id}
              onClick={() => setSelectedLesson(lesson)}
              className="bg-white rounded-[45px] overflow-hidden shadow-sm hover:shadow-[0_25px_50px_-12px_rgba(233,30,99,0.15)] transition-all border border-gray-50 group cursor-pointer transform hover:-translate-y-3 duration-500"
            >
              <div className="relative aspect-video overflow-hidden">
                <img src={lesson.thumbnail} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt="" />
                <div className="absolute inset-0 bg-brand-dark/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 backdrop-blur-[2px]">
                  <div className="w-20 h-20 bg-white/20 backdrop-blur-3xl rounded-full flex items-center justify-center text-white border border-white/30 transform scale-75 group-hover:scale-100 transition-all duration-500 shadow-2xl">
                    <Play size={40} fill="white" className="ml-2" />
                  </div>
                </div>
                <div className="absolute top-6 left-6 bg-brand-primary text-white text-[10px] font-bold px-4 py-1.5 rounded-full shadow-lg italic">
                  {lesson.duration}
                </div>
              </div>
              <div className="p-10">
                <h3 className="font-serif italic font-bold text-2xl mb-4 group-hover:text-brand-primary transition-colors leading-tight">{lesson.title}</h3>
                <p className="text-gray-400 text-sm line-clamp-2 leading-relaxed italic mb-8">
                  {lesson.description || 'Assista para desbloquear o próximo nível do seu negócio.'}
                </p>
                <div className="flex items-center justify-between pt-8 border-t border-gray-50">
                  <span className="flex items-center gap-3 text-xs font-bold text-brand-primary uppercase tracking-[0.2em] italic">
                    <Play size={16} /> Abrir Aula
                  </span>
                  <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-300 group-hover:bg-brand-primary group-hover:text-white transition-all shadow-sm">
                    <ChevronRight size={20} />
                  </div>
                </div>
              </div>
            </div>
          ))}

          {lessons.filter(l => l.moduleId === activeModuleId).length === 0 && (
            <div className="col-span-full py-32 text-center bg-white rounded-[50px] border-4 border-dashed border-gray-50">
              <BookOpen size={64} className="mx-auto mb-6 text-gray-100" />
              <p className="text-gray-400 font-serif italic text-2xl">Aguarde. Novos conteúdos estão sendo preparados...</p>
            </div>
          )}
        </div>
      </main>

      <footer className="py-20 text-center opacity-30">
        <p className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.4em]">Plataforma Lais Rastely © 2024</p>
      </footer>
    </div>
  );
};

export default StudentDashboard;
