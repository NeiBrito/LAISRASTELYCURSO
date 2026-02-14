
import React, { useState, useEffect } from 'react';
import { Send, Trash2, User as UserIcon, MessageSquare } from 'lucide-react';
import { firebase } from '../services/mockFirebase';
import { Comment, User, UserRole } from '../types';

interface CommentsSectionProps {
  lessonId: string;
  currentUser: User;
}

const CommentsSection: React.FC<CommentsSectionProps> = ({ lessonId, currentUser }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    loadComments();
  }, [lessonId]);

  const loadComments = async () => {
    const data = await firebase.getComments(lessonId);
    setComments(data);
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || isSending) return;

    setIsSending(true);
    try {
      const added = await firebase.addComment({
        lessonId,
        userId: currentUser.id,
        userName: currentUser.name,
        text: newComment
      });
      setComments(prev => [added, ...prev]);
      setNewComment('');
    } finally {
      setIsSending(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Deseja excluir este comentário?')) {
      await firebase.deleteComment(id);
      setComments(prev => prev.filter(c => c.id !== id));
    }
  };

  return (
    <div className="mt-12 space-y-8 animate-in fade-in duration-700">
      <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
        <MessageSquare className="text-brand-primary" size={24} />
        <h3 className="text-xl font-bold font-serif">Comunidade e Dúvidas</h3>
        <span className="bg-brand-accent text-brand-primary px-3 py-1 rounded-full text-xs font-bold">
          {comments.length} {comments.length === 1 ? 'comentário' : 'comentários'}
        </span>
      </div>

      <form onSubmit={handleSend} className="bg-gray-50 p-6 rounded-[32px] flex gap-4 border border-gray-100 focus-within:ring-2 focus-within:ring-brand-primary/10 transition-all">
        <img src={`https://ui-avatars.com/api/?name=${currentUser.name}&background=E91E63&color=fff`} className="w-10 h-10 rounded-full" alt="" />
        <div className="flex-1 flex gap-3">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Escreva seu comentário ou dúvida..."
            className="flex-1 bg-transparent outline-none resize-none py-2 text-sm"
            rows={1}
          />
          <button
            type="submit"
            disabled={!newComment.trim() || isSending}
            className="bg-brand-primary text-white p-3 rounded-2xl hover:bg-brand-secondary transition-all disabled:opacity-30 self-end"
          >
            <Send size={18} />
          </button>
        </div>
      </form>

      <div className="space-y-6">
        {comments.map(comment => (
          <div key={comment.id} className="flex gap-4 group">
            <img src={`https://ui-avatars.com/api/?name=${comment.userName}&background=2D3436&color=fff`} className="w-10 h-10 rounded-full shrink-0" alt="" />
            <div className="flex-1">
              <div className="bg-white p-5 rounded-[24px] rounded-tl-none border border-gray-100 shadow-sm relative">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm">{comment.userName}</span>
                    <span className="text-[10px] bg-gray-100 text-gray-400 px-2 py-0.5 rounded-full font-bold uppercase tracking-widest">
                      {comment.userName.toLowerCase().includes('neinor') || comment.userName.toLowerCase().includes('lais') ? 'Professora' : 'Aluna'}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] text-gray-300 font-medium">
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </span>
                    {currentUser.role === UserRole.ADMIN && (
                      <button 
                        onClick={() => handleDelete(comment.id)}
                        className="text-gray-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">{comment.text}</p>
              </div>
            </div>
          </div>
        ))}

        {comments.length === 0 && (
          <div className="py-10 text-center text-gray-400">
            <p className="text-sm">Seja a primeira a comentar nesta aula! ✨</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentsSection;
