import React from "react";
import { Typography, Box } from "@mui/material";

const About = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        About Us
      </Typography>
      <Typography variant="body1">
        Welcome to the Quotes Dashboard! Here, you can find inspiring quotes
        from famous authors.
      </Typography>
    </Box>
  );
};

export default About;
