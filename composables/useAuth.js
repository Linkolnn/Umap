import CryptoJS from 'crypto-js';
import { useCookie } from '#app';

export function useAuth() {
  const config = useRuntimeConfig();
  const salt = config.public.salt;

  const users = useCookie('auth_users', { 
    default: () => ({}),
    secure: true,
    sameSite: 'strict',
    path: '/',
    maxAge: 172800 
  });

  const currentUser = useCookie('current_user', {
    default: () => null,
    secure: true,
    sameSite: 'strict',
    path: '/',
    maxAge: 172800 
  });

  const hashPassword = (password) => CryptoJS.SHA256(password + salt).toString();

  const register = (name, password) => {
    if (users.value[name]) {
      alert('❌ Пользователь уже существует');
      return false;
    }

    users.value = {
      ...users.value,
      [name]: {
        password: hashPassword(password),
        createdAt: new Date().toISOString()
      }
    };

    currentUser.value = { name, lastLogin: new Date().toISOString() };
    return true;
  };

  const login = (name, password) => {
    const user = users.value[name];
    
    if (!user || user.password !== hashPassword(password)) {
      alert('❌ Неверные данные');
      return false;
    }

    currentUser.value = { name, lastLogin: new Date().toISOString() }; 
    return true;
  };

  const logout = () => {
    try {
      currentUser.value = null;
      useCookie('current_user').value = null; // Явное удаление куки
      return true;
    } catch (error) {
      alert('Ошибка при выходе:', error);
      return false;
    }
  };
  
  return { 
    users: computed(() => users.value),
    currentUser: computed(() => currentUser.value),
    register,
    login,
    logout
  };
}