const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const swaggerJSDocs = require("swagger-jsdoc");
const cookieSession = require("cookie-session");
const session = require("express-session");
const passport = require("passport");
require("dotenv").config();
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const router = require("./routes");
const connectDB = require("./db");
const mockData = require("./assests/mockData.json");

const passportSetUp = require("./passport");

const app = express();

// app.use(cors());
app.use(
  cors({
    origin: process.env.CLIENT_URL, // Allow frontend URL
    credentials: true, // Allow sending cookies
  })
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(
//   cookieSession({
//     name: "Session",
//     keys: ["cyberwolve"],
//     maxAge: 24 * 60 * 60 * 100,
//   })
// );
app.use(
  session({
    secret: "cyberwolve",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 }, // 1 day
  })
);
app.use(passport.initialize());
app.use(passport.session());

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger-output.json");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Quote Generation API",
      version: "1.0.0",
      description: " Quto Genreation APP",
    },
    servers: [
      {
        url: "http://localhost:8080",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJSDocs(options);
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.use("/user", userRoute);
app.use("/auth", authRoute);
app.use(router);

app.use(express.json());

// Middleware to parse JSON
app.use(express.json());

// Connect to the database
let db;
connectDB()
  .then((pool) => {
    db = pool;
    // console.log("The DB is", db);
  })
  .catch((err) => {
    console.error("Failed to connect to the database:", err);
  });

// app.get("/", async (req, res) => {
//   try {
//     const [results] = await db.query("SELECT * FROM quote");
//     res.status(200).json(results);
//   } catch (err) {
//     console.error("Database query error:", err);
//     res.status(500).json({ error: "Database query failed" });
//   }
// });

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
