const apiKeys = require("../apiKeysData");

const adminKey = "55";

const authenticateApiKey = (req, res, next) => {
  //console.log("apiKeys", module.exports.apiKeys);
  const apiKey = req.query.apiKey;

  if (req.path === "/" || apiKey === adminKey ) {
    next();
    return;
  }

  if (!apiKey) {
    // returnera 401
    return res.status(401).json({ message: "apiKey missing" });
  }

  if (req.path.startsWith("/movies")) {
    const existingKey = apiKeys.find((key) => key.key === apiKey);
    console.log("adminKey", adminKey);

    if (!existingKey)  {
      return res.status(403).json({ message: "Invalid apiKey" });
    }
    if (
      (req.method === "POST" || req.method === "PUT") &&
      !existingKey.canWrite
    ) {
      return res.status(403).json({ message: "No write permissions" });
    }
  }

  if (req.path.startsWith("/apikeys")) {
    if (apiKey !== adminKey) {
      return res
        .status(403)
        .json({ message: "Invalid apiKey for admin" + apiKey });
    }
  }

  // Om vi har kommit hit, så vill vi skicka vidare användare till API routen
  next();
};

module.exports = authenticateApiKey;
