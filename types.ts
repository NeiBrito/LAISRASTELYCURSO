
export enum UserRole {
  ADMIN = 'admin',
  STUDENT = 'aluno'
}

export enum UserStatus {
  ACTIVE = 'ativo',
  PENDING = 'pendente',
  INACTIVE = 'inativo',
  BLOCKED = 'bloqueado'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  dataCadastro: string;
  paymentDate?: string;
  photoUrl?: string;
}

export interface Module {
  id: string;
  title: string;
  order: number;
}

export interface Lesson {
  id: string;
  moduleId: string;
  title: string;
  description: string;
  videoUrl: string;
  duration: string;
  thumbnail: string;
}

export interface Comment {
  id: string;
  lessonId: string;
  userId: string;
  userName: string;
  text: string;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}