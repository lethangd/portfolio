import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Box, Drawer, List, ListItem, ListItemText, useScrollTrigger, Avatar, Container } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-scroll';
import { Code, Brightness4, Brightness7 } from '@mui/icons-material';

interface NavItem {
  title: string;
  href: string;
}

const navItems: NavItem[] = [
  { title: 'Home', href: 'home' },
  { title: 'About', href: 'about' },
  { title: 'Skills', href: 'skills' },
  { title: 'Experience', href: 'experience' },
  { title: 'Projects', href: 'projects' },
  { title: 'Education', href: 'education' },
  { title: 'Contact', href: 'contact' },
];

const Header: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const scrollTrigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 50,
  });

  // Handle scroll to set active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => item.href);
      const scrollPosition = window.scrollY + 100;

      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          return scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight;
        }
        return false;
      });

      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initialize on mount
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    // In a real app, you would implement actual dark mode toggling here
  };

  // Particles for background animation
  const particles = Array.from({ length: 10 }).map((_, i) => (
    <motion.div
      key={i}
      initial={{ opacity: 0 }}
      animate={{
        opacity: [0.1, 0.3, 0.1],
        x: [0, Math.random() * 50 - 25],
        y: [0, Math.random() * 30 - 15],
      }}
      transition={{
        duration: 3 + Math.random() * 3,
        repeat: Infinity,
        repeatType: "reverse",
        delay: i * 0.2,
      }}
      style={{
        position: 'absolute',
        width: 3 + Math.random() * 6,
        height: 3 + Math.random() * 6,
        borderRadius: '50%',
        background: 'rgba(25, 118, 210, 0.5)',
        top: Math.random() * 60,
        left: 20 + i * 100,
        filter: 'blur(1px)',
        zIndex: 0,
      }}
    />
  ));

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar 
        position="fixed" 
        elevation={0}
        sx={{ 
          background: scrollTrigger 
            ? 'rgba(255, 255, 255, 0.85)' 
            : 'transparent',  // Completely transparent at top
          backdropFilter: scrollTrigger ? 'blur(10px)' : 'none',  // Remove blur when at top
          boxShadow: scrollTrigger 
            ? '0 10px 30px -10px rgba(0,0,0,0.1)' 
            : 'none',  // No shadow when at top
          borderBottom: scrollTrigger 
            ? '1px solid rgba(231, 235, 240, 0.8)' 
            : 'none',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          color: scrollTrigger ? 'text.primary' : 'black',  // Changed from 'white' to 'black'
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ height: scrollTrigger ? 70 : 90, transition: 'height 0.3s ease' }}>
            {/* Logo and Brand */}
            <Box 
              sx={{ 
                flexGrow: 1, 
                display: 'flex',
                alignItems: 'center',
                position: 'relative',
                zIndex: 1,
              }}
            >
              {particles}
              
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1, rotate: 360 }}
                transition={{ duration: 0.6, type: "spring" }}
                whileHover={{ rotate: 380, transition: { duration: 0.4 } }}
              >
                <Avatar 
                  sx={{ 
                    bgcolor: 'primary.main', 
                    mr: 2,
                    width: scrollTrigger ? 40 : 50,
                    height: scrollTrigger ? 40 : 50,
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
                  }}
                >
                  <Code fontSize={scrollTrigger ? "small" : "medium"} />
                </Avatar>
              </motion.div>
              
              <Box sx={{ position: 'relative' }}>
                <Typography
                  variant={scrollTrigger ? "h6" : "h5"}
                  component={motion.div}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  sx={{ 
                    fontWeight: 800,
                    letterSpacing: 1,
                    transition: 'all 0.3s ease',
                    background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  PORTFOLIO
                </Typography>

                <motion.div 
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.5, duration: 0.4 }}
                  style={{ 
                    position: 'absolute',
                    bottom: -3,
                    left: 0,
                    height: 2,
                    width: '70%',
                    background: 'linear-gradient(90deg, #1976d2, transparent)',
                    transformOrigin: 'left',
                  }}
                />
              </Box>
            </Box>

            {/* Desktop Navigation */}
            <Box 
              sx={{ 
                display: { xs: 'none', md: 'flex' },
                alignItems: 'center',
              }}
            >
              {navItems.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                >
                  <Link
                    to={item.href}
                    spy={true}
                    smooth={true}
                    offset={-70}
                    duration={800}
                    activeClass="active"
                  >
                    <Button
                      color="inherit"
                      sx={{ 
                        mx: 0.5,
                        px: 2,
                        py: 1,
                        borderRadius: 2,
                        position: 'relative',
                        overflow: 'hidden',
                        fontSize: '0.95rem',
                        fontWeight: activeSection === item.href ? 700 : 500,
                        color: activeSection === item.href 
                          ? (scrollTrigger ? 'primary.main' : 'black') 
                          : 'inherit',
                        textShadow: !scrollTrigger ? '0 1px 4px rgba(255,255,255,0.5)' : 'none', // Updated shadow for dark text
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          bottom: 0,
                          left: '50%',
                          transform: 'translateX(-50%)',
                          width: activeSection === item.href ? '80%' : '0%',
                          height: '3px',
                          background: scrollTrigger 
                            ? 'linear-gradient(90deg, transparent, #1976d2, transparent)'
                            : 'linear-gradient(90deg, transparent, #ffffff, transparent)',
                          transition: 'all 0.3s ease',
                          borderRadius: '3px',
                        },
                        '&:hover::before': {
                          width: '80%',
                        },
                        '&:hover': {
                          backgroundColor: scrollTrigger 
                            ? 'rgba(25, 118, 210, 0.08)'
                            : 'rgba(255, 255, 255, 0.2)',
                        },
                      }}
                    >
                      {item.title}
                    </Button>
                  </Link>
                </motion.div>
              ))}

              {/* Dark mode toggle button */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.9 }}
                whileHover={{ rotate: 180, transition: { duration: 0.4 } }}
                style={{ marginLeft: 8 }}
              >
                <IconButton 
                  color="inherit" 
                  onClick={toggleDarkMode}
                  sx={{ 
                    ml: 1, 
                    bgcolor: scrollTrigger 
                      ? 'rgba(25, 118, 210, 0.1)'
                      : 'rgba(0, 0, 0, 0.1)',  // Changed from white to black with opacity
                    '&:hover': {
                      bgcolor: scrollTrigger 
                        ? 'rgba(25, 118, 210, 0.2)'
                        : 'rgba(0, 0, 0, 0.2)',  // Changed from white to black with opacity
                    }
                  }}
                >
                  {darkMode ? <Brightness7 /> : <Brightness4 />}
                </IconButton>
              </motion.div>
            </Box>

            {/* Mobile Navigation Icon */}
            <Box sx={{ display: { md: 'none' } }}>
              <motion.div 
                whileTap={{ scale: 0.9 }}
              >
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="end"
                  onClick={handleDrawerToggle}
                  sx={{ 
                    bgcolor: scrollTrigger 
                      ? 'rgba(25, 118, 210, 0.1)'
                      : 'rgba(255, 255, 255, 0.2)',
                    borderRadius: 2,
                    p: 1,
                  }}
                >
                  <MenuIcon />
                </IconButton>
              </motion.div>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Navigation Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: '100%',
            maxWidth: '350px',
            background: 'rgba(255,255,255,0.95)',
            backdropFilter: 'blur(10px)',
            boxShadow: '-5px 0 30px rgba(0,0,0,0.1)',
            borderLeft: '1px solid rgba(231, 235, 240, 0.8)',
            borderRadius: '10px 0 0 10px',
            padding: 3,
          },
        }}
      >
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          height: '100%',
          position: 'relative',
        }}>
          {/* Drawer header */}
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            mb: 4
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                <Code />
              </Avatar>
              <Typography variant="h6" fontWeight="bold">
                Portfolio
              </Typography>
            </Box>
            <IconButton 
              onClick={handleDrawerToggle}
              sx={{ 
                bgcolor: 'rgba(25, 118, 210, 0.1)',
                '&:hover': {
                  bgcolor: 'rgba(25, 118, 210, 0.2)',
                }
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Drawer navigation */}
          <List sx={{ flexGrow: 1 }}>
            <AnimatePresence>
              {navItems.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 50, opacity: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <ListItem 
                    component={Link}
                    to={item.href}
                    smooth={true}
                    duration={500}
                    onClick={handleDrawerToggle}
                    sx={{ 
                      mb: 1,
                      borderRadius: 2,
                      transition: 'all 0.2s ease',
                      cursor: 'pointer',
                      background: activeSection === item.href 
                        ? 'linear-gradient(90deg, rgba(25, 118, 210, 0.1), transparent)'
                        : 'transparent',
                      '&:hover': {
                        background: 'rgba(25, 118, 210, 0.08)',
                        pl: 2,
                      }
                    }}
                  >
                    <ListItemText 
                      primary={item.title} 
                      primaryTypographyProps={{
                        fontWeight: activeSection === item.href ? 700 : 500,
                        color: activeSection === item.href ? 'primary.main' : 'inherit',
                      }}
                    />
                    {activeSection === item.href && (
                      <motion.div
                        layoutId="activeIndicator"
                        style={{
                          width: 4,
                          height: 20,
                          backgroundColor: '#1976d2',
                          borderRadius: 4,
                        }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                  </ListItem>
                </motion.div>
              ))}
            </AnimatePresence>
          </List>

          {/* Drawer footer */}
          <Box sx={{ pt: 2 }}>
            <Typography variant="body2" color="text.secondary" align="center">
              © {new Date().getFullYear()} Le Minh Thang
            </Typography>
          </Box>

          {/* Decorative elements */}
          <Box
            sx={{
              position: 'absolute',
              bottom: 40,
              right: 20,
              width: 100,
              height: 100,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(25,118,210,0.1) 0%, rgba(255,255,255,0) 70%)',
              zIndex: -1,
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              top: 100,
              left: 20,
              width: 150,
              height: 150,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(25,118,210,0.05) 0%, rgba(255,255,255,0) 70%)',
              zIndex: -1,
            }}
          />
        </Box>
      </Drawer>
      
      {/* Offset for fixed AppBar */}
      <Toolbar sx={{ height: scrollTrigger ? 70 : 90, transition: 'height 0.3s ease' }} />
    </Box>
  );
};

export default Header;