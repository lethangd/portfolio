import React from 'react';
import { Box, Container, Typography, Paper, Chip } from '@mui/material';
import Grid from '@mui/material/Grid';
import { motion } from 'framer-motion';
import { Code, Storage, Build, Language, School, CheckCircle } from '@mui/icons-material';

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  skills: {
    name: string;
    level: 'Advanced' | 'Intermediate';
  }[];
}

const skillCategories: SkillCategory[] = [
  {
    title: 'Programming Languages',
    icon: <Code fontSize="small" />,
    skills: [
      { name: 'C#', level: 'Advanced' },
      { name: 'Java', level: 'Advanced' },
      { name: 'JavaScript', level: 'Advanced' },
      { name: 'Python', level: 'Intermediate' },
    ]
  },
  {
    title: 'Web Development',
    icon: <Language fontSize="small" />,
    skills: [
      { name: 'HTML', level: 'Advanced' },
      { name: 'CSS', level: 'Advanced' },
      { name: 'React', level: 'Advanced' },
      { name: 'Tailwind', level: 'Advanced' },
      { name: 'Bootstrap', level: 'Intermediate' },
    ]
  },
  {
    title: 'Databases',
    icon: <Storage fontSize="small" />,
    skills: [
      { name: 'SQL Server', level: 'Advanced' },
      { name: 'MongoDB', level: 'Intermediate' },
      { name: 'SQLite', level: 'Intermediate' },
      { name: 'MySQL', level: 'Intermediate' },
      { name: 'Firebase', level: 'Intermediate' },
    ]
  },
  {
    title: 'Backend Frameworks',
    icon: <Build fontSize="small" />,
    skills: [
      { name: 'ASP.NET', level: 'Advanced' },
      { name: 'Spring', level: 'Advanced' },
      { name: 'Node.js', level: 'Advanced' },
      { name: 'Express.js', level: 'Advanced' },
      { name: 'Fastify', level: 'Intermediate' },
    ]
  },
  {
    title: 'Other Skills',
    icon: <CheckCircle fontSize="small" />,
    skills: [
      { name: 'Git', level: 'Advanced' },
      { name: 'Problem-solving', level: 'Advanced' },
      { name: 'Teamwork', level: 'Advanced' },
      { name: 'Agile Methodologies', level: 'Intermediate' },
      { name: 'RESTful APIs', level: 'Advanced' },
      { name: 'Design Patterns', level: 'Intermediate' },
    ]
  },
  {
    title: 'Languages',
    icon: <School fontSize="small" />,
    skills: [
      { name: 'English', level: 'Intermediate' },
    ]
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};

const chipVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: (i: number) => ({
    scale: 1,
    opacity: 1,
    transition: {
      delay: i * 0.05,
      duration: 0.3
    }
  })
};

const Skills: React.FC = () => {
  // Function to calculate how many columns an item should take
  const getGridSize = (index: number) => {
    return {
      xs: 12,
      sm: 6,
      md: 4,
      lg: 3,
      xl: 2  // 6 per row on extra large screens
    };
  };

  return (
    <Box
      id="skills"
      sx={{
        py: 6, // Reduced vertical padding
        background: 'linear-gradient(to bottom, #f8f9fa, #e9ecef)',
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
            sx={{ mb: 4 }} // Reduced margin
            className="relative inline-block after:content-[''] after:block after:w-1/2 after:h-1 after:bg-blue-500 after:mx-auto after:mt-2"
          >
            TECHNICAL SKILLS
          </Typography>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Grid container spacing={2} alignItems="stretch"> {/* Reduced spacing */}
            {skillCategories.map((category, index) => (
              <Grid
                key={category.title}
                {...getGridSize(index)}
                sx={{ display: 'flex', mb: 2 }} // Reduced margin
              >
                <motion.div
                  variants={itemVariants}
                  whileHover={{ 
                    y: -5, // Reduced hover movement
                    boxShadow: '0px 5px 15px rgba(0,0,0,0.1)',
                    transition: { duration: 0.3 } 
                  }}
                  style={{ width: '100%', height: '100%', display: 'flex' }}
                >
                  <Paper
                    elevation={2} // Reduced elevation
                    sx={{
                      p: 2, // Reduced padding
                      width: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      borderRadius: 2, // Reduced border radius
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}> {/* Reduced margin */}
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: 36, // Smaller icon container
                          height: 36, // Smaller icon container
                          borderRadius: '50%',
                          backgroundColor: 'primary.main',
                          color: 'white',
                          mr: 1.5, // Reduced margin
                          flexShrink: 0
                        }}
                      >
                        {category.icon}
                      </Box>
                      <Typography variant="subtitle1" fontWeight="bold" noWrap>
                        {category.title}
                      </Typography>
                    </Box>

                    <Box 
                      sx={{ 
                        display: 'flex', 
                        flexWrap: 'wrap', 
                        gap: 0.5, // Reduced gap
                        mt: 1, // Reduced margin
                        minHeight: '60px', // Smaller minimum height
                        flexGrow: 1
                      }}
                    >
                      {category.skills.map((skill, i) => (
                        <motion.div
                          key={skill.name}
                          custom={i}
                          variants={chipVariants}
                        >
                          <Chip
                            label={skill.name}
                            color={skill.level === 'Advanced' ? 'primary' : 'default'}
                            variant={skill.level === 'Advanced' ? 'filled' : 'outlined'}
                            size="small" // Changed to small
                            sx={{
                              fontWeight: skill.level === 'Advanced' ? 'bold' : 'normal',
                              px: 0.5, // Reduced padding
                              height: '24px', // Smaller height
                              fontSize: '0.7rem', // Smaller font
                              '& .MuiChip-label': {
                                px: 1
                              }
                            }}
                          />
                        </motion.div>
                      ))}
                    </Box>
                  </Paper>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Skills;