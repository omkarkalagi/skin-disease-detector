import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  Button,
  TextField,
  Avatar,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Fab,
  Tooltip,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondary,
  Divider,
  Paper,
  Badge,
  Tab,
  Tabs,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  Alert,
  AlertTitle,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  LinearProgress,
  Rating,
} from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  ThumbUp as LikeIcon,
  ThumbDown as DislikeIcon,
  Reply as ReplyIcon,
  Share as ShareIcon,
  Bookmark as BookmarkIcon,
  Report as ReportIcon,
  MoreVert as MoreIcon,
  Person as PersonIcon,
  Group as GroupIcon,
  QuestionAnswer as QAIcon,
  LocalHospital as ExpertIcon,
  Star as StarIcon,
  Verified as VerifiedIcon,
  TrendingUp as TrendingIcon,
  Schedule as RecentIcon,
  Favorite as PopularIcon,
  ExpandMore as ExpandMoreIcon,
  PhotoCamera as PhotoIcon,
  AttachFile as AttachIcon,
  Send as SendIcon,
  Close as CloseIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

interface ForumPost {
  id: string;
  title: string;
  content: string;
  author: {
    id: string;
    name: string;
    avatar: string;
    reputation: number;
    isExpert: boolean;
    isVerified: boolean;
  };
  category: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  likes: number;
  dislikes: number;
  replies: number;
  views: number;
  isBookmarked: boolean;
  isPinned: boolean;
  images?: string[];
  status: 'open' | 'solved' | 'closed';
}

interface Reply {
  id: string;
  postId: string;
  content: string;
  author: {
    id: string;
    name: string;
    avatar: string;
    reputation: number;
    isExpert: boolean;
  };
  createdAt: string;
  likes: number;
  isAccepted: boolean;
}

