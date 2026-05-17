import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Chip, 
  Dialog, 
  DialogContent, 
  IconButton,
  Button
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  GitHub, 
  Launch, 
  Close, 
  CalendarToday, 
  Group, 
  Person,
  ArrowForward
} from '@mui/icons-material';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  githubLink?: string;
  demoLink?: string;
  teamSize?: number;
  role?: string;
  technologies?: string;
  responsibilities?: string[];
  period?: string;
  featured?: boolean;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'VietNamAI.store',
    description: 'Delivered a production-ready AI chatbot commerce platform for a real client in Vietnam, covering both customer-facing sales pages and internal operations.',
    image: `${process.env.PUBLIC_URL}/vietnamai.png`,
    period: '3/2026 - 4/2026',
    teamSize: 1,
    role: 'Fullstack Developer',
    technologies: 'Next.js, TypeScript, TailwindCSS, Supabase, CI/CD',
    tags: ['Next.js', 'TypeScript', 'TailwindCSS', 'Supabase', 'CI/CD'],
    demoLink: 'https://vietnamai.store',
    featured: true,
    responsibilities: [
      'Built product catalog management, order tracking, and role-based admin/staff workflows',
      'Implemented secure API patterns, database policies, authentication, and media storage',
      'Optimized responsive UX for lead conversion with clear CTAs and fast page performance',
      'Deployed the system on Vercel and supported handover for live client usage'
    ]
  },
  {
    id: 2,
    title: 'Sports Court Booking System',
    description: 'A sports court booking and management system for players and court owners to book courts, manage courts, find coaches, and manage match pairings.',
    image: `${process.env.PUBLIC_URL}/scrms.png`,
    period: '12/2024 - 03/2025',
    teamSize: 5,
    role: 'Team Leader',
    technologies: 'Microservices, ASP.NET 8, PostgreSQL, Redis, RabbitMQ, Docker, OAuth2, CQRS',
    tags: ['ASP.NET', 'Microservices', 'Docker', 'PostgreSQL', 'Redis'],
    githubLink: 'https://github.com/SCRMS-FPT',
    featured: true,
    responsibilities: [
      'Led the team and architected the microservices architecture',
      'Developed backend services for court booking, payment management, and reporting',
      'Implemented API Gateway using Clean Architecture and CQRS patterns',
      'Applied OAuth2 for secure authentication and authorization'
    ]
  },
  {
    id: 3,
    title: 'E-commerce Platform',
    description: 'A feature-rich e-commerce website with product management, order processing, and secure payment integration.',
    image: `${process.env.PUBLIC_URL}/Real-time E-commerce Website.png`,
    period: '10/2024 - 11/2024',
    teamSize: 2,
    role: 'Team Leader',
    technologies: 'ASP.NET 6, Clean Architecture, CQRS, React, SQL Server',
    tags: ['ASP.NET', 'React', 'CQRS', 'SQL Server'],
    githubLink: 'https://github.com/thanhhdhe/ProjectPRN231.git',
    responsibilities: [
      'Developed APIs for product management and payment integration',
      'Applied CQRS for efficient read/write operations',
      'Built responsive UI using React'
    ]
  },
  {
    id: 4,
    title: 'Real-time E-commerce',
    description: 'Real-time e-commerce with live updates for product availability, cart modifications, and order status using Socket.io.',
    image: `${process.env.PUBLIC_URL}/Real-time E-commerce Website.png`,
    period: '11/2024 - 12/2024',
    teamSize: 1,
    role: 'Fullstack Developer',
    technologies: 'Node.js, React, Express.js, Socket.io, MongoDB',
    tags: ['Node.js', 'React', 'Socket.io', 'MongoDB'],
    githubLink: 'https://github.com/lethangd/be_asm3njs.git',
    demoLink: 'https://lethangd.github.io/admin_asm3njs/',
    responsibilities: [
      'Developed full-stack application with real-time features',
      'Integrated Socket.io for live updates',
      'Built admin dashboard for management'
    ]
  },
  {
    id: 5,
    title: 'Match Maker Website',
    description: 'Dating website with real-time messaging feature using SignalR.',
    image: `${process.env.PUBLIC_URL}/tinder.png`,
    period: '10/2023 - 11/2023',
    teamSize: 2,
    role: 'Team Leader',
    technologies: 'ASP.NET 6, Entity Framework, SignalR, SQL Server',
    tags: ['ASP.NET', 'SignalR', 'Entity Framework'],
    githubLink: 'https://gitlab.com/my-swp-group/matchmaker.git',
    responsibilities: [
      'Developed backend for user profiles and matching logic',
      'Integrated SignalR for real-time chat',
      'Designed database schema for messaging'
    ]
  },
  {
    id: 6,
    title: 'Children Care Website',
    description: 'Children care website with booking and service management system.',
    image: `${process.env.PUBLIC_URL}/ChildrenCare.png`,
    period: '09/2023 - 11/2023',
    teamSize: 5,
    role: 'Team Leader',
    technologies: 'Java Servlet, JDBC, Bootstrap, SQL Server',
    tags: ['Java Servlet', 'JDBC', 'SQL Server'],
    githubLink: 'https://gitlab.com/my-swp-group/swp391-children-care.git',
    responsibilities: [
      'Implemented booking and service management',
      'Managed appointment schedules'
    ]
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
};

