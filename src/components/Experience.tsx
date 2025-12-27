import React from 'react';
import { Box, Chip, Container, Divider, Paper, Typography } from '@mui/material';
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot, TimelineOppositeContent } from '@mui/lab';
import { BusinessCenter, Code } from '@mui/icons-material';

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
}

const experiences: ExperienceItem[] = [
  {
    id: 1,
    company: 'MEDICIA',
    period: '1/2025 - Now',
    role: 'Fullstack Developer',
    projects: [
      {
        title: 'NUHS Care Plan System',
        systemContext:
          'Hospital-wide care plan platform for National University Hospital Singapore, serving 1,000+ clinical users.',
        highlights: [
          'Designed and built core backend services for a hospital-scale care plan system enabling clinicians to manage patient treatments, medications, appointments, and symptoms.',
          'Solved complex system integration challenges between hospital EMR systems, internal admin portals, and patient-facing PWA through modular Spring Boot microservices and standardized data contracts.',
          'Implemented secure and auditable workflows, including authentication, authorization, and activity logging, to meet healthcare compliance and traceability requirements.',
          'Improved performance and scalability via service separation, query optimization, and reusable pagination/search abstractions, supporting thousands of daily clinical operations.',
          'Enabled faster clinical workflows and improved UX by delivering reliable APIs for real-time patient data access, reducing manual handling and operational friction for medical staff.'
        ],
        techStack: 'Java, Spring Boot, Microservices, SQL, REST APIs'
      },
      {
        title: 'Savanna Healthcare Platform',
        systemContext:
          'Multi-tenant telepharmacy & care management platform deployed to 3 healthcare organizations.',
        highlights: [
          'Architected and built a modular, healthcare platform enabling multi-organization deployment with centralized governance and tenant isolation.',
          'Designed backend APIs and core workflows for telepharmacy operations, covering medication orders, dispensing, patient profiles, appointments, symptoms, and treatment content.',
          'Led development of the Careplan Portal, the operational backbone for pharmacists and healthcare staff, ensuring consistency, auditability, and regulatory alignment across tenants.',
          'Built patient-facing applications (Savanna, Haven, Tracker) supporting medication adherence, reminders, pickup scheduling, and symptom tracking to enable continuous care outside clinics.',
          'Improved scalability and performance by introducing Redis caching for high-read datasets, reducing backend load and improving API responsiveness.',
          'Containerized backend services with Docker, enabling consistent deployments and faster onboarding of new partner organizations.',
          'Collaborated cross-functionally with product managers, healthcare stakeholders, and engineers to translate complex domain requirements into maintainable system designs.'
        ],
        techStack: 'Node.js (Fastify), Vue.js, Redis, Docker, SQL'
      }
    ]
  },
  {
    id: 2,
    company: 'Self-employed',
    period: '2023 - Present',
    role: 'Freelance Web & Backend Developer',
    projects: [
      {
        title: 'Freelance Web & Backend Developer',
        systemContext:
          'Delivered full-stack web applications and backend services for various clients across multiple technology stacks.',
        highlights: [
          'Developed full-stack web applications using React, Vue, JavaScript, and TypeScript for frontend development.',
          'Built RESTful APIs and backend services using Node.js with Express framework.',
          'Created enterprise applications with Java Spring Boot for business clients.',
          'Implemented web solutions using ASP.NET Core and Entity Framework for various projects.',
          'Worked with SQL and NoSQL databases including MySQL, MongoDB, and SQL Server.',
          'Provided maintenance and debugging services for existing applications across multiple technology stacks.'
        ],
        techStack:
          'React, Vue, JavaScript, TypeScript, Node.js, Express.js, Java, Spring Boot, ASP.NET Core, Entity Framework, MySQL, MongoDB, SQL Server'
      }
    ]
  },
  {
    id: 3,
    company: 'VNPT-IT',
    period: '6/2023 - 6/2024',
    role: 'Fresher Java Backend Developer',
    projects: [
      {
        title: 'Hospital Management Information System (HMIS)',
        systemContext:
          'National-scale Hospital Management Information System deployed across all hospitals and local health stations nationwide.',
        highlights: [
          'Engineered core backend modules for a large-scale HMIS using Spring Framework and Oracle, supporting day-to-day clinical and administrative operations.',
          'Built the Pharmacy module to manage pharmaceutical inventory, prescriptions, and drug dispensing workflows at scale.',
          'Implemented the Vaccination module to track immunization records and schedules, supporting longitudinal patient history.',
          'Ensured system stability and performance by maintaining legacy components and optimizing SQL queries for high-volume transactional workloads.'
        ],
        techStack: 'Java, Spring Framework, Oracle, SQL'
      }
    ]
  }
];