const CommunityForumPage: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [showNewPostDialog, setShowNewPostDialog] = useState(false);
  const [selectedPost, setSelectedPost] = useState<ForumPost | null>(null);
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    category: '',
    tags: [] as string[],
  });

  const categories = [
    { id: 'all', name: 'All Categories', icon: <GroupIcon />, count: 156 },
    { id: 'acne', name: 'Acne & Breakouts', icon: <ExpertIcon />, count: 45 },
    { id: 'skincare', name: 'Skincare Routines', icon: <StarIcon />, count: 38 },
    { id: 'conditions', name: 'Skin Conditions', icon: <ExpertIcon />, count: 29 },
    { id: 'products', name: 'Product Reviews', icon: <StarIcon />, count: 24 },
    { id: 'qa', name: 'Q&A', icon: <QAIcon />, count: 20 },
  ];

  const mockPosts: ForumPost[] = [
    {
      id: '1',
      title: 'Best routine for combination skin?',
      content: 'I have combination skin with an oily T-zone and dry cheeks. What products and routine would you recommend? I\'ve tried several products but nothing seems to work perfectly.',
      author: {
        id: '1',
        name: 'Sarah Johnson',
        avatar: '/api/placeholder/40/40',
        reputation: 245,
        isExpert: false,
        isVerified: true,
      },
      category: 'skincare',
      tags: ['combination-skin', 'routine', 'oily', 'dry'],
      createdAt: '2024-01-15T10:30:00Z',
      updatedAt: '2024-01-15T10:30:00Z',
      likes: 12,
      dislikes: 1,
      replies: 8,
      views: 156,
      isBookmarked: false,
      isPinned: false,
      status: 'open',
    },
    {
      id: '2',
      title: 'Dealing with hormonal acne - success story!',
      content: 'After 2 years of struggling with hormonal acne, I finally found a routine that works! Here\'s what helped me...',
      author: {
        id: '2',
        name: 'Dr. Emily Chen',
        avatar: '/api/placeholder/40/40',
        reputation: 1250,
        isExpert: true,
        isVerified: true,
      },
      category: 'acne',
      tags: ['hormonal-acne', 'success-story', 'treatment'],
      createdAt: '2024-01-14T15:45:00Z',
      updatedAt: '2024-01-14T15:45:00Z',
      likes: 45,
      dislikes: 0,
      replies: 23,
      views: 892,
      isBookmarked: true,
      isPinned: true,
      status: 'solved',
      images: ['/api/placeholder/200/150', '/api/placeholder/200/150'],
    },
    {
      id: '3',
      title: 'Retinol purging vs breakout - how to tell?',
      content: 'Started using retinol 3 weeks ago and my skin is breaking out. Is this normal purging or should I stop?',
      author: {
        id: '3',
        name: 'Mike Rodriguez',
        avatar: '/api/placeholder/40/40',
        reputation: 89,
        isExpert: false,
        isVerified: false,
      },
      category: 'products',
      tags: ['retinol', 'purging', 'breakout', 'help'],
      createdAt: '2024-01-13T09:20:00Z',
      updatedAt: '2024-01-13T09:20:00Z',
      likes: 8,
      dislikes: 0,
      replies: 15,
      views: 234,
      isBookmarked: false,
      isPinned: false,
      status: 'open',
    },
  ];

  const mockReplies: Reply[] = [
    {
      id: '1',
      postId: '1',
      content: 'I have similar skin type! What worked for me was using a gentle cleanser, BHA toner on oily areas, and a lightweight moisturizer. The key is using different products on different areas of your face.',
      author: {
        id: '4',
        name: 'Jessica Lee',
        avatar: '/api/placeholder/40/40',
        reputation: 156,
        isExpert: false,
      },
      createdAt: '2024-01-15T11:15:00Z',
      likes: 5,
      isAccepted: false,
    },
    {
      id: '2',
      postId: '1',
      content: 'As a dermatologist, I recommend starting with a gentle routine and gradually introducing active ingredients. For combination skin, consider using niacinamide which helps balance oil production.',
      author: {
        id: '5',
        name: 'Dr. Robert Kim',
        avatar: '/api/placeholder/40/40',
        reputation: 2100,
        isExpert: true,
      },
      createdAt: '2024-01-15T12:30:00Z',
      likes: 18,
      isAccepted: true,
    },
  ];

  const filteredPosts = mockPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    switch (sortBy) {
      case 'recent':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'popular':
        return b.likes - a.likes;
      case 'trending':
        return (b.likes + b.replies + b.views) - (a.likes + a.replies + a.views);
      default:
        return 0;
    }
  });

  const handleCreatePost = () => {
    // Mock post creation
    console.log('Creating post:', newPost);
    setShowNewPostDialog(false);
    setNewPost({ title: '', content: '', category: '', tags: [] });
  };

  const renderPostCard = (post: ForumPost) => (
    <motion.div
      key={post.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <Card sx={{ mb: 2, cursor: 'pointer' }} onClick={() => setSelectedPost(post)}>
        <CardContent>
          {post.isPinned && (
            <Chip
              label="Pinned"
              color="primary"
              size="small"
              sx={{ mb: 1 }}
            />
          )}
          
          <Box display="flex" alignItems="flex-start" gap={2}>
            <Avatar src={post.author.avatar} sx={{ width: 48, height: 48 }}>
              {post.author.name[0]}
            </Avatar>
            
            <Box flex={1}>
              <Box display="flex" alignItems="center" gap={1} mb={1}>
                <Typography variant="h6" component="h3">
                  {post.title}
                </Typography>
                {post.status === 'solved' && (
                  <Chip label="Solved" color="success" size="small" />
                )}
              </Box>
              
              <Box display="flex" alignItems="center" gap={1} mb={1}>
                <Typography variant="body2" color="text.secondary">
                  {post.author.name}
                </Typography>
                {post.author.isExpert && (
                  <Tooltip title="Expert">
                    <ExpertIcon color="primary" sx={{ fontSize: 16 }} />
                  </Tooltip>
                )}
                {post.author.isVerified && (
                  <Tooltip title="Verified">
                    <VerifiedIcon color="success" sx={{ fontSize: 16 }} />
                  </Tooltip>
                )}
                <Typography variant="caption" color="text.secondary">
                  • {new Date(post.createdAt).toLocaleDateString()}
                </Typography>
              </Box>
              
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {post.content.substring(0, 150)}...
              </Typography>
              
              <Box display="flex" flexWrap="wrap" gap={0.5} mb={2}>
                {post.tags.map(tag => (
                  <Chip key={tag} label={tag} size="small" variant="outlined" />
                ))}
              </Box>
              
              {post.images && post.images.length > 0 && (
                <Box display="flex" gap={1} mb={2}>
                  {post.images.slice(0, 3).map((image, index) => (
                    <Box
                      key={index}
                      component="img"
                      src={image}
                      sx={{
                        width: 60,
                        height: 60,
                        borderRadius: 1,
                        objectFit: 'cover',
                      }}
                    />
                  ))}
                  {post.images.length > 3 && (
                    <Box
                      sx={{
                        width: 60,
                        height: 60,
                        borderRadius: 1,
                        bgcolor: 'grey.200',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Typography variant="caption">
                        +{post.images.length - 3}
                      </Typography>
                    </Box>
                  )}
                </Box>
              )}
              
              <Box display="flex" alignItems="center" gap={3}>
                <Box display="flex" alignItems="center" gap={0.5}>
                  <IconButton size="small">
                    <LikeIcon fontSize="small" />
                  </IconButton>
                  <Typography variant="body2">{post.likes}</Typography>
                </Box>
                
                <Box display="flex" alignItems="center" gap={0.5}>
                  <ReplyIcon fontSize="small" color="action" />
                  <Typography variant="body2">{post.replies} replies</Typography>
                </Box>
                
                <Box display="flex" alignItems="center" gap={0.5}>
                  <Typography variant="body2" color="text.secondary">
                    {post.views} views
                  </Typography>
                </Box>
                
                <Box ml="auto" display="flex" gap={0.5}>
                  <IconButton size="small">
                    <BookmarkIcon fontSize="small" />
                  </IconButton>
                  <IconButton size="small">
                    <ShareIcon fontSize="small" />
                  </IconButton>
                  <IconButton size="small">
                    <MoreIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );

  const renderNewPostDialog = () => (
    <Dialog
      open={showNewPostDialog}
      onClose={() => setShowNewPostDialog(false)}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>Create New Post</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={3} pt={1}>
          <TextField
            fullWidth
            label="Post Title"
            value={newPost.title}
            onChange={(e) => setNewPost(prev => ({ ...prev, title: e.target.value }))}
            placeholder="What's your question or topic?"
          />
          
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
              value={newPost.category}
              onChange={(e) => setNewPost(prev => ({ ...prev, category: e.target.value }))}
            >
              {categories.filter(cat => cat.id !== 'all').map(category => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          
          <TextField
            fullWidth
            multiline
            rows={6}
            label="Content"
            value={newPost.content}
            onChange={(e) => setNewPost(prev => ({ ...prev, content: e.target.value }))}
            placeholder="Describe your question or share your experience in detail..."
          />
          
          <TextField
            fullWidth
            label="Tags"
            placeholder="Add tags separated by commas (e.g., acne, skincare, routine)"
            helperText="Tags help others find your post"
          />
          
          <Box display="flex" gap={1}>
            <Button startIcon={<PhotoIcon />} variant="outlined">
              Add Photos
            </Button>
            <Button startIcon={<AttachIcon />} variant="outlined">
              Attach Files
            </Button>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setShowNewPostDialog(false)}>Cancel</Button>
        <Button variant="contained" onClick={handleCreatePost} startIcon={<SendIcon />}>
          Post
        </Button>
      </DialogActions>
    </Dialog>
  );

  const renderPostDetails = () => (
    <Dialog
      open={!!selectedPost}
      onClose={() => setSelectedPost(null)}
      maxWidth="md"
      fullWidth
      maxHeight="90vh"
    >
      {selectedPost && (
        <>
          <DialogTitle>
            <Box display="flex" alignItems="center" justifyContent="between">
              <Typography variant="h6">{selectedPost.title}</Typography>
              <IconButton onClick={() => setSelectedPost(null)}>
                <CloseIcon />
              </IconButton>
            </Box>
          </DialogTitle>
          <DialogContent>
            <Box display="flex" alignItems="center" gap={2} mb={3}>
              <Avatar src={selectedPost.author.avatar} sx={{ width: 50, height: 50 }}>
                {selectedPost.author.name[0]}
              </Avatar>
              <Box>
                <Box display="flex" alignItems="center" gap={1}>
                  <Typography variant="subtitle1">{selectedPost.author.name}</Typography>
                  {selectedPost.author.isExpert && <ExpertIcon color="primary" sx={{ fontSize: 18 }} />}
                  {selectedPost.author.isVerified && <VerifiedIcon color="success" sx={{ fontSize: 18 }} />}
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Reputation: {selectedPost.author.reputation} • {new Date(selectedPost.createdAt).toLocaleDateString()}
                </Typography>
              </Box>
            </Box>
            
            <Typography variant="body1" paragraph>
              {selectedPost.content}
            </Typography>
            
            {selectedPost.images && (
              <Box display="flex" gap={1} mb={3} flexWrap="wrap">
                {selectedPost.images.map((image, index) => (
                  <Box
                    key={index}
                    component="img"
                    src={image}
                    sx={{
                      width: 150,
                      height: 100,
                      borderRadius: 1,
                      objectFit: 'cover',
                    }}
                  />
                ))}
              </Box>
            )}
            
            <Divider sx={{ my: 3 }} />
            
            <Typography variant="h6" gutterBottom>
              Replies ({mockReplies.length})
            </Typography>
            
            {mockReplies.map(reply => (
              <Box key={reply.id} sx={{ mb: 3 }}>
                <Box display="flex" alignItems="flex-start" gap={2}>
                  <Avatar src={reply.author.avatar} sx={{ width: 40, height: 40 }}>
                    {reply.author.name[0]}
                  </Avatar>
                  <Box flex={1}>
                    <Box display="flex" alignItems="center" gap={1} mb={1}>
                      <Typography variant="subtitle2">{reply.author.name}</Typography>
                      {reply.author.isExpert && <ExpertIcon color="primary" sx={{ fontSize: 16 }} />}
                      {reply.isAccepted && (
                        <Chip label="Accepted Answer" color="success" size="small" />
                      )}
                      <Typography variant="caption" color="text.secondary">
                        {new Date(reply.createdAt).toLocaleDateString()}
                      </Typography>
                    </Box>
                    <Typography variant="body2" paragraph>
                      {reply.content}
                    </Typography>
                    <Box display="flex" alignItems="center" gap={1}>
                      <IconButton size="small">
                        <LikeIcon fontSize="small" />
                      </IconButton>
                      <Typography variant="caption">{reply.likes}</Typography>
                      <Button size="small" startIcon={<ReplyIcon />}>
                        Reply
                      </Button>
                    </Box>
                  </Box>
                </Box>
                <Divider sx={{ mt: 2 }} />
              </Box>
            ))}
            
            <Box mt={3}>
              <TextField
                fullWidth
                multiline
                rows={3}
                placeholder="Write your reply..."
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton>
                        <SendIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          </DialogContent>
        </>
      )}
    </Dialog>
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Box textAlign="center" mb={4}>
          <Typography variant="h3" component="h1" gutterBottom className="gradient-text">
            Community Forum
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Connect, share experiences, and get support from the community
          </Typography>
        </Box>
      </motion.div>

      <Grid container spacing={3}>
        {/* Sidebar */}
        <Grid item xs={12} md={3}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Categories
              </Typography>
              <List dense>
                {categories.map(category => (
                  <ListItem
                    key={category.id}
                    button
                    selected={selectedCategory === category.id}
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    <ListItemAvatar>
                      <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
                        {category.icon}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={category.name}
                      secondary={`${category.count} posts`}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Community Stats
              </Typography>
              <Box display="flex" flexDirection="column" gap={2}>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Total Members
                  </Typography>
                  <Typography variant="h6">2,847</Typography>
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Posts This Week
                  </Typography>
                  <Typography variant="h6">156</Typography>
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Active Experts
                  </Typography>
                  <Typography variant="h6">23</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Main Content */}
        <Grid item xs={12} md={9}>
          {/* Controls */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Box display="flex" gap={2} alignItems="center" flexWrap="wrap">
                <TextField
                  placeholder="Search posts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ minWidth: 300 }}
                />
                
                <FormControl size="small" sx={{ minWidth: 120 }}>
                  <InputLabel>Sort by</InputLabel>
                  <Select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <MenuItem value="recent">
                      <Box display="flex" alignItems="center" gap={1}>
                        <RecentIcon fontSize="small" />
                        Recent
                      </Box>
                    </MenuItem>
                    <MenuItem value="popular">
                      <Box display="flex" alignItems="center" gap={1}>
                        <PopularIcon fontSize="small" />
                        Popular
                      </Box>
                    </MenuItem>
                    <MenuItem value="trending">
                      <Box display="flex" alignItems="center" gap={1}>
                        <TrendingIcon fontSize="small" />
                        Trending
                      </Box>
                    </MenuItem>
                  </Select>
                </FormControl>
                
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={() => setShowNewPostDialog(true)}
                  sx={{ ml: 'auto' }}
                >
                  New Post
                </Button>
              </Box>
            </CardContent>
          </Card>

          {/* Posts List */}
          <AnimatePresence>
            {sortedPosts.length === 0 ? (
              <Card>
                <CardContent sx={{ textAlign: 'center', py: 8 }}>
                  <GroupIcon sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
                  <Typography variant="h5" color="text.secondary" gutterBottom>
                    No posts found
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                    Be the first to start a conversation in this category
                  </Typography>
                  <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => setShowNewPostDialog(true)}
                  >
                    Create First Post
                  </Button>
                </CardContent>
              </Card>
            ) : (
              sortedPosts.map(renderPostCard)
            )}
          </AnimatePresence>
        </Grid>
      </Grid>

      {/* Floating Action Button */}
      <Tooltip title="New Post">
        <Fab
          color="primary"
          sx={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            background: 'linear-gradient(45deg, #667eea 0%, #764ba2 100%)',
          }}
          onClick={() => setShowNewPostDialog(true)}
        >
          <AddIcon />
        </Fab>
      </Tooltip>

      {/* Dialogs */}
      {renderNewPostDialog()}
      {renderPostDetails()}
    </Container>
  );
};

export default CommunityForumPage;