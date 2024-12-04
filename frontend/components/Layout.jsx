import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
  useTheme,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { Menu } from '@mui/icons-material';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';

const Layout = ({ children }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);
  const location = useLocation();
  const theme = useTheme();
  const navigate = useNavigate();

  // Update isMobile state when window resizes
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Routes to exclude from the Layout
  const excludedRoutes = ['/', '/signup','/admin','/admin/profile','/admin/users','/admin/candidates','/admin/vote','/admin/results','/admin/profile','/admin/logout'];

  // Check if current route is excluded
  if (excludedRoutes.includes(location.pathname)) {
    return <Box sx={{ padding: 2 }}>{children}</Box>;
  }

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  // Navigation links
  const navLinks = [
    { name: 'Home', path: '/home' },
    { name: 'Candidates', path: '/candidates' },
    { name: 'Vote', path: '/vote' },
    { name: 'Results', path: '/results' },
    { name: 'Profile', path: '/profile' },
    { name: 'Logout', path: '/logout', onClick: () => setOpenLogoutDialog(true) },
  ];

  // Handle logout confirmation
  const handleLogoutConfirm = () => {
    setOpenLogoutDialog(false);
    navigate('/'); // Redirect to home page
  };

  const handleLogoutCancel = () => {
    setOpenLogoutDialog(false);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* AppBar for large screens */}
      <AppBar
        position="fixed"
        sx={{
          background:'linear-gradient(45deg, #1a1a1a, #333333)',
          color:'white',
          textDecoration:'none',
          padding: isMobile ? 0 : '0 2rem',
          boxShadow: isMobile ? 'none' : theme.shadows[2],
        }}
      >
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: isMobile ? 0 : '2rem',
          }}
        >
          {/* Menu button for mobile screens */}
          {isMobile && (
            <IconButton color="inherit" onClick={toggleDrawer} edge="start">
              <Menu />
            </IconButton>
          )}

          {/* Title */}
          <Typography
            variant="h6"
            sx={{
              flexGrow: 1,
              fontWeight: 'bold',
              color: '#fff',
              textAlign: 'left',
            }}
          >
            College Election System
          </Typography>

          {/* Navigation buttons for larger screens */}
          {!isMobile &&
            navLinks.map((link) => (
              <Button
                key={link.name}
                component={RouterLink}
                to={link.path}
                onClick={link.onClick}
                sx={{
                  color: '#fff',
                  textTransform: 'none',
                  fontWeight: location.pathname === link.path ? 'bold' : 'normal',
                  borderBottom: location.pathname === link.path ? '2px solid #fff' : 'none',
                  '&:hover': {
                    backgroundColor: '#aaaaaa',
                    color:'yellow'
                  },
                }}
              >
                {link.name}
              </Button>
            ))}
        </Toolbar>
      </AppBar>

      {/* Drawer for smaller screens */}
      {isMobile && (
        <Drawer
          open={drawerOpen}
          onClose={toggleDrawer}
          sx={{
            '& .MuiDrawer-paper': {
              width: 240,
              boxSizing: 'border-box',
              background:'linear-gradient(45deg, #1a1a1a, #333333)',
              color:'white',
              textDecoration:'none',
            },
          }}
        >
          <List>
            {navLinks.map((link) => (
              <ListItem
              sx={{color:'white',}}
                button
                key={link.name}
                component={RouterLink}
                to={link.path}
                onClick={link.onClick}
              >
                <ListItemText primary={link.name} />
              </ListItem>
            ))}
          </List>
        </Drawer>
      )}

      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          mt: { xs: 8, sm: 10 },
          padding: 2,
        }}
      >
        {children}
      </Box>

      {/* Logout confirmation dialog */}
      <Dialog open={openLogoutDialog} onClose={handleLogoutCancel}>
        <DialogTitle>Confirm Logout</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to log out?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLogoutCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleLogoutConfirm} color="secondary">
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Layout;
