const router = require("express").Router();
const path = require("path");
const api = require("./api.js");

router.get("/exercise", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/exercise.html"));
});

router.get("/stats", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/stats.html"));
});

// use /api
router.use("/api", api);

module.exports = router;
