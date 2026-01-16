import React, { useState } from 'react';
import { DialogContent, DialogActions, TextField, Button } from '@mui/material';
import type { User, UserFormData } from '../types/User';

interface UserFormProps {
  user?: User | null;
  onSubmit: (data: UserFormData) => void;
  onClose: () => void;
}

export const UserForm: React.FC<UserFormProps> = ({ user, onSubmit, onClose }) => {
  const [formData, setFormData] = useState<UserFormData>({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    website: user?.website || '',
    companyName: user?.company.name || '',
    street: user?.address.street || '',
    city: user?.address.city || ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <DialogContent>
        <TextField fullWidth margin="normal" label="Name" name="name" 
          value={formData.name} onChange={handleChange} required />
        <TextField fullWidth margin="normal" label="Email" name="email" type="email"
          value={formData.email} onChange={handleChange} required />
        <TextField fullWidth margin="normal" label="Phone" name="phone"
          value={formData.phone} onChange={handleChange} required />
        <TextField fullWidth margin="normal" label="Website" name="website"
          value={formData.website} onChange={handleChange} />
        <TextField fullWidth margin="normal" label="Company" name="companyName"
          value={formData.companyName} onChange={handleChange} />
        <TextField fullWidth margin="normal" label="Street" name="street"
          value={formData.street} onChange={handleChange} />
        <TextField fullWidth margin="normal" label="City" name="city"
          value={formData.city} onChange={handleChange} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button type="submit" variant="contained">{user ? 'Update' : 'Add'}</Button>
      </DialogActions>
    </form>
  );
};