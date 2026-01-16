import React, { useState } from 'react';
import {
  Container,
  Grid,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  IconButton,
  Box,
  CircularProgress,
  Snackbar,
  Alert,
  Fab,
  useTheme,
  useMediaQuery,
  Card,
  CardContent
} from '@mui/material';
import {
  Add as AddIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import { useUsers } from './context/UserContext';
import { UserCard } from './components/UserCard';
import { UserDetails } from './components/UserDetails';
import { UserForm } from './components/UserForm';
import { ConfirmDialog } from './components/ConfirmDialog';
import type { User, UserFormData } from "./types/User";
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Custom theme for the app
const theme = createTheme({
  palette: {
    primary: {
      main: '#00796b', // Dark teal for main buttons and highlights
    },
    secondary: {
      main: '#ff5722', // Bright accent color
    },
    background: {
      default: '#f4f4f4', // Light gray background
    },
    text: {
      primary: '#333',
      secondary: '#555',
    },
  },
  typography: {
    fontFamily: '"Roboto", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 600,
    },
    body1: {
      lineHeight: 1.6,
    },
  },
});

const App: React.FC = () => {
  const { users, loading, addUser, updateUser, deleteUser } = useUsers();
  
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<number | null>(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleViewDetails = (user: User) => {
    setSelectedUser(user);
    setDetailsOpen(true);
  };

  const handleAddUser = () => {
    setEditingUser(null);
    setFormOpen(true);
  };

  const handleEditUser = () => {
    setEditingUser(selectedUser);
    setDetailsOpen(false);
    setFormOpen(true);
  };

  const handleDeleteClick = (userId: number) => {
    setUserToDelete(userId);
    setConfirmOpen(true);
    setDetailsOpen(false);
  };

  const handleConfirmDelete = () => {
    if (userToDelete) {
      deleteUser(userToDelete);
      setSnackbar({ open: true, message: 'User deleted successfully!' });
    }
    setConfirmOpen(false);
    setUserToDelete(null);
  };

  const handleFormSubmit = (data: UserFormData) => {
    if (editingUser) {
      updateUser(editingUser.id, data);
      setSnackbar({ open: true, message: 'User updated successfully!' });
    } else {
      addUser(data);
      setSnackbar({ open: true, message: 'User added successfully!' });
    }
    setFormOpen(false);
    setEditingUser(null);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant={isMobile ? 'h5' : 'h3'} fontWeight="bold" color="primary" sx={{ mb: 2 }}>
           OBS Test 
          </Typography>
          {!isMobile && (
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={handleAddUser}
              size="large"
              sx={{ borderRadius: '30px' }}
            >
              Add User
            </Button>
          )}
        </Box>

        <Grid container spacing={3} justifyContent="center">
          {users.map((user) => (
            <Grid item xs={12} sm={6} md={4} key={user.id}>
              <Card
                sx={{
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
                  },
                }}
              >
                <UserCard user={user} onViewDetails={() => handleViewDetails(user)} />
              </Card>
            </Grid>
          ))}
        </Grid>

        {users.length === 0 && (
          <Box sx={{ textAlign: 'center', mt: 8 }}>
            <Typography variant="h6" color="text.secondary">
              No users found. Add your first user!
            </Typography>
          </Box>
        )}

        {isMobile && (
          <Fab color="secondary" sx={{ position: 'fixed', bottom: 16, right: 16 }} onClick={handleAddUser}>
            <AddIcon />
          </Fab>
        )}

        {selectedUser && (
          <UserDetails
            user={selectedUser}
            open={detailsOpen}
            onClose={() => setDetailsOpen(false)}
            onEdit={handleEditUser}
            onDelete={() => handleDeleteClick(selectedUser.id)}
          />
        )}

        <Dialog open={formOpen} onClose={() => setFormOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle>
            {editingUser ? 'Edit User' : 'Add New User'}
            <IconButton onClick={() => setFormOpen(false)} sx={{ position: 'absolute', right: 8, top: 8 }}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <UserForm user={editingUser} onSubmit={handleFormSubmit} onClose={() => setFormOpen(false)} />
        </Dialog>

        <ConfirmDialog
          open={confirmOpen}
          title="Delete User"
          message="Are you sure you want to delete this user?"
          onConfirm={handleConfirmDelete}
          onCancel={() => setConfirmOpen(false)}
        />

        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          <Alert severity="success" sx={{ backgroundColor: '#4caf50', color: '#fff' }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </ThemeProvider>
  );
};

export default App;
