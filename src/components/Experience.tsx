import React from 'react';
import { Box, Container, Typography, Grid, Paper } from '@mui/material';
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot, TimelineOppositeContent } from '@mui/lab';
import { WorkOutline, BusinessCenter, Code, Laptop } from '@mui/icons-material';

interface ExperienceItem {
  id: number;
  title: string;
  company: string;
  period: string;
  description: string[];
  logo?: string;
}

const experiences: ExperienceItem[] = [
  {
    id: 1,
    title: 'Freelance Web & Backend Developer',
    company: 'Self-employed',
    period: '2023 - Present',
    description: [
      'Developed full-stack web applications using React, Vue, JavaScript, and TypeScript for frontend development.',
      'Built RESTful APIs and backend services using Node.js with Express framework.',
      'Created enterprise applications with Java Spring Boot for business clients.',
      'Implemented web solutions using ASP.NET Core and Entity Framework for various projects.',
      'Worked with SQL and NoSQL databases including MySQL, MongoDB, and SQL Server.',
      'Provided maintenance and debugging services for existing applications across multiple technology stacks.'
    ],
  },
  {
    id: 2,
    title: 'Fresher Java Backend Developer',
    company: 'VNPT-IT',
    period: '6/2023 - 6/2024',
    description: [
      'Participated in developing and maintaining the Hospital Management Information System (HMIS) used in local hospitals and health centers.',
      'Worked with Spring framework to maintain and improve backend systems for enterprise applications.',
      'Supported development and debugging of Java-based applications using Spring, JSP, and Oracle.',
      'Participated in sprint planning meetings and code reviews with the development team.'
    ],
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
                    {experience.title}
                  </Typography>
                  <Box sx={{ mt: 2 }}>
                    {experience.description.map((desc, i) => (
                      <Box key={i} sx={{ display: 'flex', alignItems: 'flex-start', mt: 1 }}>
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
                        <Typography variant="body2">{desc}</Typography>
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