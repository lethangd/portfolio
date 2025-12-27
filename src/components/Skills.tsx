import React from 'react';
import { Box, Container, Typography, Chip } from '@mui/material';
import Grid from '@mui/material/Grid';
import { motion } from 'framer-motion';
import { 
  Code, 
  Storage, 
  Build, 
  Language, 
  Cloud,
  Psychology
} from '@mui/icons-material';

interface Skill {
  name: string;
  level: number; // 0-100
  color?: string;
}

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  gradient: string;
  skills: Skill[];
}

const skillCategories: SkillCategory[] = [
  {
    title: 'Programming Languages',
    icon: <Code />,
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    skills: [
      { name: 'Java', level: 90 },
      { name: 'C#', level: 85 },
      { name: 'JavaScript', level: 85 },
      { name: 'TypeScript', level: 80 },
      { name: 'Python', level: 70 },
    ]
  },
  {
    title: 'Backend Frameworks',
    icon: <Build />,
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    skills: [
      { name: 'Spring Boot', level: 90 },
      { name: 'ASP.NET Core', level: 85 },
      { name: 'Node.js', level: 85 },
      { name: 'Express.js', level: 85 },
      { name: 'Fastify', level: 75 },
    ]
  },
  {
    title: 'Databases',
    icon: <Storage />,
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    skills: [
      { name: 'SQL Server', level: 90 },
      { name: 'PostgreSQL', level: 85 },
      { name: 'MongoDB', level: 80 },
      { name: 'MySQL', level: 80 },
      { name: 'Redis', level: 75 },
    ]
  },
  {
    title: 'Frontend & Web',
    icon: <Language />,
    gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    skills: [
      { name: 'React', level: 85 },
      { name: 'Vue.js', level: 80 },
      { name: 'HTML/CSS', level: 90 },
      { name: 'Tailwind CSS', level: 85 },
      { name: 'Bootstrap', level: 80 },
    ]
  },
  {
    title: 'DevOps & Cloud',
    icon: <Cloud />,
    gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    skills: [
      { name: 'Docker', level: 80 },
      { name: 'Git', level: 90 },
      { name: 'CI/CD', level: 75 },
      { name: 'Linux', level: 75 },
    ]
  },
  {
    title: 'Soft Skills',
    icon: <Psychology />,
    gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    skills: [
      { name: 'Problem Solving', level: 90 },
      { name: 'Team Collaboration', level: 90 },
      { name: 'Agile/Scrum', level: 80 },
      { name: 'Communication', level: 85 },
    ]
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 50, rotateX: -15 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
};

const skillBarVariants = {
  hidden: { width: 0 },
  visible: (level: number) => ({
    width: `${level}%`,
    transition: { duration: 1, delay: 0.3, ease: 'easeOut' }
  })
};

const Skills: React.FC = () => {
  return (
    <Box
      id="skills"
      sx={{
        py: { xs: 8, md: 12 },
        background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background decorations */}
      <Box
        sx={{
          position: 'absolute',
          top: '20%',
          left: '-10%',
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(102, 126, 234, 0.15) 0%, transparent 70%)',
          filter: 'blur(60px)'
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '10%',
          right: '-5%',
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(118, 75, 162, 0.15) 0%, transparent 70%)',
          filter: 'blur(60px)'
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography
              variant="overline"
              sx={{
                color: '#a78bfa',
                letterSpacing: 4,
                fontWeight: 600,
                mb: 2,
                display: 'block'
              }}
            >
              MY EXPERTISE
            </Typography>
            <Typography
              variant="h2"
              component="h2"
              sx={{
                fontWeight: 800,
                fontSize: { xs: '2rem', md: '3rem' },
                background: 'linear-gradient(135deg, #fff 0%, #a78bfa 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 2
              }}
            >
              Technical Skills
            </Typography>
            <Box
              sx={{
                width: 80,
                height: 4,
                background: 'linear-gradient(90deg, #667eea, #764ba2)',
                borderRadius: 2,
                mx: 'auto'
              }}
            />
          </Box>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <Grid container spacing={3}>
            {skillCategories.map((category, categoryIndex) => (
              <Grid key={category.title} size={{ xs: 12, sm: 6, lg: 4 }}>
                <motion.div
                  variants={cardVariants}
                  whileHover={{ 
                    y: -10,
                    transition: { duration: 0.3 }
                  }}
                  style={{ height: '100%' }}
                >
                  {/* Glassmorphism Card */}
                  <Box
                    sx={{
                      height: '100%',
                      p: 3,
                      borderRadius: 4,
                      background: 'rgba(255, 255, 255, 0.05)',
                      backdropFilter: 'blur(20px)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      position: 'relative',
                      overflow: 'hidden',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        background: 'rgba(255, 255, 255, 0.08)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)'
                      }
                    }}
                  >
                    {/* Gradient accent line */}
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: 3,
                        background: category.gradient
                      }}
                    />

                    {/* Header */}
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                      <Box
                        sx={{
                          width: 48,
                          height: 48,
                          borderRadius: 2,
                          background: category.gradient,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          mr: 2,
                          boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)'
                        }}
                      >
                        {category.icon}
                      </Box>
                      <Typography
                        variant="h6"
                        sx={{
                          color: 'white',
                          fontWeight: 700,
                          fontSize: '1rem'
                        }}
                      >
                        {category.title}
                      </Typography>
                    </Box>

                    {/* Skills with progress bars */}
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      {category.skills.map((skill, skillIndex) => (
                        <Box key={skill.name}>
                          <Box
                            sx={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              mb: 0.5
                            }}
                          >
                            <Typography
                              variant="body2"
                              sx={{ color: 'rgba(255,255,255,0.9)', fontWeight: 500 }}
                            >
                              {skill.name}
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{ color: 'rgba(255,255,255,0.6)' }}
                            >
                              {skill.level}%
                            </Typography>
                          </Box>
                          {/* Progress bar container */}
                          <Box
                            sx={{
                              height: 6,
                              borderRadius: 3,
                              background: 'rgba(255, 255, 255, 0.1)',
                              overflow: 'hidden'
                            }}
                          >
                            <motion.div
                              custom={skill.level}
                              variants={skillBarVariants}
                              initial="hidden"
                              whileInView="visible"
                              viewport={{ once: true }}
                              style={{
                                height: '100%',
                                borderRadius: 3,
                                background: category.gradient,
                                boxShadow: '0 0 10px rgba(102, 126, 234, 0.5)'
                              }}
                            />
                          </Box>
                        </Box>
                      ))}
                    </Box>
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>

        {/* Additional skills as chips */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <Box sx={{ mt: 8, textAlign: 'center' }}>
            <Typography
              variant="h6"
              sx={{ color: 'rgba(255,255,255,0.7)', mb: 3, fontWeight: 500 }}
            >
              Also experienced with
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 1.5,
                justifyContent: 'center'
              }}
            >
              {[
                'Microservices',
                'REST APIs',
                'GraphQL',
                'RabbitMQ',
                'OAuth2',
                'Clean Architecture',
                'CQRS',
                'DDD',
                'Design Patterns',
                'Unit Testing',
                'Swagger',
                'Postman'
              ].map((skill, index) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.1 }}
                >
                  <Chip
                    label={skill}
                    sx={{
                      background: 'rgba(255, 255, 255, 0.1)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      color: 'white',
                      fontWeight: 500,
                      px: 1,
                      '&:hover': {
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        border: '1px solid transparent'
                      }
                    }}
                  />
                </motion.div>
              ))}
            </Box>
          </Box>
        </motion.div>

        {/* Stats counter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          <Box
            sx={{
              mt: 8,
              p: 4,
              borderRadius: 4,
              background: 'rgba(255, 255, 255, 0.03)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}
          >
            <Grid container spacing={4}>
              {[
                { value: '2+', label: 'Years Experience' },
                { value: '10+', label: 'Projects Completed' },
                { value: '5+', label: 'Happy Clients' },
                { value: '15+', label: 'Technologies' }
              ].map((stat, index) => (
                <Grid key={stat.label} size={{ xs: 6, md: 3 }}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography
                        variant="h3"
                        sx={{
                          fontWeight: 800,
                          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          mb: 1
                        }}
                      >
                        {stat.value}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: 'rgba(255,255,255,0.6)' }}
                      >
                        {stat.label}
                      </Typography>
                    </Box>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Skills;
