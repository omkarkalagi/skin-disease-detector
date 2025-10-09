import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  IconButton,
  Tooltip,
  Button,
  Avatar,
  Skeleton,
  LinearProgress,
  Rating,
  Fab,
} from '@mui/material';
import {
  Favorite as FavoriteIcon,
  Share as ShareIcon,
  BookmarkBorder as BookmarkIcon,
  ThumbUp as LikeIcon,
  TrendingUp as TrendingIcon,
  Visibility as ViewIcon,
  Star as StarIcon,
} from '@mui/icons-material';

interface InteractiveCardProps {
  title: string;
  description: string;
  image: string;
  badge?: string;
  rating?: number;
  views?: number;
  trending?: boolean;
  onClick?: () => void;
  onLike?: () => void;
  onShare?: () => void;
  isLiked?: boolean;
  features?: string[];
  delay?: number;
}

export const InteractiveCard: React.FC<InteractiveCardProps> = ({
  title,
  description,
  image,
  badge,
  rating = 4.5,
  views = 1000,
  trending = false,
  onClick,
  onLike,
  onShare,
  isLiked = false,
  features = [],
  delay = 0,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showFeatures, setShowFeatures] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowFeatures(true);
    }, delay + 500);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <Card
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{
        height: '100%',
        cursor: onClick ? 'pointer' : 'default',
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        transform: isHovered ? 'translateY(-8px) scale(1.02)' : 'translateY(0) scale(1)',
        boxShadow: isHovered
          ? '0 20px 40px rgba(0,0,0,0.15)'
          : '0 4px 6px rgba(0, 0, 0, 0.05)',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 4,
          bgcolor: badge === 'New' ? '#ff6b6b' : badge === 'Popular' ? '#4ecdc4' : '#45b7d1',
          transform: isHovered ? 'scaleX(1)' : 'scaleX(0)',
          transformOrigin: 'left',
          transition: 'transform 0.3s ease',
        },
      }}
    >
      {/* Trending Badge */}
      {trending && (
        <Box
          sx={{
            position: 'absolute',
            top: 16,
            left: 16,
            bgcolor: '#ff6b6b',
            color: 'white',
            px: 1,
            py: 0.5,
            borderRadius: 1,
            fontSize: '0.7rem',
            fontWeight: 'bold',
            zIndex: 2,
            animation: 'pulse 2s ease-in-out infinite',
          }}
        >
          🔥 Trending
        </Box>
      )}

      {/* Feature Badge */}
      {badge && (
        <Chip
          label={badge}
          size="small"
          sx={{
            position: 'absolute',
            top: 16,
            right: 16,
            zIndex: 2,
            bgcolor: badge === 'New' ? '#ff6b6b' : badge === 'Popular' ? '#4ecdc4' : '#45b7d1',
            color: 'white',
            animation: badge === 'New' ? 'bounce 1s ease-in-out infinite' : 'none',
          }}
        />
      )}

      {/* Image with Loading Animation */}
      <Box sx={{ position: 'relative', overflow: 'hidden' }}>
        {!imageLoaded && (
          <Skeleton
            variant="rectangular"
            height={200}
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              zIndex: 1,
            }}
          />
        )}
        <CardMedia
          component="img"
          height={200}
          image={image}
          alt={title}
          onLoad={() => setImageLoaded(true)}
          sx={{
            objectFit: 'cover',
            transition: 'transform 0.3s ease',
            transform: isHovered ? 'scale(1.05)' : 'scale(1)',
          }}
        />

        {/* Overlay on Hover */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            bgcolor: 'rgba(0,0,0,0.3)',
            opacity: isHovered ? 1 : 0,
            transition: 'opacity 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Button
            variant="contained"
            sx={{
              bgcolor: 'rgba(255,255,255,0.9)',
              color: 'text.primary',
              '&:hover': {
                bgcolor: 'white',
                transform: 'scale(1.1)',
              },
            }}
          >
            View Details
          </Button>
        </Box>
      </Box>

      <CardContent sx={{ p: 3 }}>
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            fontWeight: 'bold',
            color: badge === 'New' ? '#ff6b6b' : badge === 'Popular' ? '#4ecdc4' : '#45b7d1',
          }}
        >
          {title}
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {description}
        </Typography>

        {/* Rating and Views */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Rating value={rating} readOnly size="small" />
            <Typography variant="caption" sx={{ ml: 1 }}>
              ({rating})
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <ViewIcon fontSize="small" sx={{ mr: 0.5, color: 'text.secondary' }} />
            <Typography variant="caption" color="text.secondary">
              {views.toLocaleString()}
            </Typography>
          </Box>
        </Box>

        {/* Features List with Animation */}
        {showFeatures && (
          <Box sx={{ mb: 2 }}>
            {features.slice(0, 2).map((feature, index) => (
              <Chip
                key={index}
                label={feature}
                size="small"
                variant="outlined"
                sx={{
                  mr: 0.5,
                  mb: 0.5,
                  opacity: 0,
                  animation: `fadeInUp 0.5s ease-out ${delay + 800 + (index * 100)}ms forwards`,
                }}
              />
            ))}
          </Box>
        )}

        {/* Action Buttons */}
        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', gap: 0.5 }}>
            <Tooltip title={isLiked ? 'Remove from favorites' : 'Add to favorites'}>
              <IconButton
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  onLike?.();
                }}
                sx={{
                  color: isLiked ? '#ff6b6b' : 'text.secondary',
                  '&:hover': {
                    bgcolor: 'rgba(255, 107, 107, 0.1)',
                    transform: 'scale(1.1)',
                  },
                  transition: 'all 0.2s ease',
                }}
              >
                <FavoriteIcon fontSize="small" />
              </IconButton>
            </Tooltip>

            <Tooltip title="Share this feature">
              <IconButton
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  onShare?.();
                }}
                sx={{
                  color: 'text.secondary',
                  '&:hover': {
                    bgcolor: 'rgba(78, 205, 196, 0.1)',
                    transform: 'scale(1.1)',
                    color: '#4ecdc4',
                  },
                  transition: 'all 0.2s ease',
                }}
              >
                <ShareIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>

          <Button
            variant="outlined"
            size="small"
            sx={{
              borderColor: badge === 'New' ? '#ff6b6b' : badge === 'Popular' ? '#4ecdc4' : '#45b7d1',
              color: badge === 'New' ? '#ff6b6b' : badge === 'Popular' ? '#4ecdc4' : '#45b7d1',
              '&:hover': {
                borderColor: badge === 'New' ? '#ff5252' : badge === 'Popular' ? '#45b7d1' : '#36a2a8',
                bgcolor: badge === 'New' ? '#ff6b6b' : badge === 'Popular' ? '#4ecdc4' : '#45b7d1' + '15',
                transform: 'translateY(-1px)',
              }
            }}
          >
            Try Now
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

