
import { User, UserRole, UserStatus, Module, Lesson, Comment } from '../types';
import { MOCK_USERS, MOCK_MODULES, MOCK_LESSONS, ADMIN_EMAIL } from '../mockData';

class MockFirebase {
  private users: User[] = [...MOCK_USERS];
  private modules: Module[] = [...MOCK_MODULES];
  private lessons: Lesson[] = [...MOCK_LESSONS];
  private comments: Comment[] = [];
  private currentUser: User | null = null;

  async login(email: string): Promise<User> {
    await new Promise(resolve => setTimeout(resolve, 800));
    const user = this.users.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (!user) {
      throw new Error('Usuário não encontrado. Se você é a professora, use o e-mail cadastrado.');
    }
    
    this.currentUser = user;
    localStorage.setItem('lais_user', JSON.stringify(user));
    return user;
  }

  async signup(name: string, email: string): Promise<User> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    if (this.users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
      throw new Error('Este email já está cadastrado.');
    }

    const isAdmin = email.toLowerCase() === ADMIN_EMAIL.toLowerCase();

    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      email,
      role: isAdmin ? UserRole.ADMIN : UserRole.STUDENT,
      status: isAdmin ? UserStatus.ACTIVE : UserStatus.PENDING,
      dataCadastro: new Date().toISOString()
    };

    this.users.push(newUser);
    this.currentUser = newUser;
    localStorage.setItem('lais_user', JSON.stringify(newUser));
    return newUser;
  }

  async uploadVideo(file: File, onProgress: (percent: number) => void): Promise<string> {
    return new Promise((resolve) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
          progress = 100;
          onProgress(100);
          clearInterval(interval);
          resolve(URL.createObjectURL(file)); 
        } else {
          onProgress(Math.floor(progress));
        }
      }, 300);
    });
  }

  logout() {
    this.currentUser = null;
    localStorage.removeItem('lais_user');
  }

  getCurrentUser(): User | null {
    if (this.currentUser) return this.currentUser;
    const saved = localStorage.getItem('lais_user');
    if (saved) {
      const parsed = JSON.parse(saved);
      return this.users.find(u => u.id === parsed.id) || null;
    }
    return null;
  }

  async getModules(): Promise<Module[]> {
    return [...this.modules].sort((a, b) => a.order - b.order);
  }

  async getAllLessons(): Promise<Lesson[]> {
    return [...this.lessons];
  }

  async addLesson(lesson: Omit<Lesson, 'id'>): Promise<Lesson> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const newLesson = { 
      ...lesson, 
      id: Math.random().toString(36).substr(2, 9),
      thumbnail: lesson.thumbnail || `https://picsum.photos/seed/${Math.random()}/800/450`
    };
    this.lessons.push(newLesson);
    return newLesson;
  }

  async deleteLesson(lessonId: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 500));
    this.lessons = this.lessons.filter(l => l.id !== lessonId);
    this.comments = this.comments.filter(c => c.lessonId !== lessonId);
  }

  async updateLesson(lessonId: string, data: Partial<Lesson>): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 500));
    const index = this.lessons.findIndex(l => l.id === lessonId);
    if (index !== -1) {
      this.lessons[index] = { ...this.lessons[index], ...data };
    }
  }

  async getUsers(): Promise<User[]> {
    return [...this.users];
  }

  async updateUserStatus(userId: string, status: UserStatus): Promise<void> {
    const index = this.users.findIndex(u => u.id === userId);
    if (index !== -1) {
      this.users[index] = { ...this.users[index], status };
    }
  }

  async addModule(title: string): Promise<Module> {
    const newModule = {
      id: Math.random().toString(36).substr(2, 9),
      title,
      order: this.modules.length + 1
    };
    this.modules.push(newModule);
    return newModule;
  }

  // Métodos de Comentários
  async getComments(lessonId: string): Promise<Comment[]> {
    return this.comments.filter(c => c.lessonId === lessonId).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  async addComment(comment: Omit<Comment, 'id' | 'createdAt'>): Promise<Comment> {
    const newComment: Comment = {
      ...comment,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString()
    };
    this.comments.push(newComment);
    return newComment;
  }

  async deleteComment(commentId: string): Promise<void> {
    this.comments = this.comments.filter(c => c.id !== commentId);
  }
}

export const firebase = new MockFirebase();
