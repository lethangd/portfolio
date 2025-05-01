import React from 'react';
import { Box, Container, Typography, Paper, List, ListItem, ListItemIcon, ListItemText, Chip } from '@mui/material';
import Grid from '@mui/material/Grid';
import { School, DateRange, LocationOn, VerifiedUser, EmojiEvents } from '@mui/icons-material';
import { motion } from 'framer-motion';

interface Education {
  id: number;
  degree: string;
  institution: string;
  period: string;
  location: string;
  description?: string;
  gpa?: string;
  logo?: string;
}

interface Certification {
  id: number;
  title: string;
  issuer: string;
  period: string;
  url: string;
}

interface Award {
  id: number;
  title: string;
  issuer: string;
  year: string;
  description?: string;
}

const educationList: Education[] = [
  {
    id: 1,
    degree: 'Software Engineering',
    institution: 'FPT University',
    period: '2021 - 2025',
    location: 'Hanoi, Vietnam',
    description: 'Studying the Software Engineering program, focusing on software development and related technologies.',
    gpa: '3.0/4.0'
  },
  {
    id: 2,
    degree: 'Funix Business Certificate',
    institution: 'FUNIX',
    period: '2023 - 2025',
    location: 'Online',
    description: 'Completed the Funix Business Certificate with courses focused on developing skills in the information technology industry.',
    gpa: '8.25/10'
  }
];

const certificationsList: Certification[] = [
  {
    id: 1,
    title: 'Computer Communications',
    issuer: 'Coursera',
    period: '2023',
    url: 'https://coursera.org/share/5d2103f79b9fb228110ab22a49001871'
  },
  {
    id: 2,
    title: 'Web Design',
    issuer: 'Coursera',
    period: '2023',
    url: 'https://coursera.org/share/8b05247d276386ced9e1fb27478cbc58'
  },
  {
    id: 3,
    title: 'Software Development Lifecycle Specialization',
    issuer: 'Coursera',
    period: '2024',
    url: 'https://coursera.org/share/c70a8b9308f0ecd6d345860e3e4a37b2'
  },
  {
    id: 4,
    title: 'Academic English: Writing',
    issuer: 'Coursera',
    period: '2024',
    url: 'https://coursera.org/share/d14f1d9a8e3d6d982113f62e2e1d3a8e'
  },
  {
    id: 5,
    title: 'Project Management Principles and Practices Specialization',
    issuer: 'Coursera',
    period: '2024',
    url: 'https://coursera.org/share/e65df82224a67bb2616c8e763785974b'
  }
];

const awardsList: Award[] = [
  {
    id: 1,
    title: 'Scholarship for Best Project',
    issuer: 'TECHCOMBANK',
    year: '2023',
    description: 'Awarded for outstanding performance and innovative approach in developing a banking solution project.'
  },
  {
    id: 2,
    title: 'RIKI Japanese scholarship',
    issuer: 'FPT SOFTWARE',
    year: '2024',
    description: 'Scholarship awarded for Japanese language proficiency and technical skills.'
  },
  {
    id: 3,
    title: 'Achievement awards Spring',
    issuer: 'FPTU',
    year: '2023',
    description: 'Recognition for academic excellence during the Spring semester.'
  },
  {
    id: 4,
    title: '30% Scholarship for 4 years',
    issuer: 'FPTU',
    year: '2021',
    description: 'Merit-based scholarship covering 30% of tuition fees for the entire 4-year program.'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const certVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { 
      delay: i * 0.1,
      duration: 0.5
    }
  })
};

