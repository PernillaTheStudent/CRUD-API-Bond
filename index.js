const express = require("express");
const moviesRoutes = require("./routes/movies");
const homeRoutes = require("./routes/home");

const app = express();
const port = 3005;

// ANVÄND JSON-middleware
app.use(express.json()); // middleware för att express ska kunna förstå json-data som skickas in

const validApiKey = 5;

const authenticateApiKey = (req, res, next) => {
  //console.log("Req", req)
  const apiKey = req.query.apiKey;
  //console.log({apiKey});
  //console.log("typeof", typeof apiKey);
  const numberApiKey = parseInt(apiKey);
  //console.log("typeof", typeof numberApiKey);

  if (!apiKey) {
    // returnera 401
    return res
      .status(401)
      .json({ message: "apiKey missing" });
  }

  // Vill vi se om api nyckeln är korrekt.
  // Om den inte är det => returnera en 403
  if (numberApiKey !== validApiKey) {
    return res.status(403).json({ message: "Invalid apiKey" })
  }

  // Om vi har kommit hit, så vill vi skicka vidare användare till API routen
  next()
};

// middleware for AUTHENTICATION med APIKEY
app.use((req, res, next) => {
  // console.log(`${req.method} ${req.url}`);
  console.log("middleware authentication", req.query);
  authenticateApiKey(req, res, next);
});

// This is middleware called for all routes.
// Middleware takes three parameters.
app.use((req, res, next) => {
  console.log("req.method", req.method);
  console.log("req.path", req.path);
  next();
});

app.use("/movies", moviesRoutes);
app.use(homeRoutes);

app.use((req, res, next) => {
  res.status(404).send("<h1>Page Not Found</h1>");
  let err = new Error("Not Found");
  err.status = 404;
  next(err);  // Den inbyggda felhanteraren ger ett fel och en stacktrace.
});

app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  res.status(err.status || 500).json({
    "errors": [
      {
        "status": err.status,
        "title": err.message,
        "detail": err.message
      }
    ]
  });

});

// Starta servern på angiven port
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
