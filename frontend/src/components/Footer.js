import React from "react";
import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        bgcolor: "rgba(0, 0, 0, 0.5)",
        color: "white",
        p: 2,
        mt: "auto",
        backdropFilter: "blur(10px)",
      }}
    >
      <Typography variant="body1" align="center">
        © 2023 Quotes Dashboard. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
