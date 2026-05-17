import React, { useState } from 'react';
import { Box, Chip, Container, Typography, Collapse, IconButton } from '@mui/material';
import { motion } from 'framer-motion';
import { 
  Business, 
  Code, 
  ExpandMore, 
  ExpandLess,
  WorkOutline,
  CalendarToday,
  CheckCircle
} from '@mui/icons-material';

interface ExperienceProject {
  title: string;
  systemContext: string;
  highlights: string[];
  techStack: string;
}

interface ExperienceItem {
  id: number;
  company: string;
  period: string;
  role: string;
  projects: ExperienceProject[];
  color: string;
  icon: React.ReactNode;
}

const experiences: ExperienceItem[] = [
  {
    id: 1,
    company: 'MEDICIA',
    period: 'Jun 2024 - Present',
    role: 'Fullstack Developer',
    color: '#667eea',
    icon: <Code />,
    projects: [
      {
        title: 'NUHS Care Plan System',
        systemContext: 'Hospital-wide care plan platform for National University Hospital Singapore, serving 1,000+ clinical users.',
        highlights: [
          'Designed and built core backend services for a hospital-scale care plan system enabling clinicians to manage patient treatments, medications, appointments, and symptoms.',
          'Solved complex system integration challenges between hospital EMR systems, internal admin portals, and patient-facing PWA through modular Spring Boot microservices.',
          'Implemented secure and auditable workflows, including authentication, authorization, and activity logging to meet healthcare compliance.',
          'Improved performance via service separation, query optimization, and reusable pagination/search abstractions.',
          'Enabled faster clinical workflows by delivering reliable APIs for real-time patient data access.'
        ],
        techStack: 'Java, Spring Boot, Microservices, SQL, REST APIs'
      },
      {
        title: 'Savanna Healthcare Platform',
        systemContext: 'Multi-tenant telepharmacy & care management platform deployed to 3 healthcare organizations.',
        highlights: [
          'Architected modular healthcare platform enabling multi-organization deployment with tenant isolation.',
          'Designed backend APIs for telepharmacy operations, covering medication orders, dispensing, and appointments.',
          'Led development of the Careplan Portal for pharmacists and healthcare staff.',
          'Built patient-facing applications supporting medication adherence and symptom tracking.',
          'Improved scalability with Redis caching, reducing backend load significantly.',
          'Containerized backend services with Docker for consistent deployments.'
        ],
        techStack: 'Node.js, Fastify, Vue.js, Redis, Docker, SQL'
      }
    ]
  },
  {
    id: 2,
    company: 'Self-employed',
    period: '2023 - Present',
    role: 'Freelance Web & Backend Developer',
    color: '#f093fb',
    icon: <WorkOutline />,
    projects: [
      {
        title: 'Various Client Projects',
        systemContext: 'Delivered full-stack web applications and backend services for clients across multiple technology stacks.',
        highlights: [
          'Developed full-stack web applications using React, Vue, JavaScript, and TypeScript.',
          'Built RESTful APIs and backend services using Node.js with Express framework.',
          'Created enterprise applications with Java Spring Boot for business clients.',
          'Implemented web solutions using ASP.NET Core and Entity Framework.',
          'Worked with SQL and NoSQL databases including MySQL, MongoDB, and SQL Server.',
          'Provided maintenance and debugging services for existing applications.'
        ],
        techStack: 'React, Vue, TypeScript, Node.js, Spring Boot, ASP.NET Core, MongoDB, SQL Server'
      }
    ]
  },
  {
    id: 3,
    company: 'VNPT-IT',
    period: 'Jun 2023 - Jun 2024',
    role: 'Fresher Java Backend Developer',
    color: '#4facfe',
    icon: <Business />,
    projects: [
      {
        title: 'Hospital Management Information System (HMIS)',
        systemContext: 'National-scale Hospital Management Information System deployed across all hospitals and health stations nationwide.',
        highlights: [
          'Engineered core backend modules for a large-scale HMIS using Spring Framework and Oracle.',
          'Built the Pharmacy module to manage pharmaceutical inventory and drug dispensing workflows.',
          'Implemented the Vaccination module to track immunization records and schedules.',
          'Ensured system stability by maintaining legacy components and optimizing SQL queries.'
        ],
        techStack: 'Java, Spring Framework, Oracle, SQL'
      }
    ]
  }
];

