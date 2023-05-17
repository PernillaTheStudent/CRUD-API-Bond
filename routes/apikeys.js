const express = require("express");
const router = express.Router();
let apiKeys = require("../apiKeysData");

router.post("/", (req, res) => {
  const newKey = req.body;

  if (!newKey.name || newKey.name.trim().length === 0) {
    return res.status(400).json({ message: "ApiKey must contain a name" });
  }

  const nextKey = "" + (10000 + parseInt(Math.random() * 100000));
  const name = newKey.name;

  let newApiKey = {
    name,
    key: nextKey,
    canWrite: newKey.canWrite,
  };

  console.log("newApiKey", newApiKey);

  // Lägg till den nya nyckeln
  apiKeys = [...apiKeys, newApiKey];
  console.log("All apiKeys", apiKeys);
  res.status(201).json(newApiKey);
});

router.delete("/:key", (req, res) => {
  const key = req.params.key;
  const apiKey = apiKeys.find((user) => user.key === key);
  console.log("user exists?", apiKey);

  if (!apiKey) {
    return res.status(404).json({ message: "No user found" });
  }

  const newApiKeys = apiKeys.filter((user) => user.key !== apiKey.key);
  apiKeys = newApiKeys;
  console.log("New apiKeysData", apiKeys);

  res.json({ message: `ApiKey ${apiKey.key} är borttagen.` });
});

module.exports = router;
