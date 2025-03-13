import React, { useState } from "react";
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
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  // State for form inputs
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle login submission
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
          credentials: "include", // Ensure cookies are sent
        }
      );

      const data = await response.json();
      console.log("Login response:", data);

      if (response.ok) {
        // Redirect user or save token/session
        if (data.token) {
          localStorage.setItem("authToken", data.token);
        }
        navigate("/");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  // Google authentication
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
          <Paper
            elevation={5}
            sx={{
              p: 4,
              borderRadius: 3,
              background: "linear-gradient(135deg, #ece9e6, #ffffff)",
              boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)",
            }}
          >
            <Typography
              variant="h4"
              align="center"
              gutterBottom
              sx={{ fontWeight: "bold", color: "#333" }}
            >
              Login
            </Typography>

            <form onSubmit={handleLogin}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                margin="normal"
                variant="outlined"
                required
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&:hover fieldset": { borderColor: "#007BFF" },
                    "&.Mui-focused fieldset": { borderColor: "#007BFF" },
                  },
                }}
              />
              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                margin="normal"
                variant="outlined"
                required
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&:hover fieldset": { borderColor: "#007BFF" },
                    "&.Mui-focused fieldset": { borderColor: "#007BFF" },
                  },
                }}
              />

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  type="submit"
                  sx={{
                    mt: 2,
                    py: 1.2,
                    fontWeight: "bold",
                    backgroundColor: "#007BFF",
                    "&:hover": { backgroundColor: "#0056b3" },
                  }}
                >
                  Login
                </Button>
              </motion.div>
            </form>

            {/* Sign Up Link */}
            <Typography variant="body2" align="center" sx={{ mt: 2 }}>
              Don't have an account?{" "}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  background: "none",
                  border: "none",
                  color: "#007BFF",
                  fontWeight: "bold",
                  cursor: "pointer",
                  textDecoration: "none",
                }}
                onClick={() => navigate("/signup")}
              >
                Sign up here
              </motion.button>
            </Typography>

            <Typography
              variant="body2"
              align="center"
              sx={{ mt: 3, fontWeight: 600 }}
            >
              Or login with
            </Typography>

            <Grid container spacing={2} sx={{ mt: 2 }}>
              <Grid item xs={12} sm={6}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="outlined"
                    fullWidth
                    sx={{
                      fontWeight: 700,
                      borderColor: "#DB4437",
                      color: "#DB4437",
                      "&:hover": {
                        borderColor: "#c1351d",
                        backgroundColor: "rgba(219, 68, 55, 0.1)",
                      },
                    }}
                    onClick={googleAuth}
                  >
                    Sign In With Google
                  </Button>
                </motion.div>
              </Grid>
              <Grid item xs={12} sm={6}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{
                      fontWeight: 700,
                      backgroundColor: "#4267B2",
                      "&:hover": { backgroundColor: "#365899" },
                    }}
                  >
                    Sign In With Facebook
                  </Button>
                </motion.div>
              </Grid>
            </Grid>
          </Paper>
        </motion.div>
      </Box>
    </Container>
  );
};

export default Login;
