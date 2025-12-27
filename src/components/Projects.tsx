import React, { useState } from 'react';
import { Box, Container, Typography, Card, CardMedia, CardContent, CardActions, Button, Chip, Dialog, DialogTitle, DialogContent, DialogActions, IconButton } from '@mui/material';
import Grid from '@mui/material/Grid';
import { GitHub, Language, Close } from '@mui/icons-material';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  githubLink?: string;
  demoLink?: string;
  fullDescription?: string;
  teamSize?: number;
  role?: string;
  technologies?: string;
  responsibilities?: string[];
  period?: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Sports Court Booking and Management System',
    description: 'A sports court booking and management system for players and court owners to book courts, manage courts, find coaches, and manage match pairings.',
    image: `${process.env.PUBLIC_URL}/scrms.png`,
    period: '12/2024 - 03/2025',
    teamSize: 5,
    role: 'Leader',
    technologies: 'Microservices, ASP.NET 8, PostgreSQL, Redis, RabbitMQ, Docker, OAuth2, CQRS, Vertical Slice Architecture, Clean Architecture',
    tags: ['ASP.NET', 'Microservices', 'CQRS', 'Docker', 'PostgreSQL', 'Redis', 'RabbitMQ'],
    githubLink: 'https://github.com/SCRMS-FPT',
    responsibilities: [
      'Led the team and architected the microservices architecture',
      'Developed backend services for court booking, payment management, and reporting',
      'Integrated court owner features for handling bookings, payments, and reports',
      'Implemented API Gateway using Clean Architecture and CQRS patterns',
      'Applied OAuth2 for secure authentication and authorization'
    ]
  },
  {
    id: 2,
    title: 'E-commerce Platform',
    description: 'A feature-rich e-commerce website that allows users to manage products, place orders, and make payments while ensuring a seamless and secure shopping experience.',
    image: `${process.env.PUBLIC_URL}/Real-time E-commerce Website.png`,
    period: '10/2024 - 11/2024',
    teamSize: 2,
    role: 'Leader',
    technologies: 'ASP.NET 6, Restful API, Clean Architecture, CQRS, Reactjs, Microsoft SQL Server',
    tags: ['ASP.NET', 'RESTful API', 'React', 'CQRS', 'SQL Server', 'Clean Architecture'],
    githubLink: 'https://github.com/thanhhdhe/ProjectPRN231.git',
    responsibilities: [
      'Developed APIs for product management, order processing, and payment integration',
      'Applied CQRS for efficient read/write operations',
      'Implemented Clean Architecture for better separation of concerns',
      'Built responsive UI using React and modern styling techniques'
    ]
  },
  {
    id: 3,
    title: 'Real-time E-commerce Website',
    description: 'Developed a real-time e-commerce website with features such as live updates for product availability, cart modifications, and order status changes using Socket.io for real-time communication.',
    image: `${process.env.PUBLIC_URL}/Real-time E-commerce Website.png`,
    period: '11/2024 - 12/2024',
    teamSize: 1,
    role: 'Fullstack Developer',
    technologies: 'Node.js, React, Express.js, Rest API, Socket.io, MongoDB',
    tags: ['Node.js', 'React', 'Socket.io', 'MongoDB', 'Express.js'],
    githubLink: 'https://github.com/lethangd/be_asm3njs.git',
    demoLink: 'https://lethangd.github.io/admin_asm3njs/',
    responsibilities: [
      'Developed APIs for product management, order processing, and payment integration',
      'Implemented interactive user interface and admin dashboard',
      'Integrated Socket.io for real-time updates',
      'Added MongoDB for flexible data storage and Firebase for authentication'
    ]
  },
  {
    id: 4,
    title: 'Match Maker Website',
    description: 'Dating website with real-time messaging feature',
    image: `${process.env.PUBLIC_URL}/tinder.png`,
    period: '10/2023 - 11/2023',
    teamSize: 2,
    role: 'Leader',
    technologies: 'ASP.NET 6, Entity Framework, SignalR, Ajax, jQuery, JS, HTML, CSS, Bootstrap, Microsoft SQL Server',
    tags: ['ASP.NET', 'SignalR', 'Entity Framework', 'jQuery', 'SQL Server'],
    githubLink: 'https://gitlab.com/my-swp-group/matchmaker.git',
    responsibilities: [
      'Developed backend for user profiles, matching logic, and real-time messaging',
      'Integrated SignalR for real-time chat between users',
      'Designed and implemented SQL Server database schema for user profiles and messaging'
    ]
  },
  {
    id: 5,
    title: 'Children Care Website',
    description: 'Children care website with booking and service management system',
    image: `${process.env.PUBLIC_URL}/ChildrenCare.png`,
    period: '09/2023 - 11/2023',
    teamSize: 5,
    role: 'Leader',
    technologies: 'Java Servlet, JDBC, Ajax, HTML, Bootstrap, CSS, JavaScript, jQuery, Microsoft SQL Server',
    tags: ['Java Servlet', 'JDBC', 'SQL Server', 'Ajax', 'jQuery'],
    githubLink: 'https://gitlab.com/my-swp-group/swp391-children-care.git',
    responsibilities: [
      'Implemented booking and service management system for children care center',
      'Managed appointment schedules and doctor availability'
    ]
  }
];

