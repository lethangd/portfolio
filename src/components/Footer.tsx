import React from 'react';
import { Box, Container, Typography, IconButton } from '@mui/material';
import Grid from '@mui/material/Grid';
import { LinkedIn, GitHub, Email, KeyboardArrowUp, Favorite, Code } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { Link as ScrollLink } from 'react-scroll';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { text: 'Home', href: 'home' },
    { text: 'About', href: 'about' },
    { text: 'Skills', href: 'skills' },
    { text: 'Experience', href: 'experience' },
    { text: 'Projects', href: 'projects' },
    { text: 'Education', href: 'education' },
    { text: 'Contact', href: 'contact' },
  ];

  const socialLinks = [
    { icon: <GitHub />, url: 'https://github.com/lethangd', label: 'GitHub' },
    { icon: <LinkedIn />, url: 'https://www.linkedin.com/in/l%C3%AA-th%E1%BA%AFng-249162302/', label: 'LinkedIn' },
    { icon: <Email />, url: 'mailto:lthang.forwork@gmail.com', label: 'Email' },
  ];

  return (
    <Box
      component="footer"
      sx={{
        background: 'linear-gradient(180deg, #0f172a 0%, #020617 100%)',
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative top border */}
      <Box
        sx={{
          height: 2,
          background: 'linear-gradient(90deg, transparent, #667eea, #764ba2, #f093fb, transparent)',
        }}
      />

      {/* Background decorations */}
      <Box
        sx={{
          position: 'absolute',
          top: '20%',
          left: '5%',
          width: 300,
          height: 300,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(102, 126, 234, 0.05) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '10%',
          right: '10%',
          width: 200,
          height: 200,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(118, 75, 162, 0.05) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      {/* Main Footer Content */}
      <Container maxWidth="lg" sx={{ py: 8, position: 'relative', zIndex: 1 }}>
        <Grid container spacing={6}>
          {/* Brand Section */}
          <Grid size={{ xs: 12, md: 5 }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                <Box
                  sx={{
                    width: 50,
                    height: 50,
                    borderRadius: 2,
                    background: 'linear-gradient(135deg, #667eea, #764ba2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Code sx={{ fontSize: 28, color: '#fff' }} />
                </Box>
                <Box>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 800,
                      background: 'linear-gradient(135deg, #667eea, #764ba2)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    LE MINH THANG
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ color: 'rgba(255,255,255,0.5)', letterSpacing: 2 }}
                  >
                    FULL-STACK DEVELOPER
                  </Typography>
                </Box>
              </Box>
              <Typography
                variant="body2"
                sx={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, mb: 3, maxWidth: 400 }}
              >
                Passionate about creating elegant solutions and delivering high-performance 
                applications. Always eager to learn and tackle new challenges.
              </Typography>

              {/* Social Links */}
              <Box sx={{ display: 'flex', gap: 2 }}>
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, type: 'spring' }}
                    whileHover={{ scale: 1.1, y: -3 }}
                    style={{ textDecoration: 'none' } as React.CSSProperties}
                  >
                    <IconButton
                      sx={{
                        color: 'rgba(255,255,255,0.7)',
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        '&:hover': {
                          color: '#fff',
                          background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.3), rgba(118, 75, 162, 0.3))',
                          borderColor: 'rgba(102, 126, 234, 0.5)',
                        },
                      }}
                    >
                      {social.icon}
                    </IconButton>
                  </motion.a>
                ))}
              </Box>
            </motion.div>
          </Grid>

          {/* Quick Links */}
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Typography
                variant="h6"
                sx={{ fontWeight: 700, color: '#fff', mb: 3 }}
              >
                Quick Links
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {quickLinks.map((link, index) => (
                  <motion.div
                    key={link.text}
                    whileHover={{ x: 8 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ScrollLink
                      to={link.href}
                      smooth={true}
                      duration={800}
                      style={{ cursor: 'pointer' }}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          color: 'rgba(255,255,255,0.6)',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            color: '#667eea',
                          },
                        }}
                      >
                        {link.text}
                      </Typography>
                    </ScrollLink>
                  </motion.div>
                ))}
              </Box>
            </motion.div>
          </Grid>

          {/* Contact Info */}
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Typography
                variant="h6"
                sx={{ fontWeight: 700, color: '#fff', mb: 3 }}
              >
                Get In Touch
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box>
                  <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: 1 }}>
                    Email
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                    lthang.forwork@gmail.com
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: 1 }}>
                    Phone
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                    0834398268
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: 1 }}>
                    Location
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                    Hanoi, Vietnam
                  </Typography>
                </Box>
              </Box>
            </motion.div>
          </Grid>
        </Grid>
      </Container>

      {/* Bottom Bar */}
      <Box
        sx={{
          borderTop: '1px solid rgba(255,255,255,0.1)',
          py: 3,
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <Typography
              variant="body2"
              sx={{ color: 'rgba(255,255,255,0.5)', display: 'flex', alignItems: 'center', gap: 1 }}
            >
              © {currentYear} Le Minh Thang. Made with
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <Favorite sx={{ fontSize: 16, color: '#f093fb' }} />
              </motion.span>
              in Vietnam
            </Typography>

            {/* Back to Top Button */}
            <motion.div
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              <ScrollLink to="home" smooth={true} duration={800}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    cursor: 'pointer',
                    color: 'rgba(255,255,255,0.6)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      color: '#667eea',
                    },
                  }}
                >
                  <Typography variant="body2">Back to Top</Typography>
                  <Box
                    sx={{
                      width: 32,
                      height: 32,
                      borderRadius: 1,
                      background: 'rgba(255,255,255,0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <KeyboardArrowUp fontSize="small" />
                  </Box>
                </Box>
              </ScrollLink>
            </motion.div>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Footer;
