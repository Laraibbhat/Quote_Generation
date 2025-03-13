const GoogleStrategy = require("passport-google-oauth20");
const passport = require("passport");
const connectDB = require("./db");
const generateToken = require("./utils/jwt");

let db;
connectDB()
  .then((pool) => {
    db = pool;
  })
  .catch((err) => {
    console.error("Failed to connect to the database:", err);
  });

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.Client_ID,
      clientSecret: process.env.Secret_Key,
      callbackURL: "/auth/google/callback",
      scope: ["profile", "email"],
    },
    async function (accessToken, refreshToken, profile, callback) {
      try {
        const email = profile.emails[0].value;
        const name = profile.displayName;
        const emailVerified = profile.email_verified || true;

        // Check if user is already in db;
        const query = "SELECT * from users where email =?";
        const [existingUser] = await db.query(query, [email]);

        let user;
        if (existingUser.length > 0) {
          user = existingUser[0];
        } else {
          const insertQuery =
            "INSERT INTO users(name,email, email_verified) VALUES (?,?, TRUE)";
          await db.query(insertQuery, [name, email]);

          // Fetching the newly User
          const [newUser] = await db.query(query, [email]);
          user = newUser[0];
        }
        // Generating the token
        const token = await generateToken(user);
        user.token = token;

        console.log("The Usrr is", user);
        callback(null, user);
      } catch (error) {
        callback(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  // console.log("Serializing user:", user);
  done(null, user);
});

passport.deserializeUser((user, done) => {
  // console.log("*************Deserializing user:", user);
  done(null, user);
});
