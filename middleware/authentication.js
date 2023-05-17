const apiKeys = require("../apiKeysData");

const adminKey = 55;

const authenticateApiKey = (req, res, next) => {
    //console.log("apiKeys", module.exports.apiKeys);
    console.log("apiKeys", apiKeys);
    const apiKey = req.query.apiKey;
    //console.log({apiKey});
    //console.log("typeof", typeof apiKey);
    const numberApiKey = parseInt(apiKey);
    //console.log("typeof", typeof numberApiKey);

    if (req.path === "/") {
        next();
        return;
    } 

    if (!apiKey) {
        // returnera 401
        return res
            .status(401)
            .json({ message: "apiKey missing" });
    }

    if (req.path.startsWith("/movies")) {
        const existingKey = apiKeys.find((key) => key.key === apiKey );
        if (!existingKey) {
            return res.status(403).json({ message: "Invalid apiKey" })
        }
        if ((req.method === "POST" || req.method === "PUT") && !existingKey.canWrite ) {
            return res.status(403).json({ message: "No write permissions" })
        }
    }

    if (req.path.startsWith("/apikeys")) {
        if (apiKey !== adminKey) {
            return res.status(403).json({ message: "Invalid apiKey" })
        }    
    }

    // Om vi har kommit hit, så vill vi skicka vidare användare till API routen
    next()
};

module.exports = authenticateApiKey;