const Experience: React.FC = () => {
  const [expandedId, setExpandedId] = useState<number | null>(1);

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <Box
      id="experience"
      sx={{
        py: { xs: 8, md: 12 },
        background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background decorations */}
      <Box
        sx={{
          position: 'absolute',
          top: '10%',
          right: '-5%',
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(102, 126, 234, 0.08) 0%, transparent 70%)',
          filter: 'blur(40px)'
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
                color: '#667eea',
                letterSpacing: 4,
                fontWeight: 600,
                mb: 2,
                display: 'block'
              }}
            >
              CAREER JOURNEY
            </Typography>
            <Typography
              variant="h2"
              component="h2"
              sx={{
                fontWeight: 800,
                fontSize: { xs: '2rem', md: '3rem' },
                color: '#1a1a2e',
                mb: 2
              }}
            >
              Work Experience
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

        {/* Timeline */}
        <Box sx={{ position: 'relative' }}>
          {/* Vertical line */}
          <Box
            sx={{
              position: 'absolute',
              left: { xs: 20, md: '50%' },
              transform: { md: 'translateX(-50%)' },
              top: 0,
              bottom: 0,
              width: 3,
              background: 'linear-gradient(180deg, #667eea 0%, #764ba2 50%, #4facfe 100%)',
              borderRadius: 2,
              opacity: 0.3
            }}
          />

          {experiences.map((experience, index) => (
            <motion.div
              key={experience.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'row', md: index % 2 === 0 ? 'row' : 'row-reverse' },
                  mb: 6,
                  position: 'relative'
                }}
              >
                {/* Timeline dot */}
                <Box
                  sx={{
                    position: 'absolute',
                    left: { xs: 20, md: '50%' },
                    transform: 'translateX(-50%)',
                    zIndex: 2
                  }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, type: 'spring' }}
                  >
                    <Box
                      sx={{
                        width: 50,
                        height: 50,
                        borderRadius: '50%',
                        background: experience.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        boxShadow: `0 8px 25px ${experience.color}50`,
                        border: '4px solid white'
                      }}
                    >
                      {experience.icon}
                    </Box>
                  </motion.div>
                </Box>

                {/* Content card */}
                <Box
                  sx={{
                    width: { xs: 'calc(100% - 60px)', md: 'calc(50% - 40px)' },
                    ml: { xs: '60px', md: index % 2 === 0 ? 0 : 'auto' },
                    mr: { xs: 0, md: index % 2 === 0 ? 'auto' : 0 }
                  }}
                >
                  <motion.div
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Box
                      sx={{
                        p: 3,
                        borderRadius: 4,
                        background: 'white',
                        boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
                        border: '1px solid rgba(0,0,0,0.05)',
                        position: 'relative',
                        overflow: 'hidden',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          boxShadow: '0 20px 60px rgba(0,0,0,0.12)',
                          border: `1px solid ${experience.color}30`
                        }
                      }}
                      onClick={() => toggleExpand(experience.id)}
                    >
                      {/* Color accent */}
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          height: 4,
                          background: `linear-gradient(90deg, ${experience.color}, ${experience.color}80)`
                        }}
                      />

                      {/* Header */}
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <Box>
                          <Typography
                            variant="h5"
                            sx={{
                              fontWeight: 700,
                              color: '#1a1a2e',
                              mb: 0.5
                            }}
                          >
                            {experience.role}
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                              <Business sx={{ fontSize: 18, color: experience.color }} />
                              <Typography variant="subtitle1" sx={{ fontWeight: 600, color: experience.color }}>
                                {experience.company}
                              </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                              <CalendarToday sx={{ fontSize: 16, color: 'text.secondary' }} />
                              <Typography variant="body2" color="text.secondary">
                                {experience.period}
                              </Typography>
                            </Box>
                          </Box>
                        </Box>
                        <IconButton size="small" sx={{ color: experience.color }}>
                          {expandedId === experience.id ? <ExpandLess /> : <ExpandMore />}
                        </IconButton>
                      </Box>

                      {/* Expandable content */}
                      <Collapse in={expandedId === experience.id} timeout={500}>
                        <Box sx={{ mt: 3 }}>
                          {experience.projects.map((project, projectIndex) => (
                            <Box 
                              key={project.title} 
                              sx={{ 
                                mt: projectIndex > 0 ? 4 : 0,
                                pt: projectIndex > 0 ? 3 : 0,
                                borderTop: projectIndex > 0 ? '1px dashed rgba(0,0,0,0.1)' : 'none'
                              }}
                            >
                              <Typography
                                variant="h6"
                                sx={{
                                  fontWeight: 700,
                                  color: '#1a1a2e',
                                  mb: 1,
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: 1
                                }}
                              >
                                <Box
                                  sx={{
                                    width: 8,
                                    height: 8,
                                    borderRadius: '50%',
                                    background: experience.color
                                  }}
                                />
                                {project.title}
                              </Typography>

                              <Typography
                                variant="body2"
                                sx={{
                                  color: 'text.secondary',
                                  mb: 2,
                                  pl: 2,
                                  borderLeft: `2px solid ${experience.color}30`,
                                  fontStyle: 'italic'
                                }}
                              >
                                {project.systemContext}
                              </Typography>

                              {/* Highlights */}
                              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                                {project.highlights.map((highlight, i) => (
                                  <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                  >
                                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                                      <CheckCircle
                                        sx={{
                                          fontSize: 18,
                                          color: experience.color,
                                          mt: 0.3,
                                          flexShrink: 0
                                        }}
                                      />
                                      <Typography variant="body2" sx={{ lineHeight: 1.7, color: '#4a4a4a' }}>
                                        {highlight}
                                      </Typography>
                                    </Box>
                                  </motion.div>
                                ))}
                              </Box>

                              {/* Tech stack */}
                              <Box sx={{ mt: 3, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                {project.techStack.split(',').map((tech) => (
                                  <motion.div
                                    key={tech}
                                    whileHover={{ scale: 1.05 }}
                                  >
                                    <Chip
                                      label={tech.trim()}
                                      size="small"
                                      sx={{
                                        background: `${experience.color}15`,
                                        color: experience.color,
                                        fontWeight: 600,
                                        border: `1px solid ${experience.color}30`,
                                        '&:hover': {
                                          background: experience.color,
                                          color: 'white'
                                        }
                                      }}
                                    />
                                  </motion.div>
                                ))}
                              </Box>
                            </Box>
                          ))}
                        </Box>
                      </Collapse>

                      {/* Collapsed preview */}
                      {expandedId !== experience.id && (
                        <Box sx={{ mt: 2 }}>
                          <Typography variant="body2" color="text.secondary">
                            {experience.projects.length} project{experience.projects.length > 1 ? 's' : ''} • Click to expand
                          </Typography>
                          <Box sx={{ mt: 1.5, display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {experience.projects[0].techStack.split(',').slice(0, 5).map((tech) => (
                              <Chip
                                key={tech}
                                label={tech.trim()}
                                size="small"
                                variant="outlined"
                                sx={{ fontSize: '0.7rem', height: 24 }}
                              />
                            ))}
                          </Box>
                        </Box>
                      )}
                    </Box>
                  </motion.div>
                </Box>
              </Box>
            </motion.div>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default Experience;
