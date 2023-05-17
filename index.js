const express = require("express");
const authenticateApiKey = require("./middleware/authentication");
const homeRoutes = require("./routes/home");
const moviesRoutes = require("./routes/movies");
const apikeysRoutes = require("./routes/apikeys");

const app = express();
const port = 3005;

// ANVÄND JSON-middleware
app.use(express.json()); // middleware för att express ska kunna förstå json-data som skickas in

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

app.use(homeRoutes);
app.use("/movies", moviesRoutes);
app.use("/apikeys", apikeysRoutes);

app.use((req, res, next) => {
  res.status(404).send("<h1>Page Not Found</h1>");
  let err = new Error("Not Found");
  err.status = 404;
  next(err); // Den inbyggda felhanteraren ger ett fel och en stacktrace.
});

app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  res.status(err.status || 500).json({
    errors: [
      {
        status: err.status,
        title: err.message,
        detail: err.message,
      },
    ],
  });
});

// Starta servern på angiven port
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
