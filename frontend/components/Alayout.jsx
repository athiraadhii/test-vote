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
  colors,
} from '@mui/material';
import { Menu } from '@mui/icons-material';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';

const Alayout = ({ children }) => {
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

  // Routes to exclude from the Layout (e.g. login or signup pages)
  const excludedRoutes = ['/', '/signup','/home','/candidates','/vote','/results','/profile','/logout'];

  // Check if current route is excluded
  if (excludedRoutes.includes(location.pathname)) {
    return <Box sx={{ padding: 2 }}>{children}</Box>;
  }

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  // Navigation links for Admin
  const adminNavLinks = [
    { name: 'Home', path: '/admin' },
    { name: 'Manage Users', path: '/admin/users' },
    { name: 'Manage Candidates', path: '/admin/candidates' },
    { name: 'View Results', path: '/admin/results' },
    { name: 'Profile', path: '/admin/profile' },
    { name: 'Logout', path: '/admin/logout', onClick: () => setOpenLogoutDialog(true) },
  ];

  // Handle logout confirmation
  const handleLogoutConfirm = () => {
    setOpenLogoutDialog(false);
    navigate('/'); // Redirect to login page
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
            Admin Panel
          </Typography>

          {/* Navigation buttons for larger screens */}
          {!isMobile &&
            adminNavLinks.map((link) => (
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
          <List >
            {adminNavLinks.map((link) => (
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

export default Alayout;
