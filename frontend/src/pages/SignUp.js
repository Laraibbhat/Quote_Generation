import React from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Grid,
  Paper,
} from "@mui/material";
import { motion } from "framer-motion";
// import GoogleLoginButton from "../components/GoogleLoginButton";
// import FacebookLoginButton from "../components/FacebookLoginButton";

const SignUp = () => {
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
            <Typography variant="h4" align="center" gutterBottom>
              Sign Up
            </Typography>
            <TextField
              fullWidth
              label="Name"
              margin="normal"
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Email"
              margin="normal"
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              margin="normal"
              variant="outlined"
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
            >
              Sign Up
            </Button>
            <Typography variant="body2" align="center" sx={{ mt: 2 }}>
              Or sign up with
            </Typography>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12} sm={6}>
                {/* <GoogleLoginButton /> */}
              </Grid>
              <Grid item xs={12} sm={6}>
                {/* <FacebookLoginButton /> */}
              </Grid>
            </Grid>
          </Paper>
        </motion.div>
      </Box>
    </Container>
  );
};

export default SignUp;
