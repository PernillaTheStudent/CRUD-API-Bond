const express = require("express");
const characters = require("./routes/characters");
const cors = require("cors");

const app = express();
const port = 3008;

// Configure CORS policy
const corsOptions = {
  origin: "http://localhost:3004", // Only allow requests from localhost:3004
};

// Apply CORS middleware to all routes
// Varje gång ett API calls kommer in
app.use(cors(corsOptions));

// ANVÄND JSON-middleware
app.use(express.json()); // middleware för att express ska kunna förstå json-data som skickas in

const validApiKey = 5;

const authenticateApiKey = (req, res, next) => {
  //console.log("Req", req)
  const apiKey = req.query.apiKey;
  //console.log({apiKey});
  console.log("typeof", typeof apiKey);
  const numberApiKey = parseInt(apiKey);
  console.log("typeof", typeof numberApiKey);

  if (!apiKey) {
    // returnera 401
    return res
      .status(401)
      .json( { message: "apiKey missing"} );
  }

  // Vill vi se om api nyckeln är korrekt.
  // Om den inte är det => returnera en 403
  if (numberApiKey !== validApiKey) {
    return res.status(403).json( { message: "Invalid apiKey"} )
  }

  // Om vi har kommit hit, så vill vi skicka vidare användare till API routen
  next()
};

// middleware for AUTHENTICATION med APIKEY
app.use((req, res, next) => {
  // console.log(`${req.method} ${req.url}`);
  console.log(req.query);
  authenticateApiKey(req, res, next);
});

app.get("/", (req, res) => {
  res.send("Hello World! How are you doing?");
  console.log("hello world"); // visible in terminal
});

app.use("/characters", characters);

// Starta servern på angiven port
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
