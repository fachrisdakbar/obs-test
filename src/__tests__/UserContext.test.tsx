import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { UserProvider, useUsers } from '../context/UserContext';

describe('UserContext', () => {
  it('should add user', async () => {
    const wrapper = ({ children }: any) => <UserProvider>{children}</UserProvider>;
    const { result } = renderHook(() => useUsers(), { wrapper });

    await act(async () => {
      result.current.addUser({
        name: 'Test User',
        email: 'test@test.com',
        phone: '123',
        website: 'test.com',
        companyName: 'Test Co',
        street: 'Test St',
        city: 'Test City'
      });
    });

    expect(result.current.users.some(u => u.name === 'Test User')).toBe(true);
  });
});