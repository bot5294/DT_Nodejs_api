const express = require("express");
const router = express.Router();

router.use("/", require("./home"));
router.use("/api/v3", require("./api/v3"));
module.exports = router;
