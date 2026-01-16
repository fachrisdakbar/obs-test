import React from 'react';
import { Card, CardContent, CardMedia, CardActions, Typography, Button } from '@mui/material';
import type { User } from '../types/User';

interface UserCardProps {
  user: User;
  onViewDetails: () => void;
}

export const UserCard: React.FC<UserCardProps> = ({ user, onViewDetails }) => {
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        height="200"
        image={`https://picsum.photos/seed/${user.id}/400/300`}
        alt={user.name}
        loading="lazy"
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="h2">
          {user.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {user.email}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {user.company.name}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={onViewDetails}>
          View Details
        </Button>
      </CardActions>
    </Card>
  );
};