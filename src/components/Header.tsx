import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Box, Drawer, List, ListItem, ListItemText, useScrollTrigger, Avatar, Container } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-scroll';
import { Code, RocketLaunch } from '@mui/icons-material';

interface NavItem {
  title: string;
  href: string;
  icon?: React.ReactNode;
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
  const [activeSection, setActiveSection] = useState('home');
  const scrollTrigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 50,
  });

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
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar 
        position="fixed" 
        elevation={0}
        sx={{ 
          background: scrollTrigger 
            ? 'rgba(15, 23, 42, 0.85)' 
            : 'transparent',
          backdropFilter: scrollTrigger ? 'blur(20px) saturate(180%)' : 'none',
          boxShadow: scrollTrigger 
            ? '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 -1px 0 rgba(255, 255, 255, 0.1)' 
            : 'none',
          borderBottom: scrollTrigger 
            ? '1px solid rgba(255, 255, 255, 0.08)' 
            : 'none',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <Container maxWidth="lg">
          <Toolbar 
            disableGutters 
            sx={{ 
              height: scrollTrigger ? 70 : 90, 
              transition: 'height 0.3s ease',
              justifyContent: 'space-between'
            }}
          >
            {/* Logo and Brand */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, type: 'spring' }}
            >
              <Box 
                sx={{ 
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                }}
              >
                <motion.div
                  whileHover={{ 
                    rotate: 360,
                    scale: 1.1,
                  }}
                  transition={{ duration: 0.6 }}
                >
                  <Avatar 
                    sx={{ 
                      width: scrollTrigger ? 42 : 50,
                      height: scrollTrigger ? 42 : 50,
                      transition: 'all 0.3s ease',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
                      boxShadow: '0 4px 20px rgba(102, 126, 234, 0.4)',
                      border: '2px solid rgba(255, 255, 255, 0.2)',
                    }}
                  >
                    <Code sx={{ fontSize: scrollTrigger ? 22 : 28, color: '#fff' }} />
                  </Avatar>
                </motion.div>
                
                <Box>
                  <Typography
                    variant={scrollTrigger ? "h6" : "h5"}
                    sx={{ 
                      fontWeight: 800,
                      letterSpacing: 2,
                      transition: 'all 0.3s ease',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      textTransform: 'uppercase',
                    }}
                  >
                    Le Minh Thang
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      color: 'rgba(255, 255, 255, 0.6)',
                      letterSpacing: 3,
                      textTransform: 'uppercase',
                      fontSize: '0.65rem',
                      display: scrollTrigger ? 'none' : 'block',
                    }}
                  >
                    Full-Stack Developer
                  </Typography>
                </Box>
              </Box>
            </motion.div>

            {/* Desktop Navigation */}
            <Box 
              sx={{ 
                display: { xs: 'none', md: 'flex' },
                alignItems: 'center',
                gap: 0.5,
                background: scrollTrigger ? 'transparent' : 'rgba(255, 255, 255, 0.05)',
                backdropFilter: scrollTrigger ? 'none' : 'blur(10px)',
                borderRadius: 4,
                padding: scrollTrigger ? 0 : '6px 12px',
                border: scrollTrigger ? 'none' : '1px solid rgba(255, 255, 255, 0.1)',
                transition: 'all 0.3s ease',
              }}
            >
              {navItems.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.08 + 0.2 }}
                >
                  <Link
                    to={item.href}
                    spy={true}
                    smooth={true}
                    offset={-70}
                    duration={800}
                  >
                    <Button
                      sx={{ 
                        px: 2,
                        py: 1,
                        borderRadius: 2,
                        position: 'relative',
                        overflow: 'hidden',
                        fontSize: '0.85rem',
                        fontWeight: activeSection === item.href ? 600 : 400,
                        color: activeSection === item.href 
                          ? '#fff' 
                          : 'rgba(255, 255, 255, 0.7)',
                        textTransform: 'none',
                        background: activeSection === item.href 
                          ? 'linear-gradient(135deg, rgba(102, 126, 234, 0.3) 0%, rgba(118, 75, 162, 0.3) 100%)'
                          : 'transparent',
                        border: activeSection === item.href 
                          ? '1px solid rgba(102, 126, 234, 0.5)'
                          : '1px solid transparent',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          color: '#fff',
                          background: 'rgba(102, 126, 234, 0.2)',
                          border: '1px solid rgba(102, 126, 234, 0.3)',
                          transform: 'translateY(-2px)',
                        },
                      }}
                    >
                      {item.title}
                      {activeSection === item.href && (
                        <motion.div
                          layoutId="navIndicator"
                          style={{
                            position: 'absolute',
                            bottom: 4,
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: 20,
                            height: 3,
                            background: 'linear-gradient(90deg, #667eea, #764ba2)',
                            borderRadius: 4,
                          }}
                          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                        />
                      )}
                    </Button>
                  </Link>
                </motion.div>
              ))}

              {/* CTA Button */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.9, type: 'spring' }}
              >
                <Link
                  to="contact"
                  smooth={true}
                  duration={800}
                >
                  <Button
                    variant="contained"
                    startIcon={<RocketLaunch />}
                    sx={{
                      ml: 2,
                      px: 3,
                      py: 1,
                      borderRadius: 3,
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      boxShadow: '0 4px 20px rgba(102, 126, 234, 0.4)',
                      textTransform: 'none',
                      fontWeight: 600,
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
                        boxShadow: '0 6px 30px rgba(102, 126, 234, 0.6)',
                        transform: 'translateY(-3px)',
                      },
                    }}
                  >
                    Hire Me
                  </Button>
                </Link>
              </motion.div>
            </Box>

            {/* Mobile Navigation Icon */}
            <Box sx={{ display: { md: 'none' } }}>
              <motion.div 
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.1 }}
              >
                <IconButton
                  aria-label="open drawer"
                  edge="end"
                  onClick={handleDrawerToggle}
                  sx={{ 
                    color: '#fff',
                    background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.3) 0%, rgba(118, 75, 162, 0.3) 100%)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: 2,
                    p: 1.5,
                    '&:hover': {
                      background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.5) 0%, rgba(118, 75, 162, 0.5) 100%)',
                    }
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
            maxWidth: '320px',
            background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.98) 0%, rgba(30, 41, 59, 0.98) 100%)',
            backdropFilter: 'blur(20px)',
            boxShadow: '-10px 0 40px rgba(0,0,0,0.5)',
            borderLeft: '1px solid rgba(255, 255, 255, 0.1)',
            padding: 3,
          },
        }}
      >
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          height: '100%',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Background decoration */}
          <Box
            sx={{
              position: 'absolute',
              top: -100,
              right: -100,
              width: 300,
              height: 300,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(102, 126, 234, 0.15) 0%, transparent 70%)',
              zIndex: 0,
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              bottom: -50,
              left: -50,
              width: 200,
              height: 200,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(118, 75, 162, 0.15) 0%, transparent 70%)',
              zIndex: 0,
            }}
          />

          {/* Drawer header */}
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            mb: 4,
            position: 'relative',
            zIndex: 1,
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar 
                sx={{ 
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  boxShadow: '0 4px 20px rgba(102, 126, 234, 0.4)',
                }}
              >
                <Code />
              </Avatar>
              <Typography 
                variant="h6" 
                fontWeight="bold"
                sx={{
                  background: 'linear-gradient(135deg, #667eea, #764ba2)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Portfolio
              </Typography>
            </Box>
            <motion.div whileTap={{ scale: 0.9 }}>
              <IconButton 
                onClick={handleDrawerToggle}
                sx={{ 
                  color: '#fff',
                  background: 'rgba(255, 255, 255, 0.1)',
                  '&:hover': {
                    background: 'rgba(255, 255, 255, 0.2)',
                  }
                }}
              >
                <CloseIcon />
              </IconButton>
            </motion.div>
          </Box>

          {/* Drawer navigation */}
          <List sx={{ flexGrow: 1, position: 'relative', zIndex: 1 }}>
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
                      transition: 'all 0.3s ease',
                      cursor: 'pointer',
                      background: activeSection === item.href 
                        ? 'linear-gradient(90deg, rgba(102, 126, 234, 0.2), transparent)'
                        : 'transparent',
                      border: activeSection === item.href 
                        ? '1px solid rgba(102, 126, 234, 0.3)'
                        : '1px solid transparent',
                      '&:hover': {
                        background: 'rgba(102, 126, 234, 0.15)',
                        pl: 3,
                        borderColor: 'rgba(102, 126, 234, 0.2)',
                      }
                    }}
                  >
                    <ListItemText 
                      primary={item.title} 
                      primaryTypographyProps={{
                        fontWeight: activeSection === item.href ? 600 : 400,
                        color: activeSection === item.href ? '#fff' : 'rgba(255, 255, 255, 0.7)',
                        fontSize: '1rem',
                      }}
                    />
                    {activeSection === item.href && (
                      <motion.div
                        layoutId="mobileActiveIndicator"
                        style={{
                          width: 4,
                          height: 24,
                          background: 'linear-gradient(180deg, #667eea, #764ba2)',
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
          <Box sx={{ pt: 3, position: 'relative', zIndex: 1 }}>
            <Link to="contact" smooth={true} duration={800} onClick={handleDrawerToggle}>
              <Button
                fullWidth
                variant="contained"
                startIcon={<RocketLaunch />}
                sx={{
                  py: 1.5,
                  borderRadius: 3,
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  boxShadow: '0 4px 20px rgba(102, 126, 234, 0.4)',
                  textTransform: 'none',
                  fontWeight: 600,
                  fontSize: '1rem',
                  mb: 3,
                  '&:hover': {
                    boxShadow: '0 6px 30px rgba(102, 126, 234, 0.6)',
                  },
                }}
              >
                Get In Touch
              </Button>
            </Link>
            <Typography variant="body2" color="rgba(255, 255, 255, 0.5)" align="center">
              © {new Date().getFullYear()} Le Minh Thang
            </Typography>
          </Box>
        </Box>
      </Drawer>
      
      {/* Offset for fixed AppBar */}
      <Toolbar sx={{ height: scrollTrigger ? 70 : 90, transition: 'height 0.3s ease' }} />
    </Box>
  );
};

export default Header;
