const express = require("express");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const connectDB = require("../db");
const generateToken = require("../utils/jwt");

const router = express.Router();

let db;
connectDB()
  .then((pool) => {
    db = pool;
    // console.log("The DB is", db);
  })
  .catch((err) => {
    console.error("Failed to connect to the database:", err);
  });

router.get("/login/failed", (req, res) => {
  res.status(401).json({ error: true, message: "Login Failed" });
});
router.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      error: false,
      message: "Successfully Logged In",
      user: req.user,
      token: req.user.token,
    });
  } else {
    res.status(401).json({ error: true, message: "Not Authorized" });
  }
});

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

router.get("/google", passport.authenticate("google", ["profile", "email"]));

// router.post("/signUp", async (req, res) => {
//   const { name, email, password } = req.body;
//   const query = `SELECT * from users where email=?`;
//   try {
//     const [data] = await db.query(query, [email]);
//     if (data && Array.isArray(data) && data.length > 0) {
//       return res.status(201).json({
//         message: "There is already a user with this email id, please login",
//       });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const insertQuery = "INSERT INTO users(name,email,password) VALUES (?,?,?)";
//     const [rest] = await db.query(insertQuery, [name, email, hashedPassword]);
//     if (rest.affectedRows) {
//       // FETCHING USER AS I DONT HAVE ID AS IT IS AUTO GENERATED
//       const [userData] = await db.query(query, [email]);
//       console;
//       const token = generateToken(userData[0]);
//       console.log("The token is", token);

//       req.login(user, (err) => {
//         if (err) {
//           return res.status(500).json({ message: "LOgin failed", error: err });
//         }
//         return res.status(200).json({
//           message: "Successfully Account Created and Logged In",
//           token,
//           user,
//         });
//       });
//     }
//     res
//       .status(400)
//       .json({ message: "Failed to save the user, please try again !!" });
//   } catch (error) {
//     console.log("The error is", error.message);
//     res.status(500).json({ error: true });
//   }
// });
router.post("/signUp", async (req, res) => {
  const { name, email, password } = req.body;

  // Validate input
  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const query = `SELECT * FROM users WHERE email = ?`;

  try {
    // Check if user already exists
    const [existingUser] = await db.query(query, [email]);
    if (existingUser.length > 0) {
      return res.status(400).json({
        message: "User already exists. Please log in instead.",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user into database
    const insertQuery =
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
    const [insertResult] = await db.query(insertQuery, [
      name,
      email,
      hashedPassword,
    ]);

    if (insertResult.affectedRows > 0) {
      // Fetch newly created user
      const [newUser] = await db.query(query, [email]);
      const user = newUser[0];

      // Generate JWT token
      const token = generateToken(user);
      console.log("Generated Token:", token);

      // Authenticate user and store session (if using Passport.js)
      req.login(user, (err) => {
        if (err) {
          return res.status(500).json({ message: "Login failed", error: err });
        }
        return res.status(201).json({
          message: "Account successfully created and logged in",
          token,
          user,
        });
      });
    } else {
      return res
        .status(500)
        .json({ message: "User registration failed. Please try again." });
    }
  } catch (error) {
    console.error("Signup Error:", error.message);
    return res
      .status(500)
      .json({ error: true, message: "Internal Server Error" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }
  const query = `SELECT * from users where email=?`;
  try {
    const [data] = await db.query(query, [email]);
    if (!data || !Array.isArray(data) || data.length === 0) {
      return res.status(401).json({
        message: "Invalid Email id or Password or Both",
      });
    }

    const user = data[0];

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({
        message: "invalid  password",
      });
    }
    const token = generateToken(user);
    console.log("The token is", token);
    req.login(user, (err) => {
      if (err) {
        return res.status(500).json({ message: "Login failed", error: err });
      }
      return res.status(200).json({
        message: "Successfully logged in",
        token,
        user,
      });
    });
  } catch (error) {
    console.log("The error is", error.message);
    res.status(500).json({ error: true });
  }
});

router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ error: true, message: "Logout failed" });
    }

    req.session.destroy((err) => {
      if (err) {
        return res
          .status(500)
          .json({ error: true, message: "Session destroy failed" });
      }

      res.clearCookie("connect.sid", { path: "/" }); // Clears the session cookie
      res
        .status(200)
        .json({ error: false, message: "Successfully logged out" });
    });
  });
});

module.exports = router;
