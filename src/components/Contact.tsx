import React, { useState } from 'react';
import { Box, Container, Typography, TextField, Button, Paper, Alert, Snackbar } from '@mui/material';
import Grid from '@mui/material/Grid';
import { Send, Email, Phone, LocationOn, LinkedIn, GitHub } from '@mui/icons-material';
import { motion } from 'framer-motion';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState({
    name: false,
    email: false,
    message: false,
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: false,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    const newErrors = {
      name: formData.name.trim() === '',
      email: !/^\S+@\S+\.\S+$/.test(formData.email),
      message: formData.message.trim() === '',
    };

    setErrors(newErrors);

    // If no errors, submit form
    if (!Object.values(newErrors).some((error) => error)) {
      // In a real application, you would send the form data to your server or a form service
      console.log('Form submitted:', formData);
      
      // Show success message
      setSnackbar({
        open: true,
        message: 'Your message has been sent successfully!',
        severity: 'success',
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    } else {
      // Show error message
      setSnackbar({
        open: true,
        message: 'Please fill in all required fields.',
        severity: 'error',
      });
    }
  };

  const handleSnackbarClose = () => {
    setSnackbar((prev) => ({
      ...prev,
      open: false,
    }));
  };

  return (
    <Box
      id="contact"
      sx={{
        py: 8,
        bgcolor: '#f8f9fa',
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
          Contact
        </Typography>

        <Grid container spacing={6}>
          <Grid
            size={{
              xs: 12,
              md: 5
            }}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Typography variant="h5" gutterBottom fontWeight="medium">
                Contact Information
              </Typography>
              <Typography variant="body1" paragraph color="text.secondary">
                Please contact me if you have any questions or would like to discuss collaboration opportunities.
              </Typography>

              <Box sx={{ mt: 4 }}>
                <Box sx={{ display: 'flex', mb: 3 }}>
                  <Box
                    component={motion.div}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    sx={{
                      mr: 2,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      bgcolor: 'primary.main',
                      color: 'white',
                      flexShrink: 0,
                    }}
                  >
                    <Email />
                  </Box>
                  <Box>
                    <Typography variant="subtitle1" fontWeight="bold">
                      Email
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      lthang.forwork@gmail.com
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', mb: 3 }}>
                  <Box
                    component={motion.div}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    sx={{
                      mr: 2,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      bgcolor: 'primary.main',
                      color: 'white',
                      flexShrink: 0,
                    }}
                  >
                    <Phone />
                  </Box>
                  <Box>
                    <Typography variant="subtitle1" fontWeight="bold">
                      Phone
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      0834398268
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', mb: 3 }}>
                  <Box
                    component={motion.div}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    sx={{
                      mr: 2,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      bgcolor: 'primary.main',
                      color: 'white',
                      flexShrink: 0,
                    }}
                  >
                    <LocationOn />
                  </Box>
                  <Box>
                    <Typography variant="subtitle1" fontWeight="bold">
                      Address
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Cau Giay, Hanoi
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
                <Button
                  component={motion.a}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  variant="contained"
                  color="primary"
                  sx={{ 
                    borderRadius: '50%', 
                    minWidth: 0, 
                    width: 50, 
                    height: 50,
                    boxShadow: '0 4px 10px rgba(25, 118, 210, 0.5)'
                  }}
                  href="https://www.linkedin.com/in/l%C3%AA-th%E1%BA%AFng-249162302/"
                  target="_blank"
                >
                  <LinkedIn />
                </Button>
                <Button
                  component={motion.a}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  variant="contained"
                  color="primary"
                  sx={{ 
                    borderRadius: '50%', 
                    minWidth: 0, 
                    width: 50, 
                    height: 50,
                    boxShadow: '0 4px 10px rgba(25, 118, 210, 0.5)'
                  }}
                  href="https://github.com/lethangd"
                  target="_blank"
                >
                  <GitHub />
                </Button>
              </Box>
            </motion.div>
          </Grid>

          <Grid
            size={{
              xs: 12,
              md: 7
            }}>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Paper 
                elevation={3} 
                sx={{ 
                  p: 4, 
                  borderRadius: 4,
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-10px)',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
                  }
                }}
              >
                <Typography variant="h5" gutterBottom fontWeight="medium">
                  Send Message
                </Typography>
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={3}>
                    <Grid
                      size={{
                        xs: 12,
                        sm: 6
                      }}>
                      <TextField
                        fullWidth
                        label="Full Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        error={errors.name}
                        helperText={errors.name ? 'Please enter your name' : ''}
                        required
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            '&:hover fieldset': {
                              borderColor: 'primary.main',
                            },
                          }
                        }}
                      />
                    </Grid>
                    <Grid
                      size={{
                        xs: 12,
                        sm: 6
                      }}>
                      <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        error={errors.email}
                        helperText={errors.email ? 'Please enter a valid email' : ''}
                        required
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            '&:hover fieldset': {
                              borderColor: 'primary.main',
                            },
                          }
                        }}
                      />
                    </Grid>
                    <Grid size={12}>
                      <TextField
                        fullWidth
                        label="Subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            '&:hover fieldset': {
                              borderColor: 'primary.main',
                            },
                          }
                        }}
                      />
                    </Grid>
                    <Grid size={12}>
                      <TextField
                        fullWidth
                        label="Message"
                        name="message"
                        multiline
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        error={errors.message}
                        helperText={errors.message ? 'Please enter your message' : ''}
                        required
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            '&:hover fieldset': {
                              borderColor: 'primary.main',
                            },
                          }
                        }}
                      />
                    </Grid>
                    <Grid size={12}>
                      <Button
                        component={motion.button}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        type="submit"
                        variant="contained"
                        color="primary"
                        size="large"
                        startIcon={<Send />}
                        fullWidth
                        sx={{ 
                          py: 1.5, 
                          borderRadius: 2,
                          backgroundImage: 'linear-gradient(90deg, #1976d2 0%, #2196f3 100%)',
                          boxShadow: '0 4px 15px rgba(25, 118, 210, 0.4)',
                          transition: 'all 0.3s ease',
                        }}
                      >
                        Send Message
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </Paper>
            </motion.div>
          </Grid>
        </Grid>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: '100%' }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default Contact;