import React from 'react';
import { Box, Container, Typography, Paper, Avatar, useTheme } from '@mui/material';
import Grid from '@mui/material/Grid';
import { Person, Email, Phone, LocationOn, Cake, GitHub } from '@mui/icons-material';
import { motion } from 'framer-motion';

const About: React.FC = () => {
  const theme = useTheme();

  const infoItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5
      }
    })
  };

  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut"
      }
    }
  };

  const highlightVariants = {
    initial: { width: 0 },
    animate: { width: '100%', transition: { duration: 1, delay: 0.5 } }
  };

  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      repeatType: "reverse" as const,
      ease: "easeInOut"
    }
  };

  return (
    <Box
      id="about"
      sx={{
        py: 8,
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(to bottom, #ffffff, #f8f9fa)'
      }}
    >
      {/* Decorative background elements */}
      <motion.div
        animate={{
          rotate: 360,
          transition: { duration: 40, repeat: Infinity, ease: "linear" }
        }}
        style={{
          position: 'absolute',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          border: '1px dashed rgba(25, 118, 210, 0.1)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 0
        }}
      />
      
      <motion.div
        animate={{
          rotate: -360,
          transition: { duration: 60, repeat: Infinity, ease: "linear" }
        }}
        style={{
          position: 'absolute',
          width: '800px',
          height: '800px',
          borderRadius: '50%',
          border: '1px dashed rgba(25, 118, 210, 0.1)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 0
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Typography
            component="h2"
            variant="h3"
            align="center"
            color="text.primary"
            gutterBottom
            fontWeight="bold"
            sx={{ mb: 6 }}
            className="relative inline-block"
          >
            About Me
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={highlightVariants}
              style={{
                position: 'absolute',
                height: '4px',
                background: 'linear-gradient(90deg, #1976d2, #42a5f5)',
                bottom: '-8px',
                left: '25%',
                width: '50%',
                borderRadius: '2px'
              }}
            />
          </Typography>
        </motion.div>

        <Grid container spacing={6} alignItems="center">
          <Grid
            component={motion.div}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            size={{
              xs: 12,
              md: 6
            }}>
            <Box sx={{ mb: 4 }}>
              <motion.div
                variants={textVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <Typography 
                  variant="h5" 
                  color="primary" 
                  gutterBottom 
                  fontWeight="medium"
                  sx={{
                    display: 'inline-block',
                    position: 'relative',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      width: '40%',
                      height: '3px',
                      bottom: '-4px',
                      left: '0',
                      backgroundColor: theme.palette.primary.main,
                      borderRadius: '2px'
                    }
                  }}
                >
                  Who I Am
                </Typography>
              </motion.div>
              
              <motion.div
                variants={textVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <Typography variant="body1" paragraph sx={{ mt: 2 }}>
                  Backend Developer with 2 years of Java experience; proficient in Spring, Node.js, ASP.NET, and React. Skilled at architecting and delivering scalable, high-performance systems, solving complex problems, and optimizing workflows through clean, efficient code.
                </Typography>
              </motion.div>
              
              <motion.div
                variants={textVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <Typography variant="body1" paragraph>
                  Eager to join a dynamic team and drive business impact from day one.
                </Typography>
              </motion.div>
              
              <motion.div
                variants={textVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
              </motion.div>
            </Box>
          </Grid>

          <Grid
            component={motion.div}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            size={{
              xs: 12,
              md: 6
            }}>
            <motion.div
              whileHover={{ 
                scale: 1.02, 
                boxShadow: theme.shadows[10],
                transition: { duration: 0.3 } 
              }}
            >
              <Paper 
                elevation={3} 
                sx={{ 
                  p: 4, 
                  borderRadius: 4,
                  transition: 'all 0.3s ease',
                  background: 'linear-gradient(145deg, #ffffff, #f0f0f0)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Decorative elements */}
                <Box 
                  sx={{ 
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '5px',
                    background: 'linear-gradient(90deg, #1976d2, #42a5f5)'
                  }} 
                />
                
                <motion.div
                  animate={floatingAnimation}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
                    <Avatar
                      src={`${process.env.PUBLIC_URL}/cv.jpg`}
                      alt="Le Minh Thang"
                      sx={{ 
                        width: 120, 
                        height: 120,
                        border: '4px solid',
                        borderColor: 'primary.main',
                        boxShadow: '0 8px 20px rgba(0,0,0,0.15)'
                      }}
                    />
                  </Box>
                </motion.div>
                
                <Grid container spacing={3}>
                  {[
                    { icon: <Person />, label: "Full Name", value: "LÊ MINH THẮNG" },
                    { icon: <Email />, label: "Email", value: "lthang.forwork@gmail.com" },
                    { icon: <Phone />, label: "Phone Number", value: "0834398268" },
                    { icon: <LocationOn />, label: "Address", value: "Thanh Trì, Hà Nội" },
                    { icon: <Cake />, label: "Date of Birth", value: "05/08/2003" },
                    { 
                      icon: <GitHub />, 
                      label: "GitHub", 
                      value: "github.com/lethangd",
                      isLink: true,
                      url: "https://github.com/lethangd"
                    }
                  ].map((item, index) => (
                    <Grid 
                      size={12} 
                      key={index}
                      component={motion.div} 
                      custom={index} 
                      variants={infoItemVariants} 
                      initial="hidden" 
                      whileInView="visible" 
                      viewport={{ once: true }}
                      whileHover={{ x: 5, transition: { duration: 0.2 } }}
                    >
                      <Box display="flex" alignItems="center">
                        <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                          {item.icon}
                        </Avatar>
                        <Box>
                          <Typography variant="subtitle2" color="text.secondary">
                            {item.label}
                          </Typography>
                          {item.isLink ? (
                            <Typography
                              variant="body1"
                              fontWeight="medium"
                              component="a"
                              href={item.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              sx={{ color: 'primary.main', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
                            >
                              {item.value}
                            </Typography>
                          ) : (
                            <Typography variant="body1" fontWeight="medium">
                              {item.value}
                            </Typography>
                          )}
                        </Box>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Paper>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default About;