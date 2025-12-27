import React from 'react';
import { Box, Container, Typography, Chip } from '@mui/material';
import Grid from '@mui/material/Grid';
import { School, DateRange, LocationOn, VerifiedUser, EmojiEvents, OpenInNew } from '@mui/icons-material';
import { motion } from 'framer-motion';

interface EducationItem {
  id: number;
  degree: string;
  institution: string;
  period: string;
  location: string;
  description?: string;
  gpa?: string;
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

const educationList: EducationItem[] = [
  {
    id: 1,
    degree: 'Software Engineering',
    institution: 'FPT UNIVERSITY',
    period: '2021 - 2025',
    location: 'Hanoi, Vietnam',
    description: 'Major: Software Engineering',
    gpa: '3.0/4'
  },
  {
    id: 2,
    degree: 'Funix Business Certificate',
    institution: 'FUNIX',
    period: '2023 - 2025',
    location: 'Online',
    description: 'Business & Management Skills',
    gpa: '8.25/10'
  }
];

const certificationsList: Certification[] = [
  {
    id: 1,
    title: 'Computer Communications',
    issuer: 'Coursera',
    period: '2022',
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
    title: 'Software Development Lifecycle',
    issuer: 'Coursera',
    period: '2023',
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
    title: 'Project Management Principles',
    issuer: 'Coursera',
    period: '2024',
    url: 'https://coursera.org/share/e65df82224a67bb2616c8e763785974b'
  }
];

const awardsList: Award[] = [
  {
    id: 1,
    title: 'Top 10 Finalist - VPBank Technology Hackathon 2025',
    issuer: 'VPBank',
    year: '2024',
    description: 'Innovative fintech solution development'
  },
  {
    id: 2,
    title: 'TECHCOMBANK Scholarship for Best Project',
    issuer: 'TECHCOMBANK',
    year: '2023',
    description: 'Outstanding banking solution development'
  },
  {
    id: 3,
    title: 'Academic Scholarship',
    issuer: 'FPT University',
    year: '2022',
    description: 'Merit-based academic excellence'
  }
];

const Education: React.FC = () => {
  return (
    <Box
      id="education"
      sx={{
        py: { xs: 8, md: 12 },
        background: 'linear-gradient(180deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background decorations */}
      <Box
        sx={{
          position: 'absolute',
          top: '10%',
          left: '-5%',
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(102, 126, 234, 0.1) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '20%',
          right: '-10%',
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(118, 75, 162, 0.1) 0%, transparent 70%)',
          filter: 'blur(60px)',
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
              My Journey
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
              Education & Achievements
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

        {/* Education Cards */}
        <Grid container spacing={4} sx={{ mb: 8 }}>
          {educationList.map((education, index) => (
            <Grid key={education.id} size={{ xs: 12, md: 6 }}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                style={{ height: '100%' }}
              >
                <Box
                  sx={{
                    height: '100%',
                    p: 4,
                    borderRadius: 4,
                    background: 'rgba(255, 255, 255, 0.03)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      background: 'rgba(255, 255, 255, 0.05)',
                      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
                    },
                  }}
                >
                  {/* Gradient top bar */}
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

                  <Box sx={{ display: 'flex', gap: 3 }}>
                    {/* Icon */}
                    <Box
                      sx={{
                        width: 70,
                        height: 70,
                        borderRadius: 3,
                        background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.2), rgba(118, 75, 162, 0.2))',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <School sx={{ fontSize: 36, color: '#667eea' }} />
                    </Box>

                    {/* Content */}
                    <Box sx={{ flex: 1 }}>
                      <Typography
                        variant="h5"
                        sx={{ fontWeight: 700, color: '#fff', mb: 1 }}
                      >
                        {education.degree}
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{
                          background: 'linear-gradient(135deg, #667eea, #764ba2)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          fontWeight: 600,
                          mb: 2,
                        }}
                      >
                        {education.institution}
                      </Typography>

                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <DateRange sx={{ fontSize: 18, color: 'rgba(255,255,255,0.5)' }} />
                          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                            {education.period}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <LocationOn sx={{ fontSize: 18, color: 'rgba(255,255,255,0.5)' }} />
                          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                            {education.location}
                          </Typography>
                        </Box>
                      </Box>

                      {education.description && (
                        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)', mb: 2 }}>
                          {education.description}
                        </Typography>
                      )}

                      {education.gpa && (
                        <Chip
                          label={`GPA: ${education.gpa}`}
                          sx={{
                            background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.3), rgba(118, 75, 162, 0.3))',
                            border: '1px solid rgba(102, 126, 234, 0.5)',
                            color: '#fff',
                            fontWeight: 600,
                          }}
                        />
                      )}
                    </Box>
                  </Box>
                </Box>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* Awards Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Box
            sx={{
              p: { xs: 4, md: 6 },
              borderRadius: 4,
              background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.15), rgba(118, 75, 162, 0.15))',
              border: '1px solid rgba(102, 126, 234, 0.3)',
              position: 'relative',
              overflow: 'hidden',
              mb: 8,
            }}
          >
            {/* Background glow */}
            <Box
              sx={{
                position: 'absolute',
                top: -50,
                right: -50,
                width: 200,
                height: 200,
                borderRadius: '50%',
                background: 'rgba(102, 126, 234, 0.2)',
                filter: 'blur(60px)',
              }}
            />

            <Box sx={{ position: 'relative', zIndex: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
                <Box
                  sx={{
                    width: 60,
                    height: 60,
                    borderRadius: 3,
                    background: 'linear-gradient(135deg, #667eea, #764ba2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <EmojiEvents sx={{ fontSize: 32, color: '#fff' }} />
                </Box>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 700,
                    background: 'linear-gradient(135deg, #fff, rgba(255,255,255,0.8))',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Awards & Achievements
                </Typography>
              </Box>

              <Grid container spacing={3}>
                {awardsList.map((award, index) => (
                  <Grid key={award.id} size={{ xs: 12, md: 4 }}>
                    <motion.div
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.15, duration: 0.5 }}
                      whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
                    >
                      <Box
                        sx={{
                          p: 3,
                          borderRadius: 3,
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          height: '100%',
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                          <Chip
                            label={award.year}
                            size="small"
                            sx={{
                              background: 'linear-gradient(135deg, #667eea, #764ba2)',
                              color: '#fff',
                              fontWeight: 600,
                            }}
                          />
                          <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)' }}>
                            {award.issuer}
                          </Typography>
                        </Box>
                        <Typography variant="h6" sx={{ fontWeight: 600, color: '#fff', mb: 1 }}>
                          {award.title}
                        </Typography>
                        {award.description && (
                          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)' }}>
                            {award.description}
                          </Typography>
                        )}
                      </Box>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Box>
        </motion.div>

        {/* Certifications Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Typography
            variant="h4"
            align="center"
            sx={{
              fontWeight: 700,
              color: '#fff',
              mb: 5,
            }}
          >
            Certifications
          </Typography>
        </motion.div>

        <Grid container spacing={3}>
          {certificationsList.map((cert, index) => (
            <Grid key={cert.id} size={{ xs: 12, sm: 6, md: 4 }}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                style={{ height: '100%' }}
              >
                <Box
                  component="a"
                  href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    display: 'block',
                    height: '100%',
                    p: 3,
                    borderRadius: 3,
                    background: 'rgba(255, 255, 255, 0.03)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    '&:hover': {
                      background: 'rgba(102, 126, 234, 0.1)',
                      borderColor: 'rgba(102, 126, 234, 0.3)',
                      '& .view-icon': {
                        opacity: 1,
                        transform: 'translateX(0)',
                      },
                    },
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                    <Box
                      sx={{
                        width: 45,
                        height: 45,
                        borderRadius: 2,
                        background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.2), rgba(118, 75, 162, 0.2))',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <VerifiedUser sx={{ color: '#667eea', fontSize: 24 }} />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography
                        variant="subtitle1"
                        sx={{ fontWeight: 600, color: '#fff', mb: 0.5, lineHeight: 1.3 }}
                      >
                        {cert.title}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)' }}>
                        {cert.issuer} • {cert.period}
                      </Typography>
                    </Box>
                    <OpenInNew
                      className="view-icon"
                      sx={{
                        color: '#667eea',
                        fontSize: 20,
                        opacity: 0,
                        transform: 'translateX(-10px)',
                        transition: 'all 0.3s ease',
                      }}
                    />
                  </Box>
                </Box>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Education;
