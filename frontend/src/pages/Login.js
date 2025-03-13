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

console.log("The Backedn URl", process.env.REACT_APP_API_URL);
const Login = () => {
  const googleAuth = () => {
    window.open(`${process.env.REACT_APP_API_URL}/auth/google`, "_self");
  };
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
              Login
            </Typography>
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
              Login
            </Button>
            <Typography variant="body2" align="center" sx={{ mt: 2 }}>
              Or login with
            </Typography>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12} sm={6}>
                {/* <GoogleLoginButton /> */}
                <Button
                  variant="outlined"
                  style={{ fontWeight: 700 }}
                  onClick={googleAuth}
                >
                  Sign In With Google
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                {/* <FacebookLoginButton /> */}
                <Button variant="contained" style={{ fontWeight: 700 }}>
                  Sign In With Facebook
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </motion.div>
      </Box>
    </Container>
  );
};

export default Login;
