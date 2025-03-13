// import React, { useState } from "react";
// import {
//   Container,
//   Typography,
//   TextField,
//   Button,
//   Box,
//   Grid,
//   Paper,
//   Alert,
// } from "@mui/material";
// import { motion } from "framer-motion";

// const SignUp = () => {
//   // State to store form values
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });

//   // Error state for form validation
//   const [error, setError] = useState("");

//   // Handle input change
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Handle sign-up click
//   const handleSignUp = async (e) => {
//     e.preventDefault();
//     const { name, email, password } = formData;

//     // Validation check
//     if (!name || !email || !password) {
//       setError("All fields are required.");
//       return;
//     }

//     setError(""); // Clear previous errors
//     const URL = `${process.env.REACT_APP_API_URL}/auth`;

//     try {
//       const response = await fetch(URL, {
//         method: "POST",
//         credentials: "include",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ name, email, password }),
//       });

//       if (!response.ok) {
//         throw new Error("Signup failed! Please try again.");
//       }

//       const data = await response.json();
//       console.log("The data is", data);
//     } catch (error) {
//       setError(error.message || "Something went wrong!");
//     }
//   };

//   const googleAuth = () => {
//     window.open(`${process.env.REACT_APP_API_URL}/auth/google`, "_self");
//   };

//   return (
//     <Container maxWidth="sm">
//       <Box
//         sx={{
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           justifyContent: "center",
//           minHeight: "100vh",
//         }}
//       >
//         <motion.div
//           initial={{ opacity: 0, y: -50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//         >
//           <Paper
//             elevation={5}
//             sx={{
//               p: 4,
//               borderRadius: 3,
//               background: "linear-gradient(135deg, #ece9e6, #ffffff)",
//               boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)",
//             }}
//           >
//             <Typography
//               variant="h4"
//               align="center"
//               gutterBottom
//               component={motion.h4}
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.2, duration: 0.5 }}
//               sx={{ fontWeight: "bold", color: "#333" }}
//             >
//               Sign Up
//             </Typography>

//             {error && (
//               <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
//                 <Alert severity="error" sx={{ mb: 2 }}>
//                   {error}
//                 </Alert>
//               </motion.div>
//             )}

//             <form onSubmit={handleSignUp}>
//               <TextField
//                 fullWidth
//                 label="Name"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 margin="normal"
//                 variant="outlined"
//                 required
//                 sx={{
//                   "& .MuiOutlinedInput-root": {
//                     "&:hover fieldset": { borderColor: "#007BFF" },
//                     "&.Mui-focused fieldset": { borderColor: "#007BFF" },
//                   },
//                 }}
//               />
//               <TextField
//                 fullWidth
//                 label="Email"
//                 name="email"
//                 type="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 margin="normal"
//                 variant="outlined"
//                 required
//                 sx={{
//                   "& .MuiOutlinedInput-root": {
//                     "&:hover fieldset": { borderColor: "#007BFF" },
//                     "&.Mui-focused fieldset": { borderColor: "#007BFF" },
//                   },
//                 }}
//               />
//               <TextField
//                 fullWidth
//                 label="Password"
//                 name="password"
//                 type="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 margin="normal"
//                 variant="outlined"
//                 required
//                 sx={{
//                   "& .MuiOutlinedInput-root": {
//                     "&:hover fieldset": { borderColor: "#007BFF" },
//                     "&.Mui-focused fieldset": { borderColor: "#007BFF" },
//                   },
//                 }}
//               />

//               <motion.div
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 <Button
//                   fullWidth
//                   variant="contained"
//                   color="primary"
//                   sx={{
//                     mt: 2,
//                     py: 1.2,
//                     fontWeight: "bold",
//                     backgroundColor: "#007BFF",
//                     "&:hover": { backgroundColor: "#0056b3" },
//                   }}
//                   type="submit"
//                 >
//                   Sign Up
//                 </Button>
//               </motion.div>
//             </form>

//             <Typography
//               variant="body2"
//               align="center"
//               sx={{ mt: 3, fontWeight: 600 }}
//             >
//               Or sign up with
//             </Typography>

//             <Grid container spacing={2} sx={{ mt: 2 }}>
//               <Grid item xs={12} sm={6}>
//                 <motion.div
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                 >
//                   <Button
//                     variant="outlined"
//                     fullWidth
//                     sx={{
//                       fontWeight: 700,
//                       borderColor: "#DB4437",
//                       color: "#DB4437",
//                       "&:hover": {
//                         borderColor: "#c1351d",
//                         backgroundColor: "rgba(219, 68, 55, 0.1)",
//                       },
//                     }}
//                     onClick={googleAuth}
//                   >
//                     Sign In With Google
//                   </Button>
//                 </motion.div>
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <motion.div
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                 >
//                   <Button
//                     variant="contained"
//                     fullWidth
//                     sx={{
//                       fontWeight: 700,
//                       backgroundColor: "#4267B2",
//                       "&:hover": { backgroundColor: "#365899" },
//                     }}
//                   >
//                     Sign In With Facebook
//                   </Button>
//                 </motion.div>
//               </Grid>
//             </Grid>
//           </Paper>
//         </motion.div>
//       </Box>
//     </Container>
//   );
// };

// export default SignUp;

import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Grid,
  Paper,
  Alert,
} from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const SignUp = () => {
  const navigate = useNavigate(); // Initialize navigation

  // State to store form values
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Error state for form validation
  const [error, setError] = useState("");

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle sign-up click
  const handleSignUp = async (e) => {
    e.preventDefault();
    const { name, email, password } = formData;

    // Validation check
    if (!name || !email || !password) {
      setError("All fields are required.");
      return;
    }

    setError(""); // Clear previous errors
    const URL = `${process.env.REACT_APP_API_URL}/auth/signUp`;

    try {
      const response = await fetch(URL, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        throw new Error("Signup failed! Please try again.");
      }

      const data = await response.json();
      console.log("The data is", data);
      if (data.token) {
        localStorage.setItem("authToken", data.token);
      }
      navigate("/");
    } catch (error) {
      setError(error.message || "Something went wrong!");
    }
  };

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
              Sign Up
            </Typography>

            {error && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <Alert severity="error" sx={{ mb: 2 }}>
                  {error}
                </Alert>
              </motion.div>
            )}

            <form onSubmit={handleSignUp}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={formData.name}
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
                label="Email"
                name="email"
                type="email"
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
                  sx={{
                    mt: 2,
                    py: 1.2,
                    fontWeight: "bold",
                    backgroundColor: "#007BFF",
                    "&:hover": { backgroundColor: "#0056b3" },
                  }}
                  type="submit"
                >
                  Sign Up
                </Button>
              </motion.div>
            </form>

            {/* New "Go to Login" Button */}
            <Typography variant="body2" align="center" sx={{ mt: 2 }}>
              Already have an account?{" "}
              <Button
                variant="text"
                sx={{
                  color: "#007BFF",
                  fontWeight: "bold",
                  textTransform: "none",
                  "&:hover": { textDecoration: "underline" },
                }}
                onClick={() => navigate("/login")}
              >
                Log in here
              </Button>
            </Typography>

            <Typography
              variant="body2"
              align="center"
              sx={{ mt: 3, fontWeight: 600 }}
            >
              Or sign up with
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

export default SignUp;