const Projects: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleClickOpen = (project: Project) => {
    setSelectedProject(project);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box
      id="projects"
      sx={{
        py: 8,
      }}
    >
      <Container maxWidth="lg">
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
         PROJECTS
        </Typography>

        <Grid container spacing={4}>
          {projects.map((project) => (
            <Grid
              key={project.id}
              size={{
                xs: 12,
                sm: 6,
                md: 6,
                lg: 4
              }}>
              <Card 
                sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  borderRadius: 2,
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={project.image}
                  alt={project.title}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h3" fontWeight="medium">
                    {project.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {project.description}
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 2 }}>
                    {project.tags.map((tag) => (
                      <Chip key={tag} label={tag} size="small" color="primary" variant="outlined" sx={{ mr: 0.5, mb: 0.5 }} />
                    ))}
                  </Box>
                </CardContent>
                <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
                  <Button 
                    size="small" 
                    onClick={() => handleClickOpen(project)}
                    variant="contained" 
                    color="primary"
                  >
                    Details
                  </Button>
                  <Box>
                    {project.githubLink && (
                      <IconButton 
                        aria-label="github link" 
                        href={project.githubLink} 
                        target="_blank"
                        color="inherit"
                      >
                        <GitHub />
                      </IconButton>
                    )}
                    {project.demoLink && (
                      <IconButton 
                        aria-label="demo link" 
                        href={project.demoLink} 
                        target="_blank"
                        color="primary"
                      >
                        <Language />
                      </IconButton>
                    )}
                  </Box>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Project Detail Dialog */}
        <Dialog
          open={open}
          onClose={handleClose}
          maxWidth="md"
          fullWidth
        >
          {selectedProject && (
            <>
              <DialogTitle sx={{ pr: 6 }}>
                {selectedProject.title}
                <IconButton
                  aria-label="close"
                  onClick={handleClose}
                  sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                  }}
                >
                  <Close />
                </IconButton>
              </DialogTitle>
              <DialogContent dividers>
                <Grid container spacing={3}>
                  <Grid
                    size={{
                      xs: 12,
                      md: 6
                    }}>
                    <img
                      src={selectedProject.image}
                      alt={selectedProject.title}
                      style={{
                        width: '100%',
                        height: 'auto',
                        borderRadius: '8px',
                      }}
                    />
                    
                    <Box sx={{ mt: 3 }}>
                      <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                        Project Information:
                      </Typography>
                      
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        <strong>Period:</strong> {selectedProject.period}
                      </Typography>
                      
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        <strong>Team size:</strong> {selectedProject.teamSize} members
                      </Typography>
                      
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        <strong>Role:</strong> {selectedProject.role}
                      </Typography>
                      
                      <Typography variant="body2" sx={{ mb: 2 }}>
                        <strong>Technologies:</strong> {selectedProject.technologies}
                      </Typography>
                    </Box>
                  </Grid>
                  
                  <Grid
                    size={{
                      xs: 12,
                      md: 6
                    }}>
                    <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                      Responsibilities:
                    </Typography>
                    
                    <Box sx={{ mb: 3 }}>
                      {selectedProject.responsibilities?.map((resp, idx) => (
                        <Box key={idx} sx={{ display: 'flex', mb: 1.5 }}>
                          <Box
                            sx={{
                              width: 8,
                              height: 8,
                              bgcolor: 'primary.main',
                              borderRadius: '50%',
                              flexShrink: 0,
                              mt: 1,
                              mr: 1.5,
                            }}
                          />
                          <Typography variant="body2">{resp}</Typography>
                        </Box>
                      ))}
                    </Box>
                    
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                        Technologies:
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 1 }}>
                        {selectedProject.tags.map((tag) => (
                          <Chip key={tag} label={tag} color="primary" sx={{ mr: 0.5, mb: 0.5 }} />
                        ))}
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions>
                {selectedProject.githubLink && (
                  <Button 
                    startIcon={<GitHub />} 
                    href={selectedProject.githubLink} 
                    target="_blank"
                    color="inherit"
                  >
                    GitHub
                  </Button>
                )}
                {selectedProject.demoLink && (
                  <Button 
                    startIcon={<Language />} 
                    href={selectedProject.demoLink} 
                    target="_blank"
                    color="primary"
                    variant="contained"
                  >
                    View Demo
                  </Button>
                )}
              </DialogActions>
            </>
          )}
        </Dialog>
      </Container>
    </Box>
  );
};

export default Projects;