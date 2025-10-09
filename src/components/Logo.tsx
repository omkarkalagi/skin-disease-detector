import React from 'react';
import { Box, Typography, Avatar } from '@mui/material';
import { Link } from 'react-router-dom';
import CameraAltIcon from '@mui/icons-material/CameraAlt';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  variant?: 'icon' | 'text' | 'full';
  color?: 'primary' | 'white' | 'inherit';
}

const Logo: React.FC<LogoProps> = ({
  size = 'medium',
  variant = 'full',
  color = 'primary'
}) => {
  const sizeMap = {
    small: { width: 32, height: 32, fontSize: '1rem' },
    medium: { width: 48, height: 48, fontSize: '1.25rem' },
    large: { width: 64, height: 64, fontSize: '1.5rem' }
  };

  const currentSize = sizeMap[size];

  if (variant === 'icon') {
    return (
      <Avatar
        sx={{
          width: currentSize.width,
          height: currentSize.height,
          bgcolor: color === 'primary' ? 'primary.main' : 'transparent',
          color: color === 'white' ? 'white' : 'inherit',
        }}
      >
        <CameraAltIcon sx={{ fontSize: currentSize.fontSize }} />
      </Avatar>
    );
  }

  if (variant === 'text') {
    return (
      <Typography
        variant="h6"
        component={Link}
        to="/"
        sx={{
          fontWeight: 700,
          color: color === 'white' ? 'white' : 'primary.main',
          textDecoration: 'none',
          fontSize: currentSize.fontSize,
          '&:hover': {
            opacity: 0.8,
          },
        }}
      >
        SkinSight AI
      </Typography>
    );
  }

  return (
    <Box
      component={Link}
      to="/"
      sx={{
        display: 'flex',
        alignItems: 'center',
        textDecoration: 'none',
        color: 'inherit',
        '&:hover': {
          opacity: 0.9,
        },
      }}
    >
      <Avatar
        sx={{
          width: currentSize.width,
          height: currentSize.height,
          bgcolor: 'primary.main',
          mr: 2,
        }}
      >
        <CameraAltIcon sx={{ fontSize: currentSize.fontSize, color: 'white' }} />
      </Avatar>
      <Typography
        variant="h6"
        sx={{
          fontWeight: 700,
          color: color === 'white' ? 'white' : 'primary.main',
          fontSize: currentSize.fontSize,
        }}
      >
        SkinSight AI
      </Typography>
    </Box>
  );
};

export default Logo;
