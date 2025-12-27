import React, { useEffect, useState, useMemo } from 'react';
import { Box, Container, Typography, Button, useTheme, useMediaQuery, IconButton } from '@mui/material';
import Grid from '@mui/material/Grid';
import { motion, useAnimation } from 'framer-motion';
import { Link as ScrollLink } from 'react-scroll';
import { TypeAnimation } from 'react-type-animation';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import type { ISourceOptions } from '@tsparticles/engine';
import { GitHub, LinkedIn, Email, Download } from '@mui/icons-material';

const Hero: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const controls = useAnimation();
  const [particlesReady, setParticlesReady] = useState(false);

  useEffect(() => {
    controls.start('visible');
  }, [controls]);

  // Initialize particles engine once
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setParticlesReady(true);
    });
  }, []);

  // Particle configuration for network effect
  const particlesOptions: ISourceOptions = useMemo(() => ({
    fullScreen: { enable: false },
    background: { color: { value: 'transparent' } },
    fpsLimit: 120,
    particles: {
      number: { value: isMobile ? 40 : 80, density: { enable: true } },
      color: { value: '#ffffff' },
      shape: { type: 'circle' },
      opacity: {
        value: { min: 0.1, max: 0.5 },
        animation: { enable: true, speed: 1, sync: false }
      },
      size: {
        value: { min: 1, max: 3 },
        animation: { enable: true, speed: 2, sync: false }
      },
      links: {
        enable: true,
        distance: 150,
        color: '#ffffff',
        opacity: 0.2,
        width: 1
      },
      move: {
        enable: true,
        speed: 1,
        direction: 'none' as const,
        random: true,
        straight: false,
        outModes: { default: 'bounce' as const }
      }
    },
    interactivity: {
      events: {
        onHover: { enable: true, mode: 'grab' },
        onClick: { enable: true, mode: 'push' }
      },
      modes: {
        grab: { distance: 140, links: { opacity: 0.5 } },
        push: { quantity: 4 }
      }
    },
    detectRetina: true
  }), [isMobile]);

  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    })
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { delay: 0.3, duration: 1, ease: 'easeOut' }
    }
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut'
      }
    }
  };

  const glowVariants = {
    animate: {
      boxShadow: [
        '0 0 20px rgba(102, 126, 234, 0.5)',
        '0 0 60px rgba(118, 75, 162, 0.8)',
        '0 0 20px rgba(102, 126, 234, 0.5)'
      ],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut'
      }
    }
  };

  const socialLinks = [
    { icon: <GitHub />, url: 'https://github.com/lethangd', label: 'GitHub' },
    { icon: <LinkedIn />, url: 'https://linkedin.com/in/lethangd', label: 'LinkedIn' },
    { icon: <Email />, url: 'mailto:leminhthang.dev@gmail.com', label: 'Email' }
  ];

  const skills = ['Java', 'Spring Boot', 'Node.js', 'React', 'ASP.NET'];

  return (
    <Box
      id="home"
      sx={{
        background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
        color: 'white',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Particles Background */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1
        }}
      >
        {particlesReady && (
          <Particles
            id="hero-particles"
            options={particlesOptions}
            style={{ position: 'absolute', width: '100%', height: '100%' }}
          />
        )}
      </Box>

      {/* Animated gradient orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          top: '10%',
          left: '10%',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(102, 126, 234, 0.4) 0%, transparent 70%)',
          filter: 'blur(40px)',
          zIndex: 0
        } as React.CSSProperties}
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.4, 0.6, 0.4]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        style={{
          position: 'absolute',
          bottom: '10%',
          right: '10%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(118, 75, 162, 0.4) 0%, transparent 70%)',
          filter: 'blur(60px)',
          zIndex: 0
        } as React.CSSProperties}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2, pt: { xs: 12, md: 0 } }}>
        <Grid container spacing={6} alignItems="center">
          <Grid size={{ xs: 12, md: 7 }}>
            <Box>
              {/* Greeting */}
              <motion.div custom={0} initial="hidden" animate={controls} variants={textVariants}>
                <Typography
                  variant="h6"
                  sx={{
                    color: 'rgba(255,255,255,0.7)',
                    fontWeight: 400,
                    letterSpacing: 3,
                    mb: 2
                  }}
                >
                  👋 HELLO, I'M
                </Typography>
              </motion.div>

              {/* Name with glow effect */}
              <motion.div custom={1} initial="hidden" animate={controls} variants={textVariants}>
                <Typography
                  variant="h1"
                  component="h1"
                  sx={{
                    fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
                    fontWeight: 800,
                    background: 'linear-gradient(135deg, #fff 0%, #a78bfa 50%, #818cf8 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    textShadow: '0 0 40px rgba(167, 139, 250, 0.3)',
                    mb: 1
                  }}
                >
                  LE MINH THANG
                </Typography>
              </motion.div>

              {/* Typewriter effect for role */}
              <motion.div custom={2} initial="hidden" animate={controls} variants={textVariants}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                  <Box
                    sx={{
                      width: 40,
                      height: 2,
                      background: 'linear-gradient(90deg, #667eea, #764ba2)',
                      borderRadius: 1
                    }}
                  />
                  <Typography
                    variant="h4"
                    sx={{
                      fontSize: { xs: '1.25rem', md: '1.75rem' },
                      fontWeight: 500,
                      color: '#a78bfa'
                    }}
                  >
                    <TypeAnimation
                      sequence={[
                        'Fullstack Developer',
                        2000,
                        'Backend Specialist',
                        2000,
                        'System Architect',
                        2000,
                        'Problem Solver',
                        2000
                      ]}
                      wrapper="span"
                      speed={50}
                      repeat={Infinity}
                      cursor={true}
                    />
                  </Typography>
                </Box>
              </motion.div>

              {/* Description */}
              <motion.div custom={3} initial="hidden" animate={controls} variants={textVariants}>
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: { xs: '1rem', md: '1.15rem' },
                    lineHeight: 1.8,
                    color: 'rgba(255,255,255,0.8)',
                    maxWidth: 600,
                    mb: 4
                  }}
                >
                  Experienced Full-Stack Engineer specializing in backend systems for enterprise and large-scale platforms. Proven ability to design APIs, integrate complex systems, and optimize performance under real-world operational constraints. Interested in senior backend or platform roles that require system ownership, technical decision-making, and deep collaboration across engineering and product teams.
                </Typography>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div custom={4} initial="hidden" animate={controls} variants={textVariants}>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 4 }}>
                  <ScrollLink to="projects" smooth={true} duration={800} offset={-80}>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        variant="contained"
                        size="large"
                        sx={{
                          px: 4,
                          py: 1.5,
                          borderRadius: 3,
                          textTransform: 'none',
                          fontSize: '1rem',
                          fontWeight: 600,
                          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                          boxShadow: '0 10px 30px rgba(102, 126, 234, 0.4)',
                          '&:hover': {
                            background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
                            boxShadow: '0 15px 40px rgba(102, 126, 234, 0.6)'
                          }
                        }}
                      >
                        View Projects
                      </Button>
                    </motion.div>
                  </ScrollLink>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      variant="outlined"
                      size="large"
                      startIcon={<Download />}
                      component="a"
                      href={`${process.env.PUBLIC_URL}/Le-Minh-Thang-Fullstack.pdf`}
                      download
                      sx={{
                        px: 4,
                        py: 1.5,
                        borderRadius: 3,
                        textTransform: 'none',
                        fontSize: '1rem',
                        fontWeight: 600,
                        borderColor: 'rgba(255,255,255,0.3)',
                        color: 'white',
                        backdropFilter: 'blur(10px)',
                        background: 'rgba(255,255,255,0.05)',
                        '&:hover': {
                          borderColor: '#a78bfa',
                          background: 'rgba(167, 139, 250, 0.1)'
                        }
                      }}
                    >
                      Download CV
                    </Button>
                  </motion.div>
                </Box>
              </motion.div>

              {/* Social Links */}
              <motion.div custom={5} initial="hidden" animate={controls} variants={textVariants}>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  {socialLinks.map((social, index) => (
                    <motion.div
                      key={social.label}
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <IconButton
                        component="a"
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                          width: 50,
                          height: 50,
                          border: '1px solid rgba(255,255,255,0.2)',
                          backdropFilter: 'blur(10px)',
                          background: 'rgba(255,255,255,0.05)',
                          color: 'white',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            borderColor: 'transparent',
                            boxShadow: '0 8px 25px rgba(102, 126, 234, 0.4)'
                          }
                        }}
                      >
                        {social.icon}
                      </IconButton>
                    </motion.div>
                  ))}
                </Box>
              </motion.div>
            </Box>
          </Grid>

          {/* Profile Image with floating skills */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Box sx={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
              {/* Main profile image */}
              <motion.div
                initial="hidden"
                animate="visible"
                variants={imageVariants}
              >
                <motion.div variants={floatingVariants} animate="animate">
                  <motion.div variants={glowVariants} animate="animate">
                    <Box
                      sx={{
                        position: 'relative',
                        width: { xs: 280, md: 350 },
                        height: { xs: 280, md: 350 },
                        borderRadius: '50%',
                        overflow: 'hidden',
                        border: '4px solid rgba(255,255,255,0.1)',
                        background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.2) 0%, rgba(118, 75, 162, 0.2) 100%)',
                        p: 0.5
                      }}
                    >
                      <Box
                        sx={{
                          width: '100%',
                          height: '100%',
                          borderRadius: '50%',
                          overflow: 'hidden'
                        }}
                      >
                        <img
                          src={`${process.env.PUBLIC_URL}/cv.jpg`}
                          alt="Lê Minh Thắng"
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                          }}
                        />
                      </Box>
                    </Box>
                  </motion.div>
                </motion.div>
              </motion.div>

              {/* Floating skill badges */}
              {skills.map((skill, index) => {
                const positions = [
                  { top: '5%', left: '0%' },
                  { top: '25%', right: '-10%' },
                  { top: '55%', right: '-15%' },
                  { top: '80%', right: '0%' },
                  { bottom: '5%', left: '10%' }
                ];
                return (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      y: [0, -8, 0],
                      x: [0, index % 2 === 0 ? 4 : -4, 0]
                    }}
                    transition={{
                      opacity: { delay: 1 + index * 0.15, duration: 0.5 },
                      scale: { delay: 1 + index * 0.15, duration: 0.5 },
                      y: { duration: 3, repeat: Infinity, ease: 'easeInOut', delay: index * 0.2 },
                      x: { duration: 4, repeat: Infinity, ease: 'easeInOut', delay: index * 0.3 }
                    }}
                    style={{
                      position: 'absolute',
                      ...positions[index],
                      zIndex: 10
                    } as React.CSSProperties}
                  >
                    <Box
                      sx={{
                        px: 2,
                        py: 1,
                        borderRadius: 3,
                        background: 'rgba(255,255,255,0.1)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        color: 'white',
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      {skill}
                    </Box>
                  </motion.div>
                );
              })}

              {/* Decorative rings */}
              {[1, 2, 3].map((ring) => (
                <motion.div
                  key={ring}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 0.1, scale: 1 }}
                  transition={{ delay: 0.5 + ring * 0.2, duration: 1 }}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 350 + ring * 50,
                    height: 350 + ring * 50,
                    borderRadius: '50%',
                    border: '1px solid rgba(255,255,255,0.1)',
                    pointerEvents: 'none'
                  } as React.CSSProperties}
                />
              ))}
            </Box>
          </Grid>
        </Grid>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          style={{
            position: 'absolute',
            bottom: 40,
            left: '50%',
            transform: 'translateX(-50%)'
          } as React.CSSProperties}
        >
          <ScrollLink to="about" smooth={true} duration={800} offset={-80} style={{ cursor: 'pointer' }}>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  color: 'rgba(255,255,255,0.6)',
                  '&:hover': { color: 'white' }
                }}
              >
                <Typography variant="caption" sx={{ mb: 1, letterSpacing: 2 }}>
                  SCROLL DOWN
                </Typography>
                <Box
                  sx={{
                    width: 24,
                    height: 40,
                    borderRadius: 12,
                    border: '2px solid currentColor',
                    display: 'flex',
                    justifyContent: 'center',
                    pt: 1
                  }}
                >
                  <motion.div
                    animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    style={{
                      width: 4,
                      height: 8,
                      borderRadius: 2,
                      backgroundColor: 'currentColor'
                    } as React.CSSProperties}
                  />
                </Box>
              </Box>
            </motion.div>
          </ScrollLink>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Hero;