const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <Box
      id="projects"
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
          top: '30%',
          left: '-10%',
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(102, 126, 234, 0.1) 0%, transparent 70%)',
          filter: 'blur(60px)'
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '20%',
          right: '-10%',
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(118, 75, 162, 0.1) 0%, transparent 70%)',
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
              PORTFOLIO
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
              Personal Projects
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

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <Grid container spacing={3}>
            {projects.map((project, index) => (
              <Grid 
                key={project.id} 
                size={{ 
                  xs: 12, 
                  sm: 6, 
                  md: project.featured ? 8 : 4,
                  lg: project.featured ? 8 : 4
                }}
              >
                <motion.div
                  variants={cardVariants}
                  onMouseEnter={() => setHoveredId(project.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  whileHover={{ 
                    y: -10,
                    rotateY: 2,
                    rotateX: -2,
                  }}
                  transition={{ duration: 0.3 }}
                  style={{ 
                    height: '100%',
                    perspective: 1000
                  } as React.CSSProperties}
                >
                  <Box
                    sx={{
                      height: 380,
                      borderRadius: 4,
                      position: 'relative',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      background: 'rgba(255, 255, 255, 0.05)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      transition: 'all 0.4s ease',
                      '&:hover': {
                        border: '1px solid rgba(167, 139, 250, 0.3)',
                        boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)'
                      }
                    }}
                    onClick={() => setSelectedProject(project)}
                  >
                    {/* Project Image */}
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        '&::after': {
                          content: '""',
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          background: hoveredId === project.id
                            ? 'linear-gradient(180deg, rgba(15, 12, 41, 0.3) 0%, rgba(15, 12, 41, 0.95) 100%)'
                            : 'linear-gradient(180deg, rgba(15, 12, 41, 0.5) 0%, rgba(15, 12, 41, 0.98) 100%)',
                          transition: 'all 0.4s ease'
                        }
                      }}
                    >
                      <img
                        src={project.image}
                        alt={project.title}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          transition: 'transform 0.4s ease',
                          transform: hoveredId === project.id ? 'scale(1.1)' : 'scale(1)'
                        }}
                      />
                    </Box>

                    {/* Content Overlay */}
                    <Box
                      sx={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        p: 3,
                        zIndex: 2
                      }}
                    >
                      {/* Tags */}
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
                        {project.tags.slice(0, 4).map((tag) => (
                          <Chip
                            key={tag}
                            label={tag}
                            size="small"
                            sx={{
                              background: 'rgba(167, 139, 250, 0.2)',
                              color: '#a78bfa',
                              fontSize: '0.7rem',
                              height: 24,
                              border: '1px solid rgba(167, 139, 250, 0.3)'
                            }}
                          />
                        ))}
                      </Box>

                      {/* Title */}
                      <Typography
                        variant="h5"
                        sx={{
                          fontWeight: 700,
                          color: 'white',
                          mb: 1,
                          fontSize: project.featured ? '1.5rem' : '1.25rem'
                        }}
                      >
                        {project.title}
                      </Typography>

                      {/* Description */}
                      <Typography
                        variant="body2"
                        sx={{
                          color: 'rgba(255,255,255,0.7)',
                          mb: 2,
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden'
                        }}
                      >
                        {project.description}
                      </Typography>

                      {/* Actions */}
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 2,
                          opacity: hoveredId === project.id ? 1 : 0.7,
                          transform: hoveredId === project.id ? 'translateY(0)' : 'translateY(10px)',
                          transition: 'all 0.3s ease'
                        }}
                      >
                        <Button
                          size="small"
                          endIcon={<ArrowForward />}
                          sx={{
                            color: '#a78bfa',
                            fontWeight: 600,
                            '&:hover': {
                              background: 'rgba(167, 139, 250, 0.1)'
                            }
                          }}
                        >
                          View Details
                        </Button>
                        {project.githubLink && (
                          <IconButton
                            size="small"
                            href={project.githubLink}
                            target="_blank"
                            onClick={(e) => e.stopPropagation()}
                            sx={{ 
                              color: 'white',
                              '&:hover': { color: '#a78bfa' }
                            }}
                          >
                            <GitHub />
                          </IconButton>
                        )}
                        {project.demoLink && (
                          <IconButton
                            size="small"
                            href={project.demoLink}
                            target="_blank"
                            onClick={(e) => e.stopPropagation()}
                            sx={{ 
                              color: 'white',
                              '&:hover': { color: '#a78bfa' }
                            }}
                          >
                            <Launch />
                          </IconButton>
                        )}
                      </Box>
                    </Box>

                    {/* Featured badge */}
                    {project.featured && (
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 20,
                          right: 20,
                          px: 2,
                          py: 0.5,
                          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                          borderRadius: 2,
                          zIndex: 3
                        }}
                      >
                        <Typography variant="caption" sx={{ color: 'white', fontWeight: 600 }}>
                          FEATURED
                        </Typography>
                      </Box>
                    )}
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>

        {/* Project Detail Modal */}
        <AnimatePresence>
          {selectedProject && (
            <Dialog
              open={!!selectedProject}
              onClose={() => setSelectedProject(null)}
              maxWidth="md"
              fullWidth
              PaperProps={{
                sx: {
                  background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
                  borderRadius: 4,
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  overflow: 'hidden'
                }
              }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                {/* Close button */}
                <IconButton
                  onClick={() => setSelectedProject(null)}
                  sx={{
                    position: 'absolute',
                    top: 16,
                    right: 16,
                    color: 'white',
                    zIndex: 10,
                    background: 'rgba(255,255,255,0.1)',
                    '&:hover': {
                      background: 'rgba(255,255,255,0.2)'
                    }
                  }}
                >
                  <Close />
                </IconButton>

                <DialogContent 
                  sx={{ 
                    p: 0,
                    maxHeight: { xs: '85vh', md: '90vh' },
                    overflow: 'auto',
                    scrollBehavior: 'smooth',
                    '&::-webkit-scrollbar': {
                      width: '8px',
                    },
                    '&::-webkit-scrollbar-track': {
                      background: 'rgba(255, 255, 255, 0.05)',
                    },
                    '&::-webkit-scrollbar-thumb': {
                      background: 'linear-gradient(180deg, #667eea, #764ba2)',
                      borderRadius: '4px',
                      '&:hover': {
                        background: 'linear-gradient(180deg, #764ba2, #667eea)',
                      }
                    }
                  }}
                >
                  {/* Hero image */}
                  <Box
                    sx={{
                      height: 250,
                      position: 'relative',
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: '50%',
                        background: 'linear-gradient(180deg, transparent, #1a1a2e)'
                      }
                    }}
                  >
                    <img
                      src={selectedProject.image}
                      alt={selectedProject.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                  </Box>

                  <Box sx={{ p: 4, pt: 2 }}>
                    {/* Title */}
                    <Typography
                      variant="h4"
                      sx={{
                        fontWeight: 800,
                        color: 'white',
                        mb: 2
                      }}
                    >
                      {selectedProject.title}
                    </Typography>

                    {/* Meta info */}
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mb: 3 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <CalendarToday sx={{ fontSize: 18, color: '#a78bfa' }} />
                        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                          {selectedProject.period}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Group sx={{ fontSize: 18, color: '#a78bfa' }} />
                        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                          {selectedProject.teamSize} members
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Person sx={{ fontSize: 18, color: '#a78bfa' }} />
                        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                          {selectedProject.role}
                        </Typography>
                      </Box>
                    </Box>

                    {/* Description */}
                    <Typography
                      variant="body1"
                      sx={{ color: 'rgba(255,255,255,0.8)', mb: 3, lineHeight: 1.8 }}
                    >
                      {selectedProject.description}
                    </Typography>

                    {/* Responsibilities */}
                    <Typography
                      variant="h6"
                      sx={{ color: 'white', fontWeight: 700, mb: 2 }}
                    >
                      Key Responsibilities
                    </Typography>
                    <Box sx={{ mb: 4 }}>
                      {selectedProject.responsibilities?.map((resp, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                        >
                          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 1.5 }}>
                            <Box
                              sx={{
                                width: 6,
                                height: 6,
                                borderRadius: '50%',
                                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                                mt: 1,
                                flexShrink: 0
                              }}
                            />
                            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                              {resp}
                            </Typography>
                          </Box>
                        </motion.div>
                      ))}
                    </Box>

                    {/* Technologies */}
                    <Typography
                      variant="h6"
                      sx={{ color: 'white', fontWeight: 700, mb: 2 }}
                    >
                      Technologies Used
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 4 }}>
                      {selectedProject.tags.map((tag) => (
                        <Chip
                          key={tag}
                          label={tag}
                          sx={{
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            color: 'white',
                            fontWeight: 600
                          }}
                        />
                      ))}
                    </Box>

                    {/* Action buttons */}
                    <Box sx={{ display: 'flex', gap: 2 }}>
                      {selectedProject.githubLink && (
                        <Button
                          variant="outlined"
                          startIcon={<GitHub />}
                          href={selectedProject.githubLink}
                          target="_blank"
                          sx={{
                            color: 'white',
                            borderColor: 'rgba(255,255,255,0.3)',
                            '&:hover': {
                              borderColor: '#a78bfa',
                              background: 'rgba(167, 139, 250, 0.1)'
                            }
                          }}
                        >
                          View Code
                        </Button>
                      )}
                      {selectedProject.demoLink && (
                        <Button
                          variant="contained"
                          startIcon={<Launch />}
                          href={selectedProject.demoLink}
                          target="_blank"
                          sx={{
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            '&:hover': {
                              background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)'
                            }
                          }}
                        >
                          Live Demo
                        </Button>
                      )}
                    </Box>
                  </Box>
                </DialogContent>
              </motion.div>
            </Dialog>
          )}
        </AnimatePresence>
      </Container>
    </Box>
  );
};

export default Projects;
