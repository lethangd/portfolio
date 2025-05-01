import React from 'react';
import { Box, Container, Typography, Link, IconButton, Divider, Paper } from '@mui/material';
import Grid from '@mui/material/Grid';
import { LinkedIn, GitHub, Code, Email, Phone, LocationOn } from '@mui/icons-material';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: '#1565c0',
        color: 'white',
        py: 6,
        mt: 8,
        position: 'relative'
      }}
    >
      {/* Wave Shape at Top */}
      <Box
        sx={{
          position: 'absolute',
          top: -2,
          left: 0,
          width: '100%',
          overflow: 'hidden',
          lineHeight: 0,
        }}
      >
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          style={{
            position: 'relative',
            display: 'block',
            width: 'calc(100% + 1.3px)',
            height: '70px',
            fill: '#f8f9fa'
          }}
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
          ></path>
        </svg>
      </Box>
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="space-between">
          <Grid
            size={{
              xs: 12,
              md: 4
            }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Typography variant="h6" gutterBottom fontWeight="bold">
                LE MINH THANG
              </Typography>
              <Typography variant="body2" sx={{ mb: 2, lineHeight: 1.7 }}>
                A professional portfolio built with React, Material UI, Tailwind CSS, and Ant Design,
                showcasing my skills and projects as a Backend Developer.
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <IconButton 
                  component={motion.a}
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  whileTap={{ scale: 0.9 }}
                  color="inherit" 
                  aria-label="GitHub" 
                  href="https://github.com/lethangd" 
                  target="_blank"
                  sx={{
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    '&:hover': { backgroundColor: 'rgba(255,255,255,0.2)' }
                  }}
                >
                  <GitHub />
                </IconButton>
                <IconButton 
                  component={motion.a}
                  whileHover={{ scale: 1.2, rotate: -10 }}
                  whileTap={{ scale: 0.9 }}
                  color="inherit" 
                  aria-label="LinkedIn" 
                  href="https://www.linkedin.com/in/l%C3%AA-th%E1%BA%AFng-249162302/" 
                  target="_blank"
                  sx={{
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    '&:hover': { backgroundColor: 'rgba(255,255,255,0.2)' }
                  }}
                >
                  <LinkedIn />
                </IconButton>
                <IconButton 
                  component={motion.a}
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  whileTap={{ scale: 0.9 }}
                  color="inherit" 
                  aria-label="Email" 
                  href="mailto:lthang.forwork@gmail.com"
                  sx={{
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    '&:hover': { backgroundColor: 'rgba(255,255,255,0.2)' }
                  }}
                >
                  <Email />
                </IconButton>
              </Box>
            </motion.div>
          </Grid>
          
          <Grid
            size={{
              xs: 12,
              sm: 6,
              md: 4
            }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Typography variant="h6" gutterBottom fontWeight="bold">
                Quick Links
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                {[
                  { text: 'Home', href: '#home' },
                  { text: 'About', href: '#about' },
                  { text: 'Skills', href: '#skills' },
                  { text: 'Experience', href: '#experience' },
                  { text: 'Projects', href: '#projects' },
                  { text: 'Education', href: '#education' },
                  { text: 'Contact', href: '#contact' },
                ].map((link, index) => (
                  <Link
                    key={link.text}
                    href={link.href}
                    color="inherit"
                    underline="none"
                    component={motion.a}
                    whileHover={{ x: 5, color: '#90caf9' }}
                    sx={{ 
                      mb: 1.5,
                      display: 'flex',
                      alignItems: 'center',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <Box
                      sx={{
                        width: 5,
                        height: 5,
                        bgcolor: 'white',
                        borderRadius: '50%',
                        mr: 1,
                      }}
                    />
                    {link.text}
                  </Link>
                ))}
              </Box>
            </motion.div>
          </Grid>
          
          <Grid
            size={{
              xs: 12,
              sm: 6,
              md: 4
            }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Typography variant="h6" gutterBottom fontWeight="bold">
                Contact Info
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Email fontSize="small" sx={{ mr: 1.5 }} />
                  <Typography variant="body2">
                    lthang.forwork@gmail.com
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Phone fontSize="small" sx={{ mr: 1.5 }} />
                  <Typography variant="body2">
                    0834398268
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                  <LocationOn fontSize="small" sx={{ mr: 1.5, mt: 0.3 }} />
                  <Typography variant="body2">
                    Cau Giay, Hanoi, Vietnam
                  </Typography>
                </Box>
              </Box>
              
              <Paper 
                component={motion.div}
                whileHover={{ scale: 1.05 }}
                sx={{ 
                  mt: 3, 
                  p: 2, 
                  bgcolor: 'rgba(255,255,255,0.1)',
                  color: 'white',
                  borderRadius: 2,
                  border: '1px solid rgba(255,255,255,0.2)',
                  backdropFilter: 'blur(10px)'
                }}
              >
                <Typography variant="body2" align="center" sx={{ fontStyle: 'italic' }}>
                  "The best way to predict the future is to create it."
                </Typography>
              </Paper>
            </motion.div>
          </Grid>
        </Grid>
        
        <Divider sx={{ my: 4, bgcolor: 'rgba(255, 255, 255, 0.2)' }} />
        
        <Box sx={{ textAlign: 'center' }}>
          <Box 
            component={motion.div}
            whileHover={{ scale: 1.1 }}
            sx={{ 
              display: 'inline-flex',
              alignItems: 'center',
              mb: 2
            }}
          >
            <Code sx={{ mr: 1 }} />
            <Typography variant="body1" fontWeight="bold">
              Le Minh Thang
            </Typography>
          </Box>
          <Typography variant="body2" align="center">
            © {currentYear} All Rights Reserved • Backend Developer
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;