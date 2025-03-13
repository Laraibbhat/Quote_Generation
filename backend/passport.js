const GoogleStrategy = require("passport-google-oauth20");
const passport = require("passport");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.Client_ID,
      clientSecret: process.env.Secret_Key,
      callbackURL: "/auth/google/callback",
      scope: ["profile", "email"],
    },
    function (accessToken, refreshToken, profile, callback) {
      console.log("The Profile Detail is", profile);
      console.log("The accessToken is", accessToken);
      console.log("The refreshToken is", refreshToken);

      callback(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  console.log("Serializing user:", user);
  done(null, user);
});

passport.deserializeUser((user, done) => {
  console.log("*************Deserializing user:", user);
  done(null, user);
});