const Experience: React.FC = () => {
  return (
    <Box
      id="experience"
      sx={{
        py: 8,
        bgcolor: '#f5f7fa',
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
         WORK EXPERIENCE
        </Typography>

        <Timeline position="alternate" sx={{ p: 0 }}>
          {experiences.map((experience, index) => (
            <TimelineItem key={experience.id}>
              <TimelineOppositeContent
                sx={{ m: 'auto 0' }}
                align={index % 2 === 0 ? 'right' : 'left'}
                variant="body2"
                color="text.secondary"
              >
                <Typography variant="subtitle2" fontWeight="bold" color="primary">
                  {experience.period}
                </Typography>
                <Typography variant="body2">{experience.company}</Typography>
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineConnector sx={{ bgcolor: 'primary.light' }} />
                <TimelineDot color="primary" variant="outlined">
                  {index === 0 ? <Code /> : <BusinessCenter />}
                </TimelineDot>
                <TimelineConnector sx={{ bgcolor: 'primary.light' }} />
              </TimelineSeparator>
              <TimelineContent sx={{ py: '12px', px: 2 }}>
                <Paper
                  elevation={3}
                  sx={{
                    p: 3,
                    borderRadius: 2,
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: 6,
                    },
                  }}
                  className="hover:shadow-lg"
                >
                  <Typography variant="h6" component="h3" fontWeight="bold">
                    {experience.role}
                  </Typography>

                  <Box sx={{ mt: 2 }}>
                    {experience.projects.map((project, projectIndex) => (
                      <Box key={project.title} sx={{ mt: projectIndex === 0 ? 0 : 2.5 }}>
                        {projectIndex !== 0 && <Divider sx={{ my: 2 }} />}

                        <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 0.5 }}>
                          {project.title}
                        </Typography>

                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5, lineHeight: 1.6 }}>
                          <Box component="span" sx={{ fontWeight: 700 }}>
                            System context:{' '}
                          </Box>
                          {project.systemContext}
                        </Typography>

                        {project.highlights.map((desc, i) => (
                          <Box key={`${project.title}-${i}`} sx={{ display: 'flex', alignItems: 'flex-start', mt: 1 }}>
                            <Box
                              sx={{
                                width: 8,
                                height: 8,
                                borderRadius: '50%',
                                bgcolor: 'primary.main',
                                mt: 1,
                                mr: 1.5,
                                flexShrink: 0,
                              }}
                            />
                            <Typography variant="body2" sx={{ lineHeight: 1.7 }}>
                              {desc}
                            </Typography>
                          </Box>
                        ))}

                        <Box sx={{ mt: 1.75, display: 'flex', flexWrap: 'wrap', gap: 1, alignItems: 'center' }}>
                          <Typography variant="body2" sx={{ fontWeight: 700 }}>
                            Tech stack:
                          </Typography>
                          {project.techStack
                            .split(',')
                            .map((t) => t.trim())
                            .filter(Boolean)
                            .map((tech) => (
                              <Chip key={`${project.title}-${tech}`} label={tech} size="small" />
                            ))}
                        </Box>
                      </Box>
                    ))}
                  </Box>
                </Paper>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </Container>
    </Box>
  );
};

export default Experience;