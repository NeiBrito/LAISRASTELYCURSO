
import React, { useState, useEffect, useRef } from 'react';
import { LayoutDashboard, Users, BookOpen, Trash2, Video, AlertCircle, CheckCircle, Upload, FileVideo, Link as LinkIcon, X, Play, Edit, BarChart3, Settings, UserCheck, UserX } from 'lucide-react';
import { firebase } from '../services/mockFirebase';
import { User, UserStatus, Module, Lesson, UserRole } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import VideoPlayer from '../components/VideoPlayer';
import CommentsSection from '../components/CommentsSection';

const AdminDashboard: React.FC<{ onLogout: () => void; user: User }> = ({ onLogout, user }) => {
  const [activeTab, setActiveTab] = useState<'stats' | 'users' | 'content'>('stats');
  const [users, setUsers] = useState<User[]>([]);
  const [modules, setModules] = useState<Module[]>([]);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  
  const [showAddLesson, setShowAddLesson] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [editingLessonId, setEditingLessonId] = useState<string | null>(null);
  const [uploadMode, setUploadMode] = useState<'link' | 'file'>('file');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [newLesson, setNewLesson] = useState({
    title: '',
    description: '',
    videoUrl: '',
    moduleId: '',
    duration: '15:00'
  });
  const [isPosting, setIsPosting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error', msg: string } | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const [u, m, l] = await Promise.all([
      firebase.getUsers(),
      firebase.getModules(),
      firebase.getAllLessons()
    ]);
    setUsers(u);
    setModules(m);
    setLessons(l);
  };

  const handleUpdateStatus = async (userId: string, status: UserStatus) => {
    await firebase.updateUserStatus(userId, status);
    // Reload users to reflect changes in UI
    const updatedUsers = await firebase.getUsers();
    setUsers(updatedUsers);
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    uploadFile(file);
  };

  const uploadFile = async (file: File) => {
    if (!file.type.includes('video/mp4')) {
      setFeedback({ type: 'error', msg: 'Formato inválido. Use apenas .mp4.' });
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);
    setFeedback(null);

    try {
      const url = await firebase.uploadVideo(file, (p) => setUploadProgress(p));
      setNewLesson(prev => ({ ...prev, videoUrl: url }));
      setFeedback({ type: 'success', msg: 'Vídeo carregado com sucesso!' });
    } catch (err) {
      setFeedback({ type: 'error', msg: 'Falha no upload.' });
    } finally {
      setIsUploading(false);
    }
  };

  const handlePostLesson = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLesson.title || !newLesson.videoUrl || !newLesson.moduleId) {
      setFeedback({ type: 'error', msg: 'Todos os campos são obrigatórios.' });
      return;
    }

    setIsPosting(true);
    try {
      if (editingLessonId) {
        await firebase.updateLesson(editingLessonId, newLesson);
        setLessons(prev => prev.map(l => l.id === editingLessonId ? { ...l, ...newLesson } : l));
        setFeedback({ type: 'success', msg: 'Conteúdo atualizado!' });
      } else {
        const added = await firebase.addLesson(newLesson);
        setLessons(prev => [...prev, added]);
        setFeedback({ type: 'success', msg: 'Conteúdo publicado!' });
      }
      setNewLesson({ title: '', description: '', videoUrl: '', moduleId: '', duration: '15:00' });
      setEditingLessonId(null);
      setUploadProgress(0);
      setTimeout(() => { setShowAddLesson(false); setFeedback(null); }, 1500);
    } catch (err) {
      setFeedback({ type: 'error', msg: 'Erro ao salvar conteúdo.' });
    } finally {
      setIsPosting(false);
    }
  };

  const handleDeleteLesson = async (e: React.MouseEvent, lessonId: string) => {
    e.stopPropagation();
    if (confirm('Deseja excluir permanentemente este conteúdo da grade?')) {
      await firebase.deleteLesson(lessonId);
      setLessons(prev => prev.filter(l => l.id !== lessonId));
    }
  };

  const handleEditLesson = (e: React.MouseEvent, lesson: Lesson) => {
    e.stopPropagation();
    setEditingLessonId(lesson.id);
    setNewLesson({
      title: lesson.title,
      description: lesson.description,
      videoUrl: lesson.videoUrl,
      moduleId: lesson.moduleId,
      duration: lesson.duration
    });
    setUploadMode('link');
    setShowAddLesson(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex h-screen bg-gray-50 text-brand-dark overflow-hidden font-sans">
      {/* Sidebar Master */}
      <aside className="w-72 bg-brand-dark text-white flex flex-col p-8 shrink-0">
        <div className="flex items-center gap-3 mb-16">
          <div className="w-12 h-12 bg-brand-primary rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg shadow-brand-primary/20">L</div>
          <div>
            <span className="font-serif text-xl font-bold block leading-none">Painel Mestre</span>
            <span className="text-[10px] uppercase tracking-widest text-brand-primary font-bold">Lais Rastely</span>
          </div>
        </div>

        <nav className="flex-1 space-y-3">
          <button onClick={() => setActiveTab('stats')} className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all font-bold ${activeTab === 'stats' ? 'bg-brand-primary text-white shadow-xl shadow-brand-primary/20' : 'hover:bg-white/5 text-gray-400'}`}>
            <LayoutDashboard size={20} /> Visão Geral
          </button>
          <button onClick={() => setActiveTab('users')} className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all font-bold ${activeTab === 'users' ? 'bg-brand-primary text-white shadow-xl shadow-brand-primary/20' : 'hover:bg-white/5 text-gray-400'}`}>
            <Users size={20} /> Gestão de Alunas
          </button>
          <button onClick={() => setActiveTab('content')} className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all font-bold ${activeTab === 'content' ? 'bg-brand-primary text-white shadow-xl shadow-brand-primary/20' : 'hover:bg-white/5 text-gray-400'}`}>
            <BookOpen size={20} /> Gestão de Conteúdo
          </button>
        </nav>

        <div className="pt-8 border-t border-white/10">
          <button onClick={onLogout} className="w-full flex items-center gap-4 p-4 text-red-400 hover:bg-red-400/10 rounded-2xl font-bold transition-all">
            <Trash2 size={20} /> Sair do Painel
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto p-12 no-scrollbar bg-gray-50">
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-bold font-serif italic mb-2">
              {activeTab === 'stats' && 'Performance do Curso'}
              {activeTab === 'users' && 'Gestão de Alunas'}
              {activeTab === 'content' && 'Grade Curricular'}
            </h1>
            <p className="text-gray-400 font-medium italic">Gerencie o faturamento e o acesso das suas alunas.</p>
          </div>
          
          {activeTab === 'content' && (
            <button 
              onClick={() => {
                setEditingLessonId(null);
                setNewLesson({ title: '', description: '', videoUrl: '', moduleId: '', duration: '15:00' });
                setShowAddLesson(true);
              }}
              className="bg-brand-primary text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2 hover:bg-brand-secondary transition-all shadow-2xl shadow-brand-primary/30"
            >
              <Video size={20} /> Publicar Aula
            </button>
          )}
        </header>

        {activeTab === 'content' && showAddLesson && (
          <div className="bg-white p-10 rounded-[40px] border-2 border-brand-accent shadow-2xl mb-12 animate-in slide-in-from-top duration-500">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-2xl font-serif font-bold italic flex items-center gap-3 text-brand-dark">
                <Settings className="text-brand-primary" /> {editingLessonId ? 'Editar Conteúdo' : 'Novo Conteúdo'}
              </h2>
              <button onClick={() => {setShowAddLesson(false); setEditingLessonId(null);}} className="text-gray-300 hover:text-red-500 transition-all"><X size={28} /></button>
            </div>

            {feedback && (
              <div className={`mb-8 p-6 rounded-2xl flex items-center gap-4 font-bold text-sm ${feedback.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                {feedback.type === 'success' ? <CheckCircle size={24} /> : <AlertCircle size={24} />}
                {feedback.msg}
              </div>
            )}

            <form onSubmit={handlePostLesson} className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Título da Aula</label>
                  <input type="text" required value={newLesson.title} onChange={e => setNewLesson({...newLesson, title: e.target.value})} className="w-full p-5 bg-gray-50 border border-gray-100 rounded-[24px] outline-none focus:ring-4 focus:ring-brand-primary/10 transition-all font-medium" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Módulo</label>
                  <select required value={newLesson.moduleId} onChange={e => setNewLesson({...newLesson, moduleId: e.target.value})} className="w-full p-5 bg-gray-50 border border-gray-100 rounded-[24px] outline-none focus:ring-4 focus:ring-brand-primary/10 transition-all font-medium">
                    <option value="">Escolha um módulo...</option>
                    {modules.map(m => <option key={m.id} value={m.id}>{m.title}</option>)}
                  </select>
                </div>

                <div className="space-y-4">
                  <div className="flex gap-2 p-1 bg-gray-100 rounded-2xl">
                    <button type="button" onClick={() => setUploadMode('file')} className={`flex-1 py-3 rounded-xl font-bold text-xs transition-all ${uploadMode === 'file' ? 'bg-white text-brand-primary shadow-sm' : 'text-gray-400'}`}>Fazer Upload (.mp4)</button>
                    <button type="button" onClick={() => setUploadMode('link')} className={`flex-1 py-3 rounded-xl font-bold text-xs transition-all ${uploadMode === 'link' ? 'bg-white text-brand-primary shadow-sm' : 'text-gray-400'}`}>Colar Link</button>
                  </div>

                  {uploadMode === 'file' ? (
                    <div 
                      onClick={() => fileInputRef.current?.click()}
                      className={`relative group border-4 border-dashed rounded-[32px] p-12 flex flex-col items-center justify-center gap-4 cursor-pointer transition-all ${newLesson.videoUrl && uploadMode === 'file' ? 'border-green-400 bg-green-50/50' : 'border-gray-100 bg-gray-50 hover:border-brand-primary/30'}`}
                    >
                      <input type="file" ref={fileInputRef} className="hidden" accept="video/mp4" onChange={handleFileSelect} />
                      {isUploading ? (
                        <div className="w-full space-y-4 text-center">
                          <p className="text-xs font-bold text-brand-primary uppercase">Subindo (.mp4): {uploadProgress}%</p>
                          <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                            <div className="h-full bg-brand-primary transition-all duration-300" style={{ width: `${uploadProgress}%` }}></div>
                          </div>
                        </div>
                      ) : newLesson.videoUrl && uploadMode === 'file' ? (
                        <div className="text-center">
                          <CheckCircle className="text-green-500 mx-auto mb-3" size={40} />
                          <p className="font-bold text-green-700 italic">Vídeo Pronto!</p>
                        </div>
                      ) : (
                        <>
                          <div className="w-16 h-16 bg-brand-accent rounded-3xl flex items-center justify-center text-brand-primary group-hover:rotate-6 transition-transform">
                            <Upload size={32} />
                          </div>
                          <div className="text-center">
                            <p className="font-bold text-gray-700">Clique para Upload de Vídeo (.mp4)</p>
                            <p className="text-xs text-gray-400 mt-1 italic">Processamento seguro de arquivos</p>
                          </div>
                        </>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">URL do Vídeo</label>
                      <input type="url" required value={newLesson.videoUrl} onChange={e => setNewLesson({...newLesson, videoUrl: e.target.value})} className="w-full p-5 bg-gray-50 border border-gray-100 rounded-[24px] outline-none focus:ring-4 focus:ring-brand-primary/10 transition-all font-medium" placeholder="Link de vídeo..." />
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-8 flex flex-col">
                <div className="flex-1 space-y-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Descrição</label>
                  <textarea rows={8} value={newLesson.description} onChange={e => setNewLesson({...newLesson, description: e.target.value})} className="w-full p-5 bg-gray-50 border border-gray-100 rounded-[24px] outline-none focus:ring-4 focus:ring-brand-primary/10 transition-all font-medium resize-none h-full" />
                </div>
                <button type="submit" disabled={isPosting || isUploading} className="w-full bg-brand-primary text-white py-6 rounded-[28px] font-bold text-xl hover:bg-brand-secondary transition-all shadow-2xl shadow-brand-primary/30 disabled:opacity-50">
                  {isPosting ? 'Publicando...' : editingLessonId ? 'Salvar Alterações' : 'Publicar Conteúdo'}
                </button>
              </div>
            </form>
          </div>
        )}

        {activeTab === 'stats' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-in fade-in duration-700">
            <div className="bg-white p-10 rounded-[40px] shadow-sm border border-gray-100">
              <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">Total de Alunas</p>
              <p className="text-5xl font-bold font-serif italic text-brand-dark">{users.filter(u => u.role === UserRole.STUDENT).length}</p>
            </div>
            <div className="bg-white p-10 rounded-[40px] shadow-sm border border-gray-100">
              <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">Aulas Postadas</p>
              <p className="text-5xl font-bold font-serif italic text-brand-primary">{lessons.length}</p>
            </div>
            <div className="bg-white p-10 rounded-[40px] shadow-sm border border-gray-100">
              <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">Faturamento Total</p>
              <p className="text-5xl font-bold font-serif italic text-brand-dark">R$ 14.2k</p>
            </div>
          </div>
        )}

        {/* Gestão de Alunas - Requested Table & Logic */}
        {activeTab === 'users' && (
          <div className="bg-white rounded-[40px] shadow-sm border border-gray-100 overflow-hidden animate-in fade-in duration-700">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-10 py-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Nome / E-mail</th>
                  <th className="px-10 py-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Status</th>
                  <th className="px-10 py-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Cadastro</th>
                  <th className="px-10 py-6 text-right text-[10px] font-bold text-gray-400 uppercase tracking-widest">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {users.filter(u => u.role === UserRole.STUDENT).map(aluna => (
                  <tr key={aluna.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-10 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-brand-accent rounded-full flex items-center justify-center text-brand-primary font-bold shadow-sm">
                          {aluna.name[0]}
                        </div>
                        <div>
                          <p className="font-bold text-brand-dark">{aluna.name}</p>
                          <p className="text-xs text-gray-400 italic">{aluna.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-10 py-6">
                      <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                        aluna.status === UserStatus.ACTIVE ? 'bg-green-100 text-green-700' : 
                        aluna.status === UserStatus.BLOCKED || aluna.status === UserStatus.INACTIVE ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'
                      }`}>
                        {aluna.status}
                      </span>
                    </td>
                    <td className="px-10 py-6 text-xs text-gray-400 font-medium">
                      {new Date(aluna.dataCadastro).toLocaleDateString()}
                    </td>
                    <td className="px-10 py-6 text-right">
                      {aluna.status !== UserStatus.ACTIVE ? (
                        <button 
                          onClick={() => handleUpdateStatus(aluna.id, UserStatus.ACTIVE)}
                          className="text-xs font-bold uppercase tracking-widest py-2.5 px-6 rounded-xl bg-green-50 text-green-600 hover:bg-green-600 hover:text-white transition-all flex items-center gap-2 ml-auto"
                        >
                          <UserCheck size={14} /> Ativar Acesso
                        </button>
                      ) : (
                        <button 
                          onClick={() => handleUpdateStatus(aluna.id, UserStatus.BLOCKED)}
                          className="text-xs font-bold uppercase tracking-widest py-2.5 px-6 rounded-xl bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all flex items-center gap-2 ml-auto"
                        >
                          <UserX size={14} /> Bloquear Acesso
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
                {users.filter(u => u.role === UserRole.STUDENT).length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-10 py-20 text-center text-gray-400 italic">Nenhuma aluna cadastrada ainda.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'content' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-in fade-in duration-700">
            {lessons.map(lesson => (
              <div key={lesson.id} className="bg-white rounded-[40px] overflow-hidden shadow-sm border border-gray-100 group hover:shadow-2xl transition-all duration-500">
                <div className="relative aspect-video">
                  <img src={lesson.thumbnail} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
                  <div className="absolute inset-0 bg-brand-dark/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-5 backdrop-blur-sm">
                    <button 
                      onClick={(e) => handleEditLesson(e, lesson)} 
                      className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-brand-primary shadow-2xl hover:bg-brand-primary hover:text-white transition-all transform hover:rotate-6"
                    >
                      <Edit size={24} />
                    </button>
                    <button 
                      onClick={(e) => handleDeleteLesson(e, lesson.id)} 
                      className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-red-500 shadow-2xl hover:bg-red-500 hover:text-white transition-all transform hover:-rotate-6"
                    >
                      <Trash2 size={24} />
                    </button>
                  </div>
                </div>
                <div className="p-8">
                  <p className="text-[10px] font-bold text-brand-primary uppercase tracking-widest mb-2 italic">
                    {modules.find(m => m.id === lesson.moduleId)?.title}
                  </p>
                  <h4 className="font-bold text-xl mb-3 truncate font-serif italic">{lesson.title}</h4>
                  <p className="text-gray-400 text-sm line-clamp-2 leading-relaxed italic">{lesson.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      
      {selectedLesson && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-brand-dark/95 backdrop-blur-md" onClick={() => setSelectedLesson(null)}></div>
          <div className="relative w-full max-w-5xl bg-white rounded-[50px] overflow-hidden shadow-2xl flex flex-col h-[90vh]">
            <button onClick={() => setSelectedLesson(null)} className="absolute top-8 right-8 z-10 p-3 bg-gray-50 text-gray-400 hover:text-brand-primary rounded-full transition-all"><X size={28} /></button>
            <div className="overflow-y-auto no-scrollbar p-12">
              <VideoPlayer url={selectedLesson.videoUrl} poster={selectedLesson.thumbnail} />
              <div className="mt-12 max-w-4xl mx-auto">
                <h2 className="text-4xl font-serif font-bold italic mb-6">{selectedLesson.title}</h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-16 italic">{selectedLesson.description}</p>
                <CommentsSection lessonId={selectedLesson.id} currentUser={user} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;