
import { User, UserRole, UserStatus, Module, Lesson } from './types';

// E-mail mestre que sempre terá acesso administrativo total
export const ADMIN_EMAIL = 'neinorby24@gmail.com'; 

export const MOCK_USERS: User[] = [
  {
    id: 'admin-prof-001',
    name: 'Professor Neinor',
    email: ADMIN_EMAIL,
    role: UserRole.ADMIN,
    status: UserStatus.ACTIVE,
    dataCadastro: new Date().toISOString(),
    photoUrl: 'https://picsum.photos/seed/lais/200'
  },
  {
    id: 'student-001',
    name: 'Ana Silva',
    email: 'ana@gmail.com',
    role: UserRole.STUDENT,
    status: UserStatus.ACTIVE,
    dataCadastro: '2024-01-15T14:30:00.000Z',
    paymentDate: '2024-01-15'
  }
];

export const MOCK_MODULES: Module[] = [
  { id: 'm1', title: 'Fundamentos do Sucesso', order: 1 },
  { id: 'm2', title: 'Marketing de Autoridade', order: 2 },
  { id: 'm3', title: 'Vendas de Alto Valor', order: 3 }
];

export const MOCK_LESSONS: Lesson[] = [
  {
    id: 'l1',
    moduleId: 'm1',
    title: 'Introdução e Boas Vindas',
    description: 'Nesta aula vamos alinhar as expectativas para o curso.',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    duration: '10:00',
    thumbnail: 'https://picsum.photos/seed/lesson1/800/450'
  }
];
