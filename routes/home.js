const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  const data = {
    data: {
      message: "Hello, I am the API",
    },
  };

  res.json(data);
});

module.exports = router;
