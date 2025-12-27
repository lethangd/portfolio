import React, { useState } from 'react';
import { Box, Container, Typography, TextField, Button, Alert, Snackbar, IconButton } from '@mui/material';
import Grid from '@mui/material/Grid';
import { Send, Email, Phone, LocationOn, LinkedIn, GitHub, ContentCopy, Check } from '@mui/icons-material';
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

  const [copiedField, setCopiedField] = useState<string | null>(null);

  const contactInfo = [
    { icon: <Email />, label: 'Email', value: 'lthang.forwork@gmail.com', copyable: true },
    { icon: <Phone />, label: 'Phone', value: '0834398268', copyable: true },
    { icon: <LocationOn />, label: 'Location', value: 'Hanoi, Vietnam', copyable: false },
  ];

  const socialLinks = [
    { icon: <LinkedIn />, url: 'https://www.linkedin.com/in/l%C3%AA-th%E1%BA%AFng-249162302/', label: 'LinkedIn' },
    { icon: <GitHub />, url: 'https://github.com/lethangd', label: 'GitHub' },
  ];

  const handleCopy = async (value: string, field: string) => {
    await navigator.clipboard.writeText(value);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: false }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = {
      name: formData.name.trim() === '',
      email: !/^\S+@\S+\.\S+$/.test(formData.email),
      message: formData.message.trim() === '',
    };
    setErrors(newErrors);

    if (!Object.values(newErrors).some((error) => error)) {
      console.log('Form submitted:', formData);
      setSnackbar({ open: true, message: 'Your message has been sent successfully!', severity: 'success' });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } else {
      setSnackbar({ open: true, message: 'Please fill in all required fields.', severity: 'error' });
    }
  };

  return (
    <Box
      id="contact"
      sx={{
        py: { xs: 8, md: 12 },
        background: 'linear-gradient(180deg, #1e293b 0%, #0f172a 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background decorations */}
      <Box
        sx={{
          position: 'absolute',
          top: '20%',
          left: '-10%',
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(102, 126, 234, 0.08) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '-10%',
          right: '-5%',
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(118, 75, 162, 0.1) 0%, transparent 70%)',
          filter: 'blur(80px)',
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
              sx={{ color: '#667eea', letterSpacing: 4, fontSize: '0.9rem', fontWeight: 600 }}
            >
              Get In Touch
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
              Contact Me
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

        <Grid container spacing={6}>
          {/* Left Side - Contact Info */}
          <Grid size={{ xs: 12, md: 5 }}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#fff', mb: 2 }}>
                Let&apos;s Work Together
              </Typography>
              <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.6)', mb: 4, lineHeight: 1.8 }}>
                I&apos;m always interested in hearing about new opportunities and projects. 
                Feel free to reach out if you&apos;d like to collaborate!
              </Typography>

              {/* Contact Info Cards */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 4 }}>
                {contactInfo.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    whileHover={{ x: 8, transition: { duration: 0.2 } }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 3,
                        p: 2.5,
                        borderRadius: 3,
                        background: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          background: 'rgba(102, 126, 234, 0.1)',
                          borderColor: 'rgba(102, 126, 234, 0.3)',
                        },
                      }}
                    >
                      <Box
                        sx={{
                          width: 50,
                          height: 50,
                          borderRadius: 2,
                          background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.2), rgba(118, 75, 162, 0.2))',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#667eea',
                        }}
                      >
                        {item.icon}
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: 1 }}>
                          {item.label}
                        </Typography>
                        <Typography variant="body1" sx={{ color: '#fff', fontWeight: 500 }}>
                          {item.value}
                        </Typography>
                      </Box>
                      {item.copyable && (
                        <IconButton
                          onClick={() => handleCopy(item.value, item.label)}
                          sx={{
                            color: copiedField === item.label ? '#4ade80' : 'rgba(255,255,255,0.5)',
                            '&:hover': { color: '#667eea' },
                          }}
                        >
                          {copiedField === item.label ? <Check /> : <ContentCopy fontSize="small" />}
                        </IconButton>
                      )}
                    </Box>
                  </motion.div>
                ))}
              </Box>

              {/* Social Links */}
              <Box sx={{ display: 'flex', gap: 2 }}>
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.1, type: 'spring' }}
                    whileHover={{ scale: 1.1, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    style={{ textDecoration: 'none' } as React.CSSProperties}
                  >
                    <Box
                      sx={{
                        width: 55,
                        height: 55,
                        borderRadius: 3,
                        background: 'linear-gradient(135deg, #667eea, #764ba2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#fff',
                        boxShadow: '0 4px 20px rgba(102, 126, 234, 0.4)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          boxShadow: '0 8px 30px rgba(102, 126, 234, 0.6)',
                        },
                      }}
                    >
                      {social.icon}
                    </Box>
                  </motion.a>
                ))}
              </Box>
            </motion.div>
          </Grid>

          {/* Right Side - Contact Form */}
          <Grid size={{ xs: 12, md: 7 }}>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Box
                sx={{
                  p: { xs: 3, md: 5 },
                  borderRadius: 4,
                  background: 'rgba(255, 255, 255, 0.03)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Top gradient bar */}
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

                <Typography variant="h5" sx={{ fontWeight: 700, color: '#fff', mb: 4 }}>
                  Send a Message
                </Typography>

                <form onSubmit={handleSubmit}>
                  <Grid container spacing={3}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        fullWidth
                        label="Your Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        error={errors.name}
                        helperText={errors.name ? 'Please enter your name' : ''}
                        required
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            color: '#fff',
                            '& fieldset': { borderColor: 'rgba(255,255,255,0.2)' },
                            '&:hover fieldset': { borderColor: 'rgba(102, 126, 234, 0.5)' },
                            '&.Mui-focused fieldset': { borderColor: '#667eea' },
                          },
                          '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.5)' },
                          '& .MuiInputLabel-root.Mui-focused': { color: '#667eea' },
                        }}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        fullWidth
                        label="Your Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        error={errors.email}
                        helperText={errors.email ? 'Please enter a valid email' : ''}
                        required
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            color: '#fff',
                            '& fieldset': { borderColor: 'rgba(255,255,255,0.2)' },
                            '&:hover fieldset': { borderColor: 'rgba(102, 126, 234, 0.5)' },
                            '&.Mui-focused fieldset': { borderColor: '#667eea' },
                          },
                          '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.5)' },
                          '& .MuiInputLabel-root.Mui-focused': { color: '#667eea' },
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
                            color: '#fff',
                            '& fieldset': { borderColor: 'rgba(255,255,255,0.2)' },
                            '&:hover fieldset': { borderColor: 'rgba(102, 126, 234, 0.5)' },
                            '&.Mui-focused fieldset': { borderColor: '#667eea' },
                          },
                          '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.5)' },
                          '& .MuiInputLabel-root.Mui-focused': { color: '#667eea' },
                        }}
                      />
                    </Grid>
                    <Grid size={12}>
                      <TextField
                        fullWidth
                        label="Your Message"
                        name="message"
                        multiline
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        error={errors.message}
                        helperText={errors.message ? 'Please enter your message' : ''}
                        required
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            color: '#fff',
                            '& fieldset': { borderColor: 'rgba(255,255,255,0.2)' },
                            '&:hover fieldset': { borderColor: 'rgba(102, 126, 234, 0.5)' },
                            '&.Mui-focused fieldset': { borderColor: '#667eea' },
                          },
                          '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.5)' },
                          '& .MuiInputLabel-root.Mui-focused': { color: '#667eea' },
                        }}
                      />
                    </Grid>
                    <Grid size={12}>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button
                          type="submit"
                          variant="contained"
                          size="large"
                          startIcon={<Send />}
                          fullWidth
                          sx={{
                            py: 2,
                            borderRadius: 3,
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            boxShadow: '0 4px 20px rgba(102, 126, 234, 0.4)',
                            textTransform: 'none',
                            fontWeight: 600,
                            fontSize: '1.1rem',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                              background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
                              boxShadow: '0 8px 30px rgba(102, 126, 234, 0.6)',
                            },
                          }}
                        >
                          Send Message
                        </Button>
                      </motion.div>
                    </Grid>
                  </Grid>
                </form>
              </Box>
            </motion.div>
          </Grid>
        </Grid>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert
            onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
            severity={snackbar.severity}
            sx={{
              background: snackbar.severity === 'success' 
                ? 'linear-gradient(135deg, rgba(74, 222, 128, 0.9), rgba(34, 197, 94, 0.9))' 
                : 'linear-gradient(135deg, rgba(248, 113, 113, 0.9), rgba(239, 68, 68, 0.9))',
              color: '#fff',
              '& .MuiAlert-icon': { color: '#fff' },
            }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default Contact;
