import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";

const Header = () => {
  return (
    <AppBar
      position="static"
      sx={{ bgcolor: "rgba(0, 0, 0, 0.5)", backdropFilter: "blur(10px)" }}
    >
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Quotes Dashboard
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