// Enhanced Statistics Component
export const InteractiveStats: React.FC<{
  value: number;
  suffix: string;
  label: string;
  icon: React.ReactNode;
  color: string;
  delay?: number;
}> = ({ value, suffix, label, icon, color, delay = 0 }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      const duration = 2000;
      const steps = 60;
      const increment = value / steps;
      let current = 0;

      const counter = setInterval(() => {
        current += increment;
        if (current >= value) {
          setDisplayValue(value);
          clearInterval(counter);
        } else {
          setDisplayValue(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(counter);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return (
    <Box
      sx={{
        textAlign: 'center',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'all 0.8s ease-out',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, justifyContent: 'center' }}>
        <Box sx={{ color, mr: 1, animation: 'pulse 2s ease-in-out infinite' }}>
          {icon}
        </Box>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 'bold',
            background: `linear-gradient(45deg, ${color}, #ffffff)`,
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          {typeof displayValue === 'number' && displayValue > 1000
            ? `${(displayValue / 1000).toFixed(0)}k`
            : displayValue
          }{suffix}
        </Typography>
      </Box>
      <Typography variant="body2" sx={{ opacity: 0.8 }}>
        {label}
      </Typography>
    </Box>
  );
};

// Enhanced Loading Component
export const InteractiveSkeleton: React.FC<{
  variant?: 'card' | 'text' | 'circular';
  count?: number;
  height?: number;
}> = ({ variant = 'card', count = 3, height = 200 }) => {
  if (variant === 'card') {
    return (
      <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
        {Array.from({ length: count }).map((_, index) => (
          <Card key={index} sx={{ width: 300, animation: `shimmer 2s ease-in-out infinite` }}>
            <Skeleton variant="rectangular" height={height} />
            <CardContent>
              <Skeleton variant="text" height={28} width="80%" />
              <Skeleton variant="text" height={20} width="60%" />
              <Skeleton variant="text" height={20} width="40%" />
            </CardContent>
          </Card>
        ))}
      </Box>
    );
  }

  if (variant === 'circular') {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Skeleton variant="circular" width={40} height={40} />
        <Box>
          <Skeleton variant="text" height={20} width={120} />
          <Skeleton variant="text" height={16} width={80} />
        </Box>
      </Box>
    );
  }

  return (
    <Box>
      {Array.from({ length: count }).map((_, index) => (
        <Skeleton
          key={index}
          variant="text"
          height={20}
          width={`${Math.random() * 40 + 60}%`}
          sx={{ mb: 1, animation: `shimmer 2s ease-in-out infinite` }}
        />
      ))}
    </Box>
  );
};

// Floating Action Button with Enhanced Interactions
export const InteractiveFAB: React.FC<{
  onClick: () => void;
  icon: React.ReactNode;
  color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
  tooltip?: string;
  pulse?: boolean;
}> = ({ onClick, icon, color = 'primary', tooltip, pulse = false }) => {
  return (
    <Tooltip title={tooltip || 'Quick Action'} placement="left">
      <Fab
        color={color}
        onClick={onClick}
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          zIndex: 1000,
          animation: pulse ? 'pulse 2s ease-in-out infinite' : 'none',
          '&:hover': {
            transform: 'scale(1.1)',
            boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
          },
          transition: 'all 0.3s ease',
        }}
      >
        {icon}
      </Fab>
    </Tooltip>
  );
};

// Progress Bar with Animation
export const AnimatedProgress: React.FC<{
  value: number;
  label: string;
  color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
  showPercentage?: boolean;
  delay?: number;
}> = ({ value, label, color = 'primary', showPercentage = true, delay = 0 }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(value);
    }, delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return (
    <Box sx={{ mb: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
        <Typography variant="body2">{label}</Typography>
        {showPercentage && (
          <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
            {progress}%
          </Typography>
        )}
      </Box>
      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{
          height: 8,
          borderRadius: 4,
          bgcolor: 'grey.200',
          '& .MuiLinearProgress-bar': {
            bgcolor: color + '.main',
            borderRadius: 4,
            transition: 'transform 1s ease-in-out',
          },
        }}
      />
    </Box>
  );
};

// Enhanced Tooltip Component
export const InteractiveTooltip: React.FC<{
  title: string;
  children: React.ReactNode;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
}> = ({ title, children, placement = 'top', delay = 300 }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleMouseEnter = () => {
    setTimeout(() => setShowTooltip(true), delay);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  return (
    <Box
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      sx={{ position: 'relative', display: 'inline-block' }}
    >
      {children}
      {showTooltip && (
        <Box
          sx={{
            position: 'absolute',
            bottom: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            bgcolor: 'rgba(0,0,0,0.9)',
            color: 'white',
            px: 2,
            py: 1,
            borderRadius: 1,
            fontSize: '0.8rem',
            whiteSpace: 'nowrap',
            zIndex: 1000,
            mb: 1,
            '&::after': {
              content: '""',
              position: 'absolute',
              top: '100%',
              left: '50%',
              transform: 'translateX(-50%)',
              borderLeft: '5px solid transparent',
              borderRight: '5px solid transparent',
              borderTop: '5px solid rgba(0,0,0,0.9)',
            },
            animation: 'fadeIn 0.3s ease-in-out',
          }}
        >
          {title}
        </Box>
      )}
    </Box>
  );
};

export default {
  InteractiveCard,
  InteractiveStats,
  InteractiveSkeleton,
  InteractiveFAB,
  AnimatedProgress,
  InteractiveTooltip,
};
