import React from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
} from "@mui/material";

const About = () => {
  const circleData = [
    {
      icon: "🚚", // Replace with your delivery car image or icon
      title: "FREE AND FAST DELIVERY",
      subtitle: "Free delivery for all orders over 300TND",
    },
    {
      icon: "🎧", // Replace with your casque image or icon
      title: "24/7 CUSTOMER SERVICE",
      subtitle: "Friendly 24/7 customer support",
    },
    {
      icon: "🛡️", // Replace with your shield approved image or icon
      title: "MONEY BACK GUARANTEE",
      subtitle: "We return money within 30 days",
    },
  ];

  // Dummy data for team members
  const teamMembers = [
    {
      name: "John Doe",
      role: "CEO & Founder",
      image: "https://via.placeholder.com/150",
      bio: "John is passionate about building innovative solutions that make a difference.",
    },
    {
      name: "Jane Smith",
      role: "Lead Developer",
      image: "https://via.placeholder.com/150",
      bio: "Jane loves coding and solving complex problems with elegant solutions.",
    },
    {
      name: "Alice Johnson",
      role: "Designer",
      image: "https://via.placeholder.com/150",
      bio: "Alice is a creative designer with a keen eye for detail and user experience.",
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Introduction Section */}
      <Box sx={{ textAlign: "center", mb: 6 }}>
        <Typography variant="h2" fontWeight="bold" gutterBottom>
          About Us
        </Typography>
        <Typography variant="h5" color="textSecondary" paragraph>
          We are a team of passionate individuals dedicated to creating
          innovative solutions that make a difference.
        </Typography>
      </Box>

      {/* Mission Statement Section */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Our Mission
        </Typography>
        <Typography variant="body1" color="textSecondary" paragraph>
          Our mission is to empower businesses and individuals through
          cutting-edge technology, exceptional design, and unparalleled customer
          service. We strive to deliver solutions that not only meet but exceed
          expectations.
        </Typography>
      </Box>

      {/* Team Section */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Meet Our Team
        </Typography>
        <Grid container spacing={4}>
          {teamMembers.map((member, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={member.image}
                  alt={member.name}
                />
                <CardContent>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    {member.name}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="textSecondary"
                    gutterBottom
                  >
                    {member.role}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {member.bio}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Values Section */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Our Values
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Innovation
            </Typography>
            <Typography variant="body1" color="textSecondary">
              We constantly push the boundaries of what's possible to deliver
              groundbreaking solutions.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Integrity
            </Typography>
            <Typography variant="body1" color="textSecondary">
              We believe in doing the right thing, even when no one is watching.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Collaboration
            </Typography>
            <Typography variant="body1" color="textSecondary">
              We work together as a team to achieve our goals and support each
              other along the way.
            </Typography>
          </Grid>
        </Grid>
      </Box>

      {/* Call to Action Section */}
      <Box sx={{ textAlign: "center", mb: 6 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Ready to Get Started?
        </Typography>
        <Typography variant="body1" color="textSecondary" paragraph>
          Join us on our journey to create a better future. Let's build
          something amazing together!
        </Typography>
        <a href="mailto:rbk@tunisie.com">
          <Button variant="contained" size="large" color="primary">
            Contact Us
          </Button>
        </a>
      </Box>

      <Grid container spacing={4} justifyContent="center">
        {circleData.map((circle, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              {/* Circle with Icon */}
              <Box
                sx={{
                  width: 90,
                  height: 90,
                  borderRadius: "50%",
                  backgroundColor: "black",
                  border: "2px solid gray",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mb: 2,
                }}
              >
                <Typography variant="h4" sx={{ color: "white" }}>
                  {circle.icon}
                </Typography>
              </Box>

              {/* Title */}
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                {circle.title}
              </Typography>

              {/* Subtitle */}
              <Typography variant="body1" color="textSecondary">
                {circle.subtitle}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default About;
