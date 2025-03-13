// import React, { useState } from "react";
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   IconButton,
//   Menu,
//   MenuItem,
//   Paper,
//   Grow,
//   CircularProgress,
// } from "@mui/material";
// import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import { useNavigate } from "react-router-dom"; // For redirection
// import { useAuth } from "../context/AuthContext";

// const Header = () => {
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [loading, setLoading] = useState(false); // Loading state for logout
//   const navigate = useNavigate(); // Navigation hook
//   const { user, setUser } = useAuth();

//   // Open menu
//   const handleMenuOpen = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   // Close menu
//   const handleMenuClose = () => {
//     setAnchorEl(null);
//   };

//   // Handle Logout API Call
//   const handleLogout = async () => {
//     setLoading(true); // Show loader
//     const url = `${process.env.REACT_APP_API_URL}/auth/logout`;
//     try {
//       const response = await fetch(url, {
//         method: "GET",
//         credentials: "include",
//         headers: { "Content-Type": "application/json" },
//       });

//       if (!response.ok) {
//         throw new Error("Logout failed");
//       }
//       setLoading(false);
//       setUser(null);
//       navigate("/login");
//     } catch (error) {
//       console.error("Logout failed:", error);
//       setLoading(false);
//     }
//   };

//   return (
//     <AppBar
//       position="static"
//       sx={{
//         bgcolor: "rgba(0, 0, 0, 0.7)",
//         backdropFilter: "blur(10px)",
//         boxShadow: "none",
//       }}
//     >
//       <Toolbar>
//         <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: "bold" }}>
//           Quotes Dashboard
//         </Typography>

//         {/* User Icon & Dropdown Button */}
//         <IconButton color="inherit" onClick={handleMenuOpen} sx={{ ml: 1 }}>
//           <AccountCircleIcon sx={{ fontSize: 28 }} />
//           <ArrowDropDownIcon sx={{ fontSize: 22 }} />
//         </IconButton>

//         {/* Animated Dropdown Menu */}
//         <Menu
//           anchorEl={anchorEl}
//           open={Boolean(anchorEl)}
//           onClose={handleMenuClose}
//           TransitionComponent={Grow}
//           PaperComponent={(props) => (
//             <Paper {...props} elevation={8} sx={{ borderRadius: 2 }} />
//           )}
//           anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
//           transformOrigin={{ vertical: "top", horizontal: "right" }}
//         >
//           <MenuItem onClick={handleMenuClose} sx={{ px: 3, py: 1.2 }}>
//             Profile
//           </MenuItem>
//           <MenuItem onClick={handleMenuClose} sx={{ px: 3, py: 1.2 }}>
//             Language
//           </MenuItem>
//           <MenuItem
//             onClick={handleLogout}
//             sx={{
//               px: 3,
//               py: 1.2,
//               color: "red",
//               fontWeight: "bold",
//               display: "flex",
//               alignItems: "center",
//               gap: 1,
//             }}
//             disabled={loading} // Disable while loading
//           >
//             {loading ? (
//               <CircularProgress size={20} color="inherit" />
//             ) : (
//               "Logout"
//             )}
//           </MenuItem>
//         </Menu>
//       </Toolbar>
//     </AppBar>
//   );
// };

// export default Header;
import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Grow,
  CircularProgress,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Import useAuth

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user, setUser } = useAuth(); // Access setUser from AuthContext

  // Open menu
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Close menu
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Handle Logout API Call
  const handleLogout = async () => {
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8080/auth/logout", {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Logout failed");
      }

      setUser(null); // Clear user state from AuthContext
      localStorage.clear("authToken");
      navigate("/login"); // Redirect to login page
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppBar
      position="static"
      sx={{
        bgcolor: "rgba(0, 0, 0, 0.7)",
        backdropFilter: "blur(10px)",
        boxShadow: "none",
      }}
    >
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: "bold" }}>
          Quotes Dashboard
        </Typography>

        {/* User Icon & Dropdown Button */}
        <IconButton color="inherit" onClick={handleMenuOpen} sx={{ ml: 1 }}>
          <AccountCircleIcon sx={{ fontSize: 28 }} />
          <ArrowDropDownIcon sx={{ fontSize: 22 }} />
        </IconButton>

        {/* Animated Dropdown Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          TransitionComponent={Grow}
          PaperComponent={(props) => (
            <Paper {...props} elevation={8} sx={{ borderRadius: 2 }} />
          )}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <MenuItem onClick={handleMenuClose} sx={{ px: 3, py: 1.2 }}>
            Profile
          </MenuItem>
          <MenuItem onClick={handleMenuClose} sx={{ px: 3, py: 1.2 }}>
            Language
          </MenuItem>
          <MenuItem
            onClick={handleLogout}
            sx={{
              px: 3,
              py: 1.2,
              color: "red",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
            disabled={loading} // Disable while loading
          >
            {loading ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              "Logout"
            )}
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
