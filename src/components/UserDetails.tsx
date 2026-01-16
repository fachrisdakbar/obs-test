import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Box,
  Typography,
  Avatar,
  Divider
} from '@mui/material';
import {
  Close as CloseIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Language as WebsiteIcon,
  Business as BusinessIcon,
  LocationOn as LocationIcon
} from '@mui/icons-material';
import type { User } from '../types/User';

interface UserDetailsProps {
  user: User;
  open: boolean;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export const UserDetails: React.FC<UserDetailsProps> = ({ 
  user, 
  open, 
  onClose, 
  onEdit, 
  onDelete 
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        User Details
        <IconButton
          onClick={onClose}
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
          <Avatar
            src={`https://picsum.photos/seed/${user.id}/200`}
            sx={{ width: 120, height: 120, mb: 2 }}
          />
          <Typography variant="h5" fontWeight="bold">
            {user.name}
          </Typography>
        </Box>

        <Divider sx={{ mb: 2 }} />

        <Box sx={{ mt: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <EmailIcon sx={{ mr: 2, color: 'text.secondary' }} />
            <Box>
              <Typography variant="caption" color="text.secondary">Email</Typography>
              <Typography variant="body1">{user.email}</Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <PhoneIcon sx={{ mr: 2, color: 'text.secondary' }} />
            <Box>
              <Typography variant="caption" color="text.secondary">Phone</Typography>
              <Typography variant="body1">{user.phone}</Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <WebsiteIcon sx={{ mr: 2, color: 'text.secondary' }} />
            <Box>
              <Typography variant="caption" color="text.secondary">Website</Typography>
              <Typography variant="body1">{user.website}</Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <BusinessIcon sx={{ mr: 2, color: 'text.secondary' }} />
            <Box>
              <Typography variant="caption" color="text.secondary">Company</Typography>
              <Typography variant="body1">{user.company.name}</Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <LocationIcon sx={{ mr: 2, color: 'text.secondary' }} />
            <Box>
              <Typography variant="caption" color="text.secondary">Address</Typography>
              <Typography variant="body1">
                {user.address.street}, {user.address.city}
              </Typography>
            </Box>
          </Box>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button startIcon={<EditIcon />} onClick={onEdit} variant="outlined">
          Edit
        </Button>
        <Button startIcon={<DeleteIcon />} onClick={onDelete} variant="outlined" color="error">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};