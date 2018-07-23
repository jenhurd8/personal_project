const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const massive = require("massive");
require("dotenv").config();
const cors = require("cors");
const controller = require("./controller");
const passport = require("passport");
const Auth0Strategy = require("passport-auth0");
const path = require("path");

const app = express();

app.use(
  session({
    secret: "s3cr3t c0d3",
    resave: false,
    saveUninitialized: false
  })
);

massive(process.env.CONNECTION_STRING)
  .then(dbInstance => {
    app.set("db", dbInstance);
  })
  .catch(err => console.log(err));

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(`${__dirname}/../build`));
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new Auth0Strategy(
    {
      domain: process.env.DOMAIN,
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "/login",
      scope: "openid email profile"
    },
    function(accessToken, refreshToken, extraParams, profile, done) {
      app
        .get("db")
        .getUserByEmail([profile.emails[0].value])
        .then(response => {
          console.log(response);
          if (!response[0]) {
            app
              .get("db")
              .addUser([
                profile.displayName,
                profile.id,
                profile.user_id,
                profile.emails[0].value,
                profile.picture
              ])
              .then(response => done(null, response[0]))
              .catch(err => console.log(err));
          } else {
            return done(null, response[0]);
          }
        });
    }
  )
);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

app.get(
  "/login",
  passport.authenticate("auth0", {
    // successRedirect: "http://localhost:3000/#/dashboard",
    successRedirect: `${process.env.REACT_APP_DEV_HOST}/#/dashboard`,
    failureRedirect: "/login"
  })
);

app.get("/logout", (req, res) => {
  console.log("destroyed");
  // res.redirect(`https://${process.env.DOMAIN}/v2/logout`);
  req.logout();
  req.session.destroy();
  res.redirect(
    `https://${
      process.env.DOMAIN
      // }/v2/logout?federated&returnTo=http%3A%2F%2Flocalhost:3000/landing&client_id=${
    }/v2/logout?federated&returnTo=http%3A%2F%2F${
      process.env.REACT_APP_DEV_HOST
    }/landing&client_id=${process.env.CLIENT_ID}`
  );
});

app.get("/api/user", (req, res) => {
  res.status(200).send(req.session.passport.user);
});

//app.delete("/api/user/:id", controller.deleteUser);

const port = process.env.PORT || 3001;

app.get("/api/family", controller.getFamily);
app.post("/api/family", controller.addFamily);
app.delete("/api/family/:id", controller.deleteFamily);
app.put("/api/family/:id", controller.updateFamily);
app.put("/api/familyName/:id", controller.updateFamilyName);
app.put("/api/familyImage/:id", controller.updateFamilyImage);
app.put("/api/familyDob/:id", controller.updateFamilyDob);
app.put("/api/familyColor/:id", controller.updateFamilyColor);

app.get("/api/providers", controller.getProviders);
app.post("/api/providers", controller.addProvider);
app.delete("/api/providers/:id", controller.deleteProvider);
app.put("/api/providers/:id", controller.updateProvider);
app.put("/api/providerName/:id", controller.updateProviderName);
app.put("/api/providerPracticeName/:id", controller.updateProviderPracticeName);
app.put("/api/providerAddress/:id", controller.updateProviderAddress);
app.put("/api/providerPhoto/:id", controller.updateProviderPhoto);
app.put("/api/providerPhone/:id", controller.updateProviderPhone);

app.get("/api/visits", controller.getVisits);
app.delete("/api/visits/:id", controller.deleteVisit);
app.post("/api/visits", controller.addVisit);
app.put("/api/visitDate/:id", controller.updateVisitDate);
app.put("/api/visitDetails/:id", controller.updateVisitDetails);
app.put("/api/visitRx/:id", controller.updateVisitRx);
app.put("/api/visitBalance/:id", controller.updateVisitBalance);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build/index.html"));
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