const Education: React.FC = () => {
  return (
    <Box
      id="education"
      sx={{
        py: 8,
        background: 'linear-gradient(to bottom, #f5f7fa, #e2e8f0)',
        overflow: 'hidden',
      }}
    >
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <Typography
            component="h2"
            variant="h3"
            align="center"
            color="text.primary"
            gutterBottom
            fontWeight="bold"
            sx={{ mb: 6 }}
            className="relative inline-block after:content-[''] after:block after:w-1/2 after:h-1 after:bg-blue-500 after:mx-auto after:mt-2"
          >
            Education
          </Typography>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Grid container spacing={4} justifyContent="center" sx={{ mb: 6 }}>
            {educationList.map((education) => (
              <Grid
                key={education.id}
                size={{
                  xs: 12,
                  md: 6
                }}
              >
                <motion.div variants={itemVariants}>
                  <Paper
                    elevation={3}
                    sx={{
                      p: 3,
                      height: '100%',
                      borderRadius: 3,
                      display: 'flex',
                      flexDirection: 'column',
                      position: 'relative',
                      overflow: 'hidden',
                      '&:hover': {
                        '& .education-bg': {
                          transform: 'scale(1.05)'
                        }
                      }
                    }}
                  >
                    <Box 
                      className="education-bg"
                      sx={{ 
                        position: 'absolute', 
                        top: 0, 
                        left: 0, 
                        right: 0, 
                        height: '6px', 
                        background: 'linear-gradient(90deg, #1976d2, #64b5f6)',
                        transition: 'transform 0.3s ease'
                      }}
                    />
                    <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                      <Box
                        sx={{
                          width: 60,
                          height: 60,
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderRadius: '50%',
                          bgcolor: 'primary.main',
                          color: 'white',
                          mr: 3,
                          flexShrink: 0,
                        }}
                      >
                        <School fontSize="large" />
                      </Box>
                      <Box>
                        <Typography variant="h5" component="h3" gutterBottom fontWeight="bold">
                          {education.degree}
                        </Typography>
                        <Typography variant="h6" color="primary" gutterBottom>
                          {education.institution}
                        </Typography>

                        <List dense disablePadding>
                          <ListItem disableGutters sx={{ pb: 0 }}>
                            <ListItemIcon sx={{ minWidth: 30 }}>
                              <DateRange fontSize="small" color="action" />
                            </ListItemIcon>
                            <ListItemText 
                              primary={education.period}
                              primaryTypographyProps={{ variant: 'body2', color: 'text.secondary' }} 
                            />
                          </ListItem>
                          <ListItem disableGutters>
                            <ListItemIcon sx={{ minWidth: 30 }}>
                              <LocationOn fontSize="small" color="action" />
                            </ListItemIcon>
                            <ListItemText 
                              primary={education.location}
                              primaryTypographyProps={{ variant: 'body2', color: 'text.secondary' }} 
                            />
                          </ListItem>
                        </List>

                        {education.description && (
                          <Typography variant="body2" sx={{ mt: 2 }}>
                            {education.description}
                          </Typography>
                        )}
                        
                        {education.gpa && (
                          <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
                            <Typography variant="subtitle2" color="text.secondary" sx={{ mr: 1 }}>
                              GPA:
                            </Typography>
                            <Chip 
                              label={education.gpa} 
                              color="primary" 
                              size="small" 
                              variant="outlined" 
                            />
                          </Box>
                        )}
                      </Box>
                    </Box>
                  </Paper>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
        
        {/* Awards Section - Made more prominent */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Box 
            sx={{ 
              mt: 6, 
              mb: 6,
              p: 4,
              borderRadius: 4,
              background: 'linear-gradient(135deg, #1976d2, #42a5f5)',
              boxShadow: '0 10px 30px rgba(25, 118, 210, 0.3)',
              color: 'white',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <Box 
              sx={{ 
                position: 'absolute',
                top: -20,
                right: -20,
                width: 140,
                height: 140,
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.1)',
                zIndex: 0
              }}
            />
            
            <Box 
              sx={{ 
                position: 'absolute',
                bottom: -30,
                left: -30,
                width: 180,
                height: 180,
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.1)',
                zIndex: 0
              }}
            />
            
            <Box sx={{ position: 'relative', zIndex: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <EmojiEvents sx={{ fontSize: 40, mr: 2 }} />
                <Typography variant="h4" fontWeight="bold">
                  Awards & Achievements
                </Typography>
              </Box>

              {awardsList.map((award) => (
                <motion.div
                  key={award.id}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="h6" fontWeight="bold">
                      {award.title}
                    </Typography>
                    <Typography variant="subtitle1">
                      <Box component="span" sx={{ fontWeight: 'medium' }}>{award.issuer}</Box> • {award.year}
                    </Typography>
                    {award.description && (
                      <Typography variant="body1" sx={{ mt: 1, opacity: 0.9 }}>
                        {award.description}
                      </Typography>
                    )}
                  </Box>
                </motion.div>
              ))}
            </Box>
          </Box>
        </motion.div>
        
        <Typography
          component="h3"
          variant="h4"
          align="center"
          color="text.primary"
          gutterBottom
          fontWeight="bold"
          sx={{ mb: 4, mt: 6 }}
        >
          Certifications
        </Typography>
        
        <Grid container spacing={3} justifyContent="center">
          {certificationsList.map((cert, index) => (
            <Grid
              key={cert.id}
              size={{
                xs: 12,
                sm: 6,
                md: 4
              }}
              sx={{ display: 'flex' }}
            >
              <motion.div
                custom={index}
                variants={certVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                style={{ width: '100%', display: 'flex' }}
              >
                <Paper
                  elevation={2}
                  sx={{
                    p: 2,
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: 2,
                    position: 'relative',
                    overflow: 'hidden',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '3px',
                      background: 'linear-gradient(90deg, #1976d2, #42a5f5)',
                    }
                  }}
                >
                  <Box sx={{ display: 'flex', height: '100%' }}>
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: '50%',
                        bgcolor: 'primary.light',
                        color: 'white',
                        mr: 2,
                        flexShrink: 0,
                        alignSelf: 'flex-start'
                      }}
                    >
                      <VerifiedUser fontSize="small" />
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flexGrow: 1 }}>
                      <Box>
                        <Typography variant="subtitle1" component="h4" fontWeight="bold">
                          {cert.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {cert.issuer} • {cert.period}
                        </Typography>
                      </Box>
                      <Box sx={{ mt: 'auto', pt: 1 }}>
                        <Typography 
                          variant="body2" 
                          component="a" 
                          href={cert.url} 
                          target="_blank"
                          rel="noopener noreferrer"
                          sx={{ color: 'primary.main', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
                        >
                          View Certificate
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Education;
