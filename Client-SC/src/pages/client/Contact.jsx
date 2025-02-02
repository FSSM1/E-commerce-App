import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  Container,
  Link,
} from "@mui/material";
import axios from "axios";

const Contact = () => {
  // State for the contact form
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submissionStatus, setSubmissionStatus] = useState("");

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form fields
    if (!name || !email || !message) {
      setSubmissionStatus("Please fill out all fields.");
      return;
    }

    // Simulate API call to submit the form
    try {
      await axios.post("http://localhost:3000/api/messages/add", {
        name,
        email,
        message,
      });
      setSubmissionStatus("Message sent successfully!");
      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      setSubmissionStatus("Failed to send message. Please try again.");
      console.error("Error submitting form:", error);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h3" fontWeight="bold" align="center" gutterBottom>
        Contact Us
      </Typography>
      <Typography
        variant="subtitle1"
        align="center"
        color="textSecondary"
        paragraph
      >
        We'd love to hear from you! Reach out to us for any questions or
        feedback.
      </Typography>

      <Grid container spacing={4}>
        {/* Contact Form */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Send Us a Message
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Your Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Your Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                margin="normal"
                multiline
                rows={4}
                required
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
              >
                Send Message
              </Button>
              {submissionStatus && (
                <Typography
                  variant="body2"
                  color={
                    submissionStatus.includes("success")
                      ? "success.main"
                      : "error.main"
                  }
                  sx={{ mt: 2 }}
                >
                  {submissionStatus}
                </Typography>
              )}
            </form>
          </Paper>
        </Grid>

        {/* Contact Information and Google Maps Embed */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Our Location
            </Typography>
            <Box sx={{ height: "300px", mb: 3 }}>
              <iframe
                title="Google Maps Location"
                width="100%"
                height="100%"
                frameBorder="0"
                style={{ border: 0 }}
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3190.8325953177964!2d10.184213875531588!3d36.894352862387024!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12e2cb32a574f131%3A0x736d6f5853a1bd2e!2sReBootKamp%20(RBK%20Tunis)!5e0!3m2!1sfr!2stn!4v1738525086311!5m2!1sfr!2stn"
                allowFullScreen
              ></iframe>
            </Box>
            <Typography variant="body1" gutterBottom>
              <strong>Address:</strong> Technopark Elghazela, B24, Ariana 2088
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Phone:</strong>{" "}
              <Link href="tel:+21671858585">71858585</Link>
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Email:</strong>{" "}
              <Link href="mailto:rbk@tunisie.com">rbk@tunisie.com</Link>
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Contact;
