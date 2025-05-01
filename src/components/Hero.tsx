import React, { useEffect, useState } from 'react';
import { Box, Container, Typography, Button, useTheme, useMediaQuery } from '@mui/material';
import Grid from '@mui/material/Grid';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { Link as ScrollLink } from 'react-scroll';

const Hero: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const controls = useAnimation();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    controls.start('visible');
    const timer = setTimeout(() => setIsLoaded(true), 300);
    return () => clearTimeout(timer);
  }, [controls]);

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.3,
        duration: 0.8,
        ease: "easeOut",
      },
    }),
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        delay: 1.2, 
        duration: 0.6,
        ease: "easeOut"
      }
    },
    hover: { 
      scale: 1.05, 
      boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
      transition: { 
        duration: 0.3 
      }
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8, rotate: -5 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      rotate: 0,
      transition: { 
        delay: 0.5, 
        duration: 1,
        ease: "easeOut" 
      }
    },
    hover: { 
      scale: 1.05, 
      rotate: 5,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 15 
      }
    },
  };

  const backgroundColors = ['#667eea', '#764ba2', '#6B8DD6', '#8E37D7'];
  const [backgroundIndex, setBackgroundIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setBackgroundIndex((prev) => (prev + 1) % backgroundColors.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const generateFloatingElements = (count: number) => {
    return Array.from({ length: count }).map((_, i) => (
      <motion.div
        key={i}
        initial={{ 
          x: Math.random() * window.innerWidth, 
          y: Math.random() * window.innerHeight,
          opacity: Math.random() * 0.5 + 0.1
        }}
        animate={{ 
          x: [
            Math.random() * window.innerWidth, 
            Math.random() * window.innerWidth
          ], 
          y: [
            Math.random() * window.innerHeight, 
            Math.random() * window.innerHeight
          ] 
        }}
        transition={{ 
          duration: 20 + Math.random() * 30, 
          repeat: Infinity, 
          repeatType: "reverse" as const,
          ease: "linear"
        }}
        style={{
          position: 'absolute',
          width: 2 + Math.random() * 4,
          height: 2 + Math.random() * 4,
          borderRadius: '50%',
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
          boxShadow: '0 0 10px rgba(255, 255, 255, 0.3)',
          zIndex: 1
        }}
      />
    ));
  };

  const generateFloatingLines = (count: number) => {
    return Array.from({ length: count }).map((_, i) => (
      <motion.div
        key={`line-${i}`}
        initial={{ 
          x: Math.random() * window.innerWidth, 
          y: Math.random() * window.innerHeight,
          opacity: Math.random() * 0.3 + 0.05,
          rotate: Math.random() * 360
        }}
        animate={{ 
          rotate: [Math.random() * 360, Math.random() * 360 + 180]
        }}
        transition={{ 
          duration: 30 + Math.random() * 20, 
          repeat: Infinity, 
          repeatType: "reverse" as const,
          ease: "linear"
        }}
        style={{
          position: 'absolute',
          width: 50 + Math.random() * 100,
          height: 1,
          backgroundColor: 'rgba(255, 255, 255, 0.3)',
          zIndex: 1
        }}
      />
    ));
  };

  return (
    <Box
      id="home"
      sx={{
        background: `linear-gradient(135deg, ${backgroundColors[backgroundIndex]} 0%, ${
          backgroundColors[(backgroundIndex + 1) % backgroundColors.length]
        } 100%)`,
        color: 'white',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        pt: { xs: 12, md: 0 },
        position: 'relative',
        overflow: 'hidden',
        transition: 'background 1.5s ease',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          overflow: 'hidden',
        }}
      >
        {generateFloatingElements(50)}
        {generateFloatingLines(20)}
      </Box>

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        <Grid container spacing={4} alignItems="center">
          <Grid
            size={{
              xs: 12,
              md: 6
            }}>
            <Box>
              <motion.div
                custom={0}
                initial="hidden"
                animate={controls}
                variants={textVariants}
              >
                <Typography
                  variant="h2"
                  component="h1"
                  fontWeight="bold"
                  gutterBottom
                  sx={{
                    fontSize: { xs: '2.5rem', md: '3.5rem' },
                    textShadow: '0 2px 10px rgba(0,0,0,0.2)',
                    position: 'relative',
                    display: 'inline-block',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      width: '40%',
                      height: '4px',
                      bottom: '0',
                      left: '0',
                      backgroundColor: '#fff',
                      borderRadius: '2px',
                    }
                  }}
                >
                  Le Minh Thang
                </Typography>
              </motion.div>

              <motion.div
                custom={1}
                initial="hidden"
                animate={controls}
                variants={textVariants}
              >
                <Typography
                  variant="h4"
                  gutterBottom
                  sx={{
                    mb: 3,
                    fontSize: { xs: '1.5rem', md: '2rem' },
                    background: 'linear-gradient(90deg, #ffffff, #f0f0f0)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    textShadow: '0 2px 10px rgba(0,0,0,0.1)',
                  }}
                >
                  <AnimatePresence>
                    {isLoaded && (
                      <motion.span
                        key="title"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ 
                          duration: 1,
                          ease: "easeInOut"
                        }}
                      >
                        Backend Developer | Java | ASP .NET | Spring | Node.js
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Typography>
              </motion.div>

              <motion.div
                custom={2}
                initial="hidden"
                animate={controls}
                variants={textVariants}
              >
                <Typography 
                  variant="body1" 
                  paragraph 
                  sx={{ 
                    mb: 4, 
                    maxWidth: '600px',
                    lineHeight: 1.8,
                    fontSize: { xs: '1rem', md: '1.1rem' },
                  }}
                >
                  Welcome to my portfolio! I am a Backend Developer passionate about building robust, 
                  scalable systems. I focus on creating efficient solutions using the latest languages and technologies.
                </Typography>
              </motion.div>

              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <ScrollLink to="projects" smooth={true} duration={800} offset={-80}>
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                    variants={buttonVariants}
                  >
                    <Button
                      variant="contained"
                      size="large"
                      sx={{
                        px: 4,
                        py: 1.5,
                        borderRadius: 2,
                        textTransform: 'none',
                        fontSize: '1rem',
                        fontWeight: 'medium',
                        backgroundColor: 'white',
                        color: 'primary.main',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        }
                      }}
                    >
                      View Projects
                    </Button>
                  </motion.div>
                </ScrollLink>
                <ScrollLink to="contact" smooth={true} duration={800} offset={-80}>
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                    variants={buttonVariants}
                  >
                    <Button
                      variant="outlined"
                      size="large"
                      sx={{ 
                        px: 4,
                        py: 1.5,
                        borderRadius: 2,
                        textTransform: 'none',
                        fontSize: '1rem',
                        fontWeight: 'medium',
                        borderColor: 'white',
                        color: 'white',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          borderColor: 'white',
                          backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        }
                      }}
                    >
                      Contact Me
                    </Button>
                  </motion.div>
                </ScrollLink>
              </Box>

              <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
                {['GitHub', 'LinkedIn', 'Twitter', 'Email'].map((platform, index) => (
                  <motion.div
                    key={platform}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ 
                      opacity: 1, 
                      y: 0,
                      transition: { 
                        delay: 1.5 + index * 0.1,
                        duration: 0.5 
                      } 
                    }}
                    whileHover={{ 
                      scale: 1.2, 
                      rotate: 5,
                      transition: { 
                        duration: 0.2 
                      } 
                    }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Box
                      component="a"
                      href="#"
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                        color: 'white',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          backgroundColor: 'white',
                          color: 'primary.main',
                        },
                      }}
                    >
                      {platform.charAt(0)}
                    </Box>
                  </motion.div>
                ))}
              </Box>
            </Box>
          </Grid>
          <Grid
            size={{
              xs: 12,
              md: 6
            }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
              <motion.div
                initial="hidden"
                animate="visible"
                whileHover="hover"
                variants={imageVariants}
              >
                <Box
                  sx={{
                    position: 'relative',
                    width: { xs: '250px', md: '320px' },
                    height: { xs: '250px', md: '320px' },
                    borderRadius: '50%',
                    overflow: 'hidden',
                    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.3)',
                    border: '5px solid rgba(255, 255, 255, 0.2)',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 70%)',
                      zIndex: 2,
                    },
                  }}
                >
                  <img
                    src={`${process.env.PUBLIC_URL}/cv.PNG`}
                    alt="Le Minh Thang"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                </Box>
              </motion.div>

              {[1, 2, 3].map((_, index) => (
                <motion.div
                  key={index}
                  initial={{ 
                    opacity: 0, 
                    scale: 0,
                    x: (index - 1) * 30, 
                    y: (index - 1) * -30 
                  }}
                  animate={{ 
                    opacity: [0, 0.8, 0.4],
                    scale: [0, 1, 0.8],
                    x: [(index - 1) * 30, (index - 1) * 60, (index - 1) * 90],
                    y: [(index - 1) * -30, (index - 1) * -60, (index - 1) * -90],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: index * 0.5,
                  }}
                  style={{
                    position: 'absolute',
                    width: 10 + index * 10,
                    height: 10 + index * 10,
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.3)',
                    zIndex: 1,
                  }}
                />
              ))}

              {['Java', 'Spring', '.NET', 'Node.js'].map((skill, index) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: 1,
                    y: [0, -10, 0],
                    x: [0, 5, 0],
                    transition: {
                      y: {
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut",
                        delay: index * 0.3,
                      },
                      x: {
                        duration: 3,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut",
                        delay: index * 0.2,
                      },
                      opacity: {
                        delay: 1.8 + index * 0.2,
                        duration: 0.8,
                      }
                    }
                  }}
                  style={{
                    position: 'absolute',
                    top: `${20 + index * 25}%`,
                    left: isMobile ? `${70 + (index % 2) * 15}%` : `${85 + (index % 2) * 15}%`,
                    zIndex: 3,
                  }}
                >
                  <Box
                    sx={{
                      px: 2,
                      py: 1,
                      backgroundColor: 'rgba(255,255,255,0.9)',
                      color: 'primary.dark',
                      borderRadius: 5,
                      fontSize: '0.8rem',
                      fontWeight: 'bold',
                      boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                    }}
                  >
                    {skill}
                  </Box>
                </motion.div>
              ))}
            </Box>
          </Grid>
        </Grid>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: 0.6,
            y: [0, -10, 0],
          }}
          transition={{
            y: {
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            },
            opacity: {
              delay: 2,
              duration: 1,
            }
          }}
          style={{
            position: 'absolute',
            bottom: 20,
            left: '50%',
            transform: 'translateX(-50%)',
            textAlign: 'center',
          }}
        >
          <ScrollLink to="about" smooth={true} duration={800} offset={-80} style={{ cursor: 'pointer' }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                color: 'white',
                '&:hover': {
                  transform: 'scale(1.1)',
                },
              }}
            >
              <Typography variant="body2" sx={{ mb: 1 }}>
                Scroll Down
              </Typography>
              <Box
                sx={{
                  width: 24,
                  height: 24,
                  borderLeft: '2px solid',
                  borderBottom: '2px solid',
                  transform: 'rotate(-45deg)',
                }}
              />
            </Box>
          </ScrollLink>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Hero;