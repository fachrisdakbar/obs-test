import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { User, UserFormData } from '../types/User';
import { fetchUsers } from '../services/api';

interface UserContextType {
  users: User[];
  loading: boolean;
  addUser: (user: UserFormData) => void;
  updateUser: (id: number, user: UserFormData) => void;
  deleteUser: (id: number) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

type Props = {
  children: ReactNode;
};

export function UserProvider({ children }: Props) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const data = await fetchUsers();
      setUsers(data);
    } catch (error) {
      console.error('Error loading users:', error);
    } finally {
      setLoading(false);
    }
  };

  const addUser = (userData: UserFormData) => {
    const newUser: User = {
      id: Math.max(0, ...users.map(u => u.id)) + 1,
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      website: userData.website,
      company: { name: userData.companyName },
      address: { street: userData.street, city: userData.city },
    };

    setUsers(prev => [newUser, ...prev]);
  };

  const updateUser = (id: number, userData: UserFormData) => {
    setUsers(prev =>
      prev.map(user =>
        user.id === id
          ? {
              ...user,
              name: userData.name,
              email: userData.email,
              phone: userData.phone,
              website: userData.website,
              company: { name: userData.companyName },
              address: {
                street: userData.street,
                city: userData.city,
              },
            }
          : user
      )
    );
  };

  const deleteUser = (id: number) => {
    setUsers(prev => prev.filter(user => user.id !== id));
  };

  return (
    <UserContext.Provider
      value={{ users, loading, addUser, updateUser, deleteUser }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUsers() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUsers must be used within UserProvider');
  }
  return context;
}
