import React from 'react';
import { Box, Container, Typography, Avatar, Chip } from '@mui/material';
import Grid from '@mui/material/Grid';
import { Person, Email, Phone, LocationOn, Cake, GitHub, Code, RocketLaunch, EmojiObjects } from '@mui/icons-material';
import { motion } from 'framer-motion';

interface InfoItem {
  icon: React.ReactNode;
  label: string;
  value: string;
  isLink?: boolean;
  url?: string;
}

const About: React.FC = () => {
  const infoItems: InfoItem[] = [
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
  ];

  const highlights = [
    { icon: <Code />, text: "2+ Years Experience", color: "#667eea" },
    { icon: <RocketLaunch />, text: "High Performance", color: "#764ba2" },
    { icon: <EmojiObjects />, text: "Problem Solver", color: "#f093fb" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <Box
      id="about"
      sx={{
        py: { xs: 8, md: 12 },
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, #1e293b 0%, #0f172a 50%, #1e293b 100%)',
      }}
    >
      {/* Animated background elements */}
      <motion.div
        animate={{
          rotate: 360,
          transition: { duration: 60, repeat: Infinity, ease: "linear" }
        }}
        style={{
          position: 'absolute',
          width: '800px',
          height: '800px',
          borderRadius: '50%',
          border: '1px solid rgba(102, 126, 234, 0.1)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 0
        } as React.CSSProperties}
      />
      <motion.div
        animate={{
          rotate: -360,
          transition: { duration: 80, repeat: Infinity, ease: "linear" }
        }}
        style={{
          position: 'absolute',
          width: '1000px',
          height: '1000px',
          borderRadius: '50%',
          border: '1px dashed rgba(118, 75, 162, 0.1)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 0
        } as React.CSSProperties}
      />

      {/* Glowing orbs */}
      <Box
        sx={{
          position: 'absolute',
          top: '20%',
          right: '10%',
          width: 300,
          height: 300,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(102, 126, 234, 0.15) 0%, transparent 70%)',
          filter: 'blur(40px)',
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '20%',
          left: '5%',
          width: 250,
          height: 250,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(118, 75, 162, 0.15) 0%, transparent 70%)',
          filter: 'blur(40px)',
          zIndex: 0,
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography
              variant="overline"
              sx={{
                color: '#667eea',
                letterSpacing: 4,
                fontSize: '0.9rem',
                fontWeight: 600,
              }}
            >
              Get To Know
            </Typography>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 800,
                background: 'linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.8) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                mt: 1,
              }}
            >
              About Me
            </Typography>
            <Box
              sx={{
                width: 80,
                height: 4,
                background: 'linear-gradient(90deg, #667eea, #764ba2)',
                borderRadius: 2,
                mx: 'auto',
                mt: 2,
              }}
            />
          </Box>
        </motion.div>

        <Grid container spacing={6} alignItems="center">
          {/* Left Side - Profile Card */}
          <Grid
            component={motion.div}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            size={{ xs: 12, md: 5 }}
          >
            <motion.div
              whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
            >
              <Box
                sx={{
                  p: 4,
                  borderRadius: 4,
                  background: 'rgba(255, 255, 255, 0.03)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  boxShadow: '0 20px 50px rgba(0, 0, 0, 0.3)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Top gradient bar */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 4,
                    background: 'linear-gradient(90deg, #667eea, #764ba2, #f093fb)',
                  }}
                />

                {/* Avatar with glow */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4, mt: 2 }}>
                    <Box
                      sx={{
                        position: 'relative',
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          inset: -4,
                          borderRadius: '50%',
                          background: 'linear-gradient(135deg, #667eea, #764ba2, #f093fb)',
                          zIndex: 0,
                        },
                        '&::after': {
                          content: '""',
                          position: 'absolute',
                          inset: -8,
                          borderRadius: '50%',
                          background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.4), transparent)',
                          filter: 'blur(15px)',
                          zIndex: -1,
                        },
                      }}
                    >
                      <Avatar
                        src={`${process.env.PUBLIC_URL}/cv.jpg`}
                        alt="Le Minh Thang"
                        sx={{
                          width: 140,
                          height: 140,
                          border: '4px solid #0f172a',
                          position: 'relative',
                          zIndex: 1,
                        }}
                      />
                    </Box>
                  </Box>
                </motion.div>

                {/* Info Items */}
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {infoItems.map((item, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      whileHover={{ x: 8, transition: { duration: 0.2 } }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 2,
                          py: 1.5,
                          px: 2,
                          borderRadius: 2,
                          mb: 1,
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            background: 'rgba(102, 126, 234, 0.1)',
                          },
                        }}
                      >
                        <Box
                          sx={{
                            width: 40,
                            height: 40,
                            borderRadius: 2,
                            background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.2), rgba(118, 75, 162, 0.2))',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#667eea',
                          }}
                        >
                          {item.icon}
                        </Box>
                        <Box>
                          <Typography
                            variant="caption"
                            sx={{ color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: 1 }}
                          >
                            {item.label}
                          </Typography>
                          {item.isLink ? (
                            <Typography
                              variant="body2"
                              component="a"
                              href={item.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              sx={{
                                display: 'block',
                                color: '#667eea',
                                textDecoration: 'none',
                                fontWeight: 500,
                                '&:hover': { textDecoration: 'underline' },
                              }}
                            >
                              {item.value}
                            </Typography>
                          ) : (
                            <Typography variant="body2" sx={{ color: '#fff', fontWeight: 500 }}>
                              {item.value}
                            </Typography>
                          )}
                        </Box>
                      </Box>
                    </motion.div>
                  ))}
                </motion.div>
              </Box>
            </motion.div>
          </Grid>

          {/* Right Side - About Text */}
          <Grid
            component={motion.div}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            size={{ xs: 12, md: 7 }}
          >
            <Box sx={{ pl: { md: 4 } }}>
              {/* Highlights */}
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 4 }}>
                {highlights.map((highlight, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                    whileHover={{ scale: 1.05, y: -3 }}
                  >
                    <Chip
                      icon={highlight.icon as React.ReactElement}
                      label={highlight.text}
                      sx={{
                        background: `linear-gradient(135deg, ${highlight.color}20, transparent)`,
                        border: `1px solid ${highlight.color}40`,
                        color: '#fff',
                        fontWeight: 500,
                        py: 2.5,
                        px: 1,
                        '& .MuiChip-icon': {
                          color: `${highlight.color} !important`,
                        },
                      }}
                    />
                  </motion.div>
                ))}
              </Box>

              {/* Main Text */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 700,
                    color: '#fff',
                    mb: 3,
                    lineHeight: 1.3,
                  }}
                >
                  Crafting Digital Experiences with{' '}
                  <Box
                    component="span"
                    sx={{
                      background: 'linear-gradient(135deg, #667eea, #764ba2)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    Clean Code
                  </Box>
                </Typography>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    color: 'rgba(255,255,255,0.7)',
                    lineHeight: 1.8,
                    mb: 3,
                    fontSize: '1.1rem',
                  }}
                >
                  Backend Developer with <strong style={{ color: '#667eea' }}>2 years of Java experience</strong>; 
                  proficient in <strong style={{ color: '#764ba2' }}>Spring, Node.js, ASP.NET, and React</strong>. 
                  Skilled at architecting and delivering scalable, high-performance systems, solving complex problems, 
                  and optimizing workflows through clean, efficient code.
                </Typography>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    color: 'rgba(255,255,255,0.7)',
                    lineHeight: 1.8,
                    fontSize: '1.1rem',
                  }}
                >
                  Eager to join a dynamic team and drive business impact from day one. 
                  I believe in continuous learning and staying updated with the latest technologies to deliver 
                  innovative solutions.
                </Typography>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7 }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    gap: 4,
                    mt: 5,
                    pt: 4,
                    borderTop: '1px solid rgba(255,255,255,0.1)',
                  }}
                >
                  {[
                    { number: '2+', label: 'Years Experience' },
                    { number: '5+', label: 'Certifications' },
                    { number: '5+', label: 'Technologies' },
                  ].map((stat, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    >
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography
                          variant="h3"
                          sx={{
                            fontWeight: 800,
                            background: 'linear-gradient(135deg, #667eea, #764ba2)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                          }}
                        >
                          {stat.number}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: 'rgba(255,255,255,0.5)', mt: 0.5 }}
                        >
                          {stat.label}
                        </Typography>
                      </Box>
                    </motion.div>
                  ))}
                </Box>
              </motion.div>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default About;